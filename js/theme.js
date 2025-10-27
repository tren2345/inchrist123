// js/theme.js
export function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    html.classList.toggle('dark', !isDark);
    html.classList.toggle('light', isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark
      ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
      : '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 18a6 6 0 01-6-6c0-2.4 1.4-4.5 3.5-5.4A6 6 0 0112 18zM12 6a6 6 0 016 6 6 6 0 01-6 6V6z"/></svg>';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  });
}
