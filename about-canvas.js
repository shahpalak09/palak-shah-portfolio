(() => {
  if (document.body.dataset.page !== 'about') return;
  const body = document.body;
  let x = 0, drag = null;
  const controls = document.createElement('nav');
  controls.className = 'about-canvas-controls';
  controls.setAttribute('aria-label', 'About canvas controls');
  controls.innerHTML = '<span class="about-canvas-hint">✥ Drag empty space to explore</span><button type="button" aria-label="Reset canvas to original view">Reset view ↺</button>';
  body.append(controls);
  function paint() {
    body.style.setProperty('--canvas-x', x + 'px');
    body.style.setProperty('--canvas-y', -window.scrollY + 'px');
  }
  controls.querySelector('button').addEventListener('click', () => { x = 0; window.scrollTo({top:0,behavior:'instant'}); paint(); });
  const protectedSelector = 'a,button,input,textarea,select,iframe,video,img,svg,h1,h2,h3,p,article,.site-header,.mobile-nav,.footer,.about-canvas-controls,[role="button"],[draggable="true"]';
  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest(protectedSelector)) return;
    // Leave the original floating objects and their Framer handlers untouched.
    if (event.target.closest('#main') && !event.target.matches('#main,[data-layout-template],[data-framer-name="hero"]')) return;
    drag = {id:event.pointerId,px:event.clientX,py:event.clientY,x,y:window.scrollY};
    body.classList.add('canvas-panning');
    body.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  document.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    x = Math.max(-window.innerWidth * .6, Math.min(window.innerWidth * .6, drag.x + event.clientX - drag.px));
    window.scrollTo({top:drag.y - (event.clientY - drag.py),behavior:'instant'});
    paint();
  });
  function end() { drag = null; body.classList.remove('canvas-panning'); }
  document.addEventListener('pointerup', end);
  document.addEventListener('pointercancel', end);
  document.addEventListener('lostpointercapture', end);
  window.addEventListener('blur', end);
  window.addEventListener('scroll', paint, {passive:true});
  window.addEventListener('resize', () => {x=0;paint();});
  paint();
})();
