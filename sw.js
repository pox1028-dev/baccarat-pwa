self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('baccarat-mc-v3').then(cache=>cache.addAll(['./','./index.html','./manifest.webmanifest'])));
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request).then(resp=> resp || fetch(e.request)));
});
