// Theme toggle and persistence
document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('theme-checkbox');
  const root = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.setAttribute('data-theme', 'light');
  };

  // Load saved theme or system preference
  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
    checkbox.checked = saved === 'dark';
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
    checkbox.checked = prefersDark;
  }

  checkbox.addEventListener('change', () => {
    const theme = checkbox.checked ? 'dark' : 'light';
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  });

  // image load fallback: if profile.jpg is missing, show an inline SVG placeholder
  const img = document.getElementById('profile-img');
  if (img) {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      // avoid adding multiple fallbacks
      if (!img.parentNode.querySelector('.avatar-fallback')) {
        const fallback = document.createElement('div');
        fallback.className = 'avatar-fallback';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.02)"/>
            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM3 21c0-3 6-5 9-5s9 2 9 5v1H3v-1z" fill="rgba(255,255,255,0.14)"/>
          </svg>
        `;
        img.parentNode.appendChild(fallback);
      }
    });
  }

  // No file upload UI — the page expects a file named `profile.jpg` in the same folder.

  // Contact modal behavior
  const contactBtn = document.getElementById('contact-btn');
  const modal = document.getElementById('contact-modal');
  const copyBtn = document.getElementById('copy-email');
  const contactEmail = document.getElementById('contact-email');

  function openModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  }

  // close when clicking elements with data-close
  modal && modal.addEventListener('click', (e) => { if (e.target && e.target.matches('[data-close]')) closeModal(); });

  // copy email to clipboard
  if (copyBtn && contactEmail) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(contactEmail.textContent.trim());
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy Email'; }, 2000);
      } catch (err) {
        console.warn('Clipboard write failed', err);
        copyBtn.textContent = 'Copy Failed';
        setTimeout(() => { copyBtn.textContent = 'Copy Email'; }, 2000);
      }
    });
  }

  // animate capability bars
  const caps = document.querySelectorAll('.cap-value');
  caps.forEach(el => {
    const level = Number(el.getAttribute('data-level')) || 0;
    const progress = el.closest('.cap-item').querySelector('.progress > span');
    // small delay for cascading effect
    setTimeout(() => { progress.style.width = level + '%'; }, 300 + Math.random() * 400);
  });

  // lightweight particle background on canvas
  const canvas = document.getElementById('bg-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize(){
      w = canvas.width = innerWidth; h = canvas.height = innerHeight;
    }

    function rand(min,max){return Math.random()*(max-min)+min}

    function createParticles(count){
      particles = [];
      for(let i=0;i<count;i++){
        particles.push({x:rand(0,w),y:rand(0,h),vx:rand(-0.3,0.3),vy:rand(-0.3,0.3),r:rand(0.6,1.6)})
      }
    }

    function draw(){
      ctx.clearRect(0,0,w,h);
      for(const p of particles){
        p.x += p.vx; p.y += p.vy;
        if(p.x<0) p.x = w; if(p.x> w) p.x=0; if(p.y<0) p.y=h; if(p.y>h) p.y=0;
        ctx.beginPath(); ctx.globalAlpha = 0.75; ctx.fillStyle = 'rgba(60,140,255,0.12)'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
      // draw connecting lines for nearby particles
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a=particles[i], b=particles[j];
          const dx=a.x-b.x, dy=a.y-b.y; const d=dx*dx+dy*dy;
          if(d<16000){ ctx.beginPath(); ctx.globalAlpha = 0.06; ctx.strokeStyle='rgba(60,140,255,0.14)'; ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
        }
      }
      requestAnimationFrame(draw);
    }

    function initParticles(){ resize(); createParticles(Math.min(120, Math.floor((w*h)/5000))); }
    window.addEventListener('resize', ()=>{ initParticles(); });
    initParticles(); draw();
  }
});
