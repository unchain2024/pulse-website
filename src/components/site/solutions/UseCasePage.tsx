import Link from 'next/link';
import {useTranslations,useLocale} from 'next-intl';
import {UseCaseVisual,type Sector} from './UseCaseVisual';
import s from './UseCase.module.css';
export function UseCasePage({sector}:{sector:Sector}){
 const t=useTranslations(`site.useCases.${sector}`),c=useTranslations('site.useCases.common'),locale=useLocale();
 const visual=(kind:Parameters<typeof UseCaseVisual>[0]['kind'])=><UseCaseVisual sector={sector} kind={kind}/>;
 return <div className={`page on ${s.page}`} data-page={`solutions-${sector}`} data-sector={sector}>
 <section className={`${s.container} ${s.hero}`}><div className={s.heroCopy}><span className={s.eyebrow}>Pulse for {t('label')}</span><h1>{t('headline')}</h1><p>{t('intro')}</p><Link className={s.primary} href={`/${locale}/contact`}>{c('cta')} <span>↗</span></Link></div>{visual('hero')}</section>
 <section className={`${s.container} ${s.meetingSection}`}><div className={s.stickyHeading}><h2>{c('meetingHeading')}</h2></div><div className={s.meetingFeatures}>{[['brief','briefBody','brief'],['noBot','noBotBody','bot'],['attention','attentionBody','notes']].map(([head,body,kind])=><article key={kind}><h3>{c(head)}</h3><p>{kind==='bot'?c(body):t(body)}</p>{visual(kind as 'brief'|'bot'|'notes')}</article>)}</div></section>
 <section className={`${s.container} ${s.section}`}><div className={s.splitHead}><div><h2>{c('momentum')}</h2></div><p>{t('momentumBody')}</p></div><div className={s.pair}>{[['email','follow','followBody'],['sync','sync','syncBody']].map(([kind,head,body])=><article key={kind}>{visual(kind as 'email'|'sync')}<h3>{c(head)}</h3><p>{t(body)}</p></article>)}</div></section>
 <section className={`${s.container} ${s.section}`}><div className={s.splitHead}><div><h2>{t('searchTitle')}</h2></div><p>{t('searchBody')}</p></div>{visual('search')}</section>
 <section className={`${s.container} ${s.exampleSection}`}>{visual('example')}<div><span className={s.eyebrow}>{c('exampleLabel')}</span><h2>{t('exampleTitle')}</h2><p>{t('exampleBody')}</p><small>{c('sample')}</small></div></section>
 <section className={`${s.container} ${s.platformSection}`}><div><h2>{c('platforms')}</h2><p>{c('platformsBody')}</p></div>{visual('platforms')}</section>
 <section className={`${s.container} ${s.toolsSection}`}>{visual('tools')}<div><h2>{c('toolsHeading')}</h2><p>{c('toolsBody')}</p><Link className={s.textLink} href={`/${locale}/integrations`}>{c('integrations')} ↗</Link></div></section>
 <section className={s.security}><div className={s.container}><div className={s.splitHead}><h2>{c('securityTitle')}</h2><p>{c('securityIntro')}</p></div><div className={s.securityGrid}>{[0,1,2,3,4,5].map(i=><article key={i}><span>0{i+1}</span><h3>{c(`security${i}`)}</h3><p>{c(`security${i}Body`)}</p></article>)}</div><Link className={s.outline} href={`/${locale}/security`}>{c('securityLink')} ↗</Link></div></section>
 <section className={s.roles}><div className={s.container}><span className={s.eyebrow}>PULSE FOR {t('label')}</span><h2>{c('rolesTitle')}</h2><div>{[0,1,2].map(i=><article key={i}><small>0{i+1}</small><h3>{t(`role${i}`)}</h3><p>{t(`role${i}Body`)}</p></article>)}</div></div></section>
 <section className={s.end}><div className={s.endSheet}><span className={s.eyebrow}>YOUR NEXT CONVERSATION</span><h2>{c('endTitle')}</h2><p>{c('endBody')}</p><div><Link className={s.primary} href={`/${locale}/contact`}>{c('cta')} ↗</Link><Link className={s.textLink} href={`/${locale}/pricing`}>{c('pricing')} →</Link></div></div></section>
 </div>;
}
