// js/main.js

// Languages for typing animation
const languages = [
  { text: '“וְכָל הַמְקַבֵּל אֹתוֹ, נָתַן לוֹ זְכוּת לִהְיוֹת בֵּן אֱלֹהִים”' },
  { text: '“ܘܟܠ ܕܩܒܠܘܗܝ ܝܗܒ ܠܗܘܢ ܫܘܠܛܢܐ ܕܢܗܘܘܢ ܒܢܝܐ ܕܐܠܗܐ”' },
  { text: '“But as many as received him, to them gave he power to become the sons of God.” (John 1:12)' }
];

let languageIndex = 0;
let charIndex = 0;

// Typing animation
function typeText() {
  const text = languages[languageIndex].text;
  const typedText = document.getElementById('typed-text');
  typedText.textContent = text.slice(0, charIndex + 1);
  charIndex++;
  if (charIndex >= text.length) {
    clearInterval(typingInterval);
    setTimeout(() => {
      charIndex = 0;
      languageIndex = (languageIndex + 1) % languages.length;
      typingInterval = setInterval(typeText, 70);
    }, 2500);
  }
}

let typingInterval = setInterval(typeText, 70);

// Theme toggle, smooth scrolling, keyboard navigation, and event calendar
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
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

  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Keyboard navigation
  document.querySelectorAll('.nav-link, #theme-toggle').forEach(elem => {
    elem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        elem.click();
      }
    });
  });

  // Event calendar
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: [
      { title: 'Sunday Worship Service', start: '2025-11-02T11:00:00', end: '2025-11-02T12:00:00' },
      { title: 'Monday Manna', start: '2025-11-03T19:15:00', end: '2025-11-03T20:15:00' },
      { title: 'Bible Study', start: '2025-11-06T19:00:00', end: '2025-11-06T20:00:00' }
    ]
  });
  calendar.render();
});

// Ripple effect for both click and touch
document.addEventListener('click', (e) => {
  const ripple = document.getElementById('ripple');
  ripple.classList.remove('hidden');
  ripple.style.left = `${e.clientX - 50}px`;
  ripple.style.top = `${e.clientY - 50}px`;
  ripple.style.transform = 'scale(0)';
  setTimeout(() => {
    ripple.classList.add('hidden');
  }, 600);
});

document.addEventListener('touchstart', (e) => {
  const ripple = document.getElementById('ripple');
  ripple.classList.remove('hidden');
  ripple.style.left = `${e.touches[0].clientX - 50}px`;
  ripple.style.top = `${e.touches[0].clientY - 50}px`;
  ripple.style.transform = 'scale(0)';
  setTimeout(() => {
    ripple.classList.add('hidden');
  }, 600);
});// js/main.js

// Languages for typing animation
const languages = [
  { text: '“וְכָל הַמְקַבֵּל אֹתוֹ, נָתַן לוֹ זְכוּת לִהְיוֹת בֵּן אֱלֹהִים”' },
  { text: '“ܘܟܠ ܕܩܒܠܘܗܝ ܝܗܒ ܠܗܘܢ ܫܘܠܛܢܐ ܕܢܗܘܘܢ ܒܢܝܐ ܕܐܠܗܐ”' },
  { text: '“But as many as received him, to them gave he power to become the sons of God.” (John 1:12)' }
];

let languageIndex = 0;
let charIndex = 0;

// Typing animation
function typeText() {
  const text = languages[languageIndex].text;
  const typedText = document.getElementById('typed-text');
  typedText.textContent = text.slice(0, charIndex + 1);
  charIndex++;
  if (charIndex >= text.length) {
    clearInterval(typingInterval);
    setTimeout(() => {
      charIndex = 0;
      languageIndex = (languageIndex + 1) % languages.length;
      typingInterval = setInterval(typeText, 70);
    }, 2500);
  }
}

let typingInterval = setInterval(typeText, 70);

// Theme toggle, smooth scrolling, keyboard navigation, and event calendar
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
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

  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Keyboard navigation
  document.querySelectorAll('.nav-link, #theme-toggle').forEach(elem => {
    elem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        elem.click();
      }
    });
  });

  // Event calendar
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: [
      { title: 'Sunday Worship Service', start: '2025-11-02T11:00:00', end: '2025-11-02T12:00:00' },
      { title: 'Monday Manna', start: '2025-11-03T19:15:00', end: '2025-11-03T20:15:00' },
      { title: 'Bible Study', start: '2025-11-06T19:00:00', end: '2025-11-06T20:00:00' }
    ]
  });
  calendar.render();
});

// Ripple effect for both click and touch
document.addEventListener('click', (e) => {
  const ripple = document.getElementById('ripple');
  ripple.classList.remove('hidden');
  ripple.style.left = `${e.clientX - 50}px`;
  ripple.style.top = `${e.clientY - 50}px`;
  ripple.style.transform = 'scale(0)';
  setTimeout(() => {
    ripple.classList.add('hidden');
  }, 600);
});

document.addEventListener('touchstart', (e) => {
  const ripple = document.getElementById('ripple');
  ripple.classList.remove('hidden');
  ripple.style.left = `${e.touches[0].clientX - 50}px`;
  ripple.style.top = `${e.touches[0].clientY - 50}px`;
  ripple.style.transform = 'scale(0)';
  setTimeout(() => {
    ripple.classList.add('hidden');
  }, 600);
});
