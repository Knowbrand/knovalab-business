const $=(s,r=document)=>[...r.querySelectorAll(s)];
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('s');if(e.target.dataset.c)count(e.target);obs.unobserve(e.target)}}),{threshold:.15});
$('.rv,[data-c]').forEach(e=>obs.observe(e));
function count(el){const t=+el.dataset.c,d=t%1?1:0,s=performance.now();(function f(n){const p=Math.min((n-s)/1400,1);el.textContent=(t*(1-Math.pow(1-p,3))).toFixed(d);p<1&&requestAnimationFrame(f)})(s)}
let q=0;function tick(){const vh=innerHeight;$('[data-rot]').forEach(e=>{const r=e.getBoundingClientRect(),d=r.top+r.height/2-vh/2;e.style.transform=`translateY(${-d*(+e.dataset.sp||0)}px) rotate(${scrollY*e.dataset.rot}deg)`});
$('.hb').forEach(e=>e.style.transform=`scale(1.1) translateY(${scrollY*.12}px)`)}
addEventListener('scroll',()=>{q||(q=requestAnimationFrame(()=>{tick();q=0}))},{passive:true});tick();
addEventListener('pointermove',e=>{$('#glow')[0].style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
const go=document.getElementById('go');if(go)go.onclick=()=>{const v=i=>document.getElementById(i).value.trim();
window.open('https://wa.me/917718985855?text='+encodeURIComponent(`Hello The Vista Grand! I am ${v('n')}. Event: ${v('e')}. Guests: ${v('g')}. Date: ${v('d')}. ${v('m')}`),'_blank')};
