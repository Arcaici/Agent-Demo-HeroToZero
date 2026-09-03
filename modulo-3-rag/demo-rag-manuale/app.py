from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="Demo - RAG Manuale")

PLACEHOLDER = """
<!doctype html>
<html lang="it">
<head><meta charset="utf-8"><title>Demo - RAG Manuale</title></head>
<body style="font-family: system-ui, sans-serif; padding: 2rem;">
  <h1>Modulo 3 - Demo RAG Manuale</h1>
  <p>Placeholder: retrieval, switch step-by-step e generazione ancora da implementare.</p>
</body>
</html>
"""


@app.get("/", response_class=HTMLResponse)
async def root() -> str:
    return PLACEHOLDER
