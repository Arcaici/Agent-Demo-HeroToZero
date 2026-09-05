import json

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

import ollama_client

app = FastAPI(title="Demo - Context Window")


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    system_prompt: str
    messages: list[Message]


@app.post("/api/chat")
async def chat(request: ChatRequest) -> StreamingResponse:
    full_messages = [{"role": "system", "content": request.system_prompt}] + [
        m.model_dump() for m in request.messages
    ]

    async def stream():
        async for chunk in ollama_client.chat_stream(full_messages):
            delta = chunk.get("message", {}).get("content", "")
            if delta:
                yield json.dumps({"type": "chunk", "content": delta}) + "\n"
            if chunk.get("done"):
                yield json.dumps(
                    {
                        "type": "done",
                        "prompt_tokens": chunk.get("prompt_eval_count", 0),
                        "completion_tokens": chunk.get("eval_count", 0),
                    }
                ) + "\n"

    return StreamingResponse(stream(), media_type="application/x-ndjson")


@app.get("/api/config")
async def config() -> dict:
    return {"num_ctx": ollama_client.NUM_CTX, "model": ollama_client.MODEL_NAME}


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
