mconsole.log('Hello world!');


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pwa-cache').then(cache => {
      return cache.addAll([
        '',                          // Página principal
        '/example/index.html',                // HTML
        '/example/favicon.ico',               // Favicon
        '/example/manifest.json',             // Manifest
        '/example/assets/favicon.ico',   // Ícono 192x192
        '/example/assets/icon-512x512.png',   // Ícono 512x512
        '/example/assets/main.js',            // Archivo JS compilado
        '/example/assets/vendor.js',          // Otros archivos JS compilados
        '/example/assets/app.css',            // CSS generado
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
