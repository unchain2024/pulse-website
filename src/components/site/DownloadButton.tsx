'use client';
import {useLocale,useTranslations} from 'next-intl';
import {useEffect,useState,type ReactNode} from 'react';
import {DOWNLOADS,PLATFORM_NAME,detectPlatform,type Platform} from '@/lib/download';
import {withUtm} from '@/lib/utm';

/**
 * Discord-style direct download CTA. Detects the visitor's OS on mount and becomes
 * "Download for Windows" / "Download for macOS" linking straight to the installer.
 * Phones/tablets get a "coming soon" note; unknown desktops fall back to the /download page.
 */
export function DownloadButton({className,arrow}:{className?:string;arrow?:ReactNode}){
  const t=useTranslations('site.downloadButton');
  const locale=useLocale();
  const [platform,setPlatform]=useState<Platform|undefined>(undefined);
  useEffect(()=>{setPlatform(detectPlatform())},[]);

  if(platform==='mobile')return <span className={`${className??''} dl-soon`} role="note">{t('comingSoon')}</span>;
  if(platform==='windows'||platform==='mac'){
    const d=DOWNLOADS[platform];
    return <a className={className} href={withUtm(d.href)} download={d.file}>{t('for',{platform:PLATFORM_NAME[platform]})} {arrow}</a>;
  }
  return <a className={className} href={`/${locale}/download`}>{t('generic')} {arrow}</a>;
}
