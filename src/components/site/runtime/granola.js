/* Scroll-driven opening sequence and the meeting capture animation, with a reduced-motion path.
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

  const doc=document.documentElement,reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let enabled=false,raf=0,scrollQueued=false;
  const controllers=Array.from(document.querySelectorAll('[data-g-paper]')).map(root=>{
   const en=root.dataset.locale==='en',t=(j,e)=>en?e:j,opening=root.closest('[data-g-opening]');
   const raw=root.querySelector('.g-raw-notes'),polished=root.querySelector('.g-polished-notes'),loader=root.querySelector('.g-enhancing'),status=root.querySelector('.g-note-status'),generate=root.querySelector('.g-generate'),tabs=root.querySelector('.g-note-tabs');
   const lines=t(['北星商事：まず営業20名で試す','現場の入力作業を増やさない','来週、セキュリティ資料と料金案を送る'],['Hokusei: start with 20 people in sales','No extra data entry for the team','Send security docs and pricing next week']);
   const blocks=t([
   ['試用の進め方',['営業部20名を対象に、試用条件を確認する。','現場の入力負荷を増やさない運用を優先。'],'まずは、議事録とCRMへの二重入力を減らす。'],
   ['次回までに確認すること',['セキュリティ確認に必要な資料を共有する。','試用開始日は、社内の確認後に調整。'],'保存場所・アクセス権限・アカウント管理を確認。'],
   ['次のアクション',['原田：セキュリティ資料と料金案を送付。','次回ミーティングの候補日をご案内。'],'来週までに共有する。']
   ],[
   ['Pilot scope',['Start with 20 people in the sales team.','Prioritize a workflow without extra data entry.'],'Focus first on duplicated notes and CRM updates.'],
   ['Questions to resolve',['Share the required security documentation.','Set a pilot start date after internal review.'],'Clarify data location, access, and account management.'],
   ['Next steps',['Taizo: send security documents and pricing.','Share dates for the next meeting.'],'Follow up next week.']
   ]);
   const c={root,opening,en,raw,polished,loader,status,generate,tabs,born:0,userControlled:false,lastKey:'',timers:[],mode:'raw',note:lines.join('\n\n')};
   const blockHTML=n=>blocks.slice(0,n).map(b=>'<section><h4>'+esc(b[0])+'</h4><ul>'+b[1].map(x=>'<li>'+esc(x)+'</li>').join('')+'<li class="g-note-sub">– '+esc(b[2])+'</li></ul></section>').join('');
   function show(mode,n=3){
    c.mode=mode;root.dataset.noteState=mode;const complete=mode==='enhanced';raw.hidden=mode==='enhanced'||mode==='generating';polished.hidden=mode!=='enhanced'&&mode!=='generating';loader.hidden=mode!=='generating';generate.hidden=mode!=='ready';tabs.hidden=!complete&&!(mode==='raw'&&c.userControlled);status.hidden=(mode!=='typing'&&mode!=='raw')||c.userControlled;
    if(mode==='enhanced'||mode==='generating')polished.innerHTML=blockHTML(n);
    tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gNote===(complete?'enhanced':'raw'))));
    root.setAttribute('aria-busy',String(mode==='generating'));
   }
   function stopAuto(){c.userControlled=true;c.timers.forEach(clearTimeout);c.timers=[]}
   function finish(){show('enhanced');c.lastKey='manual-finished'}
   c.frame=now=>{
    if(c.userControlled)return;if(!c.born)c.born=now;const cycle=((now-c.born)%14500)/1000;
    if(cycle<3.3){const text=lines.join('\n\n'),length=Math.floor(clamp(cycle/2.9)*text.length),key=(cycle>2.9?'ready':'typing')+'-'+length;if(c.lastKey!==key){raw.value=text.slice(0,length);show(cycle>2.9?'ready':'typing');c.lastKey=key}}
    else if(cycle<7.5){const count=Math.min(3,Math.floor((cycle-3.3)/1.15)),key='generating-'+count;if(c.lastKey!==key){show('generating',count);c.lastKey=key}}
    else if(c.lastKey!=='enhanced'){show('enhanced');c.lastKey='enhanced'}
   };
   c.reset=()=>{c.born=0;c.lastKey=''};c.static=()=>{if(!c.userControlled){raw.value=c.note;show('enhanced')}};
   raw.value=c.note;show('raw');
   _on(raw, 'focus',()=>{stopAuto();show('raw')});_on(raw, 'input',()=>{stopAuto();c.note=raw.value;show('ready')});
   _on(generate, 'click',()=>{stopAuto();c.note=raw.value;if(!enabled){finish();return}show('generating',0);for(let i=1;i<=3;i++)c.timers.push(_later(()=>show('generating',i),i*420));c.timers.push(_later(finish,1650))});
   tabs.querySelectorAll('button').forEach(b=>_on(b, 'click',()=>{stopAuto();if(b.dataset.gNote==='raw'){raw.value=c.note;show('raw')}else finish()}));
   return c;
  });
  const homes=Array.from(document.querySelectorAll('.granola-home,.v6-product'));
  function active(home){return !!home&&home.classList.contains('on')&&!!home.closest('.lang')&&home.closest('.lang').classList.contains('lang-'+doc.lang)&&!document.body.classList.contains('help-mode')}
  function current(){return controllers.find(c=>active(c.opening.closest('.page')))}
  function step(now){raf=0;if(!enabled||document.hidden)return;const c=current();if(!c)return;const r=c.opening.getBoundingClientRect();if(r.bottom<=0||r.top>=window.innerHeight)return;c.frame(now);raf=_raf(step)}
  function start(){if(enabled&&!raf&&window.requestAnimationFrame)raf=_raf(step)}
  function scrollUpdate(){
   scrollQueued=false;const vh=window.innerHeight;doc.classList.toggle('g-scrolled',(window.scrollY||0)>35);
   homes.filter(active).forEach(home=>{
    const opening=home.querySelector('[data-g-opening]'),r=opening?.getBoundingClientRect(),hero=opening?.querySelector('.g-hero-copy'),desktop=window.innerWidth>=900;
    if(enabled&&r&&r.bottom>0&&r.top<vh){const p=clamp(-r.top/Math.max(1,hero.getBoundingClientRect().height*.9));opening.style.setProperty('--opening-p',desktop?p.toFixed(4):'0')}
    const panels=Array.from(home.querySelectorAll('[data-g-stage-panel]'));let index=0;
    panels.forEach((p,i)=>{if(p.getBoundingClientRect().top<vh*.57)index=i});
    home.querySelectorAll('[data-g-stage]').forEach(a=>a.setAttribute('aria-current',String(Number(a.dataset.gStage)===index)));panels.forEach((p,i)=>p.toggleAttribute('data-stage-active',i===index));
    const memory=home.querySelector('.memory-interactive'),mr=memory?.getBoundingClientRect();if(enabled&&mr&&mr.top<vh&&mr.bottom>0)memory.style.setProperty('--memory-offset',((.5-clamp((vh-mr.top)/(vh+mr.height)))*50).toFixed(1)+'px');
   });
  }
  function schedule(){if(!scrollQueued&&window.requestAnimationFrame){scrollQueued=true;_raf(scrollUpdate)}start()}
  function setMotion(){
   enabled=!reduce.matches;doc.classList.toggle('g-motion-enabled',enabled);doc.classList.toggle('g-motion-paused',!enabled);
   if(!enabled&&raf){window.cancelAnimationFrame?.(raf);raf=0}
   controllers.forEach(c=>{if(enabled)c.reset();else c.static()});
   start();schedule();
  }
  document.querySelectorAll('[data-g-stage]').forEach(a=>_on(a, 'click',e=>{e.preventDefault();document.getElementById(a.getAttribute('href').slice(1))?.scrollIntoView({behavior:enabled?'smooth':'auto',block:'start'})}));
  document.querySelectorAll('[data-g-call]').forEach(b=>_on(b, 'click',()=>{const call=b.closest('.g-mini-call'),kind=b.dataset.gCall;if(kind==='close'){call.hidden=true;return}const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(on));if(kind==='camera')call.classList.toggle('camera-off',on)}));
  if(window.IntersectionObserver){const observer=_io(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -25px 0px'});homes.forEach(home=>home.querySelectorAll('.g-stage-content>h2,.g-meeting-stage>h3,.g-meeting-stage>p,.feature-story-copy>h2,.p-detail-grid>article,.p-help-teaser h2,.p-end h2').forEach(el=>{el.classList.add('g-reveal');observer.observe(el)}))}
  _on(window, 'scroll',schedule,{passive:true});_on(window, 'resize',schedule,{passive:true});_on(window, 'hashchange',()=>{schedule();start()});document.querySelectorAll('[data-lang]').forEach(b=>_on(b, 'click',()=>{controllers.forEach(c=>c.reset());schedule();start()}));
  _on(document, 'visibilitychange',()=>{if(document.hidden){if(raf)window.cancelAnimationFrame?.(raf);raf=0}else{controllers.forEach(c=>c.reset());start();schedule()}});
  _on(reduce, 'change',setMotion);document.fonts?.ready.then(schedule);setMotion();

  return () => {
    _disposed = true;
    for (const fn of _off.splice(0)) {
      try { fn(); } catch { /* teardown is best effort */ }
    }
  };
}
