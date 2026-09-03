import os

import httpx

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
MODEL_EMBED = os.environ.get("MODEL_EMBED", "nomic-embed-text")


async def embed(text: str) -> list[float]:
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"{OLLAMA_HOST}/api/embeddings",
            json={"model": MODEL_EMBED, "prompt": text},
        )
        response.raise_for_status()
        return response.json()["embedding"]
