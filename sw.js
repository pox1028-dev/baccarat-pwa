self.addEventListener('install', e=>{
  e.waitUntil(caches.open('baccarat-mc-v45').then(c=>c.addAll([
    './',
    './index_v45.html',
    './manifest_v45.webmanifest'
  ])));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});