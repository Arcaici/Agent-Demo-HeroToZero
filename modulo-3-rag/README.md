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

Scheletro repo — implementazione demo da fare.
