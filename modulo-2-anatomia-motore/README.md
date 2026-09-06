# Modulo 2 — Anatomia Pratica del Motore

**Durata:** ~50 min · **Obiettivo:** rendere l'LLM comprensibile come componente
software — uno dei moduli centrali del corso.

## Scaletta

1. Cosa sono le "parole" per un modello
2. Il vocabolario del modello
3. Tokenizzazione: spezzare il testo in token
4. Dai token ai numeri: gli embedding
5. Lo spazio semantico: vicinanza = somiglianza di significato (similarità
   coseno)
6. Vedere uno spazio a centinaia di dimensioni: la riduzione dimensionale (PCA)
7. Cluster che emergono dai dati, non programmati a mano **[Demo
   token-embedding]**
8. Il modello è stateless: nessuna memoria tra una chiamata e l'altra
9. La context window: reinviare tutto ad ogni turno
10. Il system prompt: istruzioni permanenti nascoste in ogni chiamata
11. Il limite fisico della context window (token massimi)
12. La vera chiamata al modello: il payload JSON reale **[Demo
    context-window]**
13. Verso il modulo 3: conoscenza congelata al training, dati aziendali mai
    visti

## Demo

1. [demo-token-embedding](demo-token-embedding/) — visualizza in tempo reale
   come un testo viene tokenizzato e come i token si posizionano in uno spazio
   di embedding (similarità semantica tra parole/frasi), con un pannello di
   similarità coseno rispetto a 3 parole di riferimento fisse e una mappa PCA
   che cresce ad ogni analisi.
2. [demo-context-window](demo-context-window/) — chat che salva la conversazione
   in cache browser fino al reload, mostra la crescita della context window a
   ogni turno (conteggio token), e in una sidebar la chiamata effettiva al LLM
   in formato JSON-schema (system prompt incluso).

## Stato

Implementato, verificato e rivisto per aderenza alle slide (revisione
2026-09). `demo-token-embedding`: tokenizzazione via tiktoken (⚠️
illustrativa — vocabolario GPT/cl100k, non l'esatto vocabolario di Llama
usato nelle altre demo; disclaimer visibile in UI) + proiezione PCA di 16
parole precaricate in 4 cluster tematici, più un gruppo "Codici interni"
(`MAT-4471/B`, `PO-1042`) per il pubblico ERP/MES/SAP, più pannello di
similarità coseno numerica. `demo-context-window`: chat persistita in
localStorage, conteggio token reale da Ollama (verificato: riflette il
totale della conversazione turno dopo turno, non solo i token nuovi),
context window a 8192 token, sidebar con il payload JSON inviato. Vedi i
rispettivi README per dettagli ed endpoint.
