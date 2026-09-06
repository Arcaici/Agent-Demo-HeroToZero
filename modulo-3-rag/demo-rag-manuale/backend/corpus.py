DOCUMENTS = [
    {
        "id": "scorte-minime",
        "title": "Livelli di scorta minima componenti",
        "text": (
            "Per i componenti critici di linea, Acme Manifattura mantiene le "
            "seguenti scorte minime a magazzino: cuscinetti serie B-200 (codice "
            "MAT-4471/B), 150 pezzi; guarnizioni idrauliche GH-40, 80 pezzi; "
            "motori passo-passo MP-12, 20 unità. Quando la giacenza scende "
            "sotto il minimo, il sistema ERP genera automaticamente una "
            "richiesta di riordino al fornitore abituale."
        ),
    },
    {
        "id": "giacenze-attuali-b2",
        "title": "Giacenze attuali — Deposito B2",
        "text": (
            "Estratto giacenze aggiornato al 05/09/2026 per il Deposito B2: "
            "cuscinetti serie B-200 (codice MAT-4471/B), giacenza attuale 37 "
            "pezzi, sotto la scorta minima di 150 — riordino già segnalato dal "
            "sistema ERP; sensore induttivo di prossimità (codice MAT-8820), "
            "giacenza attuale 0 pezzi, componente esaurito. Le giacenze del "
            "Deposito B2 sono ricalcolate ogni notte dal sistema ERP e non "
            "riflettono i movimenti dello stesso giorno."
        ),
    },
    {
        "id": "manutenzione-cnc",
        "title": "Manutenzione preventiva macchina CNC-12",
        "text": (
            "La fresa a controllo numerico CNC-12 richiede manutenzione "
            "preventiva ogni 500 ore di lavoro: sostituzione olio lubrificante, "
            "controllo usura degli utensili, verifica calibrazione assi X/Y/Z. "
            "L'intervento è a carico del team di manutenzione interno e va "
            "programmato con almeno 3 giorni di preavviso per non fermare la "
            "produzione del reparto fresatura."
        ),
    },
    {
        "id": "sicurezza-presse",
        "title": "Protocollo di sicurezza presse idrauliche",
        "text": (
            "L'accesso alla zona presse idrauliche è consentito solo al "
            "personale con formazione specifica e dispositivi di protezione "
            "individuale (guanti anti-taglio, occhiali, scarpe antinfortunistiche). "
            "Prima di ogni turno va verificato il corretto funzionamento del "
            "fermo di sicurezza a doppio comando. Qualsiasi anomalia va segnalata "
            "immediatamente al responsabile di reparto e la macchina va fermata."
        ),
    },
    {
        "id": "ordini-acquisto",
        "title": "Approvazione ordini di acquisto",
        "text": (
            "Gli ordini di acquisto fino a 5.000 euro possono essere approvati "
            "direttamente dal responsabile di reparto. Oltre tale soglia serve "
            "l'approvazione del direttore operativo, e oltre i 20.000 euro anche "
            "quella dell'amministratore delegato. Ogni ordine deve essere "
            "registrato nel modulo acquisti del sistema ERP prima dell'invio al "
            "fornitore."
        ),
    },
    {
        "id": "controllo-qualita",
        "title": "Controllo qualità in accettazione materiali",
        "text": (
            "Ogni lotto di materiale in ingresso viene sottoposto a controllo "
            "qualità a campione: si verificano dimensioni, tolleranze e "
            "certificati del fornitore su almeno il 5% dei pezzi del lotto. Se "
            "si riscontrano difetti oltre la soglia dell'1%, l'intero lotto "
            "viene messo in quarantena e il fornitore viene contattato per la "
            "sostituzione."
        ),
    },
    {
        "id": "non-conformita",
        "title": "Gestione delle non conformità di produzione",
        "text": (
            "Quando un pezzo prodotto non rispetta le specifiche, l'operatore "
            "compila un modulo di non conformità indicando linea, turno e "
            "difetto riscontrato. Il pezzo viene isolato nell'area scarti "
            "identificata con cartellino rosso. Il responsabile qualità decide "
            "se il pezzo può essere rilavorato o va scartato definitivamente."
        ),
    },
    {
        "id": "turni-reperibilita",
        "title": "Turni di lavoro e reperibilità",
        "text": (
            "La produzione è organizzata su tre turni: mattina (6-14), "
            "pomeriggio (14-22) e notte (22-6). Il weekend è coperto da una "
            "squadra di reperibilità per la sola manutenzione d'emergenza: gli "
            "operatori reperibili vengono contattati telefonicamente dal "
            "responsabile di turno e devono presentarsi in stabilimento entro "
            "60 minuti dalla chiamata."
        ),
    },
    {
        "id": "richiesta-ferie",
        "title": "Procedura di richiesta ferie",
        "text": (
            "Le richieste di ferie per gli operatori di linea vanno inoltrate "
            "tramite il portale HR con almeno 15 giorni di anticipo. Il "
            "responsabile di reparto approva la richiesta verificando la "
            "copertura minima di linea (almeno 70% dell'organico previsto per "
            "turno). Le richieste last-minute sono valutate caso per caso."
        ),
    },
    {
        "id": "accesso-erp",
        "title": "Accesso al sistema ERP aziendale",
        "text": (
            "Le credenziali per il sistema ERP vengono create dall'ufficio IT "
            "al momento dell'assunzione, con permessi differenziati per ruolo "
            "(operatore, responsabile di reparto, amministrazione). In caso di "
            "smarrimento password, va aperto un ticket sul portale IT interno: "
            "il reset avviene entro 4 ore lavorative."
        ),
    },
    {
        "id": "rifiuti-speciali",
        "title": "Smaltimento rifiuti speciali",
        "text": (
            "Oli esausti, solventi e residui di lavorazione metallica sono "
            "classificati come rifiuti speciali e vanno stoccati nelle apposite "
            "cisterne dell'area ecologica, mai smaltiti con i rifiuti ordinari. "
            "Il ritiro è affidato a una ditta autorizzata con cadenza mensile, "
            "e ogni conferimento va registrato nel formulario di identificazione "
            "rifiuto (FIR)."
        ),
    },
    {
        "id": "ordine-produzione",
        "title": "Struttura di un ordine di produzione",
        "text": (
            "Un ordine di produzione nel sistema ERP contiene: numero ordine "
            "progressivo, data di apertura, codice articolo e distinta base, "
            "quantità richiesta, linea assegnata, data di consegna prevista e "
            "stato (aperto, in lavorazione, completato, sospeso). Lo stato viene "
            "aggiornato automaticamente dagli operatori tramite terminale di "
            "linea ad ogni fase completata."
        ),
    },
    {
        "id": "politica-resi",
        "title": "Politica di reso prodotti difettosi",
        "text": (
            "I clienti possono richiedere il reso di un prodotto difettoso "
            "entro 30 giorni dalla consegna, allegando il numero di lotto e una "
            "descrizione del difetto. Il reso viene valutato dall'ufficio "
            "qualità: se il difetto è confermato come di produzione, il cliente "
            "riceve sostituzione gratuita o nota di credito, a sua scelta."
        ),
    },
]
