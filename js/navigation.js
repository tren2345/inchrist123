// js/navigation.js
export function initNavigation() {
  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
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
}
