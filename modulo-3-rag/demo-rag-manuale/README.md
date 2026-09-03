# Demo — RAG Manuale (con switch)

Chatbot con RAG su un piccolo corpus di documenti aziendali fittizi. Uno switch
nell'interfaccia controlla la modalità:

- **Acceso:** l'utente fa una domanda → il sistema esegue la ricerca nel corpus
  e mostra i passaggi/documenti recuperati in interfaccia → l'utente conferma →
  la domanda + i risultati del retrieval vengono inviati al LLM per la risposta
  finale.
- **Spento:** stessa pipeline, ma l'interfaccia mostra solo la risposta finale
  dell'LLM già elaborata sui dati recuperati dal RAG (nessuno step intermedio
  visibile).

## Stack

Backend FastAPI (Python), vector store leggero (es. Chroma o FAISS, in-process,
nessun servizio esterno aggiuntivo), embedding via Ollama, generazione via Ollama.
Frontend HTML/JS con toggle per la modalità step-by-step.

## Come eseguire

```bash
docker compose up -d ollama
docker compose --profile modulo-3 up demo-3-rag
```

Poi apri http://localhost:8085

## TODO

- [ ] Corpus di documenti fittizi (coerenti col pubblico: es. procedure/dati
      stile ERP/MES, per parlare al gestore dati in aula)
- [ ] Indicizzazione + retrieval (top-k, con punteggio di similarità mostrato)
- [ ] Switch step-by-step vs risposta diretta
- [ ] UI di conferma prima della chiamata finale al LLM (modalità "acceso")
