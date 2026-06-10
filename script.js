// ── NIKAH INVITATION SCRIPT ──

const envelopeScreen = document.getElementById('envelopeScreen');
const envFlap = document.getElementById('envFlap');
const envSeal = document.getElementById('envSeal');
const tapHint = document.getElementById('tapHint');
const cardScreen = document.getElementById('cardScreen');
let opened = false;

document.getElementById('envelope').addEventListener('click', open);
tapHint.addEventListener('click', open);
function open() {
  if (opened) return;
  opened = true;

  // AUTO START MUSIC WHEN ENVELOPE OPENS
  bgMusic.play().catch(() => {});
  playing = true;
  musicBtn.textContent = '■';
  musicBtn.classList.add('playing');

  tapHint.style.opacity = '0';
  envSeal.classList.add('hidden');
  envFlap.classList.add('open');

  setTimeout(() => {
    envelopeScreen.classList.add('gone');
    cardScreen.classList.remove('hidden');
    startPetals();
    initScroll();

    document.querySelectorAll('.bismillah-banner.fade-up, .card-header .fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 180);
    });
  }, 900);
}
// ── GOLD SPARKLE PETALS ──
const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');
let petals = [];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

function mkPetal() {
  const shapes = ['diamond', 'star', 'circle'];
  return {
    x: Math.random() * canvas.width,
    y: -20,
    size: 4 + Math.random() * 8,
    speed: .8 + Math.random() * 1.5,
    drift: (Math.random() - .5) * 1,
    rot: Math.random() * 360,
    rotS: (Math.random() - .5) * 3,
    color: ['#C8A951','#E8CC78','#F5E8B0','#FFFFFF'][Math.floor(Math.random()*4)],
    opacity: .4 + Math.random() * .6,
    shape: shapes[Math.floor(Math.random()*shapes.length)]
  };
}

function drawShape(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot * Math.PI / 180);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.shadowColor = p.color;
  ctx.shadowBlur = 6;
  const s = p.size;
  if (p.shape === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(0,-s); ctx.lineTo(s/2,0); ctx.lineTo(0,s); ctx.lineTo(-s/2,0);
    ctx.closePath(); ctx.fill();
  } else if (p.shape === 'star') {
    ctx.beginPath();
    for(let i=0;i<5;i++){
      const a = (i*72-90)*Math.PI/180;
      const r = i%2===0?s:s*.4;
      i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);
    }
    ctx.closePath(); ctx.fill();
  } else {
    ctx.beginPath(); ctx.arc(0,0,s/2,0,Math.PI*2); ctx.fill();
  }
  ctx.restore();
}

function animatePetals() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (Math.random() < .08 && petals.length < 50) petals.push(mkPetal());
  petals = petals.filter(p=>p.y<canvas.height+30);
  petals.forEach(p=>{
    p.y+=p.speed; p.x+=p.drift+Math.sin(p.y*.015)*.6; p.rot+=p.rotS;
    drawShape(p);
  });
  requestAnimationFrame(animatePetals);
}
function startPetals() { animatePetals(); }

// ── SCROLL ──
function initScroll() {
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.fade-up:not(.bismillah-banner):not(.card-header .fade-up)').forEach(el=>obs.observe(el));
}

// ── MUSIC ──
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let playing = false;
musicBtn.addEventListener('click',()=>{
  if(playing){ bgMusic.pause(); musicBtn.textContent='♪'; musicBtn.classList.remove('playing'); }
  else { bgMusic.play().catch(()=>{}); musicBtn.textContent='■'; musicBtn.classList.add('playing'); }
  playing=!playing;
});
