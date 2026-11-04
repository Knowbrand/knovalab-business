(function(){
var b=document.querySelector('.burger'),n=document.getElementById('nav');
function set(o){n.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')}
b.addEventListener('click',function(){set(b.getAttribute('aria-expanded')!=='true')});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){set(false);b.focus()}});
n.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
document.getElementById('yr').textContent=new Date().getFullYear();
var f=document.getElementById('cf');if(!f)return;
f.addEventListener('submit',function(e){e.preventDefault();
var s=document.getElementById('fs'),bad=null;
['n','e','m'].forEach(function(id){var el=document.getElementById(id),ok=el.value.trim()&&el.checkValidity();el.setAttribute('aria-invalid',!ok);if(!ok&&!bad)bad=el});
if(bad){s.textContent='Please fill in your name, a valid email address and a message.';s.className='small err';bad.focus();return}
var v=function(id){return document.getElementById(id).value.trim()};
var body='Name: '+v('n')+'\nPhone: '+(v('p')||'-')+'\nEmail: '+v('e')+'\n\n'+v('m');
s.className='small';s.textContent='Opening your email app. If nothing opens, email santoshkothawaleg@gmail.com directly.';
window.location.href='mailto:santoshkothawaleg@gmail.com?subject='+encodeURIComponent('Website inquiry: '+v('t'))+'&body='+encodeURIComponent(body)});
})();