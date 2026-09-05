from fastapi import FastAPI
from pydantic import BaseModel

import agent_client
import guardrail

app = FastAPI(title="Demo - Prompt Injection")


class AttackRequest(BaseModel):
    message: str
    mitigation: bool = False


@app.post("/api/attack")
async def attack(request: AttackRequest) -> dict:
    message = (
        guardrail.wrap_with_reminder(request.message)
        if request.mitigation
        else request.message
    )

    events = await agent_client.run_attack(message)

    final_event = next((e for e in events if e.get("type") == "final_answer"), None)
    final_text = final_event.get("content", "") if final_event else ""

    leaked = guardrail.contains_leak(final_text)
    blocked_by_mitigation = False

    if request.mitigation and leaked:
        final_event["content"] = guardrail.LEAK_BLOCKED_NOTICE
        blocked_by_mitigation = True
        leaked = False

    return {
        "events": events,
        "leaked": leaked,
        "blocked_by_mitigation": blocked_by_mitigation,
        "file_attack_blocked": guardrail.check_file_attack_blocked(events),
    }


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
