var CACHE='brain-galaxy-v1';
var FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){
e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}));
self.skipWaiting()});
self.addEventListener('activate',function(e){
e.waitUntil(caches.keys().then(function(k){
return Promise.all(k.filter(function(x){return x!==CACHE}).map(function(x){return caches.delete(x)}))}));
self.clients.claim()});
self.addEventListener('fetch',function(e){
e.respondWith(caches.match(e.request).then(function(r){
return r||fetch(e.request).then(function(res){
if(res.status===200){var c=res.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,c)})}
return res})}).catch(function(){if(e.request.destination==='document'){return caches.match('./index.html')}}))});