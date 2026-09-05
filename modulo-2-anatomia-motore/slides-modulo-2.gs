/**
 * Genera la presentazione Google Slides per il Modulo 2 - Anatomia Pratica
 * del Motore.
 *
 * Come usarlo:
 * 1. Vai su https://script.google.com, crea un nuovo progetto.
 * 2. Incolla questo file al posto di Code.gs.
 * 3. Esegui la funzione creaPresentazioneModulo2 (menu Esegui, o Ctrl+R).
 * 4. La prima esecuzione chiede l'autorizzazione ad accedere a Google Slides
 *    del tuo account - concedila.
 * 5. Il link alla presentazione creata compare nei log di esecuzione
 *    (Visualizza > Log, o Ctrl+Cronologia esecuzioni).
 */

var TITOLO_PRESENTAZIONE = 'Modulo 2 — Anatomia Pratica del Motore';
var SOTTOTITOLO_PRESENTAZIONE = '~50 minuti';

var SLIDE_TOPICS = [
  {
    titolo: 'Cosa sono le "parole" per un modello',
    corpo: [
      'Noi pensiamo in parole; il modello pensa in unità più piccole e arbitrarie',
      'Non esiste un concetto di "parola" dentro il modello, solo simboli da un insieme finito',
    ],
    demo: null,
  },
  {
    titolo: 'Il vocabolario del modello',
    corpo: [
      'Un modello ha un vocabolario fisso, deciso in fase di addestramento (decine di migliaia di simboli)',
      'Ogni simbolo ha un ID numerico: il modello lavora solo con numeri, mai con caratteri',
    ],
    demo: null,
  },
  {
    titolo: 'Tokenizzazione: spezzare il testo in token',
    corpo: [
      'Il testo in ingresso viene spezzato in "token": pezzi che esistono nel vocabolario',
      'Parole comuni spesso sono un token unico; parole rare si spezzano in più pezzi (es. "cavaliere" → "cava" + "liere")',
      'Per questo lingue diverse dall\'inglese a volte "costano" più token per la stessa frase',
    ],
    demo: null,
  },
  {
    titolo: 'Dai token ai numeri: gli embedding',
    corpo: [
      'Ogni token viene trasformato in un vettore di numeri (embedding) — centinaia di dimensioni',
      'Non è un ID casuale: il vettore codifica qualcosa sul significato del token',
    ],
    demo: null,
  },
  {
    titolo: 'Lo spazio semantico',
    corpo: [
      'Token con significati simili finiscono vicini in questo spazio vettoriale',
      '"gatto" e "cane" sono più vicini tra loro che "gatto" e "algoritmo"',
      'La vicinanza si misura matematicamente (es. cosine similarity)',
    ],
    demo: null,
  },
  {
    titolo: 'Vedere uno spazio a centinaia di dimensioni',
    corpo: [
      'Non possiamo disegnare 700 dimensioni su uno schermo',
      'La riduzione dimensionale (PCA) proietta lo spazio verso 2 dimensioni, conservando il più possibile le distanze relative',
      'È una semplificazione: si perde informazione, ma resta utile per intuire i cluster',
    ],
    demo: null,
  },
  {
    titolo: 'Cluster che emergono dai dati',
    corpo: [
      'Nessuno ha scritto regole tipo "gatto è un animale": il raggruppamento emerge dai dati di addestramento',
      'Parole nuove analizzate si posizionano vicino a concetti già noti, anche se non le abbiamo mai viste prima',
    ],
    demo: 'token-embedding',
  },
  {
    titolo: 'Il modello è stateless',
    corpo: [
      "Ogni chiamata all'API è indipendente: il modello non \"ricorda\" la chiamata precedente",
      'Non esiste una sessione persistente lato modello',
    ],
    demo: null,
  },
  {
    titolo: 'La context window',
    corpo: [
      "Per simulare una conversazione, il client deve reinviare l'intera cronologia ad ogni turno",
      '"Context window" = tutto ciò che il modello vede in quella singola chiamata (system prompt + storia + nuova domanda)',
    ],
    demo: null,
  },
  {
    titolo: 'Il system prompt',
    corpo: [
      'Un messaggio speciale (ruolo "system") che guida il comportamento del modello per tutta la conversazione',
      'Va incluso in OGNI chiamata: non è "impostato una volta", va reinviato sempre',
    ],
    demo: null,
  },
  {
    titolo: 'Il limite fisico della context window',
    corpo: [
      'Ogni modello ha un tetto massimo di token gestibili in una singola chiamata',
      'Conversazioni lunghe possono superare il limite: bisogna troncare o riassumere la storia',
    ],
    demo: null,
  },
  {
    titolo: 'La vera chiamata al modello: il payload JSON',
    corpo: [
      'Dietro ogni interfaccia chat, ogni turno è una richiesta HTTP con un JSON: modello, messaggi, opzioni',
      'Vedere il payload reale rende concreto tutto quello appena detto su system prompt e context window',
    ],
    demo: 'context-window',
  },
  {
    titolo: 'Verso il Modulo 3',
    corpo: [
      'Il modello sa solo quello che ha visto in addestramento + quello che gli mandiamo ora nel payload',
      'Cosa facciamo se serve un dato aziendale specifico, mai visto in addestramento?',
    ],
    demo: null,
  },
];

function creaPresentazioneModulo2() {
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
