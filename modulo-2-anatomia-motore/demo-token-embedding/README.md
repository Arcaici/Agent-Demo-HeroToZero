# Demo — Token & Embedding

L'utente digita del testo e con un click vede insieme: come viene spezzato in
token, e come si posiziona in uno spazio di embedding 2D rispetto a un set
precaricato di 16 parole in 4 cluster tematici (animali, tecnologia, cibo,
emozioni). Rende visibile il "linguaggio" interno di un LLM.

## Stack

Due container: `backend/` (FastAPI — tokenizzazione via `tiktoken`
`cl100k_base`, embedding via Ollama `nomic-embed-text`, proiezione 2D con PCA
scritta a mano in numpy) + `frontend/` (React/Vite, build servita da nginx
che fa reverse proxy verso il backend).

Nota: `tiktoken` non è il tokenizer esatto di Llama (Ollama non espone un
endpoint di tokenizzazione, e il tokenizer reale di Llama richiede accesso
gated su Hugging Face) — è usato a scopo illustrativo per mostrare il
concetto di tokenizzazione in sub-word.

## API

```
POST /api/tokenize     {text}  -> {tokens: [{id, text}]}
POST /api/embed-space  {text}  -> {preloaded: [{label, group, x, y}], query: {x, y}}
```

## Come eseguire

```bash
docker compose up -d ollama
docker compose exec ollama ollama pull nomic-embed-text
docker compose --profile modulo-2 up --build demo-2-token-embedding-api demo-2-token-embedding-web
```

Poi apri http://localhost:8083 (solo il servizio `-web` espone una porta).

## TODO

- [x] Endpoint di tokenizzazione (mostrare i token con confini evidenziati)
- [x] Endpoint di embedding + riduzione dimensionale (PCA) per il plot 2D
- [x] Set di frasi di esempio precaricate (per non dipendere solo da input live)
