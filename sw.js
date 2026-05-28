const CACHE_NAME = 'omnispeed-v2026-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.js',
  './manifest.json'
];

// 1. 安裝事件：只快取本地基礎外殼資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] 正在快取核心外殼資源...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. 激活事件：清除舊版本的垃圾快取，防止 APK 讀取到舊的假代碼
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] 清除歷史舊快取:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. 攔截請求核心（最重要）：確保外網探針和測速文件絕對不走快取
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // 策略：如果是第三方外網 API、測速大文件或圖片探針，強制走網絡，絕不快取！
  if (requestUrl.origin !== self.location.origin) {
    // 透過 fetch 直接放行，不進入 caches.match
    event.respondWith(
      fetch(event.request).catch(() => {
        // 如果外網徹底斷線，返回一個友好的錯誤提示（可選）
        return new Response('網絡連接失敗，請檢查代理或專線狀態。', { status: 503 });
      })
    );
    return;
  }

  // 如果是本地外殼資源（index.html / app.js 等），則走快取優先策略，確保 App 秒開
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
