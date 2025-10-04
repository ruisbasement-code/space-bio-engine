import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // change to "nodejs" if you prefer

function clamp(s: string, max = 9000) {
  if (!s) return "";
  s = s.replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max) + "…" : s;
}

const SYSTEM = `
You are a friendly planetary-science study coach.
Adapt tone and complexity to exactly what the user asks (e.g., "explain like I'm 10", "keep it professional").
When asked to summarize, give a short title and concise bullet points.
When asked to explain/clarify, focus on the requested parts first.
When asked to make notes, produce clean, scannable notes.
When asked to quiz, return 5 varied questions with a brief answer key.
Use any provided page context faithfully; if something is missing, say so briefly.
Return plain text only.
`.trim();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages = [], context = "" } = body || {};

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY on the server." }, { status: 500 });
    }

    const ctx = context ? `\n\n[Page context]\n${clamp(context, 8000)}` : "";

    const payload = {
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: SYSTEM + ctx },
        ...messages.slice(-16) // keep convo compact
      ]
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const err = await r.text();
      return NextResponse.json({ error: err || "Upstream error" }, { status: 500 });
    }
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "No response.";
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 });
  }
}