# Modulo 5 — Sicurezza e Sfide Architetturali

**Durata:** ~25 min · **Obiettivo:** preparare l'IT ai rischi concreti di
queste architetture. Stile "Gandalf" (Lakera): poche slide, una demo mirata e
diretta.

## Scaletta (2 slide)

- **Mitigare le Allucinazioni:** strategie di system prompt e validazione degli
  output — accenno.
- **AI Red Teaming & Sicurezza:** vulnerabilità critiche come la *Prompt
  Injection* (OWASP Top 10 per LLM), data poisoning e tecniche di probing dei
  prompt.

## Demo

1. [demo-prompt-injection](demo-prompt-injection/) — attacco stile Gandalf
   contro l'agente ERP/MES del [modulo 4](../modulo-4-agente/): tentativo di
   fargli rivelare il system prompt o invocare un tool fuori contesto tramite
   prompt injection. Lo stesso sistema visto "funzionare bene" un'ora prima
   viene ora messo sotto pressione.

## Stato

Scheletro repo — implementazione demo da fare.
