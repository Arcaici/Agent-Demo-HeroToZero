# Modulo 3 — L'Integrazione e la Conoscenza (RAG)

**Durata:** ~50 min · **Obiettivo:** risolvere il problema dell'aggiornamento e
dei dati aziendali — modulo centrale del corso.

## Scaletta

- **In-Context Learning:** come sfruttare la "RAM" del modello a runtime.
- **RAG (Retrieval-Augmented Generation):** dare accesso ai documenti aziendali
  senza riaddestrare.
- **Evoluzioni del RAG:** accenno a pattern avanzati (Knowledge Graphs,
  Time-Aware RAG) per dati complessi.

## Demo

1. [demo-rag-manuale](demo-rag-manuale/) — RAG "a passi visibili" con uno
   switch on/off: l'utente fa una domanda, il sistema cerca nel corpus (dati
   aziendali fittizi), mostra i risultati del retrieval e chiede conferma
   prima di passarli al modello. Con lo switch spento, la stessa pipeline gira
   ma l'interfaccia mostra solo la risposta finale — per far vedere la
   differenza tra "black box" e processo esplicito.

## Stato

Implementato, verificato e rivisto per aderenza alle slide (revisione
2026-09). `demo-rag-manuale`: corpus sintetico di 13 documenti su "Acme
Manifattura" (include l'esempio-filo conduttore `MAT-4471/B`, 37 pz,
Deposito B2, ripreso identico nel modulo 4), retrieval per cosine
similarity con **soglia di similarità** (0.65, configurabile via
`SIMILARITY_THRESHOLD`) che scarta i chunk fuori perimetro e li marca in UI,
system prompt che impone di citare la fonte tra parentesi quadre,
generazione in streaming con switch step-by-step on/off, context window a
8192 token. Vedi il README della demo per dettagli ed endpoint.
