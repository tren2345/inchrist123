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

    // Dropdown menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuDropdown = document.getElementById('menu-dropdown');
    if (menuToggle && menuDropdown) {
        menuToggle.addEventListener('click', () => {
            const isVisible = menuDropdown.style.display === 'block';
            menuDropdown.style.display = isVisible ? 'none' : 'block';
        });
    }

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
                overlay.replaceWith(overlay.cloneNode(true)); // Clone to remove listeners
            }
        });
    }

    overlay?.querySelectorAll('.overlay-link').forEach(link => {
        link.classList.add('nav-link'); // Add nav-link class for consistency
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
            overlay.setAttribute('aria-hidden', 'true');
            if (href) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ESC to close overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) {
            closeBtn?.click();
        }
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
