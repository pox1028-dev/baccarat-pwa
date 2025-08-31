self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('baccarat-mc-v42').then(cache=>cache.addAll(['./','./index_v42.html','./manifest_v42.webmanifest'])));
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request).then(resp=> resp || fetch(e.request)));
});
