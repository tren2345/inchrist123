// js/main.js
import { initTyping } from './typing.js';
import { initCalendar } from './calendar.js';
import { initThemeToggle } from './theme.js';
import { initNavigation } from './navigation.js';
import { initRipple } from './ripple.js';

document.addEventListener('DOMContentLoaded', () => {
  initTyping();
  initCalendar();
  initThemeToggle();
  initNavigation();
  initRipple();

  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
});
