import asyncio

from fastapi import FastAPI
from pydantic import BaseModel, Field

import ollama_client

app = FastAPI(title="Demo - Temperatura")


class AskRequest(BaseModel):
    question: str
    temperature: float = Field(ge=0.0, le=2.0)
    repeats: int = Field(default=3, ge=1, le=5)


class AskResponse(BaseModel):
    responses: list[str]


@app.post("/api/ask", response_model=AskResponse)
async def ask(request: AskRequest) -> AskResponse:
    tasks = [
        ollama_client.chat(request.question, request.temperature)
        for _ in range(request.repeats)
    ]
    responses = await asyncio.gather(*tasks)
    return AskResponse(responses=list(responses))


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
