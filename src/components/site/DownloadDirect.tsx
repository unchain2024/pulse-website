'use client';
import {useLocale,useTranslations} from 'next-intl';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import s from './ContactForm.module.css';
import {DOWNLOADS,PLATFORM_NAME,detectPlatform,type DesktopPlatform,type Platform} from '@/lib/download';
import {withUtm} from '@/lib/utm';

/** Fallback /download page: installer links without the form. The form lives in DownloadForm.tsx and is not mounted. */
export function DownloadDirect(){
  const t=useTranslations('site.download');
  const tb=useTranslations('site.downloadButton');
  const locale=useLocale();
  const [platform,setPlatform]=useState<Platform>(null);
  useEffect(()=>{setPlatform(detectPlatform())},[]);

  const options:Array<{key:DesktopPlatform;label:string;hint:string}>=[
    {key:'windows',label:t('windows'),hint:t('windowsHint')},
    {key:'mac',label:t('mac'),hint:t('macHint')},
  ];
  if(platform==='mac')options.reverse();

  return <section className={`${s.page} wrap`}>
    <div className={s.copy}>
      <small>{t('eyebrow')}</small>
      <h1>{t('title')}</h1>
      <p>{t('directIntro')}</p>
      <ul>{['benefitOne','benefitTwo','benefitThree'].map((key,i)=><li key={key}><span>0{i+1}</span>{t(key)}</li>)}</ul>
      <a href="mailto:contact@the-unchain.com">contact@the-unchain.com ↗</a>
    </div>
    <div className={`${s.form} ${s.ready}`}>
      <span className={s.readyIcon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
      </span>
      <h2>{t('title')}</h2>
      <p>{platform==='mobile'?tb('comingSoon'):t('readyBody')}</p>
      <div className={s.downloads}>
        {options.map(o=>{
          const d=DOWNLOADS[o.key];
          const rec=platform===o.key;
          return <a key={o.key} href={withUtm(d.href)} download={d.file} className={`${s.dl} ${rec?s.dlPrimary:''}`}>
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
  </section>;
}
