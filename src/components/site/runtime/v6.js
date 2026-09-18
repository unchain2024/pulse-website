/* Connector catalog search and filtering, plus v6 section reveals.
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

  const norm=s=>String(s).normalize('NFKC').toLowerCase().trim();
  document.querySelectorAll('[data-connector-catalog]').forEach(root=>{
   const input=root.querySelector('[data-connector-search]'),buttons=[...root.querySelectorAll('[data-connector-filter]')],cards=[...root.querySelectorAll('[data-connector-category]')],status=root.querySelector('[data-connector-status]');
   const en=!!root.closest('.lang-en');let category='all';
   function filter(){const q=norm(input.value);let n=0;cards.forEach(card=>{const show=(category==='all'||card.dataset.connectorCategory===category)&&norm(card.textContent).includes(q);card.hidden=!show;if(show)n++});buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.connectorFilter===category)));status.textContent=n?(en?n+' connectors shown from our selection.':n+'件のコネクターを表示しています。'):(en?'No matching connectors. Contact us about the tools you use.':'該当するコネクターがありません。ご利用のツールについてお問い合わせください。')}
   _on(input, 'input',filter);buttons.forEach(b=>_on(b, 'click',()=>{category=b.dataset.connectorFilter;filter()}));filter();
  });
  if(window.IntersectionObserver){const observer=_io(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.v6-core-grid>article,.v6-tech-flow,.v6-tech-definitions>article,.v6-tech-principles>article,.v6-customization li,.v6-usecase-feature-list article').forEach(el=>{el.classList.add('v6-reveal');observer.observe(el)})}

  return () => {
    _disposed = true;
    for (const fn of _off.splice(0)) {
      try { fn(); } catch { /* teardown is best effort */ }
    }
  };
}
