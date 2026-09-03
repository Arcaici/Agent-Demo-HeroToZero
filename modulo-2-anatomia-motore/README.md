# Modulo 2 — Anatomia Pratica del Motore

**Durata:** ~50 min · **Obiettivo:** rendere l'LLM comprensibile come componente
software — uno dei moduli centrali del corso.

## Scaletta

- **Non è un database:** come avviene l'addestramento (compressione dei pattern
  linguistici nei pesi, non memorizzazione di righe SQL).
- **Tokenizzazione ed embedding:** il "linguaggio" degli LLM — parole/pezzi di
  parole trasformati in token e poi in vettori in uno spazio semantico.
- **La Context Window come RAM:** il modello è *stateless*, va re-iniettato il
  contesto ad ogni chiamata; i limiti fisici in token.
- **Le leve di controllo:** temperatura, system prompt, ruolo dell'embedding —
  riprese e approfondite rispetto all'accenno del modulo 1.

## Demo

1. [demo-token-embedding](demo-token-embedding/) — visualizza in tempo reale
   come un testo viene tokenizzato e come i token si posizionano in uno spazio
   di embedding (similarità semantica tra parole/frasi).
2. [demo-context-window](demo-context-window/) — chat che salva la conversazione
   in cache browser fino al reload, mostra la crescita della context window a
   ogni turno (conteggio token), e in una sidebar la chiamata effettiva al LLM
   in formato JSON-schema (system prompt incluso).

## Stato

Scheletro repo — implementazione demo da fare.
