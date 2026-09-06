# Modulo 1 — L'Illusionista e il Motore

**Durata:** ~20 min · **Obiettivo:** sfatare l'hype e introdurre il cambio di
paradigma, senza dilungarsi (è l'intro del corso).

## Scaletta

- **Il prodotto e il motore:** Copilot (o ChatGPT) come prodotto finito con
  interfaccia, permessi e dati; l'LLM come "motore" sottostante.
- **Dal determinismo alla probabilità:** lo shock culturale per l'IT — passare
  dalla logica `if-A-then-B` al calcolo statistico della *Next Token Prediction*.

## Demo

1. [demo-architettura-agente](demo-architettura-agente/) — pagina HTML/JS statica
   con schema animato dell'architettura di un agente/Copilot (prodotto ↔ motore
   LLM ↔ dati/permessi/connettori), per rendere visibile la metafora
   "prodotto e motore". Il Passo 4 mostra, per alcuni token, le alternative
   scartate con il relativo punteggio di probabilità (es. "Certo 0.62 / Ecco
   0.24 / Ciao 0.09"), non solo l'effetto macchina-da-scrivere.
2. [demo-temperatura](demo-temperatura/) — stessa domanda posta più volte
   all'LLM locale, risposte diverse ogni volta; slider di temperatura (con le
   tre fasce 0.0-0.3 / 0.4-0.7 / 0.8-1.2 indicate) per mostrare perché bisogna
   "temere" la probabilità anche se è alla base del funzionamento degli LLM.
   Domanda di default verificabile (`347 × 289`): a temperatura 0 il modello
   sbaglia in modo ripetibile (stesso risultato errato in tutte le ripetizioni),
   dimostrando dal vivo che la temperatura non regola la correttezza.

## Stato

Implementato, verificato e rivisto per aderenza alle slide (revisione
2026-09). `demo-architettura-agente`: animazione a navigazione manuale
(avanti/indietro), nodi colorati per tipo, alternative di probabilità nel
Passo 4. Vedi i rispettivi README per dettagli ed endpoint.
