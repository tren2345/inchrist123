// js/navigation.js
export function initNavigation() {
  // Smooth scrolling and active highlight for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('text-blue-600'));
      link.classList.add('text-blue-600');
      document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Keyboard navigation for nav links, theme toggle, and social/contact links
  document.querySelectorAll('.nav-link, #theme-toggle, a[href*="wa.me"], a[href*="facebook"], a[href*="instagram"], a[href*="youtube"], a[href*="mailto"]').forEach(elem => {
    elem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        elem.click();
      }
    });
  });

  // Fullscreen overlay navigation
  const overlay = document.getElementById('overlay-menu');
  const openBtn = document.getElementById('open-overlay-menu');
  const closeBtn = document.getElementById('close-overlay-menu');
  if (openBtn && overlay) {
    openBtn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }
  overlay?.querySelectorAll('.overlay-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
      if (href) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Side dot navigation + scrollspy
  const sections = Array.from(document.querySelectorAll('section'));
  const dotItems = Array.from(document.querySelectorAll('.dot-nav-item'));
  function activateDotById(id) {
    dotItems.forEach(a => a.classList.remove('active'));
    const match = dotItems.find(a => a.getAttribute('href') === `#${id}`);
    if (match) match.classList.add('active');
  }
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activateDotById(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });
  sections.forEach(s => spy.observe(s));
  dotItems.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href');
      if (href) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
