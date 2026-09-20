import {PulseMark} from './PulseMark';
import Link from 'next/link';
import {useTranslations,useLocale} from 'next-intl';
import s from './Footer.module.css';
export function Footer(){const t=useTranslations('site.footer'),locale=useLocale();
 const links=(items:string[][])=>items.map(([key,path])=><li key={key}>{t.rich(key,{a:c=><Link href={`/${locale}/${path}`}>{c}</Link>})}</li>);
 return <footer className={s.footer}><div className="wrap"><div className={s.top}><div className={s.brand}><Link href={`/${locale}`} className={s.logo}><PulseMark/>Pulse</Link><p>{t('tagline')}</p><a href="https://www.the-unchain.com/" className={s.by}>BY UNCHAIN ↗</a></div><nav className={s.columns}><div><h4>{t('resources')}</h4><ul>{links([['helpCenter','help'],['security','security'],['contactUs','contact']])}</ul></div><div><h4>{t('company')}</h4><ul><li><a href="https://www.the-unchain.com/">UNCHAIN ↗</a></li></ul></div></nav></div><div className={s.bottom}><span>{t('unchainInc2026')}</span><ul>{links([['terms','terms'],['privacy','privacy']])}</ul></div><div className={s.largeBrand} aria-hidden="true"><svg viewBox="0 0 820 275" aria-hidden="true"><image href="/assets/pulse-mark.svg" x="0" y="57" width="150" height="168"/><text x="180" y="235" fill="currentColor" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="250" letterSpacing="-6">Pulse</text></svg></div></div></footer>
}
