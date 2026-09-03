# Demo — Context Window

Chat con l'LLM locale che persiste la conversazione in `localStorage` del
browser (sopravvive al reload). Ad ogni turno mostra: numero di token occupati
nella context window rispetto al limite del modello, e in una sidebar la
chiamata reale inviata al LLM (system prompt + intera history) in formato
JSON-schema, per rendere concreto il fatto che il modello è *stateless* e che
il contesto va re-iniettato ogni volta.

## Stack

Backend FastAPI (Python) che inoltra a Ollama e calcola/riporta il conteggio
token; frontend HTML/JS con `localStorage` per la persistenza lato client.

## Come eseguire

```bash
docker compose up -d ollama
docker compose --profile modulo-2 up demo-2-context-window
```

Poi apri http://localhost:8084

## TODO

- [ ] Persistenza conversazione in localStorage (chiave per sessione/demo)
- [ ] Conteggio token per turno e cumulativo, con indicatore visivo del limite
- [ ] Sidebar con il payload JSON-schema effettivo inviato a Ollama
- [ ] System prompt editabile dall'utente per mostrarne l'effetto
