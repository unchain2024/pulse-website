"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./Ontology.module.css";

const nodes = ["project", "person", "statement", "decision", "action", "result"] as const;
type Node = (typeof nodes)[number];


export function Technology() {
  const t = useTranslations("site.integrations.ontology");
  const [selected, setSelected] = useState<Node>("decision");
  return (
    <section id="technology" data-section="technology" className={styles.section} aria-labelledby="ontology-title">
      <div className="wrap">
        <header className={styles.heading}>
          <span>{t("eyebrow")}</span>
          <h2 id="ontology-title">{t.rich("title", { part: chunks => <span className={styles.titlePart}>{chunks}</span> })}</h2>
          <p>{t("description")}</p>
        </header>
        <div className={styles.canvas}>
          <div className={styles.canvasBar}><span>{t("example")}</span><small>{t("sample")}</small></div>
          <div className={styles.diagram}>
            <div className={styles.loop}><span>{t('pendingLoop')}</span></div>
            <div className={styles.laneLabels}><span>{t('schema')}</span><span>{t('records')}</span></div>
            <ol className={styles.nodes}>{nodes.map((node,index)=><li key={node} className={styles.node}>
              <div className={styles.type}><small>0{index+1}</small><h3>{t(`${node}Type`)}</h3></div>
              <div className={styles.stem}><span>{t('instance')}</span></div>
              <button className={styles.record} aria-pressed={selected===node} aria-controls="ontology-detail" onClick={()=>setSelected(node)}><strong>{t(`${node}Value`)}</strong><small>{t(`${node}Meta`)}</small></button>
              {index<nodes.length-1&&<><div className={styles.relation}><span>{t(`${node}Relation`)}</span><i aria-hidden="true">→</i></div><div className={styles.recordArrow} aria-hidden="true">→</div></>}
            </li>)}</ol>
            <div className={styles.bottomLoop}><span>{t('pendingLoop')}</span></div>
          </div>
          <div className={styles.detail} id="ontology-detail" role="region" aria-label={t("detail")} aria-live="polite">
            <div><span className={styles.detailLabel}>0{nodes.indexOf(selected) + 1} / {t(`${selected}Type`)}</span><p>{t(`${selected}Detail`)}</p></div>
            <div className={styles.evidence}><span className={styles.detailLabel}>{t("evidence")}</span><p>{t(`${selected}Source`)}</p></div>
          </div>
          <div className={styles.caption}>{t("note")}</div>
        </div>
        <div className={styles.outcome}><p>{t("outcome")}</p><span>{t("permissions")}</span></div>
      </div>
    </section>
  );
}
