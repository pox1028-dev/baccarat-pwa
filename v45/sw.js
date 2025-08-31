// v4.5 SW (scoped to /v45)
const CACHE = 'baccarat-mc-v45';
const PRECACHE = ['./','./index.html','./manifest.webmanifest','https://cdn.jsdelivr.net/npm/chart.js'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('baccarat-mc-') && k!==CACHE).map(k=>caches.delete(k)))).then(self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  const req=e.request;
  if(req.mode==='navigate'){
    e.respondWith((async()=>{
      try{
        const net=await fetch(req); const cache=await caches.open(CACHE); cache.put(req, net.clone()); return net;
      }catch(e){ const m=await caches.match(req); return m || caches.match('./index.html'); }
    })()); return;
  }
  const url=new URL(req.url);
  if(url.hostname.includes('cdn.jsdelivr.net')){
    e.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{const cc=caches.open(CACHE).then(cache=>cache.put(req,r.clone())); return r; })));
    return;
  }
  if(url.origin===self.location.origin){
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE); const c=await cache.match(req);
      const fetchP=fetch(req).then(r=>{ cache.put(req,r.clone()); return r; }).catch(()=>null);
      return c || fetchP || new Response('',{status:504});
    })()); return;
  }
});
