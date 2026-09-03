from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="Demo - Agente ERP/MES + File System")

PLACEHOLDER = """
<!doctype html>
<html lang="it">
<head><meta charset="utf-8"><title>Demo - Agente ERP/MES</title></head>
<body style="font-family: system-ui, sans-serif; padding: 2rem;">
  <h1>Modulo 4 - Demo Agente ERP/MES + File System</h1>
  <p>Placeholder: tool, loop agentico e streaming degli step ancora da implementare.</p>
</body>
</html>
"""


@app.get("/", response_class=HTMLResponse)
async def root() -> str:
    return PLACEHOLDER
