// js/main.js
import { initTyping } from './typing.js';
import { initCalendar } from './calendar.js';
import { initThemeToggle } from './theme.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initRipple } from './ripple.js';

document.addEventListener('DOMContentLoaded', () => {
  initTyping();
  initCalendar();
  initThemeToggle();
  initNavigation();
  initRipple();
  initAnimations();

  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }

  // Intersection Observer for Section Fade-In
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Cookie banner simple logic
  try {
    const banner = document.getElementById('cookie-banner');
    const accept = document.getElementById('cookie-accept');
    if (banner && accept) {
      if (!localStorage.getItem('cookieAccepted')) {
        banner.classList.remove('hidden');
      }
      accept.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        banner.classList.add('hidden');
      });
    }
  } catch (_) {}
});
