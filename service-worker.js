console.log('Hello world!');


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pwa-cache').then(cache => {
      return cache.addAll([
        '/',                          // Página principal
        '/index.html',                // HTML
        '/favicon.ico',               // Favicon
        '/manifest.json',             // Manifest
        '/assets/favicon.ico',   // Ícono 192x192
        '/assets/icon-512x512.png',   // Ícono 512x512
        '/assets/main.js',            // Archivo JS compilado
        '/assets/vendor.js',          // Otros archivos JS compilados
        '/assets/app.css',            // CSS generado
        // Agrega más archivos estáticos si es necesario
      ]);
    })
  );
});


console.log('example');

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open('pwa-cache').then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});
