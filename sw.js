const CACHE_NAME="v1_cache_PWA";

var urlsToCache = [
    './',
    './assets/favicon/favicon-16.jpg',
    './assets/favicon/favicon-32.jpg',
    './assets/favicon/favicon-64.jpg',
    './assets/favicon/favicon-96.jpg',
    './assets/favicon/favicon-128.jpg',
    './assets/favicon/favicon-192.jpg',
    './assets/favicon/favicon-256.jpg',
    './assets/favicon/favicon-384.jpg',
    './assets/favicon/favicon-512.jpg',
    './assets/favicon/favicon-1024.jpg',
    './assets/perfil.jpg'
]

self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                return cache.addAll(urlsToCache)
                            .then(() =>{
                                self.skipWaiting();
                            });
                            
              })
              .catch(err=> {
                console.log('no se ha cargado la cache',err);
              })
    );
});

self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
              .then(cacheNames =>{
                return Promise.all(
                    cacheNames.map(cacheName=>{
                        if(cacheWhiteList.indexOf(cacheName)=== -1){
                            return caches.delete(cacheName);
                        }
                    })
                );
              })
              .then(()=>{
                self.clients.claim();
              })
    )
});

self.addEventListener('fetch', e=> {
    e.respondWith (
        caches.match (e.request)
        .then(res => {
            if(res){
                return res;
            }
            
            return fetch(e.request);
        })
    );
});