'use client';
import {PulseMark} from '../PulseMark';
import {useState,useEffect,useRef} from 'react';
import {useTranslations} from 'next-intl';
import s from './WorkflowPreview.module.css';

export function WorkflowPreview({stage}:{stage:number}) {
 const t=useTranslations('site.home.workflowPreview');
 const [organized,setOrganized]=useState(false),[followTab,setFollowTab]=useState('email'),[sent,setSent]=useState(false),[synced,setSynced]=useState(false);
 const [mail,setMail]=useState(t('mailDraft'));
 const [source,setSource]=useState(0);
 const root=useRef<HTMLDivElement>(null);
 const [visible,setVisible]=useState(false),[paused,setPaused]=useState(false),[typed,setTyped]=useState(0),[processing,setProcessing]=useState(false);
 const rough=t('rough');
 useEffect(()=>{if(stage!==1||!root.current)return;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');if(reduced.matches){setOrganized(true);setPaused(true);return;}const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});observer.observe(root.current);return()=>observer.disconnect();},[stage]);
 useEffect(()=>{if(stage!==1||!visible||paused)return;let tick=0;setOrganized(false);setTyped(0);setProcessing(false);const timer=window.setInterval(()=>{tick=(tick+1)%140;setTyped(Math.min(rough.length,Math.floor(tick/40*rough.length)));setProcessing(tick>=40&&tick<55);setOrganized(tick>=55);},100);return()=>window.clearInterval(timer);},[stage,visible,paused,rough]);
 const tabs=stage===1?['myNotes','aiNotes']:['emailTab','crmTab'];
 const selected=stage===1?(organized?1:0):(followTab==='email'?0:1);
 return <div className={s.window} ref={root} data-organized={organized}>
  <header className={s.bar}><b>◉ Pulse</b><span>{t('example')}</span><span aria-hidden="true">•••</span></header>
  <div className={s.heading}><small>09.25 / 13:00 — 13:30 · {t("attendees")}</small><h4>{t('sample')}</h4></div>
  {stage!==0&&<div className={s.tabs}>{tabs.map((key,i)=><button key={key} aria-pressed={selected===i} onClick={()=>{if(stage===1){setPaused(true);setTyped(rough.length);setProcessing(false);setOrganized(i===1)}else setFollowTab(i===0?'email':'crm')}}>{i===0?'▤':'✧'} {t(key)}</button>)}</div>}
  {stage===0&&<div className={s.brief}>
   <div className={s.briefTitle}><b>✧ {t('brief')}</b><small>{t('prepared')}</small></div>
   <p className={s.lead}>{t('briefIntro')}</p>
   <h5>{t('openTitle')}</h5><ul className={s.openItems}>{[1,2,3].map((n)=><li key={n}>{t(`open${n}`)} <span className={s.cite}>{['09/18 · Notes','09/22 · Gmail','Salesforce'][n-1]}</span></li>)}</ul>
   <div className={s.person}><span className={s.avatar}>KT</span><div><h5>{t('people')}</h5><p><b>{t('personName')}</b> — {t('role')}</p><p>{t('personInfo')}</p></div></div>
   <div className={s.context}><b>{t('context')}</b><p>{t('contextBody')}</p><span className={s.cite}>Notion · {t('plan')}</span></div>
   <div className={s.question}><b>{t('questions')}</b><p>{t('questionText')}</p></div>
  </div>}
  {stage===1&&<div className={s.notesLayout}>
   <div className={s.document}>
    {!organized?<><div className={s.toolbar} aria-hidden="true"><b>B</b><i>I</i><u>U</u><span>☷</span><span>↗</span></div><div className={s.rough}>{paused?rough:rough.slice(0,typed)}{!paused&&<span className={s.caret} aria-hidden="true">|</span>}</div><div className={s.recording}><PulseMark/> {t(processing?'organizing':'captureStatus')}</div><button className={s.button} onClick={()=>{setPaused(true);setProcessing(false);setOrganized(true)}}>✧ {t('organize')} →</button></>:<><div className={s.structured}>{[['challenge','challengeBody'],['agreements','agreementBody'],['next','nextBody']].map(([title,body],i)=><section key={title}><h5>{t(title)}</h5><p>{t(body)}</p>{i>0&&<button className={s.sourceButton} onClick={()=>setSource(i-1)}>▤ {t(i===1?'plan':'guide')} <small>[{i}] {i===1?'18:42':'22:10'}</small> ↗</button>}</section>)}</div><button className={s.textButton} onClick={()=>{setPaused(true);setTyped(rough.length);setOrganized(false)}}>← {t('original')}</button></>}
   </div>
   <aside className={s.evidence}><h5>{t('evidence')}</h5>{[0,1].map(i=><button key={i} className={s.evidenceCard} aria-pressed={source===i} onClick={()=>setSource(i)}><small>[{i+1}] {i===0?'18:42 · Tanaka':'22:10 · Taizo'}</small><p>{t(i===0?'quotePlan':'quoteGuide')}</p><strong>▤ {t(i===0?'plan':'guide')}</strong><span>example.com/{i===0?'plan':'onboarding'}</span></button>)}<p className={s.contextNote}>{t('contextBody')}</p></aside>
  </div>}
  {stage===2&&<div className={s.follow}>
   {followTab==='email'?<><div className={s.composerHead}><img src="/assets/gmail.webp" alt="Gmail" width={22} height={22}/><b>{t('ready')}</b></div><div className={s.mailRow}><span>{t('to')}</span><b>Ken Tanaka &lt;tanaka@example.com&gt;</b></div><div className={s.mailRow}><span>{t('subject')}</span><b>{t('subjectText')}</b></div><textarea className={s.mailBody} aria-label={t('emailTab')} value={mail} rows={15} onInput={e=>{e.currentTarget.style.height="auto";e.currentTarget.style.height=e.currentTarget.scrollHeight+"px"}} onChange={e=>{setMail(e.target.value);setSent(false)}}/><div className={s.attachments}><span>▤ {t('plan')}.pdf</span><span>▤ {t('guide')}.pdf</span></div><div className={s.sendRow}><button className={s.button} disabled={sent} onClick={()=>setSent(true)}>{t(sent?'sent':'send')} ↑</button><small>Gmail · Pulse</small></div></>:<><div className={s.composerHead}><img src="/assets/salesforce.webp" alt="Salesforce" width={30} height={22}/><b>Salesforce / {t('sample')}</b></div><p>{t('crmIntro')}</p><div className={s.crmTable}><div className={s.tableHead}><span>{t('field')}</span><span>{t('before')}</span><span>{t('afterValue')}</span></div>{[['deal','oldDeal','newDeal'],['size','unknown','twenty'],['owner','unknown','task'],['due','unknown','friday']].map(([key,before,after])=><div className={s.tableRow} key={key}><b>{t(key)}</b><span>{t(before)}</span><strong>{t(after)}</strong></div>)}</div><div className={s.sendRow}><button className={s.button} disabled={synced} onClick={()=>setSynced(true)}>{t(synced?'applied':'apply')} ✓</button></div><p className={s.contextNote}>{t('knowledge')}</p></>}
  </div>}
  {stage===1&&<button className={s.motionToggle} onClick={()=>{setTyped(rough.length);setPaused(!paused)}} aria-pressed={paused}>{t(paused?'play':'pause')}</button>}
  <div className={s.foot} aria-live="polite">{t('previewNote')}</div>
 </div>;
}
