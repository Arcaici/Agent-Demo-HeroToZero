import { useEffect, useState } from 'react';

const STORAGE_KEY = 'demo-context-window/conversation';
const DEFAULT_SYSTEM_PROMPT = 'Sei un assistente aziendale conciso e cordiale.';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(systemPrompt, messages, lastPayload, lastUsage) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ systemPrompt, messages, lastPayload, lastUsage })
    );
  } catch {
    // storage non disponibile (es. modalità privata): la demo funziona comunque
  }
}

export default function App() {
  const saved = loadFromStorage();
  const [systemPrompt, setSystemPrompt] = useState(saved?.systemPrompt ?? DEFAULT_SYSTEM_PROMPT);
  const [messages, setMessages] = useState(saved?.messages ?? []);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastPayload, setLastPayload] = useState(saved?.lastPayload ?? null);
  const [lastUsage, setLastUsage] = useState(saved?.lastUsage ?? null);
  const [numCtx, setNumCtx] = useState(4096);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((data) => setNumCtx(data.num_ctx))
      .catch(() => {});
  }, []);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    const payload = { system_prompt: systemPrompt, messages: newMessages };
    setLastPayload(payload);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Errore ${res.status}`);
      const data = await res.json();
      const finalMessages = [...newMessages, { role: 'assistant', content: data.reply }];
      const usage = { prompt: data.prompt_tokens, completion: data.completion_tokens };
      setMessages(finalMessages);
      setLastUsage(usage);
      saveToStorage(systemPrompt, finalMessages, payload, usage);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function resetConversation() {
    setMessages([]);
    setLastPayload(null);
    setLastUsage(null);
    saveToStorage(systemPrompt, [], null, null);
  }

  const usedTokens = lastUsage ? lastUsage.prompt + lastUsage.completion : 0;
  const usedPct = Math.min(100, (usedTokens / numCtx) * 100);

  return (
    <div className="layout">
      <div className="main">
        <h1>La context window: il modello non ricorda nulla</h1>
        <p className="subtitle">
          Ad ogni turno viene rispedita l'intera conversazione: la "memoria"
          non è nel modello, è nel payload che gli mandiamo.
        </p>

        <label className="field">
          System prompt
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            rows={2}
          />
        </label>

        <div className="ctx-bar-wrap">
          <div className="ctx-bar">
            <div
              className="ctx-bar-fill"
              style={{
                width: `${usedPct}%`,
                background: usedPct > 80 ? '#f87171' : usedPct > 50 ? '#f59e0b' : '#38bdf8',
              }}
            />
          </div>
          <span className="ctx-label">
            {usedTokens} / {numCtx} token nella context window
          </span>
        </div>

        <div className="chat">
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              <div className="bubble-role">{m.role === 'user' ? 'Tu' : 'Assistente'}</div>
              <div className="bubble-body">{m.content}</div>
            </div>
          ))}
        </div>

        <div className="composer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={2}
            placeholder="Scrivi un messaggio…"
          />
          <div className="composer-actions">
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              {loading ? 'Invio…' : 'Invia'}
            </button>
            <button className="secondary" onClick={resetConversation} disabled={messages.length === 0}>
              Nuova conversazione
            </button>
          </div>
        </div>

        {error && <p className="error">Errore: {error}</p>}
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <button className="sidebar-toggle" onClick={() => setSidebarOpen((v) => !v)}>
          {sidebarOpen ? '» Chiudi payload' : '« Chiamata JSON'}
        </button>
        {sidebarOpen && (
          <>
            <h2>Chiamata inviata al modello</h2>
            <pre className="json-view">
              {lastPayload ? JSON.stringify(lastPayload, null, 2) : 'Invia un messaggio per vedere il payload.'}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
