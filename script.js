/* ═══════════ НАСТРОЙКИ ═══════════ */
const CONFIG = {
  eventDate: '2026-10-17T17:00:00' // 17 октября 2026, 17:00
};

/* ── обратный отсчёт ── */
const target = new Date(CONFIG.eventDate).getTime();
const pad = n => String(n).padStart(2,'0');
const d = document.getElementById('d'),
      h = document.getElementById('h'),
      m = document.getElementById('m'),
      s = document.getElementById('s');
setInterval(()=>{
  const diff = target - Date.now();
  if(diff <= 0){
    document.getElementById('count').innerHTML =
      '<div class="count-box" style="min-width:auto;padding:16px 30px"><b>🎉 Вечеринка началась!</b></div>';
    return;
  }
  d.textContent = Math.floor(diff/864e5);
  h.textContent = pad(Math.floor(diff/36e5)%24);
  m.textContent = pad(Math.floor(diff/6e4)%60);
  s.textContent = pad(Math.floor(diff/1e3)%60);
},1000);

/* ── мерцающие звёзды по всему сайту ✨ ── */
const sparkles = document.createElement('div');
sparkles.id = 'sparkles';
document.body.appendChild(sparkles);
const glyphs = ['✦','✧','✨','⭐'];
for(let i=0;i<45;i++){
  const st = document.createElement('span');
  st.className = 'sparkle';
  st.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
  st.style.left = Math.random()*100 + 'vw';
  st.style.top = Math.random()*100 + 'vh';
  st.style.fontSize = (8 + Math.random()*15) + 'px';
  st.style.animationDelay = (Math.random()*4) + 's';
  st.style.setProperty('--tw', (2 + Math.random()*3.5) + 's');
  sparkles.appendChild(st);
}

/* ── вишнёвый дождь ── */
const rain = document.getElementById('rain');
setInterval(()=>{
  if(document.hidden || rain.children.length > 35) return;
  const c = document.createElement('span');
  c.className = 'rain-cherry';
  c.textContent = Math.random() < .8 ? '🍒' : '🪩';
  c.style.left = Math.random()*100 + 'vw';
  c.style.fontSize = (14 + Math.random()*20) + 'px';
  c.style.animationDuration = (6 + Math.random()*7) + 's';
  rain.appendChild(c);
  setTimeout(()=>c.remove(), 14000);
}, 800);

/* ── взрыв вишенок и искр по клику в любом месте ── */
document.addEventListener('pointerdown', e=>{
  for(let i=0;i<12;i++){
    const p = document.createElement('span');
    p.className = 'pop';
    const r = Math.random();
    p.textContent = r < .4 ? '🍒' : (r < .8 ? '✨' : '💖');
    const a = Math.random()*Math.PI*2, dist = 60 + Math.random()*100;
    p.style.left = e.clientX+'px'; p.style.top = e.clientY+'px';
    p.style.fontSize = (14+Math.random()*16)+'px';
    p.style.setProperty('--dx', Math.cos(a)*dist+'px');
    p.style.setProperty('--dy', Math.sin(a)*dist+'px');
    p.style.setProperty('--rot', (Math.random()*360-180)+'deg');
    document.body.appendChild(p);
    setTimeout(()=>p.remove(), 950);
  }
});

/* ── диско-шар: режим вечеринки по клику ── */
const ball = document.getElementById('ballZone');
ball.addEventListener('click', ()=>{
  ball.classList.add('party');
  setTimeout(()=>ball.classList.remove('party'), 2500);
});

/* ── буквы заголовка прыгают при наведении ── */
const t = document.getElementById('title');
t.innerHTML = [...t.textContent].map(ch =>
  ch === ' ' ? ' ' : `<span class="ltr">${ch}</span>`).join('');
