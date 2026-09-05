import json
import os
from typing import AsyncGenerator

import httpx

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
MODEL_NAME = os.environ.get("MODEL_NAME", "llama3.2:3b")
MODEL_EMBED = os.environ.get("MODEL_EMBED", "nomic-embed-text")


async def embed(text: str) -> list[float]:
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"{OLLAMA_HOST}/api/embeddings",
            json={"model": MODEL_EMBED, "prompt": text},
        )
        response.raise_for_status()
        return response.json()["embedding"]


async def chat_stream(messages: list[dict]) -> AsyncGenerator[dict, None]:
    async with httpx.AsyncClient(timeout=120.0) as client:
        async with client.stream(
            "POST",
            f"{OLLAMA_HOST}/api/chat",
            json={"model": MODEL_NAME, "messages": messages, "stream": True},
        ) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if not line.strip():
                    continue
                yield json.loads(line)
