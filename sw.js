const CACHE_NAME = 'pon-dashi-cache-v2'; // キャッシュ名を更新
const urlsToCache = [
  './',
  './index.html',
  './sw.js',
  // 使用している音源ファイルをすべて記述（例）
  './audio/sound1.mp3',
  './audio/sound2.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});