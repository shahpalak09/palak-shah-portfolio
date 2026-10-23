(()=>{
const gallery=document.querySelector('#photo-gallery');if(!gallery)return;
const files=Array.from({length:51},(_,i)=>`photography/photo-${String(i+1).padStart(2,'0')}.webp`);
gallery.querySelector('.photo-masonry').innerHTML=files.map((src,i)=>`<button type="button" data-photo="${i}" aria-label="Enlarge photograph ${i+1}"><img src="${src}" alt="Photograph ${i+1} by Palak Shah" loading="lazy" decoding="async"></button>`).join('');
const dialog=document.createElement('dialog');dialog.className='photo-viewer';dialog.setAttribute('aria-label','Photography viewer');dialog.innerHTML='<button class="photo-close" aria-label="Close photo viewer">Close ×</button><img alt=""><div class="photo-controls"><button class="photo-prev" aria-label="Previous photograph">←</button><span class="photo-count" aria-live="polite"></span><button class="photo-next" aria-label="Next photograph">→</button></div>';document.body.append(dialog);
let index=0,trigger,priorOverflow='';function show(i){index=(i+files.length)%files.length;dialog.querySelector('img').src=files[index];dialog.querySelector('img').alt=`Photograph ${index+1} by Palak Shah`;dialog.querySelector('.photo-count').textContent=`${index+1} / ${files.length}`;}
gallery.addEventListener('click',e=>{const b=e.target.closest('[data-photo]');if(!b)return;trigger=b;show(Number(b.dataset.photo));priorOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();});
dialog.querySelector('.photo-close').onclick=()=>dialog.close();dialog.querySelector('.photo-prev').onclick=()=>show(index-1);dialog.querySelector('.photo-next').onclick=()=>show(index+1);
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(index+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(index-1)}});dialog.addEventListener('close',()=>{document.body.style.overflow=priorOverflow;trigger?.focus()});
document.addEventListener('portfolio:filter',e=>{gallery.hidden=!['all','photography'].includes(e.detail)});
})();
