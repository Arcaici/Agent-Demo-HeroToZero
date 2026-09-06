import { useRef, useState } from 'react';

const EXAMPLE_QUESTIONS = [
  'Qual è la giacenza del componente MAT-4471/B?',
  "A che punto è l'ordine PO-1042?",
  'Ho bisogno di due informazioni: 1) la giacenza del componente MAT-4471/B, 2) lo stato dell\'ordine PO-1042. Usa i tool per entrambe, uno alla volta.',
  'Genera un report sullo stato scorte e salvalo come scorte.txt',
  'Ciao, chi sei e cosa puoi fare per me?',
];

let nextId = 1;

export default function App() {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]); // {role, content} per l'API
  const [log, setLog] = useState([]); // item di rendering
  const [showPayload, setShowPayload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const streamingIdRef = useRef(null);

  async function ask() {
    if (!question.trim() || loading) return;
    const userMessage = { role: 'user', content: question };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setLog((l) => [...l, { id: nextId++, kind: 'user', content: question }]);
    setQuestion('');
    setLoading(true);
    setError(null);
    streamingIdRef.current = null;

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      });
      if (!res.ok) throw new Error(`Errore ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finalAnswer = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);

          if (event.type === 'final_answer_chunk') {
            if (streamingIdRef.current !== null) {
              const id = streamingIdRef.current;
              setLog((l) =>
                l.map((item) =>
                  item.id === id ? { ...item, content: item.content + event.content } : item
                )
              );
            } else {
              const id = nextId++;
              streamingIdRef.current = id;
              setLog((l) => [
                ...l,
                { id, type: 'final_answer_chunk', content: event.content },
              ]);
            }
          } else if (event.type === 'final_answer') {
            streamingIdRef.current = null;
            finalAnswer = event.content;
          } else {
            setLog((l) => [...l, { id: nextId++, ...event }]);
          }
        }
      }

      if (finalAnswer !== null) {
        setHistory((h) => [...h, { role: 'assistant', content: finalAnswer }]);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>L'agente che usa i tool (via MCP)</h1>
      <p className="subtitle">
        Ogni chiamata a un tool passa da un vero server MCP: qui sotto vedi
        ogni passo, prima e dopo la risposta finale.
      </p>

      <label className="payload-toggle">
        <input
          type="checkbox"
          checked={showPayload}
          onChange={(e) => setShowPayload(e.target.checked)}
        />
        Mostra payload JSON inviato al modello
      </label>

      <div className="examples">
        {EXAMPLE_QUESTIONS.map((q) => (
          <button key={q} className="chip-btn" onClick={() => setQuestion(q)}>
            {q}
          </button>
        ))}
      </div>

      <div className="log">
        {log
          .filter((item) => showPayload || item.type !== 'llm_request')
          .map((item) => (
            <LogItem key={item.id} item={item} />
          ))}
        {loading && <div className="thinking">Il modello sta ragionando…</div>}
      </div>

      <div className="composer">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              ask();
            }
          }}
          rows={2}
          placeholder="Scrivi un messaggio…"
        />
        <button onClick={ask} disabled={loading || !question.trim()}>
          {loading ? 'Invio…' : 'Invia'}
        </button>
      </div>

      {error && <p className="error">Errore: {error}</p>}
    </div>
  );
}

function LogItem({ item }) {
  if (item.kind === 'user') {
    return (
      <div className="bubble user">
        <div className="bubble-role">Tu</div>
        <div className="bubble-body">{item.content}</div>
      </div>
    );
  }
  if (item.type === 'llm_request') {
    return (
      <div className="step step-payload">
        <div className="step-title">📤 Payload inviato al modello</div>
        <pre className="step-json">{JSON.stringify(item.payload, null, 2)}</pre>
      </div>
    );
  }
  if (item.type === 'mcp_call') {
    return (
      <div className="step step-call">
        <div className="step-title">🔌 Chiamata MCP: {item.tool}</div>
        <pre className="step-json">{JSON.stringify(item.arguments, null, 2)}</pre>
      </div>
    );
  }
  if (item.type === 'mcp_result') {
    return (
      <div className="step step-result">
        <div className="step-title">✅ Risultato MCP: {item.tool}</div>
        <pre className="step-json">{formatResult(item.result)}</pre>
      </div>
    );
  }
  if (item.type === 'final_answer_chunk') {
    return (
      <div className="bubble assistant">
        <div className="bubble-role">Assistente</div>
        <div className="bubble-body">{item.content}</div>
      </div>
    );
  }
  if (item.type === 'iteration_limit') {
    return (
      <div className="step step-warning">
        ⚠️ Limite di iterazioni raggiunto senza una risposta finale.
      </div>
    );
  }
  return null;
}

function formatResult(text) {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}
