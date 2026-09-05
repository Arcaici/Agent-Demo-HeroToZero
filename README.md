# Corso Aggiornamento IT: Dai Chatbot agli Agenti

Corso di 4 ore per un gruppo IT aziendale eterogeneo (sviluppatore web Java, gestore
dati con background MES/ERP/SAP, sistemista con basi di security). Percorso su 5
moduli, ognuno con slide + una o più demo pratiche, eseguibili in locale via Docker
contro un LLM locale (Ollama).

Le note originali su obiettivi e contenuti sono in [idea.md](idea.md).

## Struttura del corso

| # | Modulo | Durata | Cartella |
|---|--------|--------|----------|
| 1 | L'Illusionista e il Motore | ~20 min | [modulo-1-illusione-motore](modulo-1-illusione-motore/) |
| 2 | Anatomia Pratica del Motore | ~50 min | [modulo-2-anatomia-motore](modulo-2-anatomia-motore/) |
| 3 | L'Integrazione e la Conoscenza (RAG) | ~50 min | [modulo-3-rag](modulo-3-rag/) |
| 4 | Dalla Chat all'Agente | ~55 min | [modulo-4-agente](modulo-4-agente/) |
| 5 | Sicurezza e Sfide Architetturali | ~25 min | [modulo-5-sicurezza](modulo-5-sicurezza/) |

Il resto delle 4 ore è buffer per pause e domande.

Il modulo 5 riusa l'agente costruito nel modulo 4 come bersaglio della demo di
prompt injection: stesso sistema, prima mostrato "funzionare bene", poi attaccato.

## Prerequisiti

- Docker + Docker Compose
- [Ollama](https://ollama.com) (containerizzato via `docker-compose.yml`, nessuna
  installazione nativa richiesta)
- Modelli usati (~7GB totali, in cache nel volume `ollama_data` dopo il primo pull):
  - `llama3.2:3b` — moduli 1, 2, 3 (chat/generazione, veloce anche su CPU)
  - `nomic-embed-text` — moduli 2, 3 (embedding)
  - `qwen2.5:7b-instruct-q4_K_M` — moduli 4, 5 (tool-calling: **validato più
    affidabile di `llama3.2:3b`** su questo compito, vedi
    [README del modulo 4](modulo-4-agente/demo-agente-erp-tool/README.md#nota-sul-modello))

## Come eseguire le demo

Ogni demo è un servizio Docker Compose sotto un *profile* dedicato al proprio
modulo, così in aula si avvia solo l'occorrente. I modelli vanno scaricati
una tantum (restano nel volume Docker):

```bash
docker compose up -d ollama
docker compose exec ollama ollama pull llama3.2:3b
docker compose exec ollama ollama pull nomic-embed-text
docker compose exec ollama ollama pull qwen2.5:7b-instruct-q4_K_M

docker compose --profile modulo-1 up
docker compose --profile modulo-2 up
docker compose --profile modulo-3 up
docker compose --profile modulo-4 up
# il modulo 5 dipende dal modulo 4 (bersaglio della demo di prompt injection):
# vanno attivati entrambi i profile nello stesso comando, altrimenti Compose
# non risolve la dipendenza tra servizi di profile diversi
docker compose --profile modulo-4 --profile modulo-5 up demo-4-agente-api \
  demo-5-prompt-injection-api demo-5-prompt-injection-web
```

### Uso GPU (opzionale)

Di default Ollama gira su CPU (funziona ovunque, anche senza GPU riconosciuta).
Per usare una GPU NVIDIA (richiede driver aggiornati + Docker Desktop con
backend WSL2), aggiungere l'override [docker-compose.gpu.yml](docker-compose.gpu.yml)
a qualunque comando:

```bash
docker compose -f docker-compose.yml -f docker-compose.gpu.yml up -d ollama
```

Stato attuale: **corso completo, tutti i 5 moduli implementati** (modulo 1:
animazione architettura + demo temperatura; modulo 2: token/embedding +
context window; modulo 3: RAG manuale con switch step-by-step; modulo 4:
agente con tool via MCP su dati ERP/MES + file system; modulo 5: prompt
injection con toggle mitigazione sullo stesso agente del modulo 4).
