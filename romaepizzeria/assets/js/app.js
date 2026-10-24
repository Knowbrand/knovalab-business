(function(){
var C=window.ROMAE||{},root=document.documentElement.getAttribute('data-root')||'./';
var CATS=C.menu||[],ALL=[];
CATS.forEach(function(c){c.items.forEach(function(i){var o={};for(var k in i)o[k]=i[k];o.category=c.category;ALL.push(o)})});
var PIZZA='<svg viewBox="0 0 100 100" width="60%" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#CECE78"/><circle cx="50" cy="50" r="36" fill="#FFF6E9"/><g fill="#537C2E"><circle cx="38" cy="40" r="6"/><circle cx="60" cy="38" r="5"/><circle cx="50" cy="60" r="7"/><circle cx="68" cy="58" r="4"/><circle cx="32" cy="62" r="4"/></g><path d="M50 50L50 14A36 36 0 0 1 82 34Z" fill="#0D330E" opacity=".12"/></svg>';
var DOT='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11h14l-1.2 8a2 2 0 0 1-2 1.7H8.200a2 2 0 0 1-2-1.700z"/><path d="M8 11a4 4 0 0 1 8 0"/><path d="M12 4v3"/></svg>';
function el(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e}
function digits(s){return String(s||'').replace(/\D/g,'')}
function money(p){return p===''||p==null?'':'\u20B9'+p}
function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function waHref(msg){var n=digits(C.whatsapp);return n?'https://wa.me/'+n+'?text='+encodeURIComponent(msg||C.whatsappMessage||''):root+'contact/#whatsapp'}
function catImg(cat){return (C.categoryImages||{})[cat]}
function pic(it){var d=el('div','pic'),src=it&&(it.image||catImg(it.category));
 if(src){var i=el('img',it.image?'':'ill');i.src=root+src;i.alt=it.image?it.name:'';i.loading='lazy';d.appendChild(i)}else d.innerHTML=PIZZA;return d}
function tags(it){var f=document.createDocumentFragment();(it.tags||[]).forEach(function(t){f.appendChild(el('span','tag '+(t==='Spicy'?'spicy':t==='Romae Spl.'?'spl':''),t))});return f}
function orderBtn(it,cls){var g=el('a',cls,'+');g.href=waHref('Hello ROMAE PIZZERIA! I would like to order: '+it.name+(it.category?' ('+it.category+')':''));
 g.setAttribute('aria-label','Order '+it.name+' on WhatsApp');if(digits(C.whatsapp)){g.target='_blank';g.rel='noopener noreferrer'}return g}
// nav
var b=document.querySelector('.burger'),ul=document.getElementById('menu');
if(b&&ul){b.addEventListener('click',function(){var o=ul.classList.toggle('open');b.setAttribute('aria-expanded',o)});
ul.addEventListener('click',function(e){if(e.target.closest('a')){ul.classList.remove('open');b.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ul.classList.contains('open')){ul.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus()}})}
// whatsapp links
document.querySelectorAll('[data-wa]').forEach(function(a){a.href=waHref();if(digits(C.whatsapp)){a.target='_blank';a.rel='noopener noreferrer'}else a.title='WhatsApp number coming soon'});
// contact details
var map={phone:C.phone,address:C.address};
document.querySelectorAll('[data-c]').forEach(function(n){var k=n.getAttribute('data-c'),v=map[k];
 if(!v){n.textContent='To be announced';n.classList.add('tba');return}
 if(k==='phone'){var a=el('a',0,v);a.href='tel:'+v.replace(/[^\d+]/g,'');n.replaceChildren(a)}else n.textContent=v});
document.querySelectorAll('[data-hours]').forEach(function(n){
 if(!(C.hours||[]).length){n.textContent='Opening hours to be announced';return}
 n.replaceChildren();C.hours.forEach(function(h){n.appendChild(el('li',0,h[0]+': '+h[1]))})});
document.querySelectorAll('[data-social]').forEach(function(n){var u=C.social&&C.social[n.getAttribute('data-social')];
 if(u){n.href=u;n.target='_blank';n.rel='noopener noreferrer'}else n.parentNode.remove()});
var dir=document.getElementById('directions');
if(dir){if(C.address){dir.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(C.mapsQuery||C.address);dir.target='_blank';dir.rel='noopener noreferrer';
 var f=document.getElementById('map');if(f){var i=el('iframe');i.src='https://www.google.com/maps?q='+encodeURIComponent(C.mapsQuery||C.address)+'&output=embed';i.title='Map to ROMAE PIZZERIA';i.loading='lazy';i.style.cssText='width:100%;height:320px;border:0;border-radius:26px';f.replaceChildren(i)}}
 else dir.remove()}
// home: featured + recommended
function pickFlag(flag,n){var l=ALL.filter(function(m){return m[flag]}).slice(0,n);return l.length?l:ALL.slice(0,n)}
document.querySelectorAll('[data-render]').forEach(function(host){
 var kind=host.getAttribute('data-render');
 if(kind==='featured'){pickFlag('featured',3).forEach(function(m){var r=el('div','round');r.appendChild(pic(m));r.appendChild(el('strong',0,m.name));
  r.appendChild(el('span','price',money(m.price)));host.appendChild(r)});
  if(!ALL.length)host.appendChild(el('p','note','Menu being finalised.'))}
 if(kind==='recommended'){if(!ALL.length){host.appendChild(el('p','note','The full menu is being finalised. Message us on WhatsApp to ask what is available today.'));return}
  pickFlag('recommended',3).forEach(function(m){var c=el('article','card'),t=el('div');c.appendChild(pic(m));
   var h=el('h3',0,m.name);t.appendChild(h);t.appendChild(el('p',0,m.description||m.category));
   var r=el('div','row');r.appendChild(el('span','price',money(m.price)));r.appendChild(orderBtn(m,'go'));t.appendChild(r);c.appendChild(t);host.appendChild(c)})}
 if(kind==='menu'){
  if(!CATS.length){host.appendChild(el('p','note','The full menu is being finalised. Message us on WhatsApp to ask what is available today.'));return}
  var secs=[];
  CATS.forEach(function(cat){
   var s=el('section','mcat');s.id='cat-'+slug(cat.category);
   var hd=el('div','mcat-head'),src=catImg(cat.category);
   if(src){var im=el('img');im.src=root+src;im.alt='';im.loading='lazy';hd.appendChild(im)}else{var d=el('span','cat-dot');d.innerHTML=DOT;hd.appendChild(d)}
   var ht=el('div');ht.appendChild(el('h2',0,cat.category));if(cat.note)ht.appendChild(el('small',0,cat.note));hd.appendChild(ht);s.appendChild(hd);
   var g=el('div','mgrid'+(cat.compact?' compact':''));
   cat.items.forEach(function(it){var o={};for(var k in it)o[k]=it[k];o.category=cat.category;
    var a=el('article','mitem'),inf=el('div'),h=el('h3',0,o.name);h.appendChild(tags(o));inf.appendChild(h);
    if(o.description)inf.appendChild(el('p',0,o.description));
    var sd=el('div','side');sd.appendChild(el('span','price',money(o.price)));sd.appendChild(orderBtn(o,'go'));
    a.appendChild(inf);a.appendChild(sd);g.appendChild(a)});
   s.appendChild(g);host.appendChild(s);secs.push([cat.category,s])});
  var fb=document.getElementById('filters');
  if(fb){['All'].concat(CATS.map(function(c){return c.category})).forEach(function(c,i){
   var p=el('button','pill',c);p.type='button';p.setAttribute('aria-pressed',i===0);
   p.onclick=function(){fb.querySelectorAll('.pill').forEach(function(x){x.setAttribute('aria-pressed','false')});p.setAttribute('aria-pressed','true');
    secs.forEach(function(s){s[1].hidden=!(c==='All'||s[0]===c)});
    var top=host.getBoundingClientRect().top+window.scrollY-110;if(window.scrollY>top)window.scrollTo({top:top,behavior:'smooth'})};
   fb.appendChild(p)})}
 }});
// contact form
var form=document.getElementById('contact-form');
if(form){form.addEventListener('submit',function(e){e.preventDefault();
 var n=form.name,c=form.contact,m=form.message,st=document.getElementById('form-status'),ok=true;
 if(form.elements['_honey']&&form.elements['_honey'].value)return;
 [[n,n.value.trim().length>1,'Please enter your name.'],[c,/^\S+@\S+\.\S+$/.test(c.value.trim())||digits(c.value).length>=8,'Enter a valid email or phone number.'],[m,m.value.trim().length>4,'Please write a short message.']].forEach(function(x){
  var er=document.getElementById(x[0].id+'-err');er.textContent=x[1]?'':x[2];x[0].setAttribute('aria-invalid',!x[1]);if(!x[1])ok=false});
 if(!ok){st.textContent='';return}
 if(C.formEndpoint){st.textContent='Sending\u2026';
  fetch(C.formEndpoint,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({name:n.value,contact:c.value,message:m.value,_subject:'New enquiry from the ROMAE PIZZERIA website',_template:'table',_captcha:'false'})})
  .then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){if(d&&(d.success===false||d.success==='false'))throw 0;st.textContent='Thank you \u2014 your message was sent.';form.reset()})
  .catch(function(){st.textContent='Sorry, the message could not be sent. Please try WhatsApp instead.'})}
 else{st.textContent='Message delivery is not connected yet, so nothing was sent. Use the WhatsApp button to reach us now.'}})}
// reveal
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(function(n){io.observe(n)})}else document.querySelectorAll('.reveal').forEach(function(n){n.classList.add('in')});
})();
