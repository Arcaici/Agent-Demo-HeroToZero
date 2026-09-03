from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="Demo - Prompt Injection")

PLACEHOLDER = """
<!doctype html>
<html lang="it">
<head><meta charset="utf-8"><title>Demo - Prompt Injection</title></head>
<body style="font-family: system-ui, sans-serif; padding: 2rem;">
  <h1>Modulo 5 - Demo Prompt Injection</h1>
  <p>Placeholder: inoltro dei tentativi all'agente del modulo 4 ancora da implementare.</p>
</body>
</html>
"""


@app.get("/", response_class=HTMLResponse)
async def root() -> str:
    return PLACEHOLDER
