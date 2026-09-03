import json
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

import agent_loop
from mcp_bridge import bridge


@asynccontextmanager
async def lifespan(app: FastAPI):
    await bridge.connect()
    yield
    await bridge.close()


app = FastAPI(title="Demo - Agente ERP/MES (MCP)", lifespan=lifespan)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


@app.post("/api/agent/chat")
async def agent_chat(request: ChatRequest) -> StreamingResponse:
    messages = [m.model_dump() for m in request.messages]

    async def stream():
        async for event in agent_loop.run(messages):
            yield json.dumps(event) + "\n"

    return StreamingResponse(stream(), media_type="application/x-ndjson")


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
