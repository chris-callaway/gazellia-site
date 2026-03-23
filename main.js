// ---- Nav scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ---- Mobile menu ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Scroll reveal ----
const revealElements = document.querySelectorAll(
  '.cap-card, .agent-card, .result-card, .process-step, .tech-group'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.children).filter(el =>
          el.matches('.cap-card, .agent-card, .result-card, .process-step, .tech-group')
        );
        const index = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), index * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);

revealElements.forEach(el => observer.observe(el));

// ---- Contact form ----
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  const subject = encodeURIComponent(`New inquiry from ${data.name} — ${data.interest}`);
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'N/A'}\nInterest: ${data.interest}\n\nMessage:\n${data.message}`
  );
  window.location.href = `mailto:chris@gazellia.com?subject=${subject}&body=${body}`;

  const btn = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sent!';
  btn.style.background = '#4ade80';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    form.reset();
  }, 3000);
});

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
