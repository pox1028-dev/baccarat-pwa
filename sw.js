// v4.2 offline upgrade SW
const CACHE_NAME = 'baccarat-mc-v42-offline-' + (self.registration ? self.registration.scope : 'scope');
const PRECACHE_URLS = [
  './',
  './index.html',            // 若你的首頁不是這個檔名，仍會被 runtime cache 捕捉
  './manifest.webmanifest',
  './offline.html',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith('baccarat-mc-v42') && k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(self.clients.claim())
  );
});

// Helper: cache-first for CDN (Chart.js), stale-while-revalidate for same-origin assets, and offline fallback for navigations
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Handle navigation requests (HTML pages)
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const net = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, net.clone());
        return net;
      } catch (e) {
        // Try cache, then offline fallback
        const cacheMatch = await caches.match(req);
        return cacheMatch || caches.match('./offline.html');
      }
    })());
    return;
  }

  // For Chart.js CDN: cache-first
  if (url.hostname.includes('cdn.jsdelivr.net')) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const net = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, net.clone());
        return net;
      } catch (e) {
        return new Response('', {status: 504, statusText: 'Offline (CDN)'});
      }
    })());
    return;
  }

  // Same-origin assets: stale-while-revalidate
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      const fetchPromise = fetch(req).then(net => {
        cache.put(req, net.clone());
        return net;
      }).catch(()=>null);
      return cached || fetchPromise || new Response('', {status: 504, statusText: 'Offline'});
    })());
    return;
  }
});
