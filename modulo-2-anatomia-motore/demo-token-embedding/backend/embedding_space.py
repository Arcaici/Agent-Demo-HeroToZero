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

# Cache crescente per tutta la vita del processo: ogni parola vista finora
# (preloaded + tutte quelle analizzate dall'utente) resta qui, così la mappa
# si costruisce progressivamente durante la sessione invece di mostrare solo
# un punto alla volta.
_embeddings: dict[str, np.ndarray] = {}
_groups: dict[str, str] = {item["label"]: item["group"] for item in PRELOADED}

# Parole di riferimento fisse per il pannello di similarità coseno: sempre le
# stesse 3, indipendentemente dalla parola analizzata, così l'aula costruisce
# intuizione su "vicino/lontano da cosa" invece di vedere una classifica che
# cambia (quella è il retrieval del modulo 3, non qui).
COSINE_REFERENCES = ["gatto", "computer", "pizza"]


def _cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8))


async def _ensure_embedded(label: str) -> None:
    if label not in _embeddings:
        _embeddings[label] = np.array(await ollama_client.embed(label))


async def project(text: str) -> dict:
    for item in PRELOADED:
        await _ensure_embedded(item["label"])

    is_new = text not in _embeddings
    await _ensure_embedded(text)
    if is_new:
        _groups.setdefault(text, "personalizzato")

    labels = list(_embeddings.keys())
    vectors = np.array([_embeddings[label] for label in labels])
    mean = vectors.mean(axis=0)
    centered = vectors - mean
    _, _, vt = np.linalg.svd(centered, full_matrices=False)
    components = vt[:2]
    projected = centered @ components.T

    points = [
        {
            "label": label,
            "group": _groups.get(label, "personalizzato"),
            "x": float(projected[i, 0]),
            "y": float(projected[i, 1]),
        }
        for i, label in enumerate(labels)
    ]

    for reference in COSINE_REFERENCES:
        await _ensure_embedded(reference)
    similarities = [
        {
            "label": reference,
            "score": round(_cosine_similarity(_embeddings[text], _embeddings[reference]), 4),
        }
        for reference in COSINE_REFERENCES
        if reference != text
    ]

    return {"points": points, "similarities": similarities}
