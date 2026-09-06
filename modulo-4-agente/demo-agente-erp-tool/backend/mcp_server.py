import json
import os
import re

from mcp.server.fastmcp import FastMCP

from erp_data import MAGAZZINO, ORDINI_PRODUZIONE

REPORTS_DIR = os.environ.get("REPORTS_DIR", "/app/reports")
os.makedirs(REPORTS_DIR, exist_ok=True)

SAFE_FILENAME = re.compile(r"^[A-Za-z0-9_\-]+\.txt$")

mcp = FastMCP("acme-erp-tools")


@mcp.tool()
def get_giacenza(codice: str) -> str:
    """Restituisce giacenza attuale, scorta minima e ubicazione di un componente a magazzino, dato il suo codice (es. MAT-4471/B)."""
    item = MAGAZZINO.get(codice.upper())
    if item is None:
        return json.dumps({"errore": f"Componente '{codice}' non trovato a magazzino."})
    return json.dumps({"codice": codice.upper(), **item})


@mcp.tool()
def get_ordini_produzione(numero_ordine: str = "", stato: str = "") -> str:
    """Restituisce ordini di produzione. Passa numero_ordine per un ordine specifico (es. PO-1042), oppure stato (es. "aperto", "in lavorazione", "completato", "sospeso") per elencare tutti gli ordini in quello stato. Se entrambi sono vuoti restituisce tutti gli ordini."""
    if numero_ordine:
        order = ORDINI_PRODUZIONE.get(numero_ordine.upper())
        if order is None:
            return json.dumps({"errore": f"Ordine '{numero_ordine}' non trovato."})
        return json.dumps({"numero_ordine": numero_ordine.upper(), **order})

    matches = [
        {"numero_ordine": numero, **dati}
        for numero, dati in ORDINI_PRODUZIONE.items()
        if not stato or dati["stato"].lower() == stato.lower()
    ]
    return json.dumps({"ordini": matches, "totale": len(matches)})


@mcp.tool()
def scrivi_report(nome_file: str, contenuto: str) -> str:
    """Scrive un report testuale nella cartella dei report aziendali. nome_file deve essere un nome semplice terminante in .txt, senza percorsi (es. scorte.txt)."""
    if not SAFE_FILENAME.match(nome_file):
        return json.dumps(
            {"errore": "Nome file non valido: usa solo lettere, numeri, '-' o '_' e l'estensione .txt."}
        )
    path = os.path.join(REPORTS_DIR, nome_file)
    with open(path, "w", encoding="utf-8") as f:
        f.write(contenuto)
    return json.dumps({"esito": "ok", "file": nome_file, "percorso": path})


if __name__ == "__main__":
    mcp.run()
