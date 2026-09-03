import numpy as np

import ollama_client
from corpus import DOCUMENTS

_state: dict = {}


async def _ensure_embedded() -> None:
    if _state:
        return
    vectors = np.array([await ollama_client.embed(doc["text"]) for doc in DOCUMENTS])
    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    _state["vectors"] = vectors
    _state["norms"] = norms


def _snippet(text: str, length: int = 160) -> str:
    return text if len(text) <= length else text[:length].rsplit(" ", 1)[0] + "…"


async def search(question: str, k: int = 3) -> list[dict]:
    await _ensure_embedded()
    query = np.array(await ollama_client.embed(question))
    query_norm = np.linalg.norm(query)

    vectors = _state["vectors"]
    norms = _state["norms"].flatten()
    scores = (vectors @ query) / (norms * query_norm + 1e-8)

    top_idx = np.argsort(-scores)[:k]
    return [
        {
            "id": DOCUMENTS[i]["id"],
            "title": DOCUMENTS[i]["title"],
            "snippet": _snippet(DOCUMENTS[i]["text"]),
            "score": round(float(scores[i]), 4),
        }
        for i in top_idx
    ]
