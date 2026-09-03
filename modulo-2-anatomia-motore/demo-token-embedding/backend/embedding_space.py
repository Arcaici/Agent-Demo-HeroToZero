import numpy as np

import ollama_client

PRELOADED = [
    {"label": "gatto", "group": "animali"},
    {"label": "cane", "group": "animali"},
    {"label": "leone", "group": "animali"},
    {"label": "delfino", "group": "animali"},
    {"label": "computer", "group": "tecnologia"},
    {"label": "software", "group": "tecnologia"},
    {"label": "algoritmo", "group": "tecnologia"},
    {"label": "internet", "group": "tecnologia"},
    {"label": "pizza", "group": "cibo"},
    {"label": "pasta", "group": "cibo"},
    {"label": "caffè", "group": "cibo"},
    {"label": "gelato", "group": "cibo"},
    {"label": "felicità", "group": "emozioni"},
    {"label": "tristezza", "group": "emozioni"},
    {"label": "rabbia", "group": "emozioni"},
    {"label": "paura", "group": "emozioni"},
]

_state: dict = {}


async def _ensure_fitted() -> None:
    if _state:
        return
    vectors = np.array([await ollama_client.embed(item["label"]) for item in PRELOADED])
    mean = vectors.mean(axis=0)
    centered = vectors - mean
    _, _, vt = np.linalg.svd(centered, full_matrices=False)
    components = vt[:2]

    projected = centered @ components.T
    preloaded_points = [
        {**item, "x": float(projected[i, 0]), "y": float(projected[i, 1])}
        for i, item in enumerate(PRELOADED)
    ]

    _state["mean"] = mean
    _state["components"] = components
    _state["preloaded_points"] = preloaded_points


async def project(text: str) -> dict:
    await _ensure_fitted()
    vector = np.array(await ollama_client.embed(text))
    centered = vector - _state["mean"]
    point = centered @ _state["components"].T
    return {
        "preloaded": _state["preloaded_points"],
        "query": {"x": float(point[0]), "y": float(point[1])},
    }
