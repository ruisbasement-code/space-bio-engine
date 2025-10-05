"use client";
import React, { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const styles = `
.__coach-fab{position:fixed;right:20px;bottom:20px;z-index:10030}
.__coach-btn{border:none;border-radius:9999px;padding:12px 16px;font-weight:800;cursor:pointer;background:#4e7cf3;color:#0b0f1a;box-shadow:0 10px 30px rgba(0,0,0,.45)}
.__coach-panel{position:fixed;right:20px;bottom:76px;z-index:10031;width:min(520px,92vw);background:#0f1320;border:1px solid #283143;border-radius:16px;box-shadow:0 24px 80px rgba(0,0,0,.55);display:none}
.__coach-head{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #20283a}
.__coach-title{font-weight:800;color:#e6ecff}
.__coach-toggle{display:flex;gap:6px;align-items:center;font-size:12px;color:#aab6ff}
.__coach-body{padding:10px 12px;max-height:50vh;overflow:auto}
.__coach-msg{margin:8px 0;white-space:pre-wrap;line-height:1.35}
.__coach-msg.user{color:#cde1ff}
.__coach-msg.assistant{color:#e9f0ff}
.__coach-quick{display:flex;gap:6px;flex-wrap:wrap;padding:8px 12px;border-top:1px dashed #25304a}
.__coach-quick button{font-size:12px}
.__coach-input{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #20283a}
.__coach-ta{flex:1;min-height:44px;max-height:120px;background:#0b0f1a;border:1px solid #27334a;border-radius:10px;color:#dfe7ff;padding:8px 10px;resize:vertical}
.__coach-send{padding:10px 14px;border-radius:10px;background:#4e7cf3;color:#091120;border:none;font-weight:800;cursor:pointer}
.__coach-foot{display:flex;gap:8px;justify-content:flex-end;padding:8px 12px;border-top:1px dashed #25304a}
.__coach-chip{padding:6px 10px;border-radius:999px;border:1px solid #344054;background:#161b2a;color:#cfd8f6;font-weight:700;cursor:pointer}
`;

function extractPageText(): string {
  const picks = [
    "[data-reading-content]",
    "main article",
    "article",
    "main",
    ".reading-panel",
    ".prose",
    ".content"
  ];
  for (const sel of picks) {
    const el = document.querySelector(sel);
    if (el && el.textContent && el.textContent.trim().length > 80) return el.textContent!;
  }
  return (document.querySelector("main")?.textContent || document.body.innerText || "").trim();
}

function insertIntoNotes(text: string) {
  const cands = [
    "[data-notes]",
    "#notes",
    ".notes",
    "textarea[placeholder*='focus']",
    "textarea[placeholder*='note']",
    "textarea"
  ];
  for (const sel of cands) {
    const el = document.querySelector(sel) as HTMLTextAreaElement | HTMLElement | null;
    if (!el) continue;
    if ((el as HTMLTextAreaElement).value !== undefined) {
      (el as HTMLTextAreaElement).value = text;
      (el as HTMLTextAreaElement).dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    }
    if ("innerText" in el) { (el as HTMLElement).innerText = text; return true; }
  }
  return false;
}

export default function CoachFab() {
  const [open, setOpen] = useState(false);
  const [useContext, setUseContext] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const key = "__coach_chat_" + (typeof window !== "undefined" ? location.pathname : "page");

  // load/save convo
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setMessages(JSON.parse(raw));
      else setMessages([{ role: "assistant", content: "Hi! I can summarize, explain, make study notes, or quiz you. Ask me anything and I’ll match your style (e.g., 'explain like I’m 10', 'be more formal')." }]);
    } catch {}
  }, [key]);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(messages)); } catch {}
    if (open && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open, key]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    setBusy(true); setErr(null);
    const newMsgs: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(newMsgs);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMsgs,
          context: useContext ? extractPageText() : ""
        })
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Request failed");
      setMessages(m => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      setErr(message);
      setMessages(m => [...m, { role: "assistant", content: "Sorry—something went wrong. Check your API key and try again." }]);
    } finally {
      setBusy(false);
    }
  }

  function quick(prompt: string) { return () => send(prompt); }

  useEffect(() => {
    const id = "__coach_styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id; s.textContent = styles;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <>
      <div className="__coach-fab">
        <button className="__coach-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Close Chat" : "Chat"}
        </button>
      </div>

      <div className="__coach-panel" style={{display: open ? "block" : "none"}}>
        <div className="__coach-head">
          <div className="__coach-title">Study Coach</div>
          <label className="__coach-toggle">
            <input type="checkbox" checked={useContext} onChange={(e)=>setUseContext(e.target.checked)} />
            use page context
          </label>
        </div>

        <div ref={bodyRef} className="__coach-body">
          {messages.map((m,i)=>(
            <div key={i} className={`__coach-msg ${m.role}`}>{m.content}</div>
          ))}
          {err && <div className="__coach-msg assistant">Error: {err}</div>}
        </div>

        <div className="__coach-quick">
          <button className="__coach-chip" onClick={quick("Summarize this page.")}>Summarize</button>
          <button className="__coach-chip" onClick={quick("Explain the key ideas more simply.")}>Explain simpler</button>
          <button className="__coach-chip" onClick={quick("Create clear study notes.")}>Make notes</button>
          <button className="__coach-chip" onClick={quick("Quiz me with 5 questions and give an answer key.")}>5-Q quiz</button>
        </div>

        <div className="__coach-input">
          <textarea ref={inputRef} className="__coach-ta" placeholder="Ask anything about this page…" />
          <button className="__coach-send" disabled={busy} onClick={()=>{ const v=inputRef.current!.value; inputRef.current!.value=""; send(v); }}>
            {busy ? "…" : "Send"}
          </button>
        </div>

        <div className="__coach-foot">
          <button className="__coach-chip" onClick={()=>{
            const last = [...messages].reverse().find(m=>m.role==="assistant")?.content || "";
            navigator.clipboard.writeText(last);
          }}>Copy last answer</button>
          <button className="__coach-chip" onClick={()=>{
            const last = [...messages].reverse().find(m=>m.role==="assistant")?.content || "";
            const ok = insertIntoNotes(last);
            alert(ok ? "Inserted into notes" : "Couldn’t find a notes area");
          }}>Insert to Notes</button>
        </div>
      </div>
    </>
  );
}