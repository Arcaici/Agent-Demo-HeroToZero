from fastapi import FastAPI
from pydantic import BaseModel

import embedding_space
import tokenizer as tokenizer_module

app = FastAPI(title="Demo - Token & Embedding")


class TextRequest(BaseModel):
    text: str


@app.post("/api/tokenize")
async def tokenize(request: TextRequest) -> dict:
    return {"tokens": tokenizer_module.tokenize(request.text)}


@app.post("/api/embed-space")
async def embed_space(request: TextRequest) -> dict:
    return await embedding_space.project(request.text)


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
