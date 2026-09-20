'use client';
import {useState,useEffect} from 'react';
import {useTranslations,useLocale} from 'next-intl';
import Link from 'next/link';
import {PulseMark} from '../PulseMark';
import {GOpening} from './GOpening';
import {WorkflowPreview} from './WorkflowPreview';
import {PulseVocabulary} from './PulseVocabulary';
import {PulseAiHandoff} from './PulseAiHandoff';
import {PHelpTeaser} from './PHelpTeaser';
import s from './EditorialHome.module.css';

function Scene({kind}:{kind:'bot'|'apps'|'share'|'room'|'calendar'}){
 const t=useTranslations('site.home.v7Capabilities'),e=useTranslations('site.home.editorial'),sc=useTranslations('site.home.scenes');
 const [shared,setShared]=useState(false),[person,setPerson]=useState(0),[brief,setBrief]=useState(false);
 return <div className={`${s.scene} ${s[kind]}`}>
 {kind==='bot'&&<><div className={s.botDocument}><div className={s.windowChrome}><span>● ● ●</span><PulseMark/><span>···</span></div><h3>{t('salesTeamSync')}</h3><small className={s.meetingMeta}>{e('todayParticipants')}</small><p>{e('writeNotes')}</p></div><div className={s.videoGrid}><img src="/assets/pulse-editorial-portraits.png" alt={t('meetingAppExamples')}/><div>● ● <b>⌁</b></div></div><div className={s.recorderPanel}><div className={s.recorder}><PulseMark/><div className={s.audioBars} aria-hidden="true"><i/><i/><i/></div><small>{t('recording0008')}</small></div></div></>}
 {kind==='apps'&&<div className={s.appTiles}>{[['Zoom','zoom.svg'],['Google Meet','google-meet.svg'],['Microsoft Teams','microsoft-teams.svg']].map(([label,file])=><div key={label}><img src={'/assets/'+file} alt={label}/><span>{label}</span></div>)}</div>}
 {kind==='share'&&<><div className={s.shareNote}><div className={s.windowChrome}><span>● ● ●</span><PulseMark/><span className={s.shareBadge}>♙ {e('share')}</span></div><h3>{t('hokuseiTradingDiscovery')}</h3><div className={s.meetingMeta}>✧ {e('enhanced')}　 ·　{e('todayParticipants')}</div><h4>{t('summaryAgreements')}</h4><ul><li>{e('agreementOne')}</li><li>{e('agreementTwo')}</li></ul><div className={s.privateBadge}>♙ {e('private')}</div></div><div className={s.shareDialog}><h4>{e('share')}</h4><small>{e('team')}</small><div className={s.sharePerson}><b>T</b><span>{e('teamPerson')}<small>tanaka@example.com</small></span></div><div className={s.sharePerson}><b>S</b><span>{e('teamPersonTwo')}<small>sato@example.com</small></span></div><hr/><small>{e('external')}</small><div className={s.sharePerson}><b>K</b><span>{e('externalPerson')}<small>partner@example.com</small></span></div><p>✓ {t('summaryAgreements')}　✓ {t('sharedDocuments')}</p><button onClick={()=>setShared(true)} disabled={shared}>{e(shared?'shared':'shareButton')} ↗</button></div></>}
 {kind==='room'&&<><img className={s.roomDrawing} src="/assets/pulse-editorial-room.png" alt={e('inPerson')}/><div className={s.speakerBar}>{['A','B','C','D'].map((letter,i)=><button key={letter} aria-pressed={person===i} onClick={()=>setPerson(i)}>{letter}</button>)}<p>{['A','B','C','D'][person]} · {sc('quote'+['A','B','C','D'][person])}</p></div></>}
 {kind==='calendar'&&<div className={s.desktop}><div className={s.desktopBar}><PulseMark/><span>▱　☷　⌕　◉　9月25日 09:59</span></div><div className={s.notification}><div><h3>{t('salesTeamSync')}</h3><small>10:00 — 10:30</small></div><button onClick={()=>setBrief(!brief)}><PulseMark/>{e('joinNotes')}</button></div>{brief&&<div className={s.calendarBrief}><b>{t('briefReady')}</b><p>{t.rich('reviewImplementationRequirementsDiscuss',{br:()=> <br/>})}</p></div>}</div>}

 </div>
}
export function EditorialHome(){
 const locale=useLocale(),m=useTranslations('site.home.gMeetings'),e=useTranslations('site.home.editorial'),v=useTranslations('site.home.v7Capabilities'),memory=useTranslations('site.home.memoryInteractive'),end=useTranslations('site.useCases.common');
 const [answer,setAnswer]=useState(false),[stage,setStage]=useState(0);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)setStage(Number(entry.target.id.slice(-1)));}},{rootMargin:'-15% 0px -55% 0px'});document.querySelectorAll('[id^=pulse-stage-]').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);
 const features=[['captureWithoutMeetingBot','bot'],['useUsualMeetingApp','apps'],['privateFirstShareChoice','share'],['notesPersonConversationsUse','room'],['calendarConnected','calendar']] as const;
 return <div className={`page granola-home pulse-home v7-home on ${s.home}`} data-page="home">
 <GOpening/>
 <section className={`${s.container} ${s.workflow}`}><h2>{m.rich('beforeDuringAfterEvery',{br:()=> <br/>})}</h2><div className={s.workflowGrid}><nav aria-label={m('beforeDuringAfter')}>{['beforeMeeting','meeting','afterMeeting'].map((key,i)=><a key={key} href={`#pulse-stage-${i}`} aria-current={stage===i?'step':undefined}>{m(key)}</a>)}</nav><div>{[['briefReadyMeeting','useCalendarEventsCustomer'],['conversationNotesTogether','transcribeAudioDeviceKeep'],['notesNextStepsReady','organizeAgreementsOpenQuestions']].map(([title,body],i)=><article id={`pulse-stage-${i}`} key={i}><h3>{m(title)}</h3><p>{m(body)}</p><div className={s.workflowImage}><WorkflowPreview stage={i}/></div></article>)}</div></div></section>
 <section className={s.memory}><div className={s.container}><div><span>Pulse Chat</span><h2>{memory.rich('askAcrossMeetingHistory',{br:()=> <br/>})}</h2><p>{memory('whatDidCommitWeek')}</p></div><div className={s.prompt}><p>{e('question')}</p>{answer?<div aria-live="polite"><p>{e('answer')}</p><small>{e('source')}</small></div>:<button onClick={()=>setAnswer(true)}>{e('ask')} ↗</button>}<div className={s.promptBottom}><span>▤ {e('source')}</span><b>↑</b></div></div></div></section>
 <section className={`${s.container} ${s.features}`}><header><span>{e('featureLabel')}</span><h2>{v.rich('whereverMeetHoweverWork',{br:()=> <br/>})}</h2><Link className={s.cta} href={`/${locale}/contact`}>{e('trial')} ↗</Link></header>{features.map(([key,kind])=><article key={key}><div className={s.featureHead}>{v.rich(key,{strong:chunks=><h3>{chunks}</h3>,span:chunks=><p>{chunks}</p>})}</div><Scene kind={kind}/></article>)}</section>
 <div className={s.dictionary}><PulseVocabulary/></div>
 <div className={s.mcp}><PulseAiHandoff/></div>
 <div className={s.help}><PHelpTeaser/></div>
 <section className={s.end}><div><small>PULSE BY UNCHAIN</small><h2>{end('endTitle')}</h2><p>{end('endBody')}</p><Link className={s.cta} href={`/${locale}/contact`}>{e('trial')} ↗</Link></div></section>
 </div>
}
