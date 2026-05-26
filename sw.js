const CACHE_NAME = 'omnispeed-v2';
const ASSETS = [
  'index.html',
  'app.js',
  'manifest.json'
];

// 安裝並快取核心檔案
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 攔截請求，實現秒開體驗
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
