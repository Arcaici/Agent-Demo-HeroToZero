import json

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

import agent_client
import guardrail

app = FastAPI(title="Demo - Prompt Injection")


class AttackRequest(BaseModel):
    message: str
    mitigation: bool = False


@app.post("/api/attack")
async def attack(request: AttackRequest) -> StreamingResponse:
    message = (
        guardrail.wrap_with_reminder(request.message)
        if request.mitigation
        else request.message
    )

    async def stream():
        events: list[dict] = []
        final_text = ""

        # Con la mitigazione attiva non possiamo mostrare la risposta finale
        # mentre arriva: dobbiamo vederla intera prima di decidere se contiene
        # un leak da censurare. Senza mitigazione invece la streammiamo live
        # (è il caso "spettacolare" della demo: vedere il leak comparire
        # parola per parola). Gli altri eventi (chiamate MCP, payload) sono
        # sempre live, non riguardano mai il testo del system prompt trapelato.
        async for event in agent_client.run_attack_stream(message):
            events.append(event)
            etype = event.get("type")

            if etype == "final_answer_chunk":
                final_text += event.get("content", "")
                if not request.mitigation:
                    yield json.dumps(event) + "\n"
            elif etype == "final_answer":
                if request.mitigation:
                    leaked_now = guardrail.contains_leak(final_text)
                    content = guardrail.LEAK_BLOCKED_NOTICE if leaked_now else final_text
                    yield json.dumps({"type": "final_answer", "content": content}) + "\n"
                # senza mitigazione il testo è già stato streammato via chunk:
                # non serve reinviarlo, l'evento aggregato serve solo qui
                # per costruire i flag finali sotto.
            else:
                yield json.dumps(event) + "\n"

        leaked = guardrail.contains_leak(final_text)
        blocked_by_mitigation = request.mitigation and leaked
        yield json.dumps(
            {
                "type": "outcome",
                "leaked": leaked and not request.mitigation,
                "blocked_by_mitigation": blocked_by_mitigation,
                "file_attack_blocked": guardrail.check_file_attack_blocked(events),
            }
        ) + "\n"

    return StreamingResponse(stream(), media_type="application/x-ndjson")


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
