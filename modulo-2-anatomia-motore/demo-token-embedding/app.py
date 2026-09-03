from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="Demo - Token & Embedding")

PLACEHOLDER = """
<!doctype html>
<html lang="it">
<head><meta charset="utf-8"><title>Demo - Token & Embedding</title></head>
<body style="font-family: system-ui, sans-serif; padding: 2rem;">
  <h1>Modulo 2 - Demo Token & Embedding</h1>
  <p>Placeholder: tokenizzazione e scatter plot embedding ancora da implementare.</p>
</body>
</html>
"""


@app.get("/", response_class=HTMLResponse)
async def root() -> str:
    return PLACEHOLDER
