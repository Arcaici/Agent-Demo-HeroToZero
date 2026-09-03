# Demo — Prompt Injection (stile Gandalf)

Interfaccia minimale in cui il pubblico prova a "convincere" l'agente ERP/MES
del [modulo 4](../../modulo-4-agente/demo-agente-erp-tool/) a fare qualcosa
che non dovrebbe: rivelare il proprio system prompt, ignorare le istruzioni, o
invocare il tool file system fuori dallo scope previsto. Stile Gandalf di
Lakera: un obiettivo chiaro e diretto ("fagli dire X"), niente teoria durante
la demo.

Il target è il servizio `demo-4-agente` (stesso agente, nessuna duplicazione di
logica) — questo servizio è solo il layer di attacco/interfaccia.

## Stack

Frontend HTML/JS minimale con campo di input libero, backend FastAPI sottile
che inoltra i tentativi all'agente del modulo 4 (`AGENT_TARGET_URL`) e mostra
la risposta grezza, incluse eventuali chiamate a tool avvenute.

## Come eseguire

Richiede l'agente del modulo 4 attivo:

```bash
docker compose up -d ollama
docker compose --profile modulo-4 up -d demo-4-agente
docker compose --profile modulo-5 up demo-5-prompt-injection
```

Poi apri http://localhost:8087

## TODO

- [ ] Definire 2-3 "livelli" di difficoltà (system prompt via via più protetto)
- [ ] UI stile Gandalf: obiettivo dichiarato, tentativo, esito immediato
- [ ] Mostrare quando un tentativo riesce a far invocare un tool non previsto
