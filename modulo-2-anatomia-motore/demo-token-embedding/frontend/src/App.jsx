import { useState } from 'react';

const DEFAULT_TEXT = 'tigre';

const EXAMPLE_GROUPS = [
  { title: 'Animali', words: ['tigre', 'elefante'] },
  { title: 'Personaggi medievali', words: ['re', 'cavaliere', 'castello', 'drago'] },
  { title: 'Tecnologia', words: ['smartphone', 'robot'] },
  { title: 'Codici interni', words: ['MAT-4471/B', 'PO-1042'] },
];

const GROUP_COLORS = {
  animali: '#38bdf8',
  tecnologia: '#a78bfa',
  cibo: '#34d399',
  emozioni: '#f59e0b',
  personalizzato: '#f472b6',
};

const PAD = 40;
const WIDTH = 640;
const HEIGHT = 420;

function scalePoints(points) {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;

  return points.map((p) => ({
    ...p,
    sx: PAD + ((p.x - minX) / spanX) * (WIDTH - 2 * PAD),
    sy: HEIGHT - PAD - ((p.y - minY) / spanY) * (HEIGHT - 2 * PAD),
  }));
}

export default function App() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [tokens, setTokens] = useState([]);
  const [points, setPoints] = useState(null);
  const [similarities, setSimilarities] = useState(null);
  const [lastLabel, setLastLabel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);

  async function analyze() {
    setLoading(true);
    setError(null);
    try {
      const [tokenRes, spaceRes] = await Promise.all([
        fetch('/api/tokenize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        }),
        fetch('/api/embed-space', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        }),
      ]);
      if (!tokenRes.ok) throw new Error(`Errore tokenize ${tokenRes.status}`);
      if (!spaceRes.ok) throw new Error(`Errore embed-space ${spaceRes.status}`);
      const tokenData = await tokenRes.json();
      const spaceData = await spaceRes.json();
      setTokens(tokenData.tokens);
      setPoints(scalePoints(spaceData.points));
      setSimilarities(spaceData.similarities);
      setLastLabel(text);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Il linguaggio degli LLM: token e spazio semantico</h1>
      <p className="subtitle">
        Il testo diventa prima pezzi discreti (token), poi un punto in uno
        spazio continuo (embedding) dove il significato è "vicinanza". Ogni
        parola analizzata resta sulla mappa: la mappa cresce durante la
        sessione.
      </p>

      <div className="examples">
        {EXAMPLE_GROUPS.map((g) => (
          <div key={g.title} className="example-group">
            <span className="example-group-title">{g.title}:</span>
            {g.words.map((w) => (
              <button key={w} className="chip-btn" onClick={() => setText(w)}>
                {w}
              </button>
            ))}
          </div>
        ))}
      </div>

      <label className="field">
        Parola (o frase)
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} />
      </label>

      <button onClick={analyze} disabled={loading || !text.trim()}>
        {loading ? 'Analizzo…' : 'Analizza'}
      </button>

      {error && <p className="error">Errore: {error}</p>}

      {tokens.length > 0 && (
        <section className="block">
          <h2>Token ({tokens.length})</h2>
          <p className="tokenizer-disclaimer">
            ⚠️ Tokenizzatore illustrativo (GPT/cl100k), non il vocabolario
            esatto di Llama in uso nelle altre demo: split e ID possono
            differire da quelli mostrati a slide.
          </p>
          <div className="chip-row">
            {tokens.map((t, i) => (
              <span className="chip" key={i} title={`id ${t.id}`}>
                {t.text.trim() === '' ? '·' : t.text}
              </span>
            ))}
          </div>
        </section>
      )}

      {similarities && similarities.length > 0 && (
        <section className="block">
          <h2>Similarità coseno con parole di riferimento</h2>
          <div className="cosine-row">
            {similarities.map((s) => (
              <div className="cosine-item" key={s.label}>
                <span className="cosine-label">
                  cos_sim("{lastLabel}", "{s.label}")
                </span>
                <span className="cosine-score">{s.score.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {points && (
        <section className="block">
          <h2>Spazio di embedding (proiezione 2D, cresce ad ogni analisi)</h2>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="scatter">
            {points.map((p) => {
              const isLast = p.label === lastLabel;
              return (
                <g
                  key={p.label}
                  onMouseEnter={() => setHovered(p.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <circle
                    cx={p.sx}
                    cy={p.sy}
                    r={isLast ? 9 : 6}
                    fill={GROUP_COLORS[p.group] ?? GROUP_COLORS.personalizzato}
                    stroke={isLast ? '#fff' : 'none'}
                    strokeWidth={isLast ? 2 : 0}
                  />
                  {(hovered === p.label || isLast) && (
                    <text x={p.sx + 10} y={p.sy + 4} className={isLast ? 'point-label query' : 'point-label'}>
                      {p.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <div className="legend">
            {Object.entries(GROUP_COLORS).map(([group, color]) => (
              <span key={group} className="legend-item">
                <span className="dot" style={{ background: color }} /> {group}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
