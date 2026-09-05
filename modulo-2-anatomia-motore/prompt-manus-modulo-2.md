# Prompt per Manus — Genera le slide del Modulo 2

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

## Questo modulo: Modulo 2 — Anatomia Pratica del Motore

- Durata indicativa: ~50 minuti (il resto del tempo del modulo è demo dal
  vivo, non slide) — è uno dei moduli centrali del corso, più denso dei
  precedenti.
- Posizione nel corso: secondo modulo. Riprende da dove finiva il Modulo 1
  (il motore genera "pezzi di testo" in modo probabilistico) e li spiega a
  fondo come componente software: token, vocabolario, embedding, e il fatto
  che il modello non ha memoria propria (context window, system prompt).
- Alla fine di questo modulo il pubblico deve essere pronto per il Modulo 3
  (RAG), che apre proprio dal limite lasciato in sospeso nell'ultima slide:
  la conoscenza del modello è congelata al training.

## Le demo di questo modulo

Quando una slide è marcata `[Demo <nome>]`, significa che è l'ultima slide
prima che il presentatore interrompa le slide e apra dal vivo quella demo.
Non serve descrivere la demo nel dettaglio tecnico: basta che il contenuto
della slide "atterri" naturalmente su quel concetto, così il passaggio alla
demo risulta naturale.

- **token-embedding**: l'utente scrive una parola, l'app la spezza in token
  e mostra dove si posiziona in una mappa 2D di significato (embedding)
  insieme ad altre parole precaricate raggruppate in cluster tematici
  (animali, tecnologia, cibo, emozioni). La mappa cresce ad ogni nuova
  parola analizzata durante la sessione.
- **context-window**: una chat reale contro un modello locale che mostra,
  ad ogni turno, quanti token occupa la conversazione rispetto al limite
  del modello, e in una sezione dedicata il payload JSON esatto (system
  prompt + intera cronologia) effettivamente inviato al modello.

## Lista degli argomenti (una slide per voce, in questo ordine)

1. Cosa sono le "parole" per un modello
2. Il vocabolario del modello
3. Tokenizzazione: spezzare il testo in token
4. Dai token ai numeri: gli embedding
5. Lo spazio semantico: vicinanza = somiglianza di significato
6. Vedere uno spazio a centinaia di dimensioni: la riduzione dimensionale (PCA)
7. Cluster che emergono dai dati, non programmati a mano `[Demo token-embedding]`
8. Il modello è stateless: nessuna memoria tra una chiamata e l'altra
9. La context window: reinviare tutto ad ogni turno
10. Il system prompt: istruzioni permanenti nascoste in ogni chiamata
11. Il limite fisico della context window (token massimi)
12. La vera chiamata al modello: il payload JSON reale `[Demo context-window]`
13. Verso il modulo 3: conoscenza congelata al training, dati aziendali mai visti

## Cosa devi produrre

Una presentazione con una slide per ciascuna delle 13 voci sopra, nell'ordine
dato, con titolo = testo della voce e corpo = contenuto che spieghi
davvero il concetto (non solo il titolo ripetuto). Sulle slide marcate
`[Demo ...]` aggiungi anche un'indicazione visibile (es. un'etichetta o una
nota) che segnala "a questo punto si passa alla demo dal vivo: <nome>".
