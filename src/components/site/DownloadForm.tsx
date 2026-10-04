'use client';
import {useLocale,useTranslations} from 'next-intl';
import Link from 'next/link';
import {useEffect,useState,type FormEvent} from 'react';
import s from './ContactForm.module.css';

/** Web3Forms access key for the download form (separate from the contact form's key). */
const WEB3FORMS_ACCESS_KEY=process.env.NEXT_PUBLIC_WEB3FORMS_DOWNLOAD_ACCESS_KEY??'08dca2aa-c14c-429b-8007-564bc5dfbae3';

/** Installer files live in /public/downloads. Replace the files there (or the paths here) when a new build ships. */
export const DOWNLOADS={
  windows:{href:'/downloads/Pulse-Setup.exe',file:'Pulse-Setup.exe'},
  mac:{href:'/downloads/Pulse.dmg',file:'Pulse.dmg'},
} as const;

/** Same fields as the contact form; field labels are reused from the site.contact namespace. */
const fields=['name','company','email','personal','role','topic','teamSize','meetings','message'];
type Status='idle'|'sending'|'sent'|'error';
type Platform='windows'|'mac'|null;

function detectPlatform():Platform{
  if(typeof navigator==='undefined')return null;
  const ua=navigator.userAgent;
  if(/Windows/i.test(ua))return 'windows';
  if(/Macintosh|Mac OS X/i.test(ua))return 'mac';
  return null;
}

export function DownloadForm(){
  const t=useTranslations('site.download');
  const tc=useTranslations('site.contact');
  const locale=useLocale();
  const [status,setStatus]=useState<Status>('idle');
  const [platform,setPlatform]=useState<Platform>(null);
  useEffect(()=>{setPlatform(detectPlatform())},[]);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(status==='sending')return;
    const form=e.currentTarget;
    const data=new FormData(form);
    const payload:Record<string,string>={access_key:WEB3FORMS_ACCESS_KEY,subject:'Pulse — '+t('title'),from_name:'Pulse Website',botcheck:String(data.get('botcheck')??'')};
    for(const k of fields){const v=data.get(k);if(v)payload[tc(k)]=String(v);}
    const email=data.get('email');if(email)payload.replyto=String(email);
    if(platform)payload.Platform=platform==='mac'?'macOS':'Windows';
    setStatus('sending');
    try{
      const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)});
      const json=await res.json();
      if(!res.ok||!json.success)throw new Error(json.message||'Submit failed');
      form.reset();
      setStatus('sent');
    }catch{setStatus('error');}
  }

  const options:Array<{key:'windows'|'mac';label:string;hint:string}>=[
    {key:'windows',label:t('windows'),hint:t('windowsHint')},
    {key:'mac',label:t('mac'),hint:t('macHint')},
  ];
  if(platform==='mac')options.reverse();

  return <section className={`${s.page} wrap`}>
    <div className={s.copy}>
      <small>{t('eyebrow')}</small>
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>
      <ul>{['benefitOne','benefitTwo','benefitThree'].map((key,i)=><li key={key}><span>0{i+1}</span>{t(key)}</li>)}</ul>
      <h2>{t('process')}</h2>
      <p>{t('processBody')}</p>
      <a href="mailto:contact@the-unchain.com">contact@the-unchain.com ↗</a>
    </div>

    {status==='sent'
      ? <div className={`${s.form} ${s.ready}`} role="status" aria-live="polite">
          <span className={s.readyIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
          </span>
          <h2>{t('readyTitle')}</h2>
          <p>{t('readyBody')}</p>
          <div className={s.downloads}>
            {options.map(o=>{
              const d=DOWNLOADS[o.key];
              const rec=platform===o.key;
              return <a key={o.key} href={d.href} download={d.file} className={`${s.dl} ${rec?s.dlPrimary:''}`}>
                <span className={s.dlIcon} aria-hidden="true">
                  {o.key==='windows'
                    ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5 11 4.4v7.1H3V5.5Zm0 13L11 19.6v-7.1H3v6Zm9 1.3L21 21v-8.5h-9v7.3Zm0-15.6v7.3h9V3L12 4.2Z"/></svg>
                    : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.1.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7 0 0-2.6-1-2.7-4.1ZM14.1 5.8c.6-.8 1.1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3Z"/></svg>}
                </span>
                <span className={s.dlText}>
                  <strong>{o.label}</strong>
                  <small>{o.hint}{rec?` · ${t('recommended')}`:''}</small>
                </span>
                <span className={s.dlArrow} aria-hidden="true">↓</span>
              </a>;
            })}
          </div>
          <p>{t('needHelp')} <Link href={`/${locale}/help`}>{t('helpLink')} →</Link></p>
        </div>
      : <form className={s.form} onSubmit={submit}>
          <h2>{t('formTitle')}</h2>
          <input type="checkbox" name="botcheck" className={s.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true"/>
          <div className={s.grid}>
            {['name','company','email','personal','role'].map(k=><label key={k}>{tc(k)}<input name={k} type={k==='email'||k==='personal'?'email':'text'} required={!['personal','role'].includes(k)} autoComplete={k==='company'?'organization':k==='personal'?'email':k==='role'?'organization-title':k}/></label>)}
            <label>{tc('topic')}<select name="topic" defaultValue=""><option value="" disabled>{tc('select')}</option>{['topicTrial','topicRollout','topicOther'].map(k=><option key={k}>{tc(k)}</option>)}</select></label>
            {[['teamSize',['1','2–5','6–20','21–100','101+']],['meetings',['0–4','5–10','11–20','21+']]].map(([key,options])=><label key={key as string}>{tc(key as string)}<select name={key as string} required defaultValue=""><option value="" disabled>{tc('select')}</option>{(options as string[]).map(v=><option key={v}>{v}</option>)}</select></label>)}
          </div>
          <label>{tc('message')}<textarea name="message" rows={5} required defaultValue={t('initial')} onInput={e=>{e.currentTarget.style.height='auto';e.currentTarget.style.height=e.currentTarget.scrollHeight+'px'}}/></label>
          <button type="submit" className="btn btn-dark" disabled={status==='sending'}>{status==='sending'?tc('sending'):t('send')+' →'}</button>
          {status==='error'?<p className={s.err} role="alert">{tc('error')}</p>:<p>{t('note')}</p>}
        </form>}
  </section>;
}
