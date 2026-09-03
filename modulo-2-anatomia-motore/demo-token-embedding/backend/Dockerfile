FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

ENV TIKTOKEN_CACHE_DIR=/opt/tiktoken_cache
RUN python -c "import tiktoken; tiktoken.get_encoding('cl100k_base')"

COPY app.py tokenizer.py embedding_space.py ollama_client.py ./

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
