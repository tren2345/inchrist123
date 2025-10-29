// js/navigation.js
export function initNavigation() {
  // Function to handle smooth scroll for any nav link
  function handleNavClick(e, link) {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Close dropdown/overlay if open
    const dropdown = document.getElementById('menu-dropdown');
    const overlay = document.getElementById('overlay-menu');
    if (dropdown && dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    }
    if (overlay && !overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  // Dropdown menu toggle (works on all devices)
  const menuToggle = document.getElementById('menu-toggle');
  const menuDropdown = document.getElementById('menu-dropdown');
  if (menuToggle && menuDropdown) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent immediate close
      const isVisible = menuDropdown.style.display === 'block';
      menuDropdown.style.display = isVisible ? 'none' : 'block';
    });

    // Click outside to close dropdown
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.style.display = 'none';
      }
    });

    // Hover for desktop
    if (window.innerWidth > 768) {
      menuToggle.addEventListener('mouseenter', () => {
        menuDropdown.style.display = 'block';
      });
      menuDropdown.addEventListener('mouseleave', () => {
        menuDropdown.style.display = 'none';
      });
    }
  }

  // Apply nav behavior to dropdown links
  menuDropdown?.querySelectorAll('a').forEach(link => {
    link.classList.add('nav-link');
    link.addEventListener('click', (e) => handleNavClick(e, link));
  });

  // Fullscreen overlay navigation (mobile)
  const overlay = document.getElementById('overlay-menu');
  const openBtn = document.getElementById('open-overlay-menu');
  const closeBtn = document.getElementById('close-overlay-menu');
  let lastFocused;

  if (openBtn && overlay) {
    openBtn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      overlay.setAttribute('aria-hidden', 'false');
      lastFocused = document.activeElement;
      closeBtn?.focus();
      // Trap focus
      const focusable = overlay.querySelectorAll('a, button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      function onTab(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      overlay.addEventListener('keydown', onTab);
      overlay.dataset.trap = '1';
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
      overlay.setAttribute('aria-hidden', 'true');
      lastFocused?.focus();
      if (overlay.dataset.trap) {
        // Remove trap listener by cloning
        const clone = overlay.cloneNode(true);
        overlay.parentNode.replaceChild(clone, overlay);
      }
    });
  }

  overlay?.querySelectorAll('.overlay-link').forEach(link => {
    link.classList.add('nav-link');
    link.addEventListener('click', (e) => handleNavClick(e, link));
  });

  // ESC to close overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) {
      closeBtn?.click();
    }
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

  // Side dot navigation + scrollspy
  const sections = Array.from(document.querySelectorAll('section'));
  const dotItems = Array.from(document.querySelectorAll('.dot-nav-item'));
  const topNavLinks = Array.from(document.querySelectorAll('.nav-link'));
  function activateDotById(id) {
    dotItems.forEach(a => a.classList.remove('active'));
    const match = dotItems.find(a => a.getAttribute('href') === `#${id}`);
    if (match) match.classList.add('active');
    // Sync top nav highlight
    topNavLinks.forEach(l => l.classList.remove('text-blue-600'));
    const topMatch = topNavLinks.find(l => l.getAttribute('href') === `#${id}`);
    topMatch?.classList.add('text-blue-600');
    // ARIA current
    topNavLinks.forEach(l => l.removeAttribute('aria-current'));
    if (topMatch) topMatch.setAttribute('aria-current', 'page');
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
