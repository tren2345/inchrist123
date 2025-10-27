// sw.js
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('uic-cache').then((cache) =>
      cache.addAll(['/', '/index.html', '/css/styles.css', '/js/main.js', '/js/typing.js', '/js/calendar.js', '/js/theme.js', '/js/navigation.js', '/js/ripple.js'])
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});
