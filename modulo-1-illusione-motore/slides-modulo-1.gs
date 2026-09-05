/**
 * Genera la presentazione Google Slides per il Modulo 1 - L'Illusionista e
 * il Motore.
 *
 * Come usarlo:
 * 1. Vai su https://script.google.com, crea un nuovo progetto.
 * 2. Incolla questo file al posto di Code.gs.
 * 3. Esegui la funzione creaPresentazioneModulo1 (menu Esegui, o Ctrl+R).
 * 4. La prima esecuzione chiede l'autorizzazione ad accedere a Google Slides
 *    del tuo account - concedila.
 * 5. Il link alla presentazione creata compare nei log di esecuzione
 *    (Visualizza > Log, o Ctrl+Cronologia esecuzioni).
 */

var TITOLO_PRESENTAZIONE = "Modulo 1 — L'Illusionista e il Motore";
var SOTTOTITOLO_PRESENTAZIONE = '~20 minuti';

var SLIDE_TOPICS = [
  {
    titolo: 'Il prodotto e il motore',
    corpo: [
      'Copilot / ChatGPT sono prodotti finiti: interfaccia, permessi, dati aziendali',
      'Sotto il prodotto gira un modello linguistico (LLM): il "motore"',
      "Come per un'automobile: guidarla non richiede sapere come funziona il motore — oggi apriamo il cofano",
    ],
    demo: null,
  },
  {
    titolo: 'Cosa NON è il motore',
    corpo: [
      'Non è un database: non contiene righe o fatti memorizzati testualmente',
      'Non è un motore di ricerca: non recupera un documento esistente',
      "L'addestramento comprime pattern linguistici nei parametri (pesi), non fatti precisi",
    ],
    demo: null,
  },
  {
    titolo: 'Cosa fa davvero: next token prediction',
    corpo: [
      'Ad ogni passo calcola una probabilità su "quale pezzo di testo viene dopo"',
      'Genera un pezzo alla volta, poi ripete il calcolo aggiungendo quello appena generato',
      'Nessuna logica if-A-then-B: è calcolo statistico, non regole scritte a mano',
    ],
    demo: 'architettura-agente',
  },
  {
    titolo: 'Dal determinismo alla probabilità',
    corpo: [
      'Il software tradizionale è deterministico: stesso input, stesso output',
      'Un LLM campiona da una distribuzione di probabilità: stesso input, output anche diversi',
      'Non è un bug: è il funzionamento previsto',
    ],
    demo: null,
  },
  {
    titolo: 'La temperatura',
    corpo: [
      'Temperatura bassa (vicino a 0): sceglie quasi sempre il pezzo più probabile → risposte stabili',
      'Temperatura alta: più probabilità a pezzi meno ovvi → risposte più varie, meno prevedibili',
      'Nessun valore "giusto": un chatbot di supporto vuole temperatura bassa, un brainstorming la vuole alta',
    ],
    demo: 'temperatura',
  },
  {
    titolo: 'Verso il Modulo 2',
    corpo: [
      'Abbiamo detto "pezzo di testo" — ma cos\'è esattamente, per un modello?',
      'Prossimo modulo: token, vocabolario, embedding, e la (mancanza di) memoria del modello',
    ],
    demo: null,
  },
];

function creaPresentazioneModulo1() {
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
