# Prompt per Manus — Genera le slide del Modulo 4

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

## Questo modulo: Modulo 4 — Dalla Chat all'Agente

- Durata indicativa: ~55 minuti (il resto del tempo del modulo è demo dal
  vivo, non slide) — è il modulo più corposo del corso.
- Posizione nel corso: quarto modulo. Parte dal limite lasciato in sospeso a
  fine Modulo 3 (il modello finora ha solo letto dati esterni per
  rispondere meglio) e introduce il salto di paradigma verso un modello che
  compie azioni reali: function calling, il protocollo MCP, il ciclo
  osserva-ragiona-agisci.
- Alla fine di questo modulo il pubblico deve essere pronto per il Modulo 5
  (Sicurezza), che apre dal rischio lasciato in sospeso nell'ultima slide:
  un agente che decide da solo può essere manipolato da chi scrive l'input.

## La demo di questo modulo

Quando una slide è marcata `[Demo <nome>]`, significa che è l'ultima slide
prima che il presentatore interrompa le slide e apra dal vivo quella demo.
Non serve descrivere la demo nel dettaglio tecnico: basta che il contenuto
della slide "atterri" naturalmente su quel concetto, così il passaggio alla
demo risulta naturale.

- **agente-erp-tool**: un agente basato su LLM locale con 3 tool esposti
  tramite un vero server MCP: interrogare le giacenze di magazzino,
  interrogare gli ordini di produzione, generare un report scrivendolo su
  file. L'interfaccia mostra in tempo reale ogni passo del ciclo dell'agente
  (chiamata al tool, risultato, eventuali passi successivi incatenati) fino
  alla risposta finale, oltre al payload esatto inviato al modello ad ogni
  passo.

## Lista degli argomenti (una slide per voce, in questo ordine)

1. Il limite di tutto il percorso fin qui: il modello genera solo testo
2. Il salto di paradigma: function calling / tool use
3. Chi esegue davvero l'azione: un livello di codice, non il modello
4. Lo standard di oggi per collegare agente e tool: MCP (Model Context Protocol)
5. Il ciclo dell'agente: osserva → ragiona → agisce → osserva il risultato
6. Incatenare più tool per una singola richiesta
7. Perché serve un limite di iterazioni
8. Rendere visibile il ragionamento: ogni chiamata e risultato, non solo la risposta finale
9. Il payload reale inviato ad ogni passo del ciclo `[Demo agente-erp-tool]`
10. Non tutti i modelli sono ugualmente affidabili nel tool-calling
11. Oltre il singolo agente: sistemi multi-agente (accenno)
12. Verso il modulo 5: un agente decide da solo — e se il testo che riceve è scritto con cattive intenzioni?

## Cosa devi produrre

Una presentazione con una slide per ciascuna delle 12 voci sopra, nell'ordine
dato, con titolo = testo della voce e corpo = contenuto che spieghi
davvero il concetto (non solo il titolo ripetuto). Sulla slide marcata
`[Demo ...]` aggiungi anche un'indicazione visibile (es. un'etichetta o una
nota) che segnala "a questo punto si passa alla demo dal vivo: <nome>".
