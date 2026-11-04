(() => {
'use strict';
const PHONE='917822838573', MAP='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('JW2P+PP Bicholim Goa');
const wa = t => 'https://wa.me/'+PHONE+'?text='+encodeURIComponent(t);
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
$$('[data-wa]').forEach(a=>{a.href=wa(a.dataset.wa||'Hello GOA CARS DETAILING, I would like to enquire about your detailing services.');a.target='_blank';a.rel='noopener'});
$$('[data-svc]').forEach(a=>{a.href=wa('Hello GOA CARS DETAILING, I would like to enquire about '+a.dataset.svc+'.');a.target='_blank';a.rel='noopener'});
$$('[data-map]').forEach(a=>{a.href=MAP;a.target='_blank';a.rel='noopener'});
const y=$('[data-year]'); if(y) y.textContent=new Date().getFullYear();
const nav=$('#nav'),b=$('#burger'),set=o=>{nav.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')};
b.addEventListener('click',()=>set(!nav.classList.contains('open')));
nav.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
const links=$$('.links a');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>io.observe(s));}
const f=$('#enq');
f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const v=Object.fromEntries(new FormData(f));
const m=['Hello GOA CARS DETAILING, I would like to enquire about your detailing services.','Name: '+v.name,'Phone: '+v.phone,'Service: '+v.service,v.msg&&'Message: '+v.msg].filter(Boolean).join('\n');
window.open(wa(m),'_blank','noopener');$('#fnote').textContent='WhatsApp should open with your message ready. Nothing is sent until you press send there.';});
})();
