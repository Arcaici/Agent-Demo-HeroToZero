# Prompt per Manus — Genera le slide del Modulo 1

Copia tutto il testo che segue e incollalo come richiesta a Manus.

---

Devi generare una presentazione (slide deck) per un modulo di un corso di
aggiornamento tecnico aziendale. Ti spiego il contesto, poi ti do la lista
esatta degli argomenti da trasformare in slide.

## Contesto del corso

Il corso si chiama "Dai Chatbot agli Agenti" ed è un aggiornamento di 4 ore
per un gruppo IT aziendale eterogeneo:
- uno sviluppatore web (principalmente Java),
- un gestore di dati che conosce strutture MES/ERP/SAP,
- un sistemista con basi di security.

Il corso è diviso in 5 moduli. Ogni modulo ha delle slide concettuali seguite
da una o più demo pratiche dal vivo (un'applicazione web che gira contro un
modello linguistico locale). Le slide servono a costruire, passo dopo passo,
tutti i concetti necessari a capire la demo che segue — non sono un riassunto
teorico fine a se stesso.

Stile richiesto per le slide:
- Concettuale ma NON fatto solo di analogie: dove serve, mostra un piccolo
  esempio concreto (una riga di JSON, un parametro, uno snippet minimale) —
  il pubblico è tecnico e si annoia con spiegazioni troppo astratte o
  ripetitive.
- Diretto, senza gonfiare il testo: poche righe per slide, frasi chiare.
- Ogni slide deve avere un contenuto reale (non solo il titolo ripetuto):
  2-4 punti che spiegano davvero il concetto indicato dal titolo.
- L'ordine delle slide è cronologico e cumulativo: ogni slide presuppone
  quelle precedenti e prepara la successiva. Non anticipare concetti che
  arrivano dopo nella lista.

## Questo modulo: Modulo 1 — L'Illusionista e il Motore

- Durata indicativa: ~20 minuti (il resto del tempo del modulo è demo dal
  vivo, non slide).
- Posizione nel corso: è il primo modulo, l'introduzione. Deve sfatare
  l'hype attorno a strumenti come Copilot/ChatGPT e introdurre il cambio di
  paradigma (dal software deterministico al calcolo probabilistico), senza
  scendere troppo nel tecnico — quello arriva dal Modulo 2 in poi.
- Alla fine di questo modulo il pubblico deve essere pronto per il Modulo 2
  (Anatomia Pratica del Motore), che apre spiegando come sono fatti
  internamente i "pezzi di testo" citati nell'ultima slide di questo modulo.

## Le demo di questo modulo

Quando una slide è marcata `[Demo <nome>]`, significa che è l'ultima slide
prima che il presentatore interrompa le slide e apra dal vivo quella demo.
Non serve descrivere la demo nel dettaglio tecnico: basta che il contenuto
della slide "atterri" naturalmente su quel concetto, così il passaggio alla
demo risulta naturale.

- **architettura-agente**: un diagramma animato e interattivo (avanti/indietro)
  che mostra il percorso di una richiesta: Utente → Interfaccia (tipo
  Copilot) → Orchestratore → Motore LLM ↔ Dati/Permessi aziendali, incluso
  il momento in cui il motore genera il testo token per token in modo
  probabilistico.
- **temperatura**: una chat reale contro un modello locale in cui si pone
  la stessa domanda più volte con uno slider di temperatura, mostrando
  risposte diverse a ogni tentativo.

## Lista degli argomenti (una slide per voce, in questo ordine)

1. Il prodotto e il motore: Copilot come interfaccia, l'LLM come motore
2. Cosa non è il motore: non un database, non "cerca" una risposta
3. Cosa fa davvero: previsione del prossimo pezzo di testo (next token prediction) `[Demo architettura-agente]`
4. Dal determinismo alla probabilità: perché la stessa domanda può dare risposte diverse
5. La temperatura: la leva che regola quella variabilità `[Demo temperatura]`
6. Verso il modulo 2: come sono fatti, internamente, i "pezzi di testo" che il motore prevede

## Cosa devi produrre

Una presentazione con una slide per ciascuna delle 6 voci sopra, nell'ordine
dato, con titolo = testo della voce e corpo = contenuto che spieghi
davvero il concetto (non solo il titolo ripetuto). Sulle slide marcate
`[Demo ...]` aggiungi anche un'indicazione visibile (es. un'etichetta o una
nota) che segnala "a questo punto si passa alla demo dal vivo: <nome>".
