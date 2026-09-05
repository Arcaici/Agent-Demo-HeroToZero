import json
import os
from typing import AsyncGenerator

import httpx

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
MODEL_NAME = os.environ.get("MODEL_NAME", "llama3.2:3b")
NUM_CTX = int(os.environ.get("NUM_CTX", "4096"))


async def chat_stream(messages: list[dict]) -> AsyncGenerator[dict, None]:
    async with httpx.AsyncClient(timeout=120.0) as client:
        async with client.stream(
            "POST",
            f"{OLLAMA_HOST}/api/chat",
            json={
                "model": MODEL_NAME,
                "messages": messages,
                "options": {"num_ctx": NUM_CTX},
                "stream": True,
            },
        ) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if not line.strip():
                    continue
                yield json.loads(line)
