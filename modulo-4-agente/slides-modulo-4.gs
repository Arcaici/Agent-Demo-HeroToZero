/**
 * Genera la presentazione Google Slides per il Modulo 4 - Dalla Chat
 * all'Agente.
 *
 * Come usarlo:
 * 1. Vai su https://script.google.com, crea un nuovo progetto.
 * 2. Incolla questo file al posto di Code.gs.
 * 3. Esegui la funzione creaPresentazioneModulo4 (menu Esegui, o Ctrl+R).
 * 4. La prima esecuzione chiede l'autorizzazione ad accedere a Google Slides
 *    del tuo account - concedila.
 * 5. Il link alla presentazione creata compare nei log di esecuzione
 *    (Visualizza > Log, o Ctrl+Cronologia esecuzioni).
 */

var TITOLO_PRESENTAZIONE = "Modulo 4 — Dalla Chat all'Agente";
var SOTTOTITOLO_PRESENTAZIONE = '~55 minuti';

var SLIDE_TOPICS = [
  {
    titolo: 'Il limite del percorso fin qui',
    corpo: [
      'Tutto quello visto finora produce testo in risposta a testo',
      'Nessuna delle demo precedenti fa qualcosa "nel mondo reale": nessun dato viene realmente consultato o modificato dal modello',
    ],
    demo: null,
  },
  {
    titolo: 'Il salto di paradigma: function calling',
    corpo: [
      'Il modello può generare, invece del solo testo libero, un JSON strutturato: "voglio chiamare questa funzione con questi argomenti"',
      'Il formato della funzione (nome, parametri attesi) viene descritto al modello nella chiamata stessa',
    ],
    demo: null,
  },
  {
    titolo: "Chi esegue davvero l'azione",
    corpo: [
      'Il modello NON esegue mai il codice: propone solo la chiamata',
      'Un livello applicativo intercetta la richiesta, esegue la funzione vera, e rimanda il risultato al modello',
    ],
    demo: null,
  },
  {
    titolo: 'MCP: Model Context Protocol',
    corpo: [
      'Standardizza come un client (l\'agente) scopre ed esegue i tool offerti da un server',
      'È lo stesso protocollo usato da Claude Desktop, Claude Code e altri strumenti agentici moderni',
      'Prima di MCP ogni integrazione tool-modello era su misura; MCP la rende intercambiabile',
    ],
    demo: null,
  },
  {
    titolo: "Il ciclo dell'agente",
    corpo: [
      'Observe: il modello riceve messaggio utente + eventuali risultati di tool precedenti',
      'Reason: decide se serve un tool oppure può rispondere direttamente',
      'Act: se serve, chiama il tool; il risultato torna come nuovo input, e il ciclo riparte',
    ],
    demo: null,
  },
  {
    titolo: 'Incatenare più tool',
    corpo: [
      'Una singola domanda può richiedere più chiamate in sequenza (es. controlla il magazzino, poi genera un report con quel dato)',
      "L'agente decide da solo quanti passaggi servono, non è scriptato a mano",
    ],
    demo: null,
  },
  {
    titolo: 'Perché serve un limite di iterazioni',
    corpo: [
      'Senza un tetto massimo di cicli, un agente "confuso" potrebbe continuare a chiamare tool all\'infinito',
      'Un limite di sicurezza garantisce che il sistema si fermi comunque, con o senza risposta finale',
    ],
    demo: null,
  },
  {
    titolo: 'Rendere visibile il ragionamento',
    corpo: [
      "Normalmente l'utente vede solo la risposta finale, come una scatola nera",
      'Mostrare ogni tool chiamato e il suo risultato costruisce fiducia e permette di fare debug',
    ],
    demo: null,
  },
  {
    titolo: 'Il payload reale ad ogni passo',
    corpo: [
      "Ad ogni iterazione del ciclo, la chiamata include system prompt, storia, ed elenco dei tool disponibili",
      'Vedere questo payload rende concreto "cosa sa" il modello in quel preciso istante',
    ],
    demo: 'agente-erp-tool',
  },
  {
    titolo: 'Non tutti i modelli sono uguali',
    corpo: [
      'Un modello piccolo può generare tool_calls inventate, o testo che imita una chiamata di funzione senza usarla davvero',
      'La scelta del modello per un agente è un compromesso reale tra dimensione/velocità e affidabilità',
    ],
    demo: null,
  },
  {
    titolo: 'Oltre il singolo agente',
    corpo: [
      'Quando un compito è troppo complesso per un solo agente, si orchestrano più istanze specializzate',
      'Ruoli tipici: un pianificatore, uno o più esecutori, un revisore che controlla il lavoro fatto',
    ],
    demo: null,
  },
  {
    titolo: 'Verso il Modulo 5',
    corpo: [
      'Un agente autonomo prende decisioni in base al testo che riceve, incluso l\'input dell\'utente',
      'Cosa succede se qualcuno scrive quell\'input apposta per manipolare le decisioni dell\'agente?',
    ],
    demo: null,
  },
];

function creaPresentazioneModulo4() {
  var presentation = SlidesApp.create(TITOLO_PRESENTAZIONE);

  var copertina = presentation.getSlides()[0];
  impostaTestoPlaceholder(copertina, SlidesApp.PlaceholderType.CENTERED_TITLE, TITOLO_PRESENTAZIONE);
  impostaTestoPlaceholder(copertina, SlidesApp.PlaceholderType.SUBTITLE, SOTTOTITOLO_PRESENTAZIONE);

  SLIDE_TOPICS.forEach(function (topic) {
    aggiungiSlide(presentation, topic);
  });

  Logger.log('Presentazione creata: ' + presentation.getUrl());
}

function aggiungiSlide(presentation, topic) {
  var slide = presentation.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);

  impostaTestoPlaceholder(slide, SlidesApp.PlaceholderType.TITLE, topic.titolo);

  var corpoTesto = impostaTestoPlaceholder(slide, SlidesApp.PlaceholderType.BODY, topic.corpo.join('\n'));
  if (corpoTesto) {
    corpoTesto.getListStyle().applyListPreset(SlidesApp.ListPreset.DISC_CIRCLE_SQUARE);
  }

  if (topic.demo) {
    aggiungiEtichettaDemo(presentation, slide, topic.demo);
  }
}

/**
 * Imposta il testo di un placeholder se esiste su questa slide/layout, senza
 * interrompere l'esecuzione se manca (logga un avviso e continua) - alcuni
 * layout predefiniti non espongono tutti i tipi di placeholder attesi (es.
 * la slide di copertina usa CENTERED_TITLE, non TITLE).
 */
function impostaTestoPlaceholder(slide, placeholderType, testo) {
  var placeholder = slide.getPlaceholder(placeholderType);
  if (!placeholder) {
    Logger.log('Attenzione: placeholder ' + placeholderType + ' non trovato, testo non impostato: "' + testo + '"');
    return null;
  }
  var textRange = placeholder.asShape().getText();
  textRange.setText(testo);
  return textRange;
}

function aggiungiEtichettaDemo(presentation, slide, nomeDemo) {
  var larghezza = 230;
  var altezza = 32;
  var margine = 20;

  var etichetta = slide.insertTextBox(
    '🎬 Demo: ' + nomeDemo,
    presentation.getPageWidth() - larghezza - margine,
    presentation.getPageHeight() - altezza - margine,
    larghezza,
    altezza
  );

  etichetta
    .getText()
    .getTextStyle()
    .setBold(true)
    .setFontSize(12)
    .setForegroundColor('#FFFFFF');

  etichetta.getFill().setSolidFill('#D93025');
  etichetta.getBorder().setTransparent();
}
