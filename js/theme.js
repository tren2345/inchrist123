export function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const rippleEffect = document.getElementById('ripple-effect');

  toggle.addEventListener('click', () => {
    if (html.classList.contains('light')) {
      // Calculate ripple starting position
      const rect = toggle.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Position and trigger ripple
      rippleEffect.style.left = `${x}px`;
      rippleEffect.style.top = `${y}px`;
      rippleEffect.style.opacity = 0.8;
      rippleEffect.style.transform = 'scale(0)';
      rippleEffect.classList.add('gravitationalWave');

      // Transition to dark mode after ripple
      setTimeout(() => {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        toggle.querySelector('svg').innerHTML = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98.191-1.99.3-3.03.3-4.97 0-9-4.03-9-9 0-1.04.11-2.05.3-3.03.44-.09.9-.14 1.36-.14z"/>';
        rippleEffect.classList.remove('gravitationalWave');
      }, 1000); // Sync with animation duration
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
