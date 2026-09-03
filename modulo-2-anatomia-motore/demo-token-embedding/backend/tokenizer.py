import tiktoken

_encoding = tiktoken.get_encoding("cl100k_base")


def tokenize(text: str) -> list[dict]:
    ids = _encoding.encode(text)
    return [
        {"id": token_id, "text": _encoding.decode_single_token_bytes(token_id).decode("utf-8", errors="replace")}
        for token_id in ids
    ]
