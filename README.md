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
- Un modello piccolo quantizzato che sta comodo in 6GB VRAM (es. `llama3.2:3b` o
  `qwen2.5:7b-instruct-q4_K_M`), da confermare dopo un test di affidabilità sul
  tool-calling per il modulo 4

## Come eseguire le demo

Ogni demo è un servizio Docker Compose sotto un *profile* dedicato al proprio
modulo, così in aula si avvia solo l'occorrente:

```bash
docker compose up -d ollama
docker compose exec ollama ollama pull llama3.2:3b

docker compose --profile modulo-1 up
docker compose --profile modulo-2 up
docker compose --profile modulo-3 up
docker compose --profile modulo-4 up
docker compose --profile modulo-5 up   # richiede anche modulo-4 attivo
```

Stato attuale: **Modulo 1 implementato** (animazione architettura + demo
temperatura); moduli 2-5 ancora a livello di scheletro/placeholder — si
procede un modulo alla volta.
