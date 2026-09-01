const CACHE='sushi-app-v2';
const ASSETS=['./','./index.html','./manifest.json',
  './icon-192.png','./icon-512.png','./icon-180.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(
    ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const isHTML = e.request.mode==='navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html');
  if(isHTML){
    // HTMLは常にネット優先（最新を取得）。失敗時のみキャッシュ。
    e.respondWith(fetch(e.request).then(res=>{
      const cp=res.clone(); caches.open(CACHE).then(c=>c.put('./index.html',cp)); return res;
    }).catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));
    return;
  }
  // その他はキャッシュ優先（オフライン用）
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return res;
  }).catch(()=>r)));
});
