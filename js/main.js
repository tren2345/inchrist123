// Languages for typing animation
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

// Language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    clearInterval(typingInterval);
    languageIndex = parseInt(btn.dataset.lang);
    charIndex = 0;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    typingInterval = setInterval(typeText, 70);
  });
});

// Theme toggle
const body = document.getElementById('body');
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.innerHTML = isDark
    ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    : '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 18a6 6 0 01-6-6c0-2.4 1.4-4.5 3.5-5.4A6 6 0 0112 18zM12 6a6 6 0 016 6 6 6 0 01-6 6V6z"/></svg>';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load theme from local storage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeToggle.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
  themeToggle.setAttribute('aria-label', 'Switch to light mode');
}

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
document.querySelectorAll('.nav-link, .lang-btn, #theme-toggle').forEach(elem => {
  elem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      elem.click();
    }
  });
});

// Touch ripple effect
document.addEventListener('touchstart', (e) => {
  const ripple = document.getElementById('ripple');
  ripple.style.left = `${e.touches[0].clientX - 50}px`;
  ripple.style.top = `${e.touches[0].clientY - 50}px`;
  ripple.classList.remove('hidden');
  setTimeout(() => ripple.classList.add('hidden'), 600);
});

// Fetch posts (keep as is, or update JSON with real content if available)
async function loadPosts() {
  try {
    const response = await fetch('data/posts.json');
    const posts = await response.json();
    const container = document.getElementById('posts-container');
    container.innerHTML = posts.map(post => `
      <div class="rounded-xl shadow-md p-6 bg-white dark:bg-gray-800 animate__animated animate__fadeIn">
        <h2 class="text-xl font-bold mb-2">${post.title}</h2>
        <p class="mb-4">${post.content}</p>
        <img src="${post.image}" alt="${post.title}" class="rounded-lg mb-4" loading="lazy">
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load posts:', error);
    document.getElementById('posts-container').innerHTML = '<p class="text-center">Failed to load posts.</p>';
  }
}
loadPosts();

// Prayer form
document.getElementById('prayer-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const request = document.getElementById('request').value;
  const prayers = JSON.parse(localStorage.getItem('prayers') || '[]');
  prayers.push({ name, request, date: new Date().toISOString() });
  localStorage.setItem('prayers', JSON.stringify(prayers));
  alert('Prayer request submitted! Pastor Kavin Bobbitt and the team will pray for you.');
  e.target.reset();
});

// Event calendar (added sample events based on ministry schedule)
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
