import ollama_client
from corpus import DOCUMENTS

_BY_ID = {doc["id"]: doc for doc in DOCUMENTS}

SYSTEM_PROMPT = (
    "Sei l'assistente interno di Acme Manifattura. Rispondi alla domanda "
    "dell'utente usando SOLO le informazioni contenute nei documenti forniti "
    "qui sotto. Se l'informazione richiesta non è presente nei documenti, "
    "dillo esplicitamente invece di inventare una risposta.\n\n"
)


def build_messages(question: str, doc_ids: list[str]) -> list[dict]:
    docs_text = "\n\n".join(
        f"--- {_BY_ID[doc_id]['title']} ---\n{_BY_ID[doc_id]['text']}"
        for doc_id in doc_ids
        if doc_id in _BY_ID
    )
    system = SYSTEM_PROMPT + docs_text
    return [
        {"role": "system", "content": system},
        {"role": "user", "content": question},
    ]


async def answer(question: str, doc_ids: list[str]) -> dict:
    messages = build_messages(question, doc_ids)
    reply = await ollama_client.chat(messages)
    return {"answer": reply, "messages": messages}
