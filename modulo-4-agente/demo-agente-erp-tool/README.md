# Demo — Agente con tool ERP/MES + file system (via MCP)

Agente basato su LLM locale con 3 tool, esposti tramite un **vero server
MCP** (Model Context Protocol) — lo stesso standard usato da Claude
Desktop/Code — invece di semplici funzioni Python chiamate direttamente:

1. **`interroga_magazzino`** — giacenza, scorta minima e ubicazione di un
   componente (dataset fittizio, stessa azienda "Acme Manifattura" e stessi
   codici componente del [corpus RAG del modulo 3](../../modulo-3-rag/demo-rag-manuale/backend/corpus.py)).
2. **`interroga_ordine_produzione`** — stato, linea, quantità e data di
   consegna di un ordine.
3. **`genera_report`** — scrive un file di testo in una cartella sandbox
   (`/app/reports`), con validazione del nome file (no path traversal).

L'interfaccia mostra in tempo reale ogni passo del loop *observe → reason →
act*: la richiesta utente, ogni chiamata MCP con i relativi argomenti JSON,
il risultato, fino alla risposta finale — anche quando il modello incatena
più tool in sequenza per rispondere a una richiesta.

Questo agente viene riusato tale e quale nella [demo di prompt injection del
modulo 5](../../modulo-5-sicurezza/demo-prompt-injection/).

## Stack

Backend FastAPI (Python) con:
- loop agentico esplicito scritto a mano (`agent_loop.py`, nessun framework
  agentico, per restare ispezionabile);
- un **server MCP** (`mcp_server.py`, SDK ufficiale `mcp`, `FastMCP`)
  lanciato come sottoprocesso via stdio;
- un **client MCP** (`mcp_bridge.py`) che scopre i tool (`list_tools`) e li
  esegue (`call_tool`) per conto del loop.

Frontend React/Vite via nginx: legge lo stream di eventi NDJSON
(`response.body.getReader()`) e mostra ogni passo come card separata man
mano che arriva.

## API

```
POST /api/agent/chat  {messages: [{role, content}, ...]}
  -> stream NDJSON, una riga JSON per evento:
     {"type": "mcp_call", "tool": str, "arguments": {...}}
     {"type": "mcp_result", "tool": str, "result": str}
     {"type": "final_answer", "content": str}
     {"type": "iteration_limit"}
```

## Nota sul modello

`llama3.2:3b` (default degli altri moduli) si è rivelato **inaffidabile**
nel tool-calling durante i test: su domande che non richiedono alcun tool
(saluti, domande fuori ambito) generava spesso chiamate a tool inesistenti
o testo che imitava una tool_call invece di rispondere normalmente — anche
dopo aver rinforzato il system prompt. `qwen2.5:7b-instruct-q4_K_M` (~4.7GB)
si è dimostrato molto più affidabile sugli stessi casi di test (saluti,
domande fuori ambito, catene di più tool) — più lento su CPU, ma corretto.
Per questa demo il default è quindi `qwen2.5:7b-instruct-q4_K_M`, diverso
dagli altri moduli (env `MODEL_NAME` in `docker-compose.yml`).

## Come eseguire

```bash
docker compose up -d ollama
docker compose exec ollama ollama pull qwen2.5:7b-instruct-q4_K_M
docker compose --profile modulo-4 up --build demo-4-agente-api demo-4-agente-web
```

Poi apri http://localhost:8086 (solo il servizio `-web` espone una porta).

## TODO

- [x] Dataset ERP/MES fittizio (ordini, giacenze) e tool di query
- [x] Tool file system (scope limitato a una cartella sandbox)
- [x] Loop agentico observe/reason/act con limite di iterazioni
- [x] Streaming degli step verso il frontend (NDJSON su fetch, non SSE/WebSocket)
- [x] Modello di default con tool-calling affidabile: `qwen2.5:7b-instruct-q4_K_M`
      (validato: `llama3.2:3b` inaffidabile su domande senza bisogno di tool)
