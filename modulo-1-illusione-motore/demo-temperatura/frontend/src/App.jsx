import { useState } from 'react';

const DEFAULT_QUESTION = "Quanto fa 347 moltiplicato per 289? Rispondi solo con il numero, senza spiegazioni.";

const EXAMPLE_QUESTIONS = [
  "Quanto fa 347 moltiplicato per 289? Rispondi solo con il numero, senza spiegazioni.",
  "Scrivi uno slogan per un'azienda di caffè torrefatto a mano",
];

export default function App() {
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [temperature, setTemperature] = useState(0.7);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function askThreeTimes() {
    setLoading(true);
    setError(null);
    setResponses([]);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, temperature, repeats: 3 }),
      });
      if (!res.ok) throw new Error(`Errore ${res.status}`);
      const data = await res.json();
      setResponses(data.responses);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>La temperatura: quanto "rischia" il modello?</h1>
      <p className="subtitle">
        Stessa domanda, stesso modello, tre chiamate. A temperatura bassa le
        risposte convergono; a temperatura alta divergono.
      </p>

      <div>
        <div className="examples">
          {EXAMPLE_QUESTIONS.map((q) => (
            <button key={q} className="chip-btn" onClick={() => setQuestion(q)}>
              {q}
            </button>
          ))}
        </div>

        <label className="field">
          Domanda
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
          />
        </label>

        <label className="field">
          Temperatura: <strong>{temperature.toFixed(1)}</strong>
          <input
            type="range"
            min="0"
            max="1.5"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
          <div className="range-labels range-labels-zones">
            <span>0.0–0.3<br />quasi deterministico</span>
            <span>0.4–0.7<br />bilanciato</span>
            <span>0.8–1.2<br />creativo/variabile</span>
          </div>
        </label>

        <button onClick={askThreeTimes} disabled={loading || !question.trim()}>
          {loading ? 'Chiedo al modello…' : 'Chiedi 3 volte'}
        </button>

        {error && <p className="error">Errore: {error}</p>}
      </div>

      <div className="cards">
        {responses.map((r, i) => (
          <div className="card" key={i}>
            <div className="card-label">Risposta {i + 1}</div>
            <div className="card-body">{r}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
