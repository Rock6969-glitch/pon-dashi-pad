const CACHE_NAME = 'pon-dashi-cache-v3'; // v2 から v3 に変更
const urlsToCache = [
  './',
  './index.html',
  './sw.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // すぐに新しいバージョンに切り替える
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim().then(() => {
      return caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName); // 古いキャッシュを全消去
            }
          })
        );
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});