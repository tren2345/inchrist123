export function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  toggle.addEventListener('click', () => {
    if (html.classList.contains('light')) {
      html.classList.remove('light');
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toggle.querySelector('svg').innerHTML = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98.191-1.99.3-3.03.3-4.97 0-9-4.03-9-9 0-1.04.11-2.05.3-3.03.44-.09.9-.14 1.36-.14z"/>';
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
      toggle.querySelector('svg').innerHTML = '<path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
    }
  });

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.classList.add(savedTheme);
  if (savedTheme === 'dark') {
    toggle.querySelector('svg').innerHTML = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98.191-1.99.3-3.03.3-4.97 0-9-4.03-9-9 0-1.04.11-2.05.3-3.03.44-.09.9-.14 1.36-.14z"/>';
  } else {
    toggle.querySelector('svg').innerHTML = '<path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initThemeToggle);
