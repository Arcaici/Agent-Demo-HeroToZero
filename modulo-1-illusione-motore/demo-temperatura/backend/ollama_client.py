import os

import httpx

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
MODEL_NAME = os.environ.get("MODEL_NAME", "llama3.2:3b")


async def chat(question: str, temperature: float) -> str:
    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{OLLAMA_HOST}/api/chat",
            json={
                "model": MODEL_NAME,
                "messages": [{"role": "user", "content": question}],
                "options": {"temperature": temperature},
                "stream": False,
            },
        )
        response.raise_for_status()
        return response.json()["message"]["content"]
