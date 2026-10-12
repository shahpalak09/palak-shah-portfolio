// Keep the reference page's interactions and route navigation into this portfolio.
(()=>{
 const base=new URL('.',location.href);
 const routes={'/':'index.html','/about-me':'about.html','/research':'projects.html','/content-page':'content.html','/resume':'resume.html'};
 function destination(a){
  const raw=(a.getAttribute('href')||'').trim().replace('https:// www.','https://www.');
  if(!raw)return null;
  if(raw.startsWith('mailto:'))return raw;
  const u=new URL(raw,location.href);
  const path=u.pathname.replace(/\/$/,'')||'/';
  const key=raw.startsWith('./')?'/'+raw.slice(2).split(/[?#]/)[0]:path;
  if((u.origin===location.origin||u.hostname==='palakshahportfolio.framer.website')&&routes[key])return new URL(routes[key],base).href;
  if(u.origin===location.origin&&/\.html$/.test(u.pathname))return u.href;
  return raw!==a.getAttribute('href')?raw:null;
 }
 document.addEventListener('click',e=>{
  const a=e.target.closest('a');
  if(a){const dest=destination(a);if(dest){e.preventDefault();e.stopImmediatePropagation();if(e.metaKey||e.ctrlKey||a.target==='_blank')window.open(dest,'_blank','noopener');else location.assign(dest);return;}}
  const target=e.target.closest('[data-framer-name]');
  if(target&&target.textContent.trim()==='View my content →'){e.preventDefault();location.assign(new URL('content.html',base));}
 },true);
 function repair(){
  document.querySelectorAll('a').forEach(a=>{const dest=destination(a);if(dest)a.href=dest;});
  document.querySelectorAll('a:not([href])').forEach(a=>{const label=a.textContent.trim().toLowerCase();if(label==='palak shah')a.href=new URL('index.html',base);if(label==='linkedin')a.href='https://www.linkedin.com/in/palak-shah-347aa4200';if(label==='get in touch')a.href=new URL('contact.html',base);});
 }
 document.addEventListener('DOMContentLoaded',()=>{repair();let queued=false;new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;repair();});}}).observe(document.getElementById('main'),{childList:true,subtree:true});});
})();
