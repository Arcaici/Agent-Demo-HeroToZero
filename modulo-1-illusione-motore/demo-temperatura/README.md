# Demo — Temperatura

L'utente pone la stessa domanda più volte all'LLM locale (via Ollama) e osserva
risposte diverse ogni volta. Uno slider di temperatura permette di far vedere
come, a temperatura 0, le risposte diventano (quasi) deterministiche, mentre
salendo la variabilità aumenta — punto di ingresso al concetto di probabilità
alla base della *next token prediction*.

## Stack

Backend FastAPI (Python) che inoltra le richieste a Ollama, frontend HTML/JS
minimale servito dallo stesso backend.

## Come eseguire

```bash
docker compose up -d ollama
docker compose --profile modulo-1 up demo-1-temperatura
```

Poi apri http://localhost:8082

## TODO

- [ ] Endpoint che chiama Ollama con `temperature` variabile
- [ ] UI: campo domanda, slider temperatura, pulsante "chiedi 3 volte" per
      confrontare le risposte affiancate
- [ ] Modello di default da confermare dopo test di affidabilità (llama3.2:3b?)
