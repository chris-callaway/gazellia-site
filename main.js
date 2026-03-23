// ---- Nav scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ---- Mobile menu ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll(
  '.agent-card, .cap-item, .result-stat, .tech-col'
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.children).filter(el =>
          el.matches('.agent-card, .cap-item, .result-stat, .tech-col')
        );
        const i = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
);
revealEls.forEach(el => observer.observe(el));

// ---- Duplicate ticker for seamless loop ----
const tickerInner = document.querySelector('.ticker-inner');
if (tickerInner) {
  tickerInner.innerHTML += tickerInner.innerHTML;
}

// ---- Contact form ----
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const d = Object.fromEntries(new FormData(form));
  const subject = encodeURIComponent(`Gazellia inquiry from ${d.name} — ${d.interest}`);
  const body = encodeURIComponent(
    `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company || 'N/A'}\nInterest: ${d.interest}\n\nMessage:\n${d.message}`
  );
  window.location.href = `mailto:chris@gazellia.com?subject=${subject}&body=${body}`;
  const btn = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sent!';
  btn.style.background = '#34d399';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; form.reset(); }, 3000);
});

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
