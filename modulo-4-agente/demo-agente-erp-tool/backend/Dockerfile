FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py agent_loop.py ollama_client.py mcp_bridge.py mcp_server.py erp_data.py ./

RUN mkdir -p /app/reports

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
