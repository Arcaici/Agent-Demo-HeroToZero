# Demo — Context Window

Chat con l'LLM locale che persiste la conversazione in `localStorage` del
browser (sopravvive al reload). Ad ogni turno mostra: numero di token occupati
nella context window rispetto al limite del modello, e in una sidebar la
chiamata reale inviata al LLM (system prompt + intera history) in formato
JSON, per rendere concreto il fatto che il modello è *stateless* e che il
contesto va re-iniettato ogni volta.

## Stack

Due container: `backend/` (FastAPI — inoltra a Ollama, legge i conteggi
token reali `prompt_eval_count`/`eval_count` dalla risposta di Ollama, nessun
tokenizer separato necessario) + `frontend/` (React/Vite via nginx, che fa
anche da reverse proxy verso il backend). `localStorage` per la persistenza
lato client (system prompt, messaggi, ultimo payload/conteggio).

## API

```
POST /api/chat    {system_prompt, messages: [{role, content}, ...]} -> {reply, prompt_tokens, completion_tokens}
GET  /api/config  -> {num_ctx, model}
```

## Come eseguire

```bash
docker compose up -d ollama
docker compose --profile modulo-2 up --build demo-2-context-window-api demo-2-context-window-web
```

Poi apri http://localhost:8084 (solo il servizio `-web` espone una porta).

## TODO

- [x] Persistenza conversazione in localStorage (chiave per sessione/demo)
- [x] Conteggio token per turno e cumulativo, con indicatore visivo del limite
- [x] Sidebar con il payload JSON effettivo inviato a Ollama
- [x] System prompt editabile dall'utente per mostrarne l'effetto
