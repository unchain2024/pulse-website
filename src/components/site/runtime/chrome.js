/* Site chrome: the nav dropdowns, the mobile burger and the request form.
 *
 * Ported from the Pulse single-file prototype. The form still composes a mailto:
 * draft rather than posting anywhere, exactly as the prototype did.
 */

const CONTACT_EMAIL = "tharada@the-unchain.com";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** @returns {() => void} teardown */
export function init() {
  const _off = [];
  const on = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    _off.push(() => target.removeEventListener(type, fn, opts));
  };

  // Only one nav dropdown open at a time.
  document.querySelectorAll(".nav details").forEach((d) => {
    on(d, "toggle", () => {
      if (!d.open) return;
      document.querySelectorAll(".nav details").forEach((other) => {
        if (other !== d) other.removeAttribute("open");
      });
    });
  });

  const closeNavDropdowns = () =>
    document.querySelectorAll(".nav details[open]").forEach((d) => d.removeAttribute("open"));

  on(document, "click", (e) => {
    // A link inside the panel navigates client-side, so close it explicitly.
    if (e.target.closest(".nav details") && !e.target.closest(".nav-pop a")) return;
    closeNavDropdowns();
  });

  on(document, "keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = document.querySelector(".nav details[open]");
    if (!open) return;
    closeNavDropdowns();
    open.querySelector("summary")?.focus();
  });

  // The burger toggles .nav.open in shell.js; keep aria in step with it.
  document.querySelectorAll(".burger").forEach((b) => {
    on(b, "click", () => {
      b.setAttribute("aria-expanded", String(b.closest(".nav").classList.contains("open")));
    });
  });

  // The request form builds an email draft the visitor can review and send.
  document.querySelectorAll("form.form").forEach((form) => {
    on(form, "submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const isEn = document.documentElement.lang === "en";
      let body = isEn
        ? "Hello, I would like to learn more about Pulse.\n\n"
        : "お世話になっております。Pulseについて申し込みを希望します。\n\n";

      for (const field of form.querySelectorAll("input,select,textarea")) {
        if (!field.name) continue;
        const label = form.querySelector('label[for="' + field.id + '"]')?.textContent || field.name;
        body += label + ": " + field.value + "\n";
      }

      const onDemoPage = !!form.closest('[data-page="demo"]');
      const subject = onDemoPage ? "Pulse デモのご相談" : "Pulse ベータ利用の申し込み";
      const mail =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      let feedback = form.querySelector(".form-feedback");
      if (!feedback) {
        feedback = document.createElement("div");
        feedback.className = "form-feedback";
        feedback.setAttribute("role", "status");
        form.append(feedback);
      }
      feedback.innerHTML =
        "<p>" +
        (isEn
          ? "Your request is ready. Open your email app, review it, and send."
          : "申込内容をまとめました。メールアプリで内容を確認して送信してください。") +
        '</p><a class="text-link" style="margin-top:12px" href="' + esc(mail) + '">' +
        (isEn ? "Open email draft ↗" : "メールアプリで開く ↗") +
        "</a>";
      feedback.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  });

  return () => {
    for (const fn of _off.splice(0)) {
      try { fn(); } catch { /* teardown is best effort */ }
    }
  };
}
