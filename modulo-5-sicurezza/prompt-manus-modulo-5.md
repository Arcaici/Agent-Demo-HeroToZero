# Prompt per Manus — Genera le slide del Modulo 5

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

## Questo modulo: Modulo 5 — Sicurezza e Sfide Architetturali

- Durata indicativa: ~25 minuti — è l'ultimo modulo del corso, il più breve,
  in stile "Gandalf" (come il gioco di Lakera): poca teoria, si va quasi
  subito alla demo dal vivo, che qui è un vero e proprio attacco interattivo.
- Posizione nel corso: quinto e ultimo modulo. Parte dal rischio lasciato in
  sospeso a fine Modulo 4 (un agente autonomo decide da solo in base al
  testo che riceve) e lo porta alle sue conseguenze: se il testo in ingresso
  è scritto con intenzioni malevole, cosa può succedere?
- Questo è il modulo di chiusura del corso: l'ultima slide deve dare una
  visione d'insieme (principio generale + contesto più ampio del settore),
  non aprire un nuovo argomento come nei moduli precedenti.

## La demo di questo modulo

Quando una slide è marcata `[Demo <nome>]`, significa che è l'ultima slide
prima che il presentatore interrompa le slide e apra dal vivo quella demo.
Non serve descrivere la demo nel dettaglio tecnico: basta che il contenuto
della slide "atterri" naturalmente su quel concetto, così il passaggio alla
demo risulta naturale.

- **prompt-injection**: il pubblico prova dal vivo a "convincere" lo stesso
  agente del Modulo 4 (nessuna modifica al sistema) a fare qualcosa che non
  dovrebbe, con due obiettivi dichiarati: far rivelare il system prompt, e
  far eseguire al tool file un'azione fuori dal suo scope previsto. Un
  interruttore attiva/disattiva una mitigazione (un promemoria anti-injection
  nel prompt + un filtro sul testo in uscita), volutamente aggirabile — per
  mostrare che la vera protezione solida è quella scritta nel codice del
  tool, non quella scritta nel prompt.

## Lista degli argomenti (una slide per voce, in questo ordine)

1. Il rovescio della medaglia: un agente che agisce è un agente attaccabile
2. Perché è un problema strutturale: nessuna separazione tra istruzioni e dati nel testo
3. Prompt injection: convincere il modello a ignorare le sue istruzioni
4. Obiettivo 1: far rivelare il system prompt
5. Obiettivo 2: far eseguire al tool qualcosa fuori scope
6. Due difese diverse allo stesso problema: nel prompt vs nel codice del tool
7. Difesa in profondità: quella nel codice non si aggira parafrasando `[Demo prompt-injection]`
8. Principio generale: non fidarsi mai ciecamente dell'output di un modello
9. Il quadro più ampio: OWASP Top 10 per LLM e AI red teaming

## Cosa devi produrre

Una presentazione con una slide per ciascuna delle 9 voci sopra, nell'ordine
dato, con titolo = testo della voce e corpo = contenuto che spieghi
davvero il concetto (non solo il titolo ripetuto). Tieni le slide 1-7 molto
sintetiche (poca teoria, si arriva presto alla demo). Sulla slide marcata
`[Demo ...]` aggiungi anche un'indicazione visibile (es. un'etichetta o una
nota) che segnala "a questo punto si passa alla demo dal vivo: <nome>".
