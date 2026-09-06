import { useState } from 'react';

const EXAMPLE_QUESTIONS = [
  'Qual è la scorta minima del cuscinetto B-200?',
  'Come funziona la manutenzione della CNC-12?',
  'Chi deve approvare un ordine di acquisto da 8.000 euro?',
  'Che tempo fa oggi?',
];

export default function App() {
  const [question, setQuestion] = useState('');
  const [showSteps, setShowSteps] = useState(true);
  const [results, setResults] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [messagesUsed, setMessagesUsed] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | retrieved | answered
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function reset() {
    setResults(null);
    setAnswer(null);
    setMessagesUsed(null);
    setPhase('idle');
    setError(null);
  }

  async function retrieve(q) {
    const res = await fetch('/api/retrieve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q }),
    });
    if (!res.ok) throw new Error(`Errore retrieve ${res.status}`);
    return (await res.json()).results;
  }

  async function streamGenerate(q, docIds) {
    setAnswer('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, doc_ids: docIds }),
    });
    if (!res.ok) throw new Error(`Errore generate ${res.status}`);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.trim()) continue;
        const event = JSON.parse(line);
        if (event.type === 'payload') {
          setMessagesUsed(event.messages);
        } else if (event.type === 'chunk') {
          setAnswer((prev) => (prev ?? '') + event.content);
        }
      }
    }
    setPhase('answered');
  }

  async function ask() {
    if (!question.trim()) return;
    reset();
    setLoading(true);
    try {
      const docs = await retrieve(question);
      setResults(docs);
      if (showSteps) {
        setPhase('retrieved');
      } else {
        const validIds = docs.filter((d) => !d.sotto_soglia).map((d) => d.id);
        await streamGenerate(question, validIds);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function confirmAndGenerate() {
    setLoading(true);
    setError(null);
    try {
      const validIds = results.filter((d) => !d.sotto_soglia).map((d) => d.id);
      await streamGenerate(question, validIds);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>RAG manuale: prima cerca, poi risponde</h1>
      <p className="subtitle">
        Il modello non "sa" nulla dell'azienda: la risposta arriva solo dopo
        aver recuperato i documenti giusti dal corpus.
      </p>

      <label className="switch-row">
        <input
          type="checkbox"
          checked={showSteps}
          onChange={(e) => setShowSteps(e.target.checked)}
        />
        Mostra i passaggi del RAG
      </label>

      <div className="examples">
        {EXAMPLE_QUESTIONS.map((q) => (
          <button key={q} className="chip-btn" onClick={() => setQuestion(q)}>
            {q}
          </button>
        ))}
      </div>

      <label className="field">
        Domanda
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={2} />
      </label>

      <button onClick={ask} disabled={loading || !question.trim()}>
        {loading ? 'Sto cercando…' : 'Chiedi'}
      </button>

      {error && <p className="error">Errore: {error}</p>}

      {showSteps && results && (
        <section className="block">
          <h2>Documenti recuperati dal corpus</h2>
          <p className="threshold-note">
            Soglia di similarità: sotto questo punteggio il frammento è
            scartato e non entra nel prompt.
          </p>
          <div className="docs">
            {results.map((r) => (
              <div className={`doc-card${r.sotto_soglia ? ' doc-below-threshold' : ''}`} key={r.id}>
                <div className="doc-title">
                  {r.title} <span className="doc-score">score {r.score}</span>
                  {r.sotto_soglia && <span className="doc-excluded"> — sotto soglia, escluso</span>}
                </div>
                <div className="doc-snippet">{r.snippet}</div>
              </div>
            ))}
          </div>
          {phase === 'retrieved' && (
            <button onClick={confirmAndGenerate} disabled={loading}>
              {loading ? 'Genero la risposta…' : 'Continua → genera risposta'}
            </button>
          )}
        </section>
      )}

      {answer && (
        <section className="block">
          <h2>Risposta</h2>
          <div className="answer-card">{answer}</div>
        </section>
      )}

      {showSteps && messagesUsed && (
        <section className="block">
          <h2>Payload inviato al modello</h2>
          <pre className="json-view">{JSON.stringify(messagesUsed, null, 2)}</pre>
        </section>
      )}
    </div>
  );
}
