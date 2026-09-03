from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="Demo - Temperatura")

PLACEHOLDER = """
<!doctype html>
<html lang="it">
<head><meta charset="utf-8"><title>Demo - Temperatura</title></head>
<body style="font-family: system-ui, sans-serif; padding: 2rem;">
  <h1>Modulo 1 - Demo Temperatura</h1>
  <p>Placeholder: endpoint verso Ollama e UI slider ancora da implementare.</p>
</body>
</html>
"""


@app.get("/", response_class=HTMLResponse)
async def root() -> str:
    return PLACEHOLDER
