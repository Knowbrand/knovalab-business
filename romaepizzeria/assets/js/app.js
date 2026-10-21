(function(){
var C=window.ROMAE||{},root=document.documentElement.getAttribute('data-root')||'./';
var PIZZA='<svg viewBox="0 0 100 100" width="60%" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#CECE78"/><circle cx="50" cy="50" r="36" fill="#FFF6E9"/><g fill="#537C2E"><circle cx="38" cy="40" r="6"/><circle cx="60" cy="38" r="5"/><circle cx="50" cy="60" r="7"/><circle cx="68" cy="58" r="4"/><circle cx="32" cy="62" r="4"/></g><path d="M50 50L50 14A36 36 0 0 1 82 34Z" fill="#0D330E" opacity=".12"/></svg>';
function el(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e}
function digits(s){return String(s||'').replace(/\D/g,'')}
function waHref(msg){var n=digits(C.whatsapp);return n?'https://wa.me/'+n+'?text='+encodeURIComponent(msg||C.whatsappMessage||''):root+'contact/#whatsapp'}
function pic(it){var d=el('div','pic');if(it&&it.image){var i=el('img');i.src=root+it.image;i.alt=it.name;i.loading='lazy';d.appendChild(i)}else d.innerHTML=PIZZA;return d}
// nav
var b=document.querySelector('.burger'),ul=document.getElementById('menu');
if(b&&ul){b.addEventListener('click',function(){var o=ul.classList.toggle('open');b.setAttribute('aria-expanded',o)});
ul.addEventListener('click',function(e){if(e.target.closest('a')){ul.classList.remove('open');b.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ul.classList.contains('open')){ul.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus()}})}
// whatsapp links
document.querySelectorAll('[data-wa]').forEach(function(a){a.href=waHref();if(digits(C.whatsapp)){a.target='_blank';a.rel='noopener noreferrer'}else a.title='WhatsApp number coming soon'});
// contact details
var map={phone:C.phone,email:C.email,address:C.address};
document.querySelectorAll('[data-c]').forEach(function(n){var k=n.getAttribute('data-c'),v=map[k];
 if(!v){n.textContent='To be announced';n.classList.add('tba');return}
 if(k==='phone'){var a=el('a',0,v);a.href='tel:'+v.replace(/[^\d+]/g,'');n.replaceChildren(a)}
 else if(k==='email'){var m=el('a',0,v);m.href='mailto:'+v;n.replaceChildren(m)}else n.textContent=v});
document.querySelectorAll('[data-hours]').forEach(function(n){
 if(!(C.hours||[]).length){n.textContent='Opening hours to be announced';return}
 n.replaceChildren();C.hours.forEach(function(h){n.appendChild(el('li',0,h[0]+': '+h[1]))})});
document.querySelectorAll('[data-social]').forEach(function(n){var u=C.social&&C.social[n.getAttribute('data-social')];
 if(u){n.href=u;n.target='_blank';n.rel='noopener noreferrer'}else n.parentNode.remove()});
var soc=document.querySelector('[data-social-empty]');if(soc&&!soc.querySelector('li'))soc.textContent='Social links to be announced';
var dir=document.getElementById('directions');
if(dir){if(C.address){dir.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(C.mapsQuery||C.address);dir.target='_blank';dir.rel='noopener noreferrer';
 var f=document.getElementById('map');if(f){var i=el('iframe');i.src='https://www.google.com/maps?q='+encodeURIComponent(C.mapsQuery||C.address)+'&output=embed';i.title='Map to ROMAE PIZZERIA';i.loading='lazy';i.style.cssText='width:100%;height:320px;border:0;border-radius:26px';f.replaceChildren(i)}}
 else dir.remove()}
// menu rendering
var M=C.menu||[];
function slot(n){var a=[];for(var i=0;i<n;i++)a.push({name:'Signature pizza',description:'Menu being finalised',price:'',placeholder:1});return a}
function pick(flag,n){var l=M.filter(function(m){return m[flag]}).slice(0,n);return l.length?l:(M.slice(0,n).length?M.slice(0,n):slot(n))}
document.querySelectorAll('[data-render]').forEach(function(host){
 var kind=host.getAttribute('data-render');
 if(kind==='featured'){pick('featured',3).forEach(function(m){var r=el('div','round');var p=pic(m.placeholder?null:m);r.appendChild(p);r.appendChild(el('strong',0,m.name));r.appendChild(el('small',0,m.description||''));if(m.price)r.appendChild(el('span','price',m.price));host.appendChild(r)})}
 if(kind==='recommended'||kind==='menu'){
  var list=kind==='menu'?M:pick('recommended',3);
  var draw=function(cat){host.replaceChildren();
   if(!list.length){host.appendChild(el('p','note','The full menu is being finalised. Message us on WhatsApp to ask what is available today.'));return}
   list.filter(function(m){return !cat||cat==='All'||m.category===cat}).forEach(function(m){
    var c=el('article','card'),t=el('div');c.appendChild(pic(m.placeholder?null:m));t.appendChild(el('h3',0,m.name));t.appendChild(el('p',0,m.description||''));
    var r=el('div','row');r.appendChild(el('span','price',m.price||''));
    if(!m.placeholder){var g=el('a','go','+');g.href=waHref('Hello ROMAE PIZZERIA! I would like to order: '+m.name);g.setAttribute('aria-label','Order '+m.name+' on WhatsApp');if(digits(C.whatsapp)){g.target='_blank';g.rel='noopener noreferrer'}r.appendChild(g)}
    t.appendChild(r);c.appendChild(t);host.appendChild(c)})};
  draw();
  var fb=document.getElementById('filters');
  if(fb&&kind==='menu'){var cats=['All'];M.forEach(function(m){if(m.category&&cats.indexOf(m.category)<0)cats.push(m.category)});
   if(cats.length>1)cats.forEach(function(c,i){var p=el('button','pill',c);p.type='button';p.setAttribute('aria-pressed',i===0);p.onclick=function(){fb.querySelectorAll('.pill').forEach(function(x){x.setAttribute('aria-pressed','false')});p.setAttribute('aria-pressed','true');draw(c)};fb.appendChild(p)})}
  if(kind==='menu'&&list.length===0){host.style.display='block'}
 }});
// contact form
var form=document.getElementById('contact-form');
if(form){form.addEventListener('submit',function(e){e.preventDefault();
 var n=form.name,c=form.contact,m=form.message,st=document.getElementById('form-status'),ok=true;
 [[n,n.value.trim().length>1,'Please enter your name.'],[c,/^\S+@\S+\.\S+$/.test(c.value.trim())||digits(c.value).length>=8,'Enter a valid email or phone number.'],[m,m.value.trim().length>4,'Please write a short message.']].forEach(function(x){
  var er=document.getElementById(x[0].id+'-err');er.textContent=x[1]?'':x[2];x[0].setAttribute('aria-invalid',!x[1]);if(!x[1])ok=false});
 if(!ok){st.textContent='';return}
 if(C.formEndpoint){st.textContent='Sending…';fetch(C.formEndpoint,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({name:n.value,contact:c.value,message:m.value})})
  .then(function(r){if(!r.ok)throw 0;st.textContent='Thank you — your message was sent.';form.reset()}).catch(function(){st.textContent='Sorry, the message could not be sent. Please try WhatsApp instead.'})}
 else{st.textContent='Message delivery is not connected yet, so nothing was sent. Use the WhatsApp button to reach us now.'}})}
// reveal
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(function(n){io.observe(n)})}else document.querySelectorAll('.reveal').forEach(function(n){n.classList.add('in')});
})();
