# Demo — Token & Embedding

L'utente digita del testo e vede in tempo reale come viene spezzato in token, e
come frasi/parole simili si posizionano vicine in uno spazio di embedding
(visualizzazione 2D via riduzione dimensionale). Rende visibile il "linguaggio"
interno di un LLM.

## Stack

Backend FastAPI (Python), tokenizzazione via libreria compatibile col modello
Ollama usato nel corso, embedding via modello Ollama dedicato (es. `nomic-embed-text`)
o libreria locale leggera. Frontend HTML/JS con canvas/SVG per la scatter plot.

## Come eseguire

```bash
docker compose up -d ollama
docker compose --profile modulo-2 up demo-2-token-embedding
```

Poi apri http://localhost:8083

## TODO

- [ ] Endpoint di tokenizzazione (mostrare i token con confini evidenziati)
- [ ] Endpoint di embedding + riduzione dimensionale (PCA/t-SNE leggero) per il plot 2D
- [ ] Set di frasi di esempio precaricate (per non dipendere solo da input live)
