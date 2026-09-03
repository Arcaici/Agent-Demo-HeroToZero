from fastapi import FastAPI
from pydantic import BaseModel

import generation
import retrieval

app = FastAPI(title="Demo - RAG Manuale")


class RetrieveRequest(BaseModel):
    question: str


class GenerateRequest(BaseModel):
    question: str
    doc_ids: list[str]


@app.post("/api/retrieve")
async def retrieve(request: RetrieveRequest) -> dict:
    return {"results": await retrieval.search(request.question)}


@app.post("/api/generate")
async def generate(request: GenerateRequest) -> dict:
    return await generation.answer(request.question, request.doc_ids)


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
