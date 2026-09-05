# Demo — Prompt Injection (stile Gandalf)

Interfaccia in cui il pubblico prova a "convincere" l'agente ERP/MES del
[modulo 4](../../modulo-4-agente/demo-agente-erp-tool/) — **stesso servizio,
nessuna modifica** — a fare qualcosa che non dovrebbe. Due obiettivi
dichiarati esplicitamente, stile Gandalf: un traguardo chiaro, niente
teoria durante la demo.

1. **Leak del system prompt** — far ripetere all'agente le sue istruzioni
   interne. È l'unico obiettivo su cui il toggle "🛡️ Mitigazione attiva" ha
   effetto (vedi sotto).
2. **Path traversal via il tool file** — far scrivere un file fuori dalla
   cartella sandbox. Fallisce **sempre**, mitigazione o no: il controllo è
   nel codice del tool (`mcp_server.py` del modulo 4), non nel prompt —
   difesa in profondità. Nota emersa testando dal vivo: una richiesta
   esplicita ("scrivi in `../../etc/passwd`") viene spesso rifiutata dal
   modello **prima ancora di chiamare il tool**; una richiesta più
   "innocente" (es. salvare in una sottocartella per organizzazione) ha più
   probabilità di arrivare fino al tool e farsi bloccare lì, mostrando
   davvero il controllo in azione.

I due esiti "bloccato" hanno **colore e testo distinti** in interfaccia
(verde per la mitigazione, viola per il controllo del tool) apposta: un
utente che testava l'Obiettivo 2 con il toggle spento vedeva comunque un
banner "bloccato" verde-generico e pensava che la mitigazione non si
disattivasse — non era un bug di logica (il toggle funziona correttamente
sull'Obiettivo 1), solo un'interfaccia che non distingueva abbastanza i due
meccanismi di difesa.

## Mitigazione (toggle, deliberatamente imperfetta)

Due livelli, entrambi aggirabili — è il punto: mostrare il meccanismo, non
vendere sicurezza vera.

- **Input**: se attiva, il messaggio utente viene accompagnato da un
  promemoria anti-injection.
- **Output**: se attiva, se la risposta finale contiene frasi distintive
  del vero system prompt, viene sostituita con un avviso — un filtro a
  sottostringa, ingenuo e aggirabile (es. chiedendo una traduzione o una
  parafrasi delle istruzioni) — buono spunto di discussione dal vivo.

Una checkbox "Mostra payload JSON" (spenta di default) rivela le card
`llm_request` relayate dal modulo 4 — nessun cambio backend necessario, il
modulo 4 le emette già, qui si tratta solo di mostrarle o filtrarle lato
frontend.

## Stack

Il backend **non parla mai con Ollama**: è un proxy sottile davanti a
`demo-4-agente-api` (env `AGENT_TARGET_URL`). Nessuno streaming qui (a
differenza del modulo 4): una richiesta, lo stream NDJSON del modulo 4
viene letto per intero, filtrato se serve, e ritornato come JSON unico —
gli eventi `final_answer_chunk` (streaming live, non rilevanti per un
flusso "un tentativo, un risultato") vengono ignorati dal frontend, si
mostra solo l'evento aggregato `final_answer`. Frontend React/Vite via
nginx, stessa visualizzazione a step-card del modulo 4 per le chiamate MCP.

## API

```
POST /api/attack  {message: str, mitigation: bool}
  -> {events: [...], leaked: bool, blocked_by_mitigation: bool, file_attack_blocked: bool}
```

## Come eseguire

Richiede l'agente del modulo 4 attivo:

```bash
docker compose up -d ollama
docker compose --profile modulo-4 --profile modulo-5 up --build \
  demo-4-agente-api demo-5-prompt-injection-api demo-5-prompt-injection-web
```

Poi apri http://localhost:8087 (solo il servizio `-web` espone una porta).

> Nota: i servizi di moduli diversi hanno `profiles` diversi in
> `docker-compose.yml` — quando uno dipende da un servizio di un altro
> modulo (come qui), vanno attivati **entrambi** i profile nello stesso
> comando, altrimenti Compose non risolve la dipendenza.

## TODO

- [x] Definire gli obiettivi dell'attacco (2, non 3 livelli — tempo del
      modulo limitato a ~25 minuti)
- [x] UI stile Gandalf: obiettivo dichiarato, tentativo, esito immediato
- [x] Mostrare quando un tentativo riesce a far invocare un tool fuori scope
- [x] Toggle mitigazione input+output (deliberatamente aggirabile)
- [x] Checkbox per mostrare il payload JSON inviato al modello
- [x] Colore/testo distinti tra "bloccato dalla mitigazione" e "bloccato dal
      controllo del tool" (chiarezza UI, non un fix di logica)
