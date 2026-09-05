# Prompt per Manus — Genera le slide del Modulo 3

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

## Questo modulo: Modulo 3 — L'Integrazione e la Conoscenza (RAG)

- Durata indicativa: ~50 minuti (il resto del tempo del modulo è demo dal
  vivo, non slide) — modulo centrale del corso.
- Posizione nel corso: terzo modulo. Parte dal limite lasciato in sospeso a
  fine Modulo 2 (la conoscenza del modello è congelata al training) e
  costruisce, passo dopo passo, la soluzione: prima l'in-context learning,
  poi il retrieval per similarità (che riusa il concetto di embedding visto
  nel Modulo 2), infine la pipeline RAG completa.
- Alla fine di questo modulo il pubblico deve essere pronto per il Modulo 4
  (Dalla Chat all'Agente), che apre dal limite lasciato in sospeso
  nell'ultima slide: finora il modello ha solo letto dati esterni, non ha
  mai agito su di essi.

## La demo di questo modulo

Quando una slide è marcata `[Demo <nome>]`, significa che è l'ultima slide
prima che il presentatore interrompa le slide e apra dal vivo quella demo.
Non serve descrivere la demo nel dettaglio tecnico: basta che il contenuto
della slide "atterri" naturalmente su quel concetto, così il passaggio alla
demo risulta naturale.

- **rag-manuale**: un chatbot con RAG su un piccolo corpus di documenti
  aziendali fittizi (procedure, scorte di magazzino, ordini). Uno switch
  nell'interfaccia decide se mostrare o nascondere i passaggi intermedi: da
  acceso, l'utente vede i documenti recuperati con il punteggio di
  similarità prima che il modello risponda; da spento, vede solo la
  risposta finale. Su una domanda fuori dal perimetro dei documenti, il
  sistema dichiara di non saperlo invece di inventare.

## Lista degli argomenti (una slide per voce, in questo ordine)

1. Il problema: la conoscenza del modello è congelata al momento del training
2. Conseguenza pratica: non conosce i dati della tua azienda né eventi recenti
3. Un'idea semplice: scrivere il contesto necessario dentro il prompt (in-context learning)
4. Il limite: non ci sta tutta la documentazione aziendale in un prompt
5. La soluzione: cercare solo i pezzi rilevanti per similarità (gli embedding del modulo 2)
6. La pipeline RAG: cerca → recupera → genera solo su quella base
7. Perché riduce le allucinazioni: il modello cita, non inventa
8. Rendere visibile il processo: mostrare o nascondere i passaggi intermedi (lo switch)
9. "Non lo so" come segnale di salute del sistema, non un difetto `[Demo rag-manuale]`
10. Oltre il RAG semplice: Knowledge Graph e Time-Aware RAG (accenno)
11. Verso il modulo 4: da leggere dati esterni ad agire su di essi

## Cosa devi produrre

Una presentazione con una slide per ciascuna delle 11 voci sopra, nell'ordine
dato, con titolo = testo della voce e corpo = contenuto che spieghi
davvero il concetto (non solo il titolo ripetuto). Sulla slide marcata
`[Demo ...]` aggiungi anche un'indicazione visibile (es. un'etichetta o una
nota) che segnala "a questo punto si passa alla demo dal vivo: <nome>".
