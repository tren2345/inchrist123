// Apply saved theme ASAP (no flash)
(function applySavedThemeEarly() {
  try {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
  } catch (e) {}
})();

export function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  if (!toggle) return;

  function setIcon(theme) {
    const svg = toggle.querySelector('svg');
    if (!svg) return;
    svg.innerHTML = theme === 'dark'
      ? '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98.191-1.99.3-3.03.3-4.97 0-9-4.03-9-9 0-1.04.11-2.05.3-3.03.44-.09.9-.14 1.36-.14z"/>'
      : '<path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
  }

  // Initialize icon based on current class
  setIcon(html.classList.contains('dark') ? 'dark' : 'light');

  toggle.addEventListener('click', () => {
    const next = html.classList.contains('light') ? 'dark' : 'light';
    html.classList.add('theme-transition');
    html.classList.remove('light', 'dark');
    html.classList.add(next);
    localStorage.setItem('theme', next);
    setIcon(next);
    window.setTimeout(() => html.classList.remove('theme-transition'), 250);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initThemeToggle);
