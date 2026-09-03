# Demo — Agente con tool ERP/MES + file system

Agente basato su LLM locale con due tool:

1. **Tool dati ERP/MES fittizi** — interroga un piccolo dataset finto (es.
   ordini di produzione, giacenze di magazzino) tramite una funzione Python
   esposta come tool.
2. **Tool file system** — esegue un'operazione controllata su file (es. genera
   un report testuale a partire dai dati ERP recuperati, o legge un log).

L'interfaccia mostra in tempo reale ogni passo del loop *observe → reason →
act*: la richiesta utente, il ragionamento del modello, le chiamate ai tool con
i relativi payload JSON, i risultati, fino alla risposta finale.

Questo agente viene riusato tale e quale nella [demo di prompt injection del
modulo 5](../../modulo-5-sicurezza/demo-prompt-injection/).

## Stack

Backend FastAPI (Python) con loop agentico esplicito (no framework, per
mantenere visibile la logica), tool calling via API di Ollama, frontend HTML/JS
con log degli step in tempo reale (streaming via Server-Sent Events o WebSocket).

## Come eseguire

```bash
docker compose up -d ollama
docker compose --profile modulo-4 up demo-4-agente
```

Poi apri http://localhost:8086

## TODO

- [ ] Dataset ERP/MES fittizio (ordini, giacenze) e tool di query
- [ ] Tool file system (scope limitato a una cartella sandbox)
- [ ] Loop agentico observe/reason/act con limite di iterazioni
- [ ] Streaming degli step verso il frontend (SSE o WebSocket)
- [ ] Modello di default con tool-calling affidabile (da validare: 3B potrebbe
      non bastare, testare anche modelli più grandi via fisso+VPN come fallback)
