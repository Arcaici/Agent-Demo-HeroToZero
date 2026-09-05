import json
import os

import httpx

AGENT_TARGET_URL = os.environ.get("AGENT_TARGET_URL", "http://localhost:8000")


async def run_attack(message: str) -> list[dict]:
    events: list[dict] = []
    async with httpx.AsyncClient(timeout=180.0) as client:
        async with client.stream(
            "POST",
            f"{AGENT_TARGET_URL}/api/agent/chat",
            json={"messages": [{"role": "user", "content": message}]},
        ) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if not line.strip():
                    continue
                events.append(json.loads(line))
    return events
