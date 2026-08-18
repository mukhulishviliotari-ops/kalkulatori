const CACHE_NAME = 'kalkulatori-v1';
const ASSETS = [
  './',
  'index.html',
  'style.css',
  'kalkulatori.js',
  'icons8-calculator-100.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Return cached file if found, otherwise attempt fetch
      return response || fetch(e.request);
    })
  );
});
