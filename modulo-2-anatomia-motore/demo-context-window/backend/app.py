from fastapi import FastAPI
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
async def chat(request: ChatRequest) -> dict:
    full_messages = [{"role": "system", "content": request.system_prompt}] + [
        m.model_dump() for m in request.messages
    ]
    return await ollama_client.chat(full_messages)


@app.get("/api/config")
async def config() -> dict:
    return {"num_ctx": ollama_client.NUM_CTX, "model": ollama_client.MODEL_NAME}


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
