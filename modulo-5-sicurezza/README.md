# Modulo 5 — Sicurezza e Sfide Architetturali

**Durata:** ~25 min · **Obiettivo:** preparare l'IT ai rischi concreti di
queste architetture. Stile "Gandalf" (Lakera): poche slide, una demo mirata e
diretta.

## Scaletta

1. Il rovescio della medaglia: un agente che agisce è un agente attaccabile
2. Perché è un problema strutturale: nessuna separazione tra istruzioni e
   dati nel testo
3. Prompt injection: convincere il modello a ignorare le sue istruzioni
4. Obiettivo 1: far rivelare il system prompt
5. Obiettivo 2: far eseguire al tool qualcosa fuori scope
6. Due difese diverse allo stesso problema: nel prompt vs nel codice del tool
7. Difesa in profondità: quella nel codice non si aggira parafrasando **[Demo
   prompt-injection]**
8. Principio generale: non fidarsi mai ciecamente dell'output di un modello
9. Il quadro più ampio: OWASP Top 10 per LLM e AI red teaming

## Demo

1. [demo-prompt-injection](demo-prompt-injection/) — attacco stile Gandalf
   contro l'agente ERP/MES del [modulo 4](../modulo-4-agente/): tentativo di
   fargli rivelare il system prompt o invocare un tool fuori contesto tramite
   prompt injection. Lo stesso sistema visto "funzionare bene" un'ora prima
   viene ora messo sotto pressione.

## Stato

Implementato, verificato e rivisto per aderenza alle slide (revisione
2026-09). `demo-prompt-injection`: attacco allo stesso agente del modulo 4
(nessuna duplicazione), due obiettivi (leak del system prompt, path
traversal via il tool report — con un secondo esempio di traversal esplicito
per mostrare l'autocensura del modello prima ancora del blocco nel tool),
toggle mitigazione input+output deliberatamente aggirabile. La rilevazione
del leak in uscita è ora multilingua e case-insensitive: un attacco
verificato in precedenza (chiedere la traduzione in inglese del system
prompt) bypassava il filtro basato su frasi esatte in italiano — corretto.
Vedi il README della demo per dettagli ed endpoint.
