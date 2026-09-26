"use client";

import { useEffect, useRef, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { renderAnswer } from "./chatFormat";
import s from "./Chat.module.css";

export type ChatSource = { kind: "help" | "page"; url: string; title: string; heading?: string };

export type ChatTurn = {
  id: string;
  question: string;
  answer?: string;
  sources?: ChatSource[];
  state: "pending" | "done" | "error";
  error?: "network" | "rate";
};

const STARTERS = ["starterPricing", "starterSecurity", "starterIntegrations", "starterGettingStarted"] as const;

export function ChatPanel({
  turns,
  busy,
  titleId,
  panelId,
  onSend,
  onClear,
  onClose,
}: {
  turns: ChatTurn[];
  busy: boolean;
  titleId: string;
  panelId: string;
  onSend: (question: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const t = useTranslations("site.chat");
  const locale = useLocale();
  const field = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    field.current?.focus();
  }, []);

  // Follow the conversation, but never yank the view away from someone reading back.
  useEffect(() => {
    const box = log.current;
    if (!box) return;
    if (box.scrollHeight - box.scrollTop - box.clientHeight > 140) return;
    box.scrollTo({
      top: box.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [turns]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = field.current?.value.trim();
    if (!value || busy) return;
    onSend(value);
    if (field.current) {
      field.current.value = "";
      field.current.style.height = "auto";
    }
  }

  function onFieldKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  const last = turns[turns.length - 1];
  const status = !last ? "" : last.state === "pending" ? t("statusThinking") : last.state === "done" ? t("statusReady") : "";

  return (
    // Deliberately not aria-modal: the point is to read the page while the panel is open,
    // so focus is not trapped and the page keeps scrolling.
    <section
      id={panelId}
      className={s.panel}
      role="dialog"
      aria-labelledby={titleId}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.stopPropagation();
        onClose();
      }}
    >
      <header className={s.head}>
        <div className={s.headText}>
          <h2 id={titleId}>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>
        <button type="button" className={s.close} onClick={onClose} aria-label={t("close")}>
          <span aria-hidden="true">✕</span>
        </button>
      </header>

      <div className={s.log} ref={log}>
        {!turns.length && (
          <div className={s.empty}>
            <h3>{t("emptyTitle")}</h3>
            <p>{t("emptyBody")}</p>
            <p className={s.startersLabel}>{t("startersLabel")}</p>
            <div className={s.starters}>
              {STARTERS.map((key) => (
                <button key={key} type="button" className={s.starter} onClick={() => onSend(t(key))}>
                  {t(key)}
                </button>
              ))}
            </div>
          </div>
        )}

        {turns.map((turn) => (
          <article className={s.turn} key={turn.id}>
            <p className={s.user}>
              <span className={s.srOnly}>{`${t("you")}: `}</span>
              {turn.question}
            </p>

            {turn.state === "pending" && (
              <span className={s.pending} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            )}

            {turn.state === "error" && (
              <p className={s.error}>{turn.error === "rate" ? t("errorRate") : t("errorNetwork")}</p>
            )}

            {turn.state === "done" && turn.answer && (
              // Reachable with Shift+Tab once written, but focus is never moved here —
              // taking focus mid-read is worse than the announcement it would replace.
              <div className={s.body} tabIndex={-1} aria-label={t("assistant")}>
                {renderAnswer(turn.answer)}
              </div>
            )}

            {turn.sources && turn.sources.length > 0 && (
              <nav className={s.sources} aria-label={t("sourcesLabel")}>
                <p className={s.sourcesLabel}>{t("sourcesLabel")}</p>
                {turn.sources.map((source) => (
                  <Link
                    key={source.url}
                    className={s.source}
                    href={source.url.startsWith(`/${locale}`) ? source.url : `/${locale}${source.url}`}
                  >
                    <span>{source.heading ? `${source.title} — ${source.heading}` : source.title}</span>
                    <span className={s.sourceGo}>
                      {source.kind === "help" ? t("readMore") : t("goToPage")}
                      <span aria-hidden="true"> ↗</span>
                    </span>
                  </Link>
                ))}
              </nav>
            )}
          </article>
        ))}
      </div>

      {/* State only. Streaming answer text through a live region makes screen readers
          re-announce it as it grows. */}
      <p className={s.srOnly} role="status">
        {status}
      </p>

      <form className={s.composer} onSubmit={submit}>
        <label className={s.srOnly} htmlFor="pulse-chat-field">
          {t("inputLabel")}
        </label>
        <textarea
          id="pulse-chat-field"
          className={s.field}
          ref={field}
          rows={1}
          maxLength={800}
          placeholder={t("placeholder")}
          onKeyDown={onFieldKeyDown}
          onInput={(event) => {
            event.currentTarget.style.height = "auto";
            event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
          }}
        />
        <button type="submit" className={s.send} disabled={busy} aria-label={t("send")}>
          <span aria-hidden="true">↑</span>
        </button>
      </form>

      <div className={s.foot}>
        <p>{t("disclaimer")}</p>
        {turns.length > 0 && (
          <button type="button" className={s.clear} onClick={onClear}>
            {t("clear")}
          </button>
        )}
      </div>
    </section>
  );
}
