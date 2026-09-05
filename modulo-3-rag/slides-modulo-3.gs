/**
 * Genera la presentazione Google Slides per il Modulo 3 - L'Integrazione e
 * la Conoscenza (RAG).
 *
 * Come usarlo:
 * 1. Vai su https://script.google.com, crea un nuovo progetto.
 * 2. Incolla questo file al posto di Code.gs.
 * 3. Esegui la funzione creaPresentazioneModulo3 (menu Esegui, o Ctrl+R).
 * 4. La prima esecuzione chiede l'autorizzazione ad accedere a Google Slides
 *    del tuo account - concedila.
 * 5. Il link alla presentazione creata compare nei log di esecuzione
 *    (Visualizza > Log, o Ctrl+Cronologia esecuzioni).
 */

var TITOLO_PRESENTAZIONE = "Modulo 3 — L'Integrazione e la Conoscenza (RAG)";
var SOTTOTITOLO_PRESENTAZIONE = '~50 minuti';

var SLIDE_TOPICS = [
  {
    titolo: 'Il problema: conoscenza congelata al training',
    corpo: [
      "L'addestramento ha una data di taglio (cutoff): tutto ciò che è successo dopo non è nel modello",
      "I pesi del modello non cambiano dopo l'addestramento, a meno di un nuovo (costoso) addestramento",
    ],
    demo: null,
  },
  {
    titolo: 'Conseguenza pratica',
    corpo: [
      'Nessun modello generico conosce i tuoi ordini di produzione, la tua policy interna, i tuoi codici prodotto',
      'Riaddestrare il modello per ogni aggiornamento aziendale è impraticabile',
    ],
    demo: null,
  },
  {
    titolo: "Un'idea semplice: in-context learning",
    corpo: [
      'Il modello può usare informazioni fornite nella chiamata stessa, anche se non le "sapeva" prima',
      'Sfruttiamo la context window (Modulo 2) come una specie di "RAM" temporanea',
    ],
    demo: null,
  },
  {
    titolo: 'Il limite: non ci sta tutto in un prompt',
    corpo: [
      'La context window ha un tetto massimo di token (Modulo 2)',
      "Non possiamo incollare l'intero manuale operativo ad ogni domanda",
    ],
    demo: null,
  },
  {
    titolo: 'La soluzione: cercare per similarità',
    corpo: [
      'Trasformiamo ogni documento aziendale in un embedding, una volta sola (gli embedding del Modulo 2)',
      'Alla domanda dell\'utente, cerchiamo i documenti più vicini nello spazio semantico — non serve il match esatto delle parole',
    ],
    demo: null,
  },
  {
    titolo: 'La pipeline RAG',
    corpo: [
      'Retrieval-Augmented Generation: prima si recupera, poi si genera',
      'I documenti recuperati vengono inseriti nel prompt come contesto, insieme alla domanda originale',
    ],
    demo: null,
  },
  {
    titolo: 'Perché riduce le allucinazioni',
    corpo: [
      'Con le istruzioni giuste, il modello risponde SOLO in base ai documenti forniti',
      'Se l\'informazione non è nei documenti, un buon system prompt gli chiede di dirlo esplicitamente',
    ],
    demo: null,
  },
  {
    titolo: 'Rendere visibile il processo',
    corpo: [
      "Normalmente il RAG è \"invisibile\" all'utente finale: chiede e riceve una risposta",
      'Mostrare i passaggi intermedi (documenti trovati, punteggio di similarità) aiuta a capire perché il modello ha risposto così',
    ],
    demo: null,
  },
  {
    titolo: '"Non lo so" come segnale di salute',
    corpo: [
      "Se la domanda esce dal perimetro dei documenti, un buon sistema RAG lo dichiara invece di inventare",
      "È il comportamento opposto dell'allucinazione, ed è quello che vogliamo",
    ],
    demo: 'rag-manuale',
  },
  {
    titolo: 'Oltre il RAG semplice',
    corpo: [
      'Per dati molto strutturati (relazioni tra entità) si usano i Knowledge Graph',
      'Per dati che cambiano nel tempo (prezzi, stock) servono strategie che tengano conto della "freschezza" dell\'informazione (Time-Aware RAG)',
    ],
    demo: null,
  },
  {
    titolo: 'Verso il Modulo 4',
    corpo: [
      'Finora il modello ha solo LETTO informazioni per rispondere meglio',
      'Cosa succede se, invece di leggere soltanto, il modello deve anche eseguire un\'azione concreta?',
    ],
    demo: null,
  },
];

function creaPresentazioneModulo3() {
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
