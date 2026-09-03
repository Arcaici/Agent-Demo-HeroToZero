from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="Demo - Context Window")

PLACEHOLDER = """
<!doctype html>
<html lang="it">
<head><meta charset="utf-8"><title>Demo - Context Window</title></head>
<body style="font-family: system-ui, sans-serif; padding: 2rem;">
  <h1>Modulo 2 - Demo Context Window</h1>
  <p>Placeholder: chat persistente e sidebar JSON-schema ancora da implementare.</p>
</body>
</html>
"""


@app.get("/", response_class=HTMLResponse)
async def root() -> str:
    return PLACEHOLDER
