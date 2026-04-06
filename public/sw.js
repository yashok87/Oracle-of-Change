const CACHE_NAME = 'oracle-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://api.dicebear.com/9.x/shapes/png?seed=Oracle&size=192&backgroundColor=000000',
  'https://api.dicebear.com/9.x/shapes/png?seed=Oracle&size=512&backgroundColor=000000',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Only handle http/https requests
  if (!url || !url.startsWith('http')) {
    return;
  }
  
  // CRITICAL: Explicitly exclude API calls from Service Worker interception
  // This ensures the browser handles them directly, avoiding cache/proxy issues.
  if (url.includes('/api/') || url.includes('generativelanguage.googleapis.com') || url.includes('pollinations.ai')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // If found in cache, return it
      if (response) return response;

      // Otherwise fetch from network
      return fetch(event.request).then((fetchResponse) => {
        // Check if we received a valid response
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic' || event.request.method !== 'GET') {
          return fetchResponse;
        }

        // Clone the response to store in cache
        const responseToCache = fetchResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          // Double check the URL scheme before put, just in case
          if (event.request.url.startsWith('http')) {
            cache.put(event.request, responseToCache).catch(err => {
              console.warn('[SW] Cache put failed:', err.message, event.request.url);
            });
          }
        });

        return fetchResponse;
      });
    }).catch((err) => {
      console.error('[SW] Fetch failed:', err);
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
