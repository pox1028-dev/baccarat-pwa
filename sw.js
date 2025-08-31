self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('baccarat-mc-v44').then(cache=>cache.addAll(['./','./index_v44.html','./manifest_v44.webmanifest'])));
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request).then(resp=> resp || fetch(e.request)));
});
