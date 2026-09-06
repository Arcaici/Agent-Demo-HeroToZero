from fastapi import FastAPI
from pydantic import BaseModel

import embedding_space
import tokenizer as tokenizer_module

app = FastAPI(title="Demo - Token & Embedding")


class TextRequest(BaseModel):
    text: str


TOKENIZER_DISCLAIMER = (
    "Tokenizzatore illustrativo (GPT/cl100k), non il vocabolario esatto di "
    "Llama in uso nelle altre demo: split e ID possono differire da quelli "
    "mostrati a slide."
)


@app.post("/api/tokenize")
async def tokenize(request: TextRequest) -> dict:
    return {
        "tokens": tokenizer_module.tokenize(request.text),
        "disclaimer": TOKENIZER_DISCLAIMER,
    }


@app.post("/api/embed-space")
async def embed_space(request: TextRequest) -> dict:
    return await embedding_space.project(request.text)


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
