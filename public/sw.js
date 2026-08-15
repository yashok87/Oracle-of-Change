const CACHE_NAME = 'oracle-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
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
            console.log('[SW] Deleting old cache:', cacheName);
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
  
  // NEVER intercept non-HTTP(S) schemes (e.g. chrome-extension://, moz-extension://)
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return;
  }
  
  // NEVER cache API, Firestore, Google Analytics, backend, or dynamic requests
  if (
    url.includes('firestore.googleapis.com') || 
    url.includes('googleapis.com') ||
    url.includes('google-analytics.com') ||
    url.includes('analytics') ||
    url.includes('generativelanguage.googleapis.com') || 
    url.includes('pollinations.ai') ||
    url.includes('bigmodel.cn') ||
    url.includes('corsproxy.io') ||
    url.includes('/api/') ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  // Network-First for HTML/Scripts/Vite bundles, falling back to cache if offline
  if (
    event.request.mode === 'navigate' || 
    url.includes('.js') || 
    url.includes('.tsx') || 
    url.includes('.ts') || 
    url.includes('.css') ||
    url.endsWith('/') ||
    url.includes('/index.html')
  ) {
    event.respondWith(
      fetch(event.request)
        .then((fetchResponse) => {
          if (fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              try {
                cache.put(event.request, responseClone);
              } catch (e) {}
            });
          }
          return fetchResponse;
        })
        .catch(() => caches.match(event.request).then((res) => res || caches.match('./index.html')))
    );
    return;
  }

  // Stale-While-Revalidate for static fonts and icons
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              try {
                cache.put(event.request, responseClone);
              } catch (e) {}
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
