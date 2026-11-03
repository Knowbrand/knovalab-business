(function(){
var root=document.body.dataset.root||'';
var INVENTORY=[ // DEMO DATA: replace with verified stock. Use null for unverified fields; set demo:false once verified.
{id:'d1',make:'Maruti Suzuki',model:'Swift',year:null,category:'hatchback',fuel:'Petrol',transmission:'Manual',odometer:null,price:280000,image:'category-hatchback.svg',description:'Sample hatchback listing.',status:'demo',demo:true},
{id:'d2',make:'Honda',model:'City',year:null,category:'sedan',fuel:'Petrol',transmission:'Automatic',odometer:null,price:650000,image:'category-sedan.svg',description:'Sample sedan listing.',status:'demo',demo:true},
{id:'d3',make:'Hyundai',model:'Creta',year:null,category:'suv',fuel:'Diesel',transmission:'Automatic',odometer:null,price:950000,image:'category-suv.svg',description:'Sample SUV listing.',status:'demo',demo:true},
{id:'d4',make:'BMW',model:'3 Series',year:null,category:'luxury',fuel:'Diesel',transmission:'Automatic',odometer:null,price:1800000,image:'category-luxury.svg',description:'Sample luxury listing.',status:'demo',demo:true},
{id:'d5',make:'Hyundai',model:'i20',year:null,category:'hatchback',fuel:'Petrol',transmission:'Manual',odometer:null,price:450000,image:'category-hatchback.svg',description:'Sample hatchback listing.',status:'demo',demo:true},
{id:'d6',make:'Hyundai',model:'Verna',year:null,category:'sedan',fuel:'Diesel',transmission:'Manual',odometer:null,price:550000,image:'category-sedan.svg',description:'Sample sedan listing.',status:'demo',demo:true},
{id:'d7',make:'Tata',model:'Nexon',year:null,category:'suv',fuel:'Petrol',transmission:'Manual',odometer:null,price:720000,image:'category-suv.svg',description:'Sample SUV listing.',status:'demo',demo:true},
{id:'d8',make:'Maruti Suzuki',model:'Ertiga',year:null,category:'suv',fuel:'CNG',transmission:'Manual',odometer:null,price:600000,image:'category-suv.svg',description:'Sample CNG listing.',status:'demo',demo:true}];
var CATS={hatchback:'Hatchbacks',sedan:'Sedans',suv:'SUVs',luxury:'Luxury Cars'};
var lakh=function(p){return '\u20B9'+(p/100000).toFixed(1).replace('.0','')+' lakh'};
var band=function(p){return p<300000?'u3':p<=500000?'3-5':p<=800000?'5-8':'8p'};
var wa=function(c){var t='Hi CAR ZONE, I am interested in the '+c.make+' '+c.model+(c.year?' ('+c.year+')':'')+' (Ref '+c.id+')'+(c.demo?' shown as a sample listing on your website':'')+'. Is something similar available?';return 'https://wa.me/919870444308?text='+encodeURIComponent(t)};
var card=function(c){var sp=[c.year,c.fuel,c.transmission,c.odometer?c.odometer.toLocaleString('en-IN')+' km':null].filter(Boolean).join(', ');
return '<article class="car"><button class="ci" data-id="'+c.id+'" aria-label="View details for '+c.make+' '+c.model+'"><img src="'+root+'assets/images/'+c.image+'" alt="'+c.make+' '+c.model+' (sample image)" loading="lazy" width="800" height="600">'+(c.demo?'<em class="demo">Demo listing</em>':'')+'</button><div class="cb"><h3>'+c.make+' '+c.model+'</h3><p class="sp">'+sp+'</p><p class="pr">'+(c.price?lakh(c.price)+(c.demo?' (demo)':''):'Price on request')+'</p>'+(c.demo?'<small>Demo listing \u2014 replace with verified inventory</small>':'')+'<div class="ca"><a class="btn sm" target="_blank" rel="noopener" href="'+wa(c)+'">Enquire</a><button class="ln2" data-id="'+c.id+'">Details</button></div></div></article>'};
var grid,fp,rs,cat='';
var makes=INVENTORY.map(function(c){return c.make}).filter(function(m,i,a){return a.indexOf(m)==i}).sort();
function val(n){return fp?fp[n].value:''}
function show(go){var f={make:val('make'),budget:val('budget'),fuel:val('fuel'),trans:val('trans')};
var act=cat||f.make||f.budget||f.fuel||f.trans;
var m=INVENTORY.filter(function(c){return (!cat||c.category==cat)&&(!f.make||c.make==f.make)&&(!f.budget||(c.price&&band(c.price)==f.budget))&&(!f.fuel||c.fuel==f.fuel)&&(!f.trans||c.transmission==f.trans)});
var lim=+grid.dataset.limit||99,list=act?m:m.slice(0,lim);
grid.innerHTML=list.length?list.map(card).join(''):'<div class="em"><h3>No matching cars right now</h3><p>Tell us what you are looking for and our team will help you find options.</p><a class="btn" target="_blank" rel="noopener" href="https://wa.me/919870444308?text='+encodeURIComponent('Hi CAR ZONE, I could not find what I was looking for on your website. Can you help?')+'">Send an enquiry</a></div>';
rs.innerHTML=act?m.length+' demo listing'+(m.length==1?'':'s')+' found'+(cat?' in '+CATS[cat]:'')+'<button type="button" id="cl">Clear filters</button>':'';
grid.classList.remove('fl');void grid.offsetWidth;grid.classList.add('fl');
if(go)grid.scrollIntoView({behavior:'smooth',block:'start'})}
function reset(){if(fp)fp.reset();cat='';show(false)}
// runs after components.js has injected the filter form
window.initInventory=function(){grid=document.getElementById('grid');fp=document.getElementById('fp');rs=document.getElementById('rs');if(!grid)return;
if(fp){fp.make.innerHTML='<option value="">Any make</option>'+makes.map(function(m){return '<option>'+m+'</option>'}).join('');
fp.addEventListener('submit',function(e){e.preventDefault();show(true)});fp.querySelector('.rst').addEventListener('click',reset)}
var q=new URLSearchParams(location.search).get('cat');if(CATS[q])cat=q;
show(false);
var dlg=document.createElement('dialog');dlg.setAttribute('aria-label','Vehicle details');document.body.appendChild(dlg);
dlg.addEventListener('click',function(e){if(e.target==dlg||e.target.className=='mx')dlg.close()});
document.addEventListener('click',function(e){
if(e.target.closest('#cl')){reset();return}
var ct=e.target.closest('[data-cat]');if(ct){e.preventDefault();cat=ct.dataset.cat;show(true);return}
var b=e.target.closest('[data-id]');if(b){var c=INVENTORY.filter(function(x){return x.id==b.dataset.id})[0];
dlg.innerHTML='<button class="mx" aria-label="Close">\u2715</button><img src="'+root+'assets/images/'+c.image+'" alt="" width="800" height="450"><div class="mb"><h3>'+c.make+' '+c.model+'</h3><p>'+CATS[c.category]+', '+c.fuel+', '+c.transmission+'</p><p>'+c.description+(c.demo?' This is a demo listing, not current stock.':'')+'</p><p><b>'+(c.price?lakh(c.price)+(c.demo?' (demo)':''):'Price on request')+'</b></p><a class="btn" target="_blank" rel="noopener" href="'+wa(c)+'">Enquire on WhatsApp</a></div>';dlg.showModal()}
var w=e.target.closest('[data-wa]');if(w)w.href='https://wa.me/919870444308?text='+encodeURIComponent(w.dataset.wa)})}
})();
