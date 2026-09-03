import { useState } from 'react';

const DEFAULT_TEXT = 'Adoro il cappuccino la mattina';

const GROUP_COLORS = {
  animali: '#38bdf8',
  tecnologia: '#a78bfa',
  cibo: '#34d399',
  emozioni: '#f59e0b',
};

const PAD = 40;
const WIDTH = 640;
const HEIGHT = 420;

function scalePoints(preloaded, query) {
  const all = [...preloaded, query];
  const xs = all.map((p) => p.x);
  const ys = all.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;

  const scale = (p) => ({
    ...p,
    sx: PAD + ((p.x - minX) / spanX) * (WIDTH - 2 * PAD),
    sy: HEIGHT - PAD - ((p.y - minY) / spanY) * (HEIGHT - 2 * PAD),
  });

  return { preloaded: preloaded.map(scale), query: scale(query) };
}

export default function App() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [tokens, setTokens] = useState([]);
  const [space, setSpace] = useState(null);
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
      setSpace(scalePoints(spaceData.preloaded, spaceData.query));
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
        spazio continuo (embedding) dove il significato è "vicinanza".
      </p>

      <label className="field">
        Testo
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} />
      </label>

      <button onClick={analyze} disabled={loading || !text.trim()}>
        {loading ? 'Analizzo…' : 'Analizza'}
      </button>

      {error && <p className="error">Errore: {error}</p>}

      {tokens.length > 0 && (
        <section className="block">
          <h2>Token ({tokens.length})</h2>
          <div className="chip-row">
            {tokens.map((t, i) => (
              <span className="chip" key={i} title={`id ${t.id}`}>
                {t.text.trim() === '' ? '·' : t.text}
              </span>
            ))}
          </div>
        </section>
      )}

      {space && (
        <section className="block">
          <h2>Spazio di embedding (proiezione 2D)</h2>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="scatter">
            {space.preloaded.map((p, i) => (
              <g
                key={i}
                onMouseEnter={() => setHovered(p.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={p.sx} cy={p.sy} r={6} fill={GROUP_COLORS[p.group]} />
                {hovered === p.label && (
                  <text x={p.sx + 10} y={p.sy + 4} className="point-label">
                    {p.label}
                  </text>
                )}
              </g>
            ))}
            <g>
              <circle
                cx={space.query.sx}
                cy={space.query.sy}
                r={9}
                fill="#f472b6"
                stroke="#fff"
                strokeWidth={2}
              />
              <text x={space.query.sx + 12} y={space.query.sy + 5} className="point-label query">
                "{text.length > 24 ? text.slice(0, 24) + '…' : text}"
              </text>
            </g>
          </svg>
          <div className="legend">
            {Object.entries(GROUP_COLORS).map(([group, color]) => (
              <span key={group} className="legend-item">
                <span className="dot" style={{ background: color }} /> {group}
              </span>
            ))}
            <span className="legend-item">
              <span className="dot" style={{ background: '#f472b6' }} /> la tua frase
            </span>
          </div>
        </section>
      )}
    </div>
  );
}
