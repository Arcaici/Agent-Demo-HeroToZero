# Demo — RAG Manuale (con switch)

Chatbot con RAG su un piccolo corpus di documenti aziendali fittizi. Uno switch
nell'interfaccia controlla la modalità:

- **Acceso:** l'utente fa una domanda → il sistema esegue la ricerca nel corpus
  e mostra i passaggi/documenti recuperati in interfaccia → l'utente conferma →
  la domanda + i risultati del retrieval vengono inviati al LLM per la risposta
  finale.
- **Spento:** stessa pipeline, ma l'interfaccia mostra solo la risposta finale
  dell'LLM già elaborata sui dati recuperati dal RAG (nessuno step intermedio
  visibile).

In entrambi i casi la risposta finale appare **parola per parola** (streaming
reale da Ollama); con lo switch acceso il payload inviato al modello compare
subito, prima ancora che la risposta inizi a comparire.

## Stack

Due container: `backend/` (FastAPI — corpus statico di 13 documenti
fittizi su un'azienda manifatturiera "Acme Manifattura" (include
`MAT-4471/B`, l'esempio-filo conduttore ripreso identico nel modulo 4),
embedding via Ollama `nomic-embed-text` con cache in memoria, retrieval per
cosine similarity via numpy con soglia (`SIMILARITY_THRESHOLD`, default
0.65) che scarta i chunk fuori perimetro, nessun vector DB dedicato viste
le dimensioni del corpus, generazione via Ollama `llama3.2:3b` con
`num_ctx=8192` e istruzione di citare sempre la fonte) + `frontend/`
(React/Vite via nginx, che fa anche da reverse proxy verso il backend).

## API

```
POST /api/retrieve  {question}
  -> {results: [{id, title, snippet, score, sotto_soglia: bool}]}
POST /api/generate  {question, doc_ids: [str]}
  -> stream NDJSON: {"type":"payload","messages":[...]}, poi
     {"type":"chunk","content":str} ripetuto, poi {"type":"done"}
```

I documenti con `sotto_soglia: true` (score < `SIMILARITY_THRESHOLD`) sono
esclusi automaticamente dal frontend quando invia `doc_ids` a
`/api/generate` — non entrano nel prompt del modello.

## Come eseguire

```bash
docker compose up -d ollama
docker compose --profile modulo-3 up --build demo-3-rag-api demo-3-rag-web
```

Poi apri http://localhost:8085 (solo il servizio `-web` espone una porta).

## TODO

- [x] Corpus di documenti fittizi (coerenti col pubblico: procedure/dati
      stile ERP/MES, per parlare al gestore dati in aula)
- [x] Indicizzazione + retrieval (top-k=3, con punteggio di similarità mostrato)
- [x] Switch step-by-step vs risposta diretta
- [x] UI di conferma prima della chiamata finale al LLM (modalità "acceso")
