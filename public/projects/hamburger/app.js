// Egységes toggle: mobilon a hamburger, asztalin a "Menu" link
(function(){
  const panel = document.getElementById('nav-panel');
  // támogatjuk mind a .nav-toggle, mind a .hamburger osztályt
  const hamburgerBtn = document.querySelector('.nav-toggle, .hamburger');
  const menuLink = document.querySelector('.menu-trigger');
  const topbar = document.querySelector('.topbar');

  if (!panel) return;

  const isInside = (el, target) => !!el && (el === target || el.contains(target));
  let onDocClickBound = null;

  function openPanel(triggerEl){
    panel.hidden = false;

    // kis trükk a transitionhöz (hidden -> transition)
    requestAnimationFrame(()=>{
      panel.classList.add('open');
      topbar && topbar.classList.add('has-panel-shadow');
      if (triggerEl) triggerEl.setAttribute('aria-expanded', 'true');
    });

    const firstLink = panel.querySelector('a');
    if(firstLink) firstLink.focus?.({preventScroll:true});

    // KÜLSŐ KATTINTÁS: csak akkor zárjunk, ha NEM a panelen és NEM a triggereken történt
    onDocClickBound = function onDocClick(e){
      if (
        isInside(panel, e.target) ||
        isInside(hamburgerBtn, e.target) ||
        isInside(menuLink, e.target)
      ) {
        return; // panelen/triggeren belül: ne zárjunk
      }
      closePanel(hamburgerBtn);
      closePanel(menuLink);
    };

    // buborék fázisban elég; külön setTimeout nem kell
    document.addEventListener('click', onDocClickBound);
    document.addEventListener('keydown', onEsc);
  }

  function closePanel(triggerEl){
    panel.classList.remove('open');
    topbar && topbar.classList.remove('has-panel-shadow');
    if (triggerEl) triggerEl.setAttribute('aria-expanded', 'false');

    const onEnd = ()=>{ panel.hidden = true; panel.removeEventListener('transitionend', onEnd); };
    panel.addEventListener('transitionend', onEnd, { once:true });

    if (onDocClickBound){
      document.removeEventListener('click', onDocClickBound);
      onDocClickBound = null;
    }
    document.removeEventListener('keydown', onEsc);
  }

  function togglePanel(triggerEl){
    const isOpen = panel.classList.contains('open');
    if (isOpen) closePanel(triggerEl); else openPanel(triggerEl);
  }

  function onEsc(e){
    if (e.key === 'Escape'){
      closePanel(hamburgerBtn);
      closePanel(menuLink);
    }
  }

  // TRIGGEREK: állítsuk meg a buborékolást, hogy ne zárjon azonnal
  if (hamburgerBtn){
    ['click','touchstart'].forEach(evt => {
      hamburgerBtn.addEventListener(evt, (e)=>{
        e.preventDefault();
        e.stopPropagation();
        togglePanel(hamburgerBtn);
      }, {passive:false});
    });
  }

  if (menuLink){
    ['click','touchstart'].forEach(evt => {
      menuLink.addEventListener(evt, (e)=>{
        e.preventDefault();
        e.stopPropagation();
        togglePanel(menuLink);
      }, {passive:false});
    });

    // billentyűzet támogatás desktopra
    menuLink.setAttribute('role', 'button');
    menuLink.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        togglePanel(menuLink);
      }
    });
  }

  // a panelen belüli kattintás se csukjon
  panel.addEventListener('click', (e)=> e.stopPropagation(), {passive:true});











  // ======= ÁLLÍTHATÓ VÁLTOZÓK =======
  const CFG = {
    selector: '.grid',                       // mely elemekre menjen
    angle: 45,                               // szög (fok)
    color: 'rgba(116,198,41,.35)',           // csík színe
    thickness: 2,                            // csík vastagság px
    gap: 84,                                 // alap hézag px
    denseGap: 54,                            // sűrűbb hézag (minden N.-edik) px
    every: 3,                                // minden hányadik legyen sűrűbb
    offset: 0                                // kezdeti eltolás px (ha kicsit feljebb/lejjebb indítanád)
  };
  // ===================================

  function buildGradient(el, cfg) {
    const {angle, color, thickness, gap, denseGap, every, offset} = cfg;
    const rect = el.getBoundingClientRect();
    const rad = angle * Math.PI / 180;

    // A teljes "gradiens-tengely" hossza, amit le kell fednünk
    const axisLen = Math.abs(rect.width * Math.cos(rad)) +
                    Math.abs(rect.height * Math.sin(rad));

    let p = Math.max(0, offset);
    let i = 1;
    const stops = ['transparent 0']; // hogy ne legyen háromszög a kezdetnél

    // Csíkok generálása a tetejétől az aljáig
    while (p <= axisLen + Math.max(gap, denseGap)) {
      stops.push(
        `${color} ${p}px`,
        `${color} ${p + thickness}px`,
        `transparent ${p + thickness}px`
      );
      const step = (i % every === 0) ? denseGap : gap;
      p += step;
      stops.push(`transparent ${p}px`);
      i++;
    }

    el.style.backgroundImage = `linear-gradient(${angle}deg, ${stops.join(',')})`;
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundSize   = '100% 100%';
  }

  function applyAll() {
    document.querySelectorAll(CFG.selector).forEach(el => buildGradient(el, CFG));
  }

  // kezdeti felrajzolás + reszponzív újragenerálás
  window.addEventListener('load', applyAll);
  window.addEventListener('orientationchange', applyAll);
  const ro = new ResizeObserver(applyAll);
  document.querySelectorAll(CFG.selector).forEach(el => ro.observe(el));
})();
