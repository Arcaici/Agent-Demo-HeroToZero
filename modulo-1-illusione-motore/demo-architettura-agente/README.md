# Demo — Architettura animata Copilot/Agente

Pagina statica HTML/CSS/JS (nessun backend, nessuna chiamata LLM) che anima uno
schema dell'architettura tipo Microsoft Copilot: interfaccia utente → orchestratore
→ motore LLM ↔ dati/permessi/connettori. Serve a rendere visibile la metafora
"prodotto e motore" del modulo 1.

L'animazione è scriptata (sequenza di stati predefinita), non collegata a
chiamate reali: qui l'obiettivo è concettuale, non mostrare un sistema
funzionante. Il Passo 4 (generazione token) mostra, per alcuni token, le
alternative scartate con il relativo punteggio di probabilità — riproduce
in miniatura l'esempio della slide 03 ("La password è sca → duta 0.71 /
rica 0.19 / dere 0.07"), non solo l'effetto macchina-da-scrivere.

## Stack

HTML/CSS/JS vanilla, servito da nginx.

## Come eseguire

```bash
docker compose --profile modulo-1 up demo-1-architettura
```

Poi apri http://localhost:8081

## TODO

- [x] Disegnare lo schema (nodi: utente, UI, orchestratore, LLM, dati/permessi/tool)
- [x] Animazione della sequenza "richiesta utente → passaggi interni → risposta"
- [ ] Stile coerente con le slide del corso (da rifinire quando le slide esistono)
