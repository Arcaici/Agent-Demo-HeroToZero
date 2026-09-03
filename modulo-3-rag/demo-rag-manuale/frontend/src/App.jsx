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

  async function generate(q, docIds) {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, doc_ids: docIds }),
    });
    if (!res.ok) throw new Error(`Errore generate ${res.status}`);
    return res.json();
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
        const data = await generate(question, docs.map((d) => d.id));
        setAnswer(data.answer);
        setMessagesUsed(data.messages);
        setPhase('answered');
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
      const data = await generate(question, results.map((d) => d.id));
      setAnswer(data.answer);
      setMessagesUsed(data.messages);
      setPhase('answered');
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
          <div className="docs">
            {results.map((r) => (
              <div className="doc-card" key={r.id}>
                <div className="doc-title">
                  {r.title} <span className="doc-score">score {r.score}</span>
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
