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
def interroga_magazzino(componente: str) -> str:
    """Restituisce giacenza attuale, scorta minima e ubicazione di un componente a magazzino, dato il suo codice (es. B-200)."""
    item = MAGAZZINO.get(componente.upper())
    if item is None:
        return json.dumps({"errore": f"Componente '{componente}' non trovato a magazzino."})
    return json.dumps({"componente": componente.upper(), **item})


@mcp.tool()
def interroga_ordine_produzione(numero_ordine: str) -> str:
    """Restituisce stato, linea, quantità e data di consegna di un ordine di produzione, dato il suo numero (es. PO-1042)."""
    order = ORDINI_PRODUZIONE.get(numero_ordine.upper())
    if order is None:
        return json.dumps({"errore": f"Ordine '{numero_ordine}' non trovato."})
    return json.dumps({"numero_ordine": numero_ordine.upper(), **order})


@mcp.tool()
def genera_report(nome_file: str, contenuto: str) -> str:
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
