import json
import os
from typing import AsyncGenerator

import httpx

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
MODEL_NAME = os.environ.get("MODEL_NAME", "llama3.2:3b")


async def chat_stream(
    messages: list[dict], tools: list[dict] | None = None
) -> AsyncGenerator[dict, None]:
    payload = {"model": MODEL_NAME, "messages": messages, "stream": True}
    if tools:
        payload["tools"] = tools

    async with httpx.AsyncClient(timeout=120.0) as client:
        async with client.stream("POST", f"{OLLAMA_HOST}/api/chat", json=payload) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if not line.strip():
                    continue
                yield json.loads(line)
