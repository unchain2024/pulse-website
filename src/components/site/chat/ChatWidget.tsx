"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { PulseMark } from "../PulseMark";
import { ChatPanel, type ChatTurn } from "./ChatPanel";
import s from "./Chat.module.css";

const STORE_KEY = "pulse.chat.v1";
const TEASER_KEY = "pulse.chat.teaser.v1";
const TEASER_DELAY = 6000;
const MAX_STORED = 20;
const TITLE_ID = "pulse-chat-title";
const PANEL_ID = "pulse-chat-panel";

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now() + Math.random());
}

export function ChatWidget() {
  const t = useTranslations("site.chat");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [busy, setBusy] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const abort = useRef<AbortController | null>(null);
  const hydrated = useRef(false);

  // Read storage after mount, never during render — reading it while rendering would make
  // the server and client markup disagree.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatTurn[];
        if (Array.isArray(parsed)) {
          setTurns(parsed.map((turn) => (turn.state === "pending" ? { ...turn, state: "error" } : turn)));
        }
      }
    } catch {
      // Private browsing, blocked storage, stale shape — none of it is worth failing over.
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(turns.slice(-MAX_STORED)));
    } catch {
      // Storage is a convenience here; the conversation still works without it.
    }
  }, [turns]);

  // The greeting appears once a session, and only if the visitor has not already opened
  // the panel or dismissed it — a bubble that returns on every page is an irritation.
  useEffect(() => {
    let dismissed = true;
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    const timer = window.setTimeout(() => setTeaser(true), TEASER_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  const closeTeaser = useCallback(() => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      // Ignored: the bubble simply reappears next session.
    }
  }, []);

  // A conversation half in Japanese and half in English reads worse than a clean slate.
  // Guarded by the previous value, so this never fires on mount and wipes a restored one.
  const lastLocale = useRef(locale);
  useEffect(() => {
    if (lastLocale.current === locale) return;
    lastLocale.current = locale;
    abort.current?.abort();
    setTurns([]);
    setBusy(false);
  }, [locale]);

  useEffect(() => () => abort.current?.abort(), []);

  const send = useCallback(
    async (question: string) => {
      const id = newId();
      const history = turns.flatMap((turn) =>
        turn.answer
          ? [
              { role: "user" as const, content: turn.question },
              { role: "assistant" as const, content: turn.answer },
            ]
          : [{ role: "user" as const, content: turn.question }]
      );

      setTurns((prev) => [...prev, { id, question, state: "pending" }]);
      setBusy(true);

      abort.current?.abort();
      const controller = new AbortController();
      abort.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ locale, message: question, history: history.slice(-6) }),
          signal: controller.signal,
        });
        if (!response.ok) {
          const error = response.status === 429 ? "rate" : "network";
          setTurns((prev) => prev.map((turn) => (turn.id === id ? { ...turn, state: "error", error } : turn)));
          return;
        }
        const reply = (await response.json()) as { answer: string; sources: ChatTurn["sources"] };
        setTurns((prev) =>
          prev.map((turn) =>
            turn.id === id ? { ...turn, state: "done", answer: reply.answer, sources: reply.sources } : turn
          )
        );
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
        setTurns((prev) => prev.map((turn) => (turn.id === id ? { ...turn, state: "error", error: "network" } : turn)));
      } finally {
        if (abort.current === controller) {
          abort.current = null;
          setBusy(false);
        }
      }
    },
    [locale, turns]
  );

  function toggle() {
    closeTeaser();
    setOpen((was) => {
      if (was) launcher.current?.focus();
      return !was;
    });
  }

  return (
    <div className={s.root}>
      {open && (
        <ChatPanel
          turns={turns}
          busy={busy}
          titleId={TITLE_ID}
          panelId={PANEL_ID}
          onSend={send}
          onClear={() => {
            abort.current?.abort();
            setTurns([]);
            setBusy(false);
          }}
          onClose={() => {
            setOpen(false);
            launcher.current?.focus();
          }}
        />
      )}

      {!open && teaser && (
        <div className={s.teaser}>
          <button type="button" className={s.teaserText} onClick={toggle}>
            {t("teaser")}
          </button>
          <button type="button" className={s.teaserClose} onClick={closeTeaser} aria-label={t("teaserDismiss")}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      )}

      <button
        type="button"
        className={s.launcher}
        ref={launcher}
        onClick={toggle}
        aria-expanded={open}
        aria-controls={open ? PANEL_ID : undefined}
        aria-label={open ? t("launcherCloseAria") : t("launcherAria")}
      >
        <PulseMark />
        <span className={s.launcherLabel}>{open ? t("close") : t("launcherOpen")}</span>
      </button>
    </div>
  );
}
