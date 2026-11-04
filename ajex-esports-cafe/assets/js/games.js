/* Suggested catalogue — NOT a verified inventory. Edit freely. */
(() => {
'use strict';
const CATS = ['All','Competitive FPS','Battle Royale','MOBA & Strategy','Racing','Sports & Casual','Console'];
const GAMES = [
 ['VALORANT',['Competitive FPS'],'PC'],['Counter-Strike 2',['Competitive FPS'],'PC'],['Call of Duty',['Competitive FPS'],'PC · Console'],['Apex Legends',['Competitive FPS','Battle Royale'],'PC · Console'],['Overwatch 2',['Competitive FPS'],'PC · Console'],
 ['Fortnite',['Battle Royale'],'PC · Console'],['PUBG: Battlegrounds',['Battle Royale'],'PC'],['Call of Duty: Warzone',['Battle Royale'],'PC · Console'],
 ['Dota 2',['MOBA & Strategy'],'PC'],['League of Legends',['MOBA & Strategy'],'PC'],['Age of Empires IV',['MOBA & Strategy'],'PC'],
 ['Forza Horizon 5',['Racing'],'PC'],['Assetto Corsa',['Racing'],'PC'],['Need for Speed',['Racing'],'PC · Console'],['F1 series',['Racing'],'PC · Console'],
 ['EA SPORTS FC',['Sports & Casual'],'PC · Console'],['Rocket League',['Sports & Casual'],'PC · Console'],['Fall Guys',['Sports & Casual'],'PC · Console'],['Minecraft',['Sports & Casual'],'PC · Console'],
 ['Grand Theft Auto V',['Console'],'PS5'],['God of War',['Console'],'PS5'],["Marvel's Spider-Man",['Console'],'PS5'],['Mortal Kombat',['Console'],'PS5'],['Tekken',['Console'],'PS5'],['WWE 2K series',['Console'],'PS5']
];
const grid = document.getElementById('game-grid');
const dl = document.getElementById('bk-games'); if (dl) dl.innerHTML = GAMES.map(g => `<option value="${g[0]}">`).join('');
if (!grid) return;
const chips = document.getElementById('chips'), q = document.getElementById('game-q'), count = document.getElementById('game-count');
let cat = 'All';
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
chips.innerHTML = CATS.map((c, i) => `<button type="button" class="chip${i ? '' : ' on'}" data-c="${c}">${c}</button>`).join('');
function render() {
  const t = q.value.trim().toLowerCase();
  const list = GAMES.filter(g => (cat === 'All' || g[1].includes(cat)) && g[0].toLowerCase().includes(t));
  count.textContent = list.length + (list.length === 1 ? ' title' : ' titles');
  grid.innerHTML = list.length ? list.map(g => `<article class="card gcard"><h3>${esc(g[0])}</h3><p class="mut" style="font-size:.85rem">${esc(g[2])}</p><div>${g[1].map(c => `<span class="tag">${esc(c)}</span>`).join('')}</div><a href="${GE.waLink("Hi Ajex Esports Cafe! Is " + g[0] + " available to play? Please share pricing too.")}" target="_blank" rel="noopener">Ask about this game</a></article>`).join('')
   : `<div class="empty" style="grid-column:1/-1"><h3>No games match “${esc(q.value)}”</h3><p class="mut">Try another name or clear the filter. Missing a title? <a href="${GE.waLink('Hi Ajex Esports Cafe! Do you have ' + q.value + '?')}" target="_blank" rel="noopener" style="color:var(--red2)">Ask us on WhatsApp</a>.</p></div>`;
}
chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; cat = b.dataset.c; chips.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b)); render(); });
q.addEventListener('input', render); render();
})();
