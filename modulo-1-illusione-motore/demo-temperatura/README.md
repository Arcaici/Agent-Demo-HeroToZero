# Demo — Temperatura

L'utente pone la stessa domanda più volte all'LLM locale (via Ollama) e osserva
risposte diverse ogni volta. Uno slider di temperatura (con le tre fasce
0.0-0.3 / 0.4-0.7 / 0.8-1.2 indicate) permette di far vedere come, a
temperatura bassa, le risposte convergono, mentre salendo la variabilità
aumenta — punto di ingresso al concetto di probabilità alla base della
*next token prediction*.

Domanda di default verificabile (`347 × 289`, risposta reale 100.283): a
temperatura 0 il modello sbaglia in modo ripetibile (stesso risultato
errato in tutte le ripetizioni, verificato dal vivo), dimostrando che la
temperatura non regola la correttezza — solo la variabilità. Un secondo
chip di esempio richiama la domanda creativa originale (slogan), utile per
mostrare divergenza semantica invece che numerica.

## Stack

Due container separati:

- **`backend/`** — FastAPI (Python), solo API JSON, nessun file statico.
  Espone `POST /api/ask` che chiama Ollama `repeats` volte in parallelo
  (`httpx.AsyncClient`) con la stessa `temperature` e ritorna le risposte
  grezze.
- **`frontend/`** — React + Vite, build multi-stage servita da nginx.
  nginx fa da reverse proxy per `/api/*` verso il backend sulla rete Docker
  interna: il browser parla solo con nginx, nessun CORS da gestire.

## API

```
POST /api/ask
{ "question": str, "temperature": float (0.0-2.0), "repeats": int (1-5, default 3) }
→ { "responses": [str, ...] }
```

## Come eseguire

```bash
docker compose up -d ollama
docker compose exec ollama ollama pull llama3.2:3b
docker compose --profile modulo-1 up --build demo-1-temperatura-api demo-1-temperatura-web
```

Poi apri http://localhost:8082 (solo il servizio `-web` espone una porta
verso l'host).

## TODO

- [x] Endpoint che chiama Ollama con `temperature` variabile
- [x] UI: campo domanda, slider temperatura, pulsante "chiedi 3 volte" per
      confrontare le risposte affiancate
- [x] Modello di default: `llama3.2:3b` (via env `MODEL_NAME`, configurabile)
