#!/usr/bin/env python3
"""
PlayPro local GPT-2 coach server.

Runs a tiny HTTP API at /coach for the website AI assistant.
No API keys required.
"""

from __future__ import annotations

import json
import os
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_ID = os.environ.get("PLAYPRO_GPT2_MODEL", "distilgpt2")
HOST = os.environ.get("PLAYPRO_GPT2_HOST", "127.0.0.1")
PORT = int(os.environ.get("PLAYPRO_GPT2_PORT", "8008"))
MAX_NEW_TOKENS = int(os.environ.get("PLAYPRO_GPT2_MAX_NEW_TOKENS", "90"))
LOCAL_FILES_ONLY = os.environ.get("PLAYPRO_GPT2_LOCAL_ONLY", "0") == "1"

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


def _load_model() -> tuple[AutoTokenizer, AutoModelForCausalLM]:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, local_files_only=LOCAL_FILES_ONLY)
    model = AutoModelForCausalLM.from_pretrained(MODEL_ID, local_files_only=LOCAL_FILES_ONLY)
    if tokenizer.pad_token_id is None:
        tokenizer.pad_token = tokenizer.eos_token
    model.to(DEVICE)
    model.eval()
    return tokenizer, model


def _clean_text(value: str) -> str:
    text = str(value or "").replace("\r", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def build_prompt(message: str, context: dict[str, Any], catalog: str = "") -> str:
    sport = _clean_text(context.get("sport", "")) or "Unknown"
    goal = _clean_text(context.get("goal", "")) or "Unknown"
    budget = _clean_text(context.get("budget", "")) or "Unknown"
    catalog = _clean_text(catalog)[:1200]

    return (
        "You are PlayPro Sports AI Coach. "
        "Reply in 2 to 4 short lines with practical buying advice. "
        "Recommend concrete products and ask one useful follow-up when needed.\n"
        f"Sport: {sport}\n"
        f"Goal: {goal}\n"
        f"Budget: {budget}\n"
        f"Catalog: {catalog}\n"
        f"User: {_clean_text(message)}\n"
        "Assistant:"
    )


def postprocess_reply(raw: str, user_message: str) -> str:
    text = str(raw or "")
    text = re.sub(r"\b(User|Assistant)\s*:\s*", "", text, flags=re.I)
    text = text.replace("\n", " ").replace("\r", " ")
    text = re.sub(r"\s+", " ", text).strip()

    if user_message and text.lower().startswith(user_message.lower()):
        text = text[len(user_message) :].strip(" :,-.")

    # Remove obvious repetition artifacts.
    text = re.sub(r"\b(i)(?:\s+\1){4,}\b", "", text, flags=re.I).strip()
    text = re.sub(r"\b(\w+)(?:\s+\1){5,}\b", r"\1", text, flags=re.I).strip()

    if not text:
        return ""

    # Keep responses concise and readable.
    sentences = re.split(r"(?<=[.!?])\s+", text)
    short = " ".join(s.strip() for s in sentences[:4] if s.strip()).strip()
    if short:
        text = short

    if len(text) < 10:
        return ""
    return text


class CoachModel:
    def __init__(self) -> None:
        self.tokenizer: AutoTokenizer | None = None
        self.model: AutoModelForCausalLM | None = None
        self.load_attempted = False
        self.load_error = ""

    def ensure_model(self) -> bool:
        if self.tokenizer is not None and self.model is not None:
            return True
        if self.load_attempted:
            return False
        self.load_attempted = True
        try:
            self.tokenizer, self.model = _load_model()
            return True
        except Exception as exc:  # pragma: no cover
            self.load_error = f"{type(exc).__name__}: {exc}"
            return False

    def fallback_reply(self, message: str, context: dict[str, Any]) -> str:
        sport = _clean_text(context.get("sport", ""))
        goal = _clean_text(context.get("goal", ""))
        budget = _clean_text(context.get("budget", ""))
        lower = _clean_text(message).lower()

        if re.search(r"\b(hi|hey|hello|yo)\b", lower):
            return "Hey. Tell me your sport, goal, and budget, and I will build your full training kit."
        if sport and not goal and not budget:
            return f"Locked in: {sport}. Tell me your goal and budget so I can suggest exact products."
        if sport and goal and not budget:
            return f"Got it: {sport} with goal {goal}. What budget should I stay under?"
        if sport and goal and budget:
            return f"For {sport} with goal {goal} and budget {budget}, I can now give exact product picks. Ask for shoes-only or full kit."
        return "Tell me your sport, goal, and budget. I will build your full training kit."

    @torch.inference_mode()
    def reply(self, message: str, context: dict[str, Any], catalog: str = "") -> str:
        if not self.ensure_model():
            return self.fallback_reply(message, context)

        assert self.tokenizer is not None
        assert self.model is not None
        prompt = build_prompt(message, context, catalog)
        inputs = self.tokenizer(prompt, return_tensors="pt").to(DEVICE)
        generated = self.model.generate(
            **inputs,
            max_new_tokens=MAX_NEW_TOKENS,
            do_sample=True,
            top_p=0.92,
            temperature=0.72,
            repetition_penalty=1.2,
            no_repeat_ngram_size=3,
            pad_token_id=self.tokenizer.eos_token_id,
        )
        new_tokens = generated[0][inputs["input_ids"].shape[1] :]
        raw = self.tokenizer.decode(new_tokens, skip_special_tokens=True)
        cleaned = postprocess_reply(raw, message)
        if cleaned:
            return cleaned
        return "Tell me your sport, goal, and budget, and I will build a better gear kit for you."


COACH_MODEL = CoachModel()


class Handler(BaseHTTPRequestHandler):
    server_version = "PlayProGPT2/1.0"

    def _write_json(self, status: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: Any) -> None:  # noqa: A003
        return

    def do_OPTIONS(self) -> None:  # noqa: N802
        self._write_json(200, {"ok": True})

    def do_POST(self) -> None:  # noqa: N802
        if self.path.rstrip("/") != "/coach":
            self._write_json(404, {"error": "Not Found"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            raw = self.rfile.read(length) if length > 0 else b"{}"
            payload = json.loads(raw.decode("utf-8")) if raw else {}
            message = _clean_text(payload.get("message", ""))
            context = payload.get("context", {}) if isinstance(payload.get("context", {}), dict) else {}
            catalog = _clean_text(payload.get("catalog", ""))

            if not message:
                reply = "Tell me your sport, goal, and budget. I will build your full training kit."
            else:
                reply = COACH_MODEL.reply(message, context, catalog)

            self._write_json(
                200,
                {
                    "reply": reply,
                    "model": MODEL_ID,
                    "device": DEVICE,
                    "backend": "gpt2" if (COACH_MODEL.model is not None and COACH_MODEL.tokenizer is not None) else "rules",
                    "load_error": COACH_MODEL.load_error,
                },
            )
        except Exception as exc:  # pragma: no cover
            self._write_json(500, {"error": f"{type(exc).__name__}: {exc}"})


def main() -> None:
    print(f"[PlayPro GPT-2] Model configured: {MODEL_ID} on {DEVICE}")
    if LOCAL_FILES_ONLY:
        print("[PlayPro GPT-2] Local-files-only mode is ON")
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"[PlayPro GPT-2] Serving on http://{HOST}:{PORT}/coach")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
