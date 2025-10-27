// js/main.js
// Languages for typing animation (keep cycling, no buttons)
const languages = [
  { lang: 'Hebrew', text: '“וְכָל הַמְקַבֵּל אֹתוֹ, נָתַן לוֹ זְכוּת לִהְיוֹת בֵּן אֱלֹהִים”' },
  { lang: 'Aramaic', text: '“ܘܟܠ ܕܩܒܠܘܗܝ ܝܗܒ ܠܗܘܢ ܫܘܠܛܢܐ ܕܢܗܘܘܢ ܒܢܝܐ ܕܐܠܗܐ”' },
  { lang: 'English (KJV)', text: '“But as many as received him, to them gave he power to become the sons of God.” (John 1:12)' }
];

let languageIndex = 0;
let charIndex = 0;

// Typing animation
function typeText() {
  const text = languages[languageIndex].text;
  const typedText = document.getElementById('typed-text');
  const languageLabel = document.getElementById('language-label');
  typedText.textContent = text.slice(0, charIndex + 1);
  languageLabel.textContent = languages[languageIndex].lang;
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

// Theme toggle (updated for html class)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  themeToggle.innerHTML = isDark
    ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    : '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 18a6 6 0 01-6-6c0-2.4 1.4-4.5 3.5-5.4A6 6 0 0112 18zM12 6a6 6 0 016 6 6 6 0 01-6 6V6z"/></svg>';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Smooth scrolling, keyboard, touch ripple (keep as is)

// Remove loadPosts since posts are now hardcoded

// Event calendar
document.addEventListener('DOMContentLoaded', () => {
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
