(() => {
'use strict';
const PHONE='917822838573', MAP='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('JW2P+PP Bicholim Goa');
const wa = t => 'https://wa.me/'+PHONE+'?text='+encodeURIComponent(t);
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
$$('[data-wa]').forEach(a=>{a.href=wa(a.dataset.wa||'Hello GOA CARS DETAILING, I would like to enquire about your detailing services.');a.target='_blank';a.rel='noopener'});
$$('[data-svc]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();window.open(wa('Hello GOA CARS DETAILING, I would like to enquire about '+a.dataset.svc+'.'),'_blank','noopener')})});
$$('[data-map]').forEach(a=>{a.href=MAP;a.target='_blank';a.rel='noopener'});
$$('[data-year]').forEach(y=>y.textContent=new Date().getFullYear());
const nav=$('#nav'),b=$('#burger'),set=o=>{nav.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')};
b.addEventListener('click',()=>set(!nav.classList.contains('open')));
nav.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
const sc=()=>nav.classList.toggle('sc',scrollY>30);sc();addEventListener('scroll',sc,{passive:true});
const io=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'}):null;
$$('.head,.svc,.gal figure,.rev p,.why li,.two>div,.info,form,.band .wrap').forEach((el,i)=>{el.classList.add('rv');el.style.setProperty('--d',(i%3)*.12+'s');io?io.observe(el):el.classList.add('in')});
// head fades in along with its heading bar
$$('.head').forEach(h=>h.classList.contains('rv')||h.classList.add('rv'));
if(io&&$('#services')){const links=$$('.links a'),spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>{const t=a.getAttribute('href');if(t.includes('#'))a.classList.toggle('on',t.endsWith('#'+e.target.id));else if(e.target.id==='home')a.classList.toggle('on',true)})}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>spy.observe(s));}
const f=$('#enq');
if(f)f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const v=Object.fromEntries(new FormData(f));
const m=['Hello GOA CARS DETAILING, I would like to enquire about your detailing services.','Name: '+v.name,'Phone: '+v.phone,'Service: '+v.service,v.msg&&'Message: '+v.msg].filter(Boolean).join('\n');
window.open(wa(m),'_blank','noopener');$('#fnote').textContent='WhatsApp should open with your message ready. Nothing is sent until you press send there.';});
})();
