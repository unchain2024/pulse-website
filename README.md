# Pulse by UNCHAIN — website

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · next-intl 4 · pnpm

```bash
pnpm install
pnpm dev        # http://localhost:3000 → redirects to /ja
pnpm build
pnpm typecheck
```

Locales: `ja` (default) and `en`. Every route is prerendered for both.

## Where things live

```
src/app/layout.tsx              imports globals.css, returns children
src/app/[locale]/layout.tsx     <html>/<body>, the .lang wrapper, nav, footer, runtime
src/app/[locale]/page.tsx       home
src/app/[locale]/<page>/        one route per page (20 of them)
src/app/[locale]/help/          help centre: home, categories, 88 articles
src/app/api/help/search/        full-text article search
src/middleware.ts               next-intl locale routing

src/components/site/            one folder per page, one file per section
src/components/site/runtime/    the prototype's behaviour, as startable modules
src/messages/{ja,en}.json       every user-visible string, key-for-key identical
src/styles/01-…09-*.css         the prototype's style layers, in cascade order
src/data/help.json              help article corpus (server only)
public/assets, public/fonts     images and self-hosted fonts
```

## How this codebase came to be

It is a port of `pulse-site-single.html`, a single-file prototype that held the
whole site: 21 pages in two languages, a help centre, and the scripts that drove
the animations. That file is gone; this repo is the source of truth now.

The port was verified against the prototype before the original was deleted:
all 40 page/locale combinations matched on element structure and visible text,
and screenshot comparison at 1440px was within 0.002% of the original on the
pages checked. The only remaining pixel differences were frames of a
scroll-driven animation captured at different moments.

### Things worth knowing before you change something

**The stylesheets are layered and order-dependent.** `src/styles/01-…09-*.css`
are the prototype's `<style>` blocks in their original document order, copied
unmodified. Later layers deliberately override earlier ones — `07-v6.css`, for
example, redefines `--serif` and `--sora` to resolve to Roboto, which is why the
site renders in one typeface family. Edit the layer a rule came from; do not
reorder the imports in `src/app/globals.css`.

**Tailwind's preflight is deliberately not imported.** The prototype ships its
own reset, and preflight would change the rendered design. `globals.css` imports
only Tailwind's theme and utility layers. Design tokens are exposed to Tailwind
through `@theme inline`, referencing the custom properties the layers define.

**Page wrapper classes are load-bearing.** Each page renders
`<div className="page <modifier> on">`. Rules like `.v6-usecase .v6-page-hero`
and the granola runtime's `.granola-home` lookup depend on those modifiers, and
`.lang-<locale>` on the wrapper in the layout drives per-language typography.

**The runtime modules are ported JavaScript, not idiomatic React.**
`src/components/site/runtime/*.js` are the prototype's scripts with their logic
intact; only the IIFE wrapper, listener registration and asset lookup changed.
Each exports `init()` and returns a teardown. `SiteRuntime` runs them on every
route change and tears them down again — necessary because Next replaces page
content on navigation while the nav and window persist, so listeners would
otherwise accumulate. They are `.js` on purpose: they are a verbatim port and
are not type-checked.

**Text.** No hardcoded strings in components. Everything lives in both
`src/messages/ja.json` and `src/messages/en.json` under `site.<page>.<section>`,
read with `useTranslations`. The two files stay key-for-key identical (955 keys
each). Headings that break differently per language use next-intl rich text —
note that its parser has no self-closing tag form, so a line break is written
`<br></br>` in the message.

## Known gaps, carried over from the prototype

- **`/[locale]/demo` renders an empty page.** It was empty in the prototype too,
  despite being the target of the site's primary call to action — 104 links
  point at it. Content still needs to be written.
- **The request form composes a `mailto:` draft** to `tharada@the-unchain.com`
  rather than posting anywhere. That is what the prototype did. If this should
  become a real submission, `src/components/site/runtime/chrome.js` is the place.
- **Help centre articles are Japanese only.** The corpus has no English
  translations, so `/en/help` shows the help chrome in English and the article
  text in Japanese. The chrome strings are in `site.help.*` and ready for the
  articles to follow.
- **Only Roboto and Noto Sans JP are self-hosted**, which is what the prototype
  embedded. Earlier style layers still name Newsreader, Instrument Sans and Sora
  in their font stacks, but `07-v6.css` overrides those, so nothing renders in
  them today.
