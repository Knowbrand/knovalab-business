(function(){
var hd=document.getElementById('hd'),mt=document.getElementById('mt');
function sc(){hd.classList.toggle('sc',scrollY>20)}sc();addEventListener('scroll',sc,{passive:true});
function tog(o){hd.classList.toggle('open',o);mt.setAttribute('aria-expanded',o);mt.setAttribute('aria-label',o?'Close menu':'Open menu')}
mt.addEventListener('click',function(){tog(!hd.classList.contains('open'))});
document.getElementById('nv').addEventListener('click',function(e){if(e.target.closest('a'))tog(false)});
addEventListener('keydown',function(e){if(e.key=='Escape')tog(false)});
document.getElementById('tp').addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15}):null;
document.querySelectorAll('.rvl').forEach(function(e){io?io.observe(e):e.classList.add('in')});
})();
