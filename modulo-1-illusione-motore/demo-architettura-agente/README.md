# Demo — Architettura animata Copilot/Agente

Pagina statica HTML/CSS/JS (nessun backend, nessuna chiamata LLM) che anima uno
schema dell'architettura tipo Microsoft Copilot: interfaccia utente → orchestratore
→ motore LLM ↔ dati/permessi/tool. Serve a rendere visibile la metafora
"automobile e motore" del modulo 1.

L'animazione è scriptata (sequenza di stati predefinita), non collegata a
chiamate reali: qui l'obiettivo è concettuale, non mostrare un sistema funzionante.

## Stack

HTML/CSS/JS vanilla, servito da nginx.

## Come eseguire

```bash
docker compose --profile modulo-1 up demo-1-architettura
```

Poi apri http://localhost:8081

## TODO

- [ ] Disegnare lo schema (nodi: utente, UI, orchestratore, LLM, dati/permessi/tool)
- [ ] Animazione della sequenza "richiesta utente → passaggi interni → risposta"
- [ ] Stile coerente con le slide del corso
