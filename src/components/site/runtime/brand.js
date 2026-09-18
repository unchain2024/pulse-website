/* Scroll stories, detection demo, context graph and the section reveal animations.
 *
 * Ported from the Pulse single-file prototype. The logic is unchanged; only the
 * IIFE wrapper, global listener registration and asset lookup were adapted so it
 * can be started and stopped by React.
 */
/** @returns {() => void} teardown */
export function init() {

  // Disposables: the prototype ran once on page load, but Next re-renders page
  // content on navigation, so every global binding has to be undoable. The
  // _disposed flag matters because callbacks that are already in flight
  // (document.fonts.ready, a pending observer) would otherwise restart the
  // animation loops against elements React has already removed.
  const _off = [];
  let _disposed = false;
  const _on = (target, type, fn, opts) => {
    const guarded = (...args) => (_disposed ? undefined : fn(...args));
    target.addEventListener(type, guarded, opts);
    _off.push(() => target.removeEventListener(type, guarded, opts));
  };
  const _raf = (fn) => {
    if (_disposed) return 0;
    const id = window.requestAnimationFrame((t) => {
      if (!_disposed) fn(t);
    });
    _off.push(() => window.cancelAnimationFrame(id));
    return id;
  };
  const _later = (fn, ms) => {
    if (_disposed) return 0;
    const id = window.setTimeout(() => {
      if (!_disposed) fn();
    }, ms);
    _off.push(() => window.clearTimeout(id));
    return id;
  };
  const _io = (cb, opts) => {
    const observer = new IntersectionObserver((...args) => {
      if (!_disposed) cb(...args);
    }, opts);
    _off.push(() => observer.disconnect());
    return observer;
  };

  const doc=document.documentElement,clamp=n=>Math.max(0,Math.min(1,n));
  const active=el=>el.closest('.page')?.classList.contains('on')&&el.closest('.lang')?.classList.contains('lang-'+doc.lang)&&!document.body.classList.contains('help-mode');
  const stories=Array.from(document.querySelectorAll('[data-pulse-scroll-story]')).map(section=>({section,buttons:Array.from(section.querySelectorAll('[data-story-view]')),preview:section.querySelector('.feature-story-preview'),lastNatural:-1,auto:false}));
  function natural(s){const vh=window.innerHeight,pr=s.preview.getBoundingClientRect();const target=window.innerWidth<900?Math.min(vh*.88,pr.bottom+(vh-pr.bottom)*.45):vh*.54;let index=0,dist=Infinity;s.buttons.forEach((b,i)=>{const r=b.getBoundingClientRect(),d=Math.abs(r.top+r.height*.5-target);if(d<dist){dist=d;index=i}});return index}
  function highlight(s,index){s.buttons.forEach((b,i)=>{b.removeAttribute('aria-expanded');b.dataset.active=String(i===index);b.setAttribute('aria-current',i===index?'step':'false');b.querySelector('.story-sign').textContent=i===index?'−':'+'});s.section.dataset.scrollPhase=String(index);s.section.style.setProperty('--story-progress',String((index+1)/s.buttons.length));s.section.querySelector('[data-story-counter]').textContent='0'+(index+1)+' / 03'}
  stories.forEach(s=>{highlight(s,0);s.buttons.forEach((b,i)=>_on(b, 'click',()=>{highlight(s,i);if(!s.auto)s.lastNatural=natural(s)}));s.preview.addEventListener('click',e=>{const b=e.target.closest('[data-ud-view]');if(!b)return;const i=s.buttons.findIndex(x=>x.dataset.storyView===b.dataset.udView);if(i>=0){highlight(s,i);s.lastNatural=natural(s)}})});
  let queued=false;
  function update(){queued=false;stories.forEach(s=>{if(!active(s.section))return;const r=s.section.getBoundingClientRect();if(r.top>window.innerHeight*.88||r.bottom<100)return;const index=natural(s);if(index!==s.lastNatural){s.lastNatural=index;s.auto=true;s.buttons[index].click();s.auto=false}})}
  function schedule(){if(!queued&&window.requestAnimationFrame){queued=true;_raf(update)}}
  _on(window, 'scroll',schedule,{passive:true});_on(window, 'resize',schedule,{passive:true});_on(window, 'hashchange',schedule);document.querySelectorAll('[data-lang]').forEach(b=>_on(b, 'click',schedule));

  document.querySelectorAll('[data-pulse-detection]').forEach(root=>{const en=!!root.closest('.lang-en'),t=(j,e)=>en?e:j;root.querySelector('[data-detection-toggle]').addEventListener('click',e=>{const b=e.currentTarget,stop=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(stop));root.querySelector('.pulse-detection-demo').classList.toggle('is-stopped',stop);root.querySelector('[data-detection-title]').textContent=t(stop?'記録を停止しました':'会議を検知しました',stop?'Recording stopped':'Meeting detected');root.querySelector('[data-detection-description]').textContent=t(stop?'会話に合わせて、いつでも再開できます。':'Pulseが端末で記録を始めました。',stop?'Resume when you are ready.':'Pulse started recording on your device.');root.querySelector('[data-detection-state]').textContent=t(stop?'一時停止中':'記録中 · 00:08',stop?'Paused':'Recording · 00:08');b.textContent=t(stop?'デモの記録を再開':'デモの記録を停止',stop?'Resume demo recording':'Stop demo recording')})});

  document.querySelectorAll('[data-pulse-context]').forEach((root,index)=>{
   const en=!!root.closest('.lang-en'),t=(j,e)=>en?e:j;
   const sources={meeting:{type:t('会議の発言 · 09:12','Meeting transcript · 09:12'),title:t('9月18日 / 北星商事との初回ヒアリング','Sep 18 / Hokusei discovery'),quote:t('商談が終わってから、議事録とCRMに同じことを二度入力しています。','After each call, we enter the same information twice: in our meeting notes and in the CRM.')},email:{type:t('フォローメール · 9月22日','Follow-up email · Sep 22'),title:t('北星商事 / 試用範囲のご相談','Hokusei / Proposed pilot scope'),quote:t('まずは営業部20名を対象に検討したいと考えています。現場の入力作業を増やさない運用を優先したいです。','We would like to explore a pilot for 20 people in sales. We want to prioritize a workflow without extra data entry.')},document:{type:t('共有された資料','Shared document'),title:t('セキュリティ確認事項.pdf','Security requirements.pdf'),quote:t('データの保存場所、アクセス権限、退職者のアカウント管理について、社内の確認が必要です。','We need an internal review of data location, access permissions, and account offboarding.')}};
   const records={project:{title:t('北星商事 / 導入検討','Hokusei / Pilot evaluation'),answer:t('会議後の二重入力を減らすため、営業部での試用を検討中。','The sales team is evaluating a pilot to reduce duplicated work after meetings.'),fields:[[t('検討の背景','Background'),t('議事録とCRMの二重入力','Duplicated notes and CRM updates')],[t('関係する人','People'),t('田中 健・原田 大蔵','Ken Tanaka · Taizo Harada')],[t('つながる履歴','History'),t('9/18の会議 → 9/22のメール → 9/25の会議','Sep 18 meeting → Sep 22 email → Sep 25 meeting')]],source:'meeting'},decision:{title:t('営業20名を対象に、試用条件を確認','Explore pilot conditions for 20 sales users'),answer:t('入力負荷を増やさないことが共通の条件。試用開始日まで決まった、と解釈しないように分けて記録。','Avoiding extra data entry is a shared condition. This is recorded separately from the pilot start date, which has not been agreed.'),fields:[[t('共有された方針','Direction'),t('営業部20名で検討','Evaluate with 20 sales users')],[t('重視する条件','Key condition'),t('現場の入力を増やさない','No extra data entry')],[t('参照元','Source'),t('9/22のメール・9/25の会議','Sep 22 email · Sep 25 meeting')]],source:'email'},open:{title:t('確認が残っていること','What is still open'),answer:t('導入に向けた確認事項を、合意済みの内容と分けて保持。次の提案やフォローアップの前提に使えます。','Keep open requirements separate from what has been agreed, ready for the next proposal or follow-up.'),fields:[[t('確認事項','To confirm'),t('保存場所・アクセス権限・アカウント管理','Data location, access, account management')],[t('未合意','Not agreed'),t('試用の開始日','Pilot start date')],[t('次の対応','Next action'),t('セキュリティ資料と料金案を共有','Share security documents and pricing')]],source:'document'}};
   let selected='project';const buttons=[...root.querySelectorAll('[data-context-tab]')],panel=root.querySelector('.pulse-context-answer'),preview=root.querySelector('.pulse-source-preview');panel.id='pulse-context-panel-'+index;
   function source(key){const s=sources[key];root.querySelector('[data-source-type]').textContent=s.type;root.querySelector('[data-source-title]').textContent=s.title;root.querySelector('[data-source-quote]').textContent=s.quote;preview.hidden=false;root.querySelectorAll('[data-context-source]').forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.contextSource===key)));root.querySelector('[data-context-evidence]').setAttribute('aria-expanded','true')}
   function close(){preview.hidden=true;root.querySelectorAll('[data-context-source],[data-context-evidence]').forEach(b=>b.setAttribute('aria-expanded','false'))}
   function choose(key,focus=false){selected=key;const r=records[key];buttons.forEach(b=>{b.id='pulse-context-'+index+'-'+b.dataset.contextTab;b.setAttribute('aria-controls',panel.id);b.setAttribute('aria-selected',String(b.dataset.contextTab===key));b.tabIndex=b.dataset.contextTab===key?0:-1;if(b.dataset.contextTab===key){panel.setAttribute('aria-labelledby',b.id);if(focus)b.focus()}});root.querySelector('[data-context-title]').textContent=r.title;root.querySelector('[data-context-answer]').textContent=r.answer;const dl=root.querySelector('[data-context-fields]');dl.replaceChildren();r.fields.forEach(([term,value])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=term;dd.textContent=value;dl.append(dt,dd)});close()}
   buttons.forEach((b,i)=>{_on(b, 'click',()=>choose(b.dataset.contextTab));_on(b, 'keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();choose(buttons[(i+(e.key==='ArrowRight'?1:buttons.length-1))%buttons.length].dataset.contextTab,true)}})});
   root.querySelectorAll('[data-context-source]').forEach(b=>_on(b, 'click',()=>source(b.dataset.contextSource)));root.querySelector('[data-context-evidence]').addEventListener('click',()=>source(records[selected].source));root.querySelector('[data-context-close]').addEventListener('click',close);choose('project');
  });

  document.querySelectorAll('[data-pulse-handoff]').forEach(root=>{const en=!!root.closest('.lang-en');root.querySelector('[data-handoff-copy]').addEventListener('click',async()=>{const box=root.querySelector('.pulse-handoff-document'),text=box.innerText||box.textContent,status=root.querySelector('.pulse-copy-status');try{await navigator.clipboard.writeText(text);status.textContent=en?'Context copied.':'会議の文脈をコピーしました。'}catch(e){let area=root.querySelector('.pulse-clipboard-fallback');if(!area){area=document.createElement('textarea');area.className='pulse-clipboard-fallback';area.setAttribute('aria-label',en?'Context to copy':'コピーする会議の文脈');box.after(area)}area.value=text;area.focus();area.select();status.textContent=en?'Context selected. Use your keyboard to copy.':'文脈を選択しました。キーボード操作でコピーできます。'}})});
  if(window.IntersectionObserver){const obs=_io(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -24px 0px'});document.querySelectorAll('.pulse-section-copy,.pulse-context-heading,.pulse-detection-demo,.pulse-context-board,.pulse-vocabulary-demo,.pulse-handoff-demo').forEach(el=>{el.classList.add('g-reveal');obs.observe(el)})}
  document.fonts?.ready.then(schedule);schedule();

  return () => {
    _disposed = true;
    for (const fn of _off.splice(0)) {
      try { fn(); } catch { /* teardown is best effort */ }
    }
  };
}
