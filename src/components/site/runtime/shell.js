/* Sticky section tabs, pinned steps, carousel, tab groups and the pricing monthly/annual toggle.
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

  // Mobile nav
    document.querySelectorAll('.nav .burger').forEach(function(burger){
      _on(burger, 'click',function(){burger.closest('.nav').classList.toggle('open');});
    });

    // Before / During / After sticky tab highlight
    document.querySelectorAll('.bda').forEach(function(bda){
      if(!('IntersectionObserver' in window))return;
      var tabs=bda.querySelectorAll('.tabs a'),items=bda.querySelectorAll('.item');
      var io=_io(function(es){es.forEach(function(e){if(e.isIntersecting){var i=[].indexOf.call(items,e.target);tabs.forEach(function(t,k){t.classList.toggle('on',k===i);});}});},{rootMargin:'-40% 0px -50% 0px'});
      items.forEach(function(it){io.observe(it);});
      tabs.forEach(function(t,k){_on(t, 'click',function(e){e.preventDefault();items[k].scrollIntoView({behavior:'smooth',block:'center'});});});
    });

    // Clarity / Momentum / Ease pinned steps
    document.querySelectorAll('.cme').forEach(function(cme){
      if(!('IntersectionObserver' in window))return;
      var steps=cme.querySelectorAll('.step'),vis=cme.querySelectorAll('.right > *');
      var io2=_io(function(es){es.forEach(function(e){if(e.isIntersecting){var i=[].indexOf.call(vis,e.target);steps.forEach(function(s,k){s.classList.toggle('on',k===i);});}});},{rootMargin:'-35% 0px -45% 0px'});
      vis.forEach(function(v){io2.observe(v);});
      steps.forEach(function(s,k){s.querySelector('h3').addEventListener('click',function(){vis[k].scrollIntoView({behavior:'smooth',block:'center'});});});
    });

    // Carousel
    document.querySelectorAll('.carousel').forEach(function(c){
      var track=c.querySelector('.track'),slides=c.querySelectorAll('.slide'),dots=c.querySelectorAll('.dotz i'),idx=0;
      function go(n){idx=(n+slides.length)%slides.length;var s=slides[idx];track.scrollTo({left:s.offsetLeft-track.offsetLeft,behavior:'smooth'});dots.forEach(function(d,k){d.classList.toggle('on',k===idx);});}
      var prev=c.querySelector('.prev'),next=c.querySelector('.next');
      if(prev)_on(prev, 'click',function(){go(idx-1);});
      if(next)_on(next, 'click',function(){go(idx+1);});
      dots.forEach(function(d,k){d.style.cursor='pointer';_on(d, 'click',function(){go(k);});});
    });

    // Tabs (teams/individuals, pricing segments)
    document.querySelectorAll('[data-tabs]').forEach(function(root){
      var btns=root.querySelectorAll('[data-tab]'),panes=root.querySelectorAll('[data-pane]');
      btns.forEach(function(b){_on(b, 'click',function(){
        var k=b.getAttribute('data-tab');
        btns.forEach(function(x){x.classList.toggle('on',x.getAttribute('data-tab')===k);});
        panes.forEach(function(p){p.classList.toggle('on',p.getAttribute('data-pane')===k);});
      });});
    });

    // Pricing annual/monthly toggle
    document.querySelectorAll('.toggle').forEach(function(tg){
      _on(tg, 'click',function(){
        tg.classList.toggle('off');var annual=!tg.classList.contains('off');
        tg.closest('.lang').querySelectorAll('[data-m]').forEach(function(el){el.textContent=annual?el.getAttribute('data-y'):el.getAttribute('data-m');});
      });
    });

  return () => {
    _disposed = true;
    for (const fn of _off.splice(0)) {
      try { fn(); } catch { /* teardown is best effort */ }
    }
  };
}
