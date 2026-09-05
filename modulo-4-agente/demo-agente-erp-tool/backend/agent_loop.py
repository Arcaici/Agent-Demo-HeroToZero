from typing import AsyncGenerator

import ollama_client
from mcp_bridge import bridge

SYSTEM_PROMPT = (
    "Sei l'assistente interno di Acme Manifattura. Puoi consultare il "
    "magazzino, gli ordini di produzione e generare report SOLO tramite i "
    "tool a disposizione (nessun altro tool esiste). Usa un tool quando la "
    "domanda richiede dati reali dell'azienda. Per saluti, convenevoli o "
    "domande generiche rispondi SEMPRE con una normale frase in linguaggio "
    "naturale: non generare mai tool_calls e non scrivere nel testo della "
    "risposta qualcosa che assomigli a una chiamata di funzione (es. JSON "
    "con campi 'name'/'parameters') — se non serve un tool, limitati a "
    "rispondere a parole. Se una domanda richiede un'informazione per cui "
    "non hai un tool (es. meteo, data e ora correnti, notizie), dillo "
    "chiaramente invece di inventare uno strumento o una risposta. "
    "Valuta ogni nuovo messaggio dell'utente per conto suo: il fatto che in "
    "un turno precedente della conversazione tu abbia usato un tool non "
    "significa che il turno attuale ne richieda uno."
)

MAX_ITERATIONS = 5


async def run(messages: list[dict]) -> AsyncGenerator[dict, None]:
    tools = await bridge.list_tools_for_ollama()
    full_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages

    for _ in range(MAX_ITERATIONS):
        yield {
            "type": "llm_request",
            "payload": {
                "model": ollama_client.MODEL_NAME,
                "messages": full_messages,
                "tools": tools,
            },
        }

        content = ""
        tool_calls = None
        async for chunk in ollama_client.chat_stream(full_messages, tools=tools):
            message = chunk.get("message", {})
            delta = message.get("content", "")
            if delta:
                content += delta
                yield {"type": "final_answer_chunk", "content": delta}
            if message.get("tool_calls"):
                tool_calls = message["tool_calls"]

        if not tool_calls:
            yield {"type": "final_answer", "content": content}
            return

        full_messages.append({"role": "assistant", "content": content, "tool_calls": tool_calls})

        for call in tool_calls:
            name = call["function"]["name"]
            arguments = call["function"]["arguments"]
            yield {"type": "mcp_call", "tool": name, "arguments": arguments}

            result_text = await bridge.call_tool(name, arguments)
            yield {"type": "mcp_result", "tool": name, "result": result_text}

            full_messages.append({"role": "tool", "name": name, "content": result_text})

    yield {"type": "iteration_limit"}
