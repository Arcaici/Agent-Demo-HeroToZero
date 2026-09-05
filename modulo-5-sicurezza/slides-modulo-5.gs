/**
 * Genera la presentazione Google Slides per il Modulo 5 - Sicurezza e Sfide
 * Architetturali.
 *
 * Come usarlo:
 * 1. Vai su https://script.google.com, crea un nuovo progetto.
 * 2. Incolla questo file al posto di Code.gs.
 * 3. Esegui la funzione creaPresentazioneModulo5 (menu Esegui, o Ctrl+R).
 * 4. La prima esecuzione chiede l'autorizzazione ad accedere a Google Slides
 *    del tuo account - concedila.
 * 5. Il link alla presentazione creata compare nei log di esecuzione
 *    (Visualizza > Log, o Ctrl+Cronologia esecuzioni).
 */

var TITOLO_PRESENTAZIONE = 'Modulo 5 — Sicurezza e Sfide Architetturali';
var SOTTOTITOLO_PRESENTAZIONE = '~25 minuti';

var SLIDE_TOPICS = [
  {
    titolo: 'Il rovescio della medaglia',
    corpo: [
      'Più un sistema può fare (leggere dati, scrivere file, chiamare API), più ha "superficie d\'attacco"',
      'Un chatbot che risponde a parole rischia poco; un agente con tool rischia azioni reali',
    ],
    demo: null,
  },
  {
    titolo: 'Perché è un problema strutturale',
    corpo: [
      'Nei sistemi tradizionali, codice e dati sono canali separati (la SQL injection insegna cosa succede quando si mescolano)',
      "Per un LLM, le istruzioni di sistema e l'input dell'utente sono comunque solo testo nello stesso canale",
    ],
    demo: null,
  },
  {
    titolo: 'Prompt injection',
    corpo: [
      'Un utente scrive un messaggio pensato per far deviare il modello dal suo compito originale',
      'Non serve accesso al codice: basta il canale di conversazione normale',
    ],
    demo: null,
  },
  {
    titolo: 'Obiettivo 1: far rivelare il system prompt',
    corpo: [
      'Le istruzioni interne dovrebbero restare "dietro le quinte"',
      "Un attacco riuscito le fa ripetere all'agente stesso, parola per parola",
    ],
    demo: null,
  },
  {
    titolo: 'Obiettivo 2: azione del tool fuori scope',
    corpo: [
      'Anche un agente con tool "innocui" può essere spinto a usarli in modo non previsto (es. un nome file che esce dalla cartella prevista)',
      "L'obiettivo qui non è il testo della risposta, ma un'azione reale eseguita dal tool",
    ],
    demo: null,
  },
  {
    titolo: 'Due difese diverse',
    corpo: [
      'Difesa nel prompt: istruzioni aggiuntive ("non rivelare mai...") e controllo sull\'output prima di mostrarlo',
      'Difesa nel codice: il tool stesso valida rigidamente i suoi input, a prescindere da cosa il modello gli chiede',
    ],
    demo: null,
  },
  {
    titolo: 'Difesa in profondità',
    corpo: [
      'Una difesa "a parole" (nel prompt) si può aggirare chiedendo una traduzione, un riassunto, un gioco di ruolo',
      'Una validazione nel codice (es. un controllo sul nome file) resta valida qualunque cosa il modello provi a chiedere',
      'Le due difese insieme sono più solide di ciascuna da sola',
    ],
    demo: 'prompt-injection',
  },
  {
    titolo: "Principio generale",
    corpo: [
      "Vale per il testo (allucinazioni) e per le azioni (tool use): serve sempre una validazione a valle",
      "Il modello va trattato come input non fidato quando genera azioni o va in output verso l'utente",
    ],
    demo: null,
  },
  {
    titolo: 'Il quadro più ampio',
    corpo: [
      'La prompt injection è la vulnerabilità #1 nella OWASP Top 10 per le applicazioni LLM',
      'Il red teaming è la pratica di attaccare sistematicamente i propri sistemi prima che lo faccia qualcun altro',
    ],
    demo: null,
  },
];

function creaPresentazioneModulo5() {
  var presentation = SlidesApp.create(TITOLO_PRESENTAZIONE);

  var copertina = presentation.getSlides()[0];
  copertina.getPlaceholder(SlidesApp.PlaceholderType.TITLE).asShape().getText().setText(TITOLO_PRESENTAZIONE);
  copertina.getPlaceholder(SlidesApp.PlaceholderType.SUBTITLE).asShape().getText().setText(SOTTOTITOLO_PRESENTAZIONE);

  SLIDE_TOPICS.forEach(function (topic) {
    aggiungiSlide(presentation, topic);
  });

  Logger.log('Presentazione creata: ' + presentation.getUrl());
}

function aggiungiSlide(presentation, topic) {
  var slide = presentation.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);

  slide.getPlaceholder(SlidesApp.PlaceholderType.TITLE).asShape().getText().setText(topic.titolo);

  var corpoTesto = slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().getText();
  corpoTesto.setText(topic.corpo.join('\n'));
  corpoTesto.getListStyle().applyListPreset(SlidesApp.ListPreset.DISC_CIRCLE_SQUARE);

  if (topic.demo) {
    aggiungiEtichettaDemo(presentation, slide, topic.demo);
  }
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
