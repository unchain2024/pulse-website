/* Home capabilities switcher, meeting stages, sharing preview and v7 reveals.
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

  const doc=document.documentElement,active=el=>el.closest('.page')?.classList.contains('on')&&el.closest('.lang')?.classList.contains('lang-'+doc.lang)&&!document.body.classList.contains('help-mode');
  const featureControllers=[];
  document.querySelectorAll('[data-v7-capabilities]').forEach((root,index)=>{
   const buttons=[...root.querySelectorAll('[data-v7-feature]')],panels=[...root.querySelectorAll('[data-v7-feature-panel]')],preview=root.querySelector('.v7-feature-preview');let naturalIndex=-1,automatic=false;
   function nearest(){const pr=preview.getBoundingClientRect(),vh=window.innerHeight,target=window.innerWidth<900?Math.min(vh*.9,pr.bottom+(vh-pr.bottom)*.45):vh*.54;let best=0,distance=Infinity;buttons.forEach((b,i)=>{const r=b.getBoundingClientRect(),d=Math.abs(r.top+r.height*.5-target);if(d<distance){distance=d;best=i}});return best}
   function choose(key){buttons.forEach((b,i)=>{const selected=b.dataset.v7Feature===key;b.setAttribute('aria-pressed',String(selected));b.setAttribute('aria-current',selected?'step':'false');b.id='v7-feature-'+index+'-'+key+'-'+i;if(selected){root.querySelector('[data-v7-feature-name]').textContent=b.querySelector('strong').textContent;root.querySelector('[data-v7-feature-counter]').textContent='0'+(i+1)+' / 05'}});panels.forEach(p=>{p.hidden=p.dataset.v7FeaturePanel!==key;p.id='v7-feature-panel-'+index+'-'+p.dataset.v7FeaturePanel});buttons.forEach(b=>b.setAttribute('aria-controls','v7-feature-panel-'+index+'-'+b.dataset.v7Feature));root.dataset.activeFeature=key}
   buttons.forEach(b=>_on(b, 'click',()=>{choose(b.dataset.v7Feature);if(!automatic)naturalIndex=nearest()}));
   featureControllers.push({update(){if(!active(root))return;const r=root.getBoundingClientRect();if(r.top>window.innerHeight*.9||r.bottom<100)return;const next=nearest();if(next!==naturalIndex){naturalIndex=next;automatic=true;choose(buttons[next].dataset.v7Feature);automatic=false}}});choose(buttons[0].dataset.v7Feature);
   const en=!!root.closest('.lang-en');root.querySelectorAll('[data-v7-meeting-app]').forEach(b=>_on(b, 'click',()=>{root.querySelectorAll('[data-v7-meeting-app]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));root.querySelector('[data-v7-app-label]').textContent=en?b.dataset.v7MeetingApp+' conversations, in the same notepad.':b.dataset.v7MeetingApp+'の会話を、同じノートへ。'}));
   const share=root.querySelector('[data-v7-share-preview]');_on(share, 'click',()=>{const selected=root.querySelector('[data-v7-share-person]').checked,contents=[...root.querySelectorAll('.v7-share-contents label')].filter(l=>l.querySelector('input').checked).map(l=>l.textContent.trim()),status=root.querySelector('[data-v7-share-status]');status.textContent=!selected?(en?'Select a colleague to preview sharing.':'共有する同僚を選んでください。'):!contents.length?(en?'Select at least one item to share.':'共有する内容を選んでください。'):(en?'Preview: '+contents.join(', ')+' will be shared with Rui. Nothing has been sent.':'確認：'+contents.join('・')+'を蛯名さんと共有する設定です。実際の共有は行っていません。')});
  });
  let scheduled=false;function update(){scheduled=false;featureControllers.forEach(c=>c.update())}function schedule(){if(!scheduled&&window.requestAnimationFrame){scheduled=true;_raf(update)}}
  _on(window, 'scroll',schedule,{passive:true});_on(window, 'resize',schedule,{passive:true});_on(window, 'hashchange',schedule);document.querySelectorAll('[data-lang]').forEach(b=>_on(b, 'click',schedule));
  document.querySelectorAll('.v7-post-meeting').forEach(root=>{const demo=root.querySelector('.ui-demo'),choices=[...root.querySelectorAll('[data-post-view]')];const select=v=>choices.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.postView===v)));choices.forEach(b=>_on(b, 'click',()=>{demo.dispatchEvent(new CustomEvent('pulse:view',{detail:b.dataset.postView}));select(b.dataset.postView)}));_on(demo, 'click',e=>{const b=e.target.closest('[data-ud-view]');if(b)select(b.dataset.udView)})});

  document.querySelectorAll('[data-context-graph]').forEach(root=>{
   const en=root.dataset.locale==='en',t=(j,e)=>en?e:j,nodes=[...root.querySelectorAll('[data-graph-node]')],edges=[...root.querySelectorAll('[data-graph-edge]')],modes=[...root.querySelectorAll('[data-graph-mode]')];
   const data={
   meeting:{kind:t('会議の記録','MEETING RECORD'),title:t('9/25 北星商事の導入相談','Sep 25 / Hokusei discovery'),description:t('会議の発言を、話者・案件・判断と一緒に保持します。','Keep meeting statements connected to the speaker, project, and decisions.'),evidence:t('発言：「部長確認が必要」\n話者：田中氏 / 案件：北星商事の導入相談','Statement: “Needs department-head approval.”\nSpeaker: Ken Tanaka / Project: Hokusei evaluation'),sources:['person','statement']},
   email:{kind:t('メールの記録','EMAIL RECORD'),title:t('試用範囲についての相談','Pilot-scope discussion'),description:t('メールで使われる企業名や人物を照合し、会議と同じ案件に紐づけます。','Match people and companies mentioned in email to the same project discussed in meetings.'),evidence:t('営業部20名での試用を検討。\n会議・CRMにある同じ導入検討案件と照合。','Evaluate a pilot for 20 sales users.\nMatched to the same evaluation in meetings and CRM.'),sources:['project','meeting']},
   document:{kind:t('社内資料の知識','INTERNAL DOCUMENT'),title:t('試用と承認の条件','Pilot and approval conditions'),description:t('社内の手続きや用語の意味を、関連する案件・判断と結びます。','Link internal procedures and term definitions to the relevant project and decisions.'),evidence:t('試用には部長の承認が必要。\nこの例では、試用前の承認を「第二稟議」と呼ぶ。','A pilot requires department-head approval.\nIn this example, pre-pilot approval is called “second approval.”'),sources:['term','project']},
   person:{kind:t('オントロジー：人物','ONTOLOGY: PERSON'),title:t('田中氏 / 導入の窓口','Ken Tanaka / Project contact'),description:t('同じ人物を複数の記録で照合。担当する案件と発言を関係として保持します。','Reconcile the same person across records and retain their project responsibilities and statements.'),evidence:t('担当する：北星商事の導入相談\n発言する：9/25の会議で、部長確認が必要と説明','Responsible for: Hokusei evaluation\nStated in the Sep 25 meeting that department-head approval is needed'),sources:['meeting','project']},
   project:{kind:t('オントロジー：案件','ONTOLOGY: PROJECT'),title:t('北星商事の導入相談','Hokusei pilot evaluation'),description:t('会議・メール・資料に分かれた情報を同じ案件として結び、関係者・判断・未完了の対応を整理します。','Connect records from meetings, email, and documents as one project, with its people, decisions, and outstanding actions.'),evidence:t('担当：田中氏\n判断：部長の承認後に試用\n次の対応：金曜日までに試用条件を送付','Contact: Ken Tanaka\nDecision: pilot after department-head approval\nNext action: send pilot conditions by Friday'),sources:['meeting','email','document']},
   term:{kind:t('会社の辞書','COMPANY DICTIONARY'),title:t('「第二稟議」の意味','What “second approval” means'),description:t('表記だけでなく、この会社で言葉が指す業務手続きや条件を整理します。','Understand the business procedure and conditions a term refers to within this company.'),evidence:t('社内資料：試用前の部長承認を指す呼び方\n会議：部長確認が必要という発言と照合','Internal document: the company’s term for department-head approval before a pilot\nMeeting: matched to the request for approval'),sources:['document','meeting']},
   statement:{kind:t('元の会話に戻れる発言','STATEMENT WITH ITS SOURCE'),title:t('「部長確認が必要」','“Needs department-head approval”'),description:t('誰がどの会議で話したかを残し、判断の根拠として参照できるようにします。','Retain who said it and in which meeting, so the statement can support the related decision.'),evidence:t('発言者：田中氏 / 9月25日の導入相談\n判断につながる条件：部長の承認','Speaker: Ken Tanaka / Sep 25 discovery\nCondition behind the decision: department-head approval'),sources:['meeting','person']},
   decision:{kind:t('判断と、その理由','DECISION & ITS BASIS'),title:t('部長の承認後に試用を開始','Start the pilot after approval'),description:t('判断を元の発言や資料と結び、確定した条件と未確認の内容を分けて保持します。','Link a decision to its original statements and documents, separating agreed conditions from open information.'),evidence:t('根拠：「部長確認が必要」という発言\n条件：部長の承認\n未確定：試用の開始日','Basis: the statement that approval is needed\nCondition: department-head approval\nOpen: the pilot start date'),sources:['statement','document']},
   action:{kind:t('判断から、次の対応へ','ACTION LINKED TO A DECISION'),title:t('金曜日までに試用条件を送付','Send pilot conditions by Friday'),description:t('何を、誰が、いつまでに進めるかを整理。対応の背景にある案件と判断までたどれます。','Organize what to do, who owns it, and when it is due, with links back to the project and decision.'),evidence:t('内容：試用条件を送付 / 担当：営業担当\n期限：金曜日 / 状態：未完了\n前提：部長の確認に必要な情報をそろえる','Action: send pilot conditions / Owner: sales contact\nDue: Friday / Status: open\nPurpose: provide information for department-head review'),sources:['decision','project','meeting']}
   };
   const links={project:['meeting','email','document','person','project','term'],decision:['meeting','document','person','project','statement','decision'],action:['project','statement','decision','action']};
   function paint(key,mode){const visible=new Set(mode==='all'?nodes.map(n=>n.dataset.graphNode):links[mode]||[key]);if(mode==='node'){visible.add(key);edges.forEach(e=>{const [a,b]=e.dataset.graphEdge.split(':');if(a===key)visible.add(b);if(b===key)visible.add(a)});data[key].sources.forEach(s=>visible.add(s))}
    nodes.forEach(n=>{const id=n.dataset.graphNode;n.setAttribute('aria-pressed',String(id===key));n.classList.toggle('is-muted',!visible.has(id))});edges.forEach(e=>{const [a,b]=e.dataset.graphEdge.split(':'),show=visible.has(a)&&visible.has(b);e.classList.toggle('is-linked',show);e.classList.toggle('is-muted',!show)});modes.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.graphMode===mode)));root.dataset.selectedNode=key;root.dataset.graphView=mode;
    const d=data[key];root.querySelector('[data-graph-kind]').textContent=d.kind;root.querySelector('[data-graph-title]').textContent=d.title;root.querySelector('[data-graph-description]').textContent=d.description;root.querySelector('[data-graph-evidence]').textContent=d.evidence;const target=root.querySelector('[data-graph-source-links]');target.replaceChildren();d.sources.forEach(source=>{const b=document.createElement('button');b.type='button';b.dataset.graphSource=source;b.textContent=data[source].title+' ↗';_on(b, 'click',()=>paint(source,'node'));target.append(b)})
   }
   nodes.forEach((b,i)=>{_on(b, 'click',()=>paint(b.dataset.graphNode,'node'));_on(b, 'keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=nodes[(i+(e.key==='ArrowRight'?1:nodes.length-1))%nodes.length];next.focus();paint(next.dataset.graphNode,'node')}})});
   modes.forEach((b,i)=>{_on(b, 'click',()=>paint(b.dataset.graphMode==='all'?'project':b.dataset.graphMode,b.dataset.graphMode));_on(b, 'keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=modes[(i+(e.key==='ArrowRight'?1:modes.length-1))%modes.length];next.focus();next.click()}})});paint('project','all');
  });
  if(window.IntersectionObserver){const observer=_io(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.v7-workflow-title,.v7-workflow .g-meeting-stage>h3,.v7-workflow .g-meeting-stage>p,.v7-dictionary .pulse-section-copy,.v7-mcp .pulse-section-copy,.v7-context-graph').forEach(el=>{el.classList.add('v6-reveal');observer.observe(el)})}
  document.fonts?.ready.then(schedule);schedule();

  return () => {
    _disposed = true;
    for (const fn of _off.splice(0)) {
      try { fn(); } catch { /* teardown is best effort */ }
    }
  };
}
