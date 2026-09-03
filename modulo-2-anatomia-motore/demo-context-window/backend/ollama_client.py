import os

import httpx

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
MODEL_NAME = os.environ.get("MODEL_NAME", "llama3.2:3b")
NUM_CTX = int(os.environ.get("NUM_CTX", "4096"))


async def chat(messages: list[dict]) -> dict:
    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{OLLAMA_HOST}/api/chat",
            json={
                "model": MODEL_NAME,
                "messages": messages,
                "options": {"num_ctx": NUM_CTX},
                "stream": False,
            },
        )
        response.raise_for_status()
        data = response.json()
        return {
            "reply": data["message"]["content"],
            "prompt_tokens": data.get("prompt_eval_count", 0),
            "completion_tokens": data.get("eval_count", 0),
        }
