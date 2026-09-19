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

  document.querySelectorAll('.v7-post-meeting').forEach(root=>{const demo=root.querySelector('.ui-demo'),choices=[...root.querySelectorAll('[data-post-view]')];const select=v=>choices.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.postView===v)));choices.forEach(b=>_on(b, 'click',()=>{demo.dispatchEvent(new CustomEvent('pulse:view',{detail:b.dataset.postView}));select(b.dataset.postView)}));_on(demo, 'click',e=>{const b=e.target.closest('[data-ud-view]');if(b)select(b.dataset.udView)})});

  if(window.IntersectionObserver){const observer=_io(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.v7-workflow-title,.v7-workflow .g-meeting-stage>h3,.v7-workflow .g-meeting-stage>p,.v7-dictionary .pulse-section-copy,.v7-mcp .pulse-section-copy,.v7-context-graph').forEach(el=>{el.classList.add('v6-reveal');observer.observe(el)})}

  return () => {
    _disposed = true;
    for (const fn of _off.splice(0)) {
      try { fn(); } catch { /* teardown is best effort */ }
    }
  };
}
