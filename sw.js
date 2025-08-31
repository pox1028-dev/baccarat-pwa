self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('baccarat-mc-v3').then(cache=>cache.addAll(['./','./index_v3.html','./manifest_v3.webmanifest'])));
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request).then(resp=> resp || fetch(e.request)));
});
