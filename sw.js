self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('baccarat-mc-v41').then(cache=>cache.addAll(['./','./index_v41.html','./manifest_v41.webmanifest'])));
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request).then(resp=> resp || fetch(e.request)));
});
