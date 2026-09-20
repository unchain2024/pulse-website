"use client";
import Link from "next/link";
import {useState} from "react";
import {useTranslations,useLocale} from "next-intl";
import s from "./Vocabulary.module.css";
const apps=[['Slack','slack.webp'],['Teams','microsoft-teams.webp'],['Google Drive','google-drive.webp'],['Notion','notion.webp'],['Salesforce','salesforce.webp'],['kintone','kintone.webp']];
const sources=[[2,4],[0,3,1],[1,5],[3,2]];
export function PulseVocabulary(){
 const t=useTranslations('site.home.pulseVocabulary'),v=useTranslations('site.home.glossary'),locale=useLocale();
 const [selected,setSelected]=useState(1),[query,setQuery]=useState(''),[confirmed,setConfirmed]=useState<number[]>([]);
 const logo=(i:number)=><img src={'/assets/'+apps[i][1]} alt={apps[i][0]} width="20" height="20"/>;
 return <section className={s.section} id="dictionary"><div className="wrap">
 <div className={s.copy}><span className="eyebrow">{t('companyIndustryContext')}</span><h2>{t.rich('learnCompanySLanguage',{br:()=> <br/>})}</h2><p className={s.intro}>{v('explainTitle')}</p><ol className={s.explanations}>{[0,1,2].map(i=><li key={i}><span>0{i+1}</span><div><h3>{v(`explain${i}`)}</h3><p>{v(`explain${i}Body`)}</p></div></li>)}</ol><Link className="text-link" href={`/${locale}/integrations#technology`}>{t('howContextLayerWorks')}</Link></div>
 <div className={s.window}><div className={s.bar}><strong>Pulse <span>/ {v('title')}</span></strong><small>{v('connected')}</small><div>{apps.map((_,i)=><span key={i}>{logo(i)}</span>)}</div></div>
 <div className={s.workspace}><div className={s.list}><label className={s.search}><span aria-hidden="true">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={v('search')} aria-label={v('search')}/></label>
 <div className={s.columns}><span>{v('term')}</span><span>{v('meaning')}</span><span>{v('source')}</span></div>
 {[0,1,2,3].filter(i=>(v(`t${i}`)+v(`m${i}`)).toLowerCase().includes(query.toLowerCase())).map(i=><button className={s.row} key={i} aria-pressed={selected===i} aria-controls="glossary-detail" onClick={()=>setSelected(i)}><strong>{v(`t${i}`)}</strong><span>{v(`m${i}`)}<small>{v(`s${i}`)}</small></span><span className={s.logos}>{sources[i].map(n=><span key={n}>{logo(n)}</span>)}</span></button>)}
 {![0,1,2,3].some(i=>(v(`t${i}`)+v(`m${i}`)).toLowerCase().includes(query.toLowerCase()))&&<p>{v('empty')}</p>}
 </div><aside className={s.detail} id="glossary-detail" aria-live="polite"><div className={s.detailHead}><h3>{v(`t${selected}`)}</h3><span>{v(confirmed.includes(selected)?'confirmed':'candidate')}</span></div><dl>{['canonical','alias','scope'].map((key,i)=><div key={key}><dt>{v(key)}</dt><dd>{v(`${['m','a','s'][i]}${selected}`)}</dd></div>)}</dl><h4>{v('evidence')}</h4>{sources[selected].map((n,k)=><div className={s.evidence} key={n}>{logo(n)}<div><strong>{apps[n][0]}<small>09.{18+k}</small></strong><p>{v(`q${selected}${k}`)}</p></div></div>)}<button className={s.confirm} disabled={confirmed.includes(selected)} onClick={()=>setConfirmed([...confirmed,selected])}>{v(confirmed.includes(selected)?'confirmed':'save')} <span aria-hidden="true">✓</span></button></aside></div>
 <p className={s.foot}>{v('note')}</p></div></div></section>;
}
