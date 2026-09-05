# Modulo 4 — Dalla Chat all'Agente (L'Orchestrazione)

**Durata:** ~55 min · **Obiettivo:** spiegare come l'LLM smette di essere
passivo e compie azioni — il modulo più corposo del corso.

## Scaletta

- **Function Calling / Tool Use:** il punto di svolta — l'LLM che genera
  payload JSON strutturati per interrogare API, CRM o eseguire script.
- **Il Loop dell'Agente:** come strutturare il ciclo *Observe → Reason → Act*
  in codice.
- **Sistemi Multi-Agente:** quando un singolo agente non basta e si orchestrano
  più istanze con ruoli specializzati (pianificatore, esecutore, revisore) —
  accenno concettuale, tempo permettendo.

## Demo

1. [demo-agente-erp-tool](demo-agente-erp-tool/) — agente con un paio di tool
   reali: uno interroga dati ERP/MES fittizi (es. ordini di produzione,
   giacenze di magazzino), l'altro esegue un'operazione su file system (es.
   genera/legge un report). L'interfaccia mostra tutti i passi del loop
   *observe → reason → act*, prima e dopo la risposta finale, per rendere
   visibile il lavoro dietro le quinte.

Questo stesso agente viene riusato nel [modulo 5](../modulo-5-sicurezza/) come
bersaglio della demo di prompt injection.

## Stato

Implementato e verificato. `demo-agente-erp-tool`: 3 tool (magazzino,
ordini, report) esposti via un vero server MCP, loop agentico con step
streammati in tempo reale al frontend. Modello di default:
`qwen2.5:7b-instruct-q4_K_M` (validato più affidabile di `llama3.2:3b` sul
tool-calling — vedi il README della demo). Vedi il README della demo per
dettagli ed endpoint.
