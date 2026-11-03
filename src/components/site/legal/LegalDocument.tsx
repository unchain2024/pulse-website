import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

/**
 * One renderer for the legal pages (privacy, terms, subprocessors, external transmission).
 *
 * Each page's messages hold the document as data under its namespace:
 *   title, updated, intro: string[], sections: [{ heading, blocks: [{ p } | { h3 } | { ul: string[] } | { table: { head, rows } }] }]
 * The two locale files keep the same shape, so every string is read by its path (sections.2.blocks.0.p) with rich text,
 * which is where the links below come from. Tags a message may use: b, privacy, terms, security, subprocessors, external,
 * contact, mail, ppc, ppcus, ppcin.
 */

type Block = { p: string } | { h3: string } | { ul: string[] } | { table: { head: string[]; rows: string[][] } };
type Section = { heading: string; blocks: Block[] };

const PRIVACY_EMAIL = "privacy@the-unchain.com";
/** The Personal Information Protection Commission's survey of foreign personal information protection systems (APPI Art. 28, Rules Art. 17) */
const PPC_FOREIGN_SYSTEMS = "https://www.ppc.go.jp/personalinfo/legal/kaiseihogohou/#gaikoku";
const PPC_REPORT_US = "https://www.ppc.go.jp/files/pdf/USA_report.pdf";
const PPC_REPORT_INDIA = "https://www.ppc.go.jp/files/pdf/india_report.pdf";

export function LegalDocument({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const locale = useLocale();

  const page = (path: string) => (chunks: ReactNode) => (
    <Link className="link" href={`/${locale}/${path}`}>{chunks}</Link>
  );
  const outside = (href: string) => (chunks: ReactNode) => (
    <a className="link" href={href} target="_blank" rel="noopener noreferrer">{chunks}</a>
  );
  const tags = {
    b: (chunks: ReactNode) => <strong>{chunks}</strong>,
    privacy: page("privacy"),
    terms: page("terms"),
    security: page("security"),
    subprocessors: page("subprocessors"),
    external: page("external-transmission"),
    contact: page("contact"),
    mail: (chunks: ReactNode) => <a className="link" href={`mailto:${PRIVACY_EMAIL}`}>{chunks}</a>,
    ppc: outside(PPC_FOREIGN_SYSTEMS),
    ppcus: outside(PPC_REPORT_US),
    ppcin: outside(PPC_REPORT_INDIA),
  };
  const rich = (key: string) => t.rich(key, tags);

  const intro = t.raw("intro") as string[];
  const sections = t.raw("sections") as Section[];

  return (
    <div className="legal-doc">
      <h1>{t("title")}</h1>
      <p className="upd">{t("updated")}</p>
      {intro.map((_, i) => (
        <p key={i}>{rich(`intro.${i}`)}</p>
      ))}
      {sections.map((section, s) => (
        <Fragment key={s}>
          <h2>{t(`sections.${s}.heading`)}</h2>
          {section.blocks.map((block, b) => {
            const at = `sections.${s}.blocks.${b}`;
            if ("p" in block) return <p key={b}>{rich(`${at}.p`)}</p>;
            if ("h3" in block) return <h3 key={b}>{t(`${at}.h3`)}</h3>;
            if ("ul" in block) {
              return (
                <ul key={b}>
                  {block.ul.map((_, i) => (
                    <li key={i}>{rich(`${at}.ul.${i}`)}</li>
                  ))}
                </ul>
              );
            }
            return (
              <div key={b} className="legal-table">
                <table>
                  <thead>
                    <tr>
                      {block.table.head.map((_, i) => (
                        <th key={i} scope="col">{t(`${at}.table.head.${i}`)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((_, c) => (
                          <td key={c}>{rich(`${at}.table.rows.${r}.${c}`)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}
