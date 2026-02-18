const CACHE_NAME = 'abamc-pwa-v1';
const RUNTIME_CACHE = 'abamc-runtime-v1';
const IMAGE_CACHE = 'abamc-images-v1';

// Risorse da cachare immediatamente all'installazione
const PRECACHE_URLS = [
  '/pwa-abamc/',
  '/pwa-abamc/index.html',
  '/pwa-abamc/styles/globals.css',
  '/pwa-abamc/offline.html'
];

// Installazione del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== RUNTIME_CACHE && 
              cacheName !== IMAGE_CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Strategia di caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora richieste non-GET
  if (request.method !== 'GET') return;

  // Ignora richieste a domini esterni (eccetto API CINECA)
  if (url.origin !== location.origin && !url.hostname.includes('cineca.it')) {
    return;
  }

  // Strategia per API CINECA: Network First, poi Cache
  if (url.pathname.includes('/api/') || url.hostname.includes('cineca.it')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Strategia per immagini: Cache First, poi Network
  if (request.destination === 'image') {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    return;
  }

  // Strategia per altre risorse: Stale While Revalidate
  event.respondWith(staleWhileRevalidateStrategy(request));
});

// Network First Strategy (per API)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Salva in cache solo risposte valide
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network request failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Se non c'è cache, ritorna offline page per navigazione
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Cache First Strategy (per immagini)
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Failed to fetch image:', error);
    // Ritorna un placeholder immagine se disponibile
    return new Response('', { status: 404 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      const cache = caches.open(RUNTIME_CACHE);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => {
    // Se il network fallisce, usa la cache
    return cachedResponse;
  });
  
  // Ritorna immediatamente la risposta dalla cache se disponibile
  // Altrimenti aspetta il network
  return cachedResponse || fetchPromise;
}

// Background Sync per richieste fallite
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-presenze') {
    event.waitUntil(syncPresenze());
  }
  
  if (event.tag === 'sync-elaborati') {
    event.waitUntil(syncElaborati());
  }
});

async function syncPresenze() {
  console.log('[Service Worker] Syncing presenze...');
  // Qui andrà la logica per sincronizzare le presenze con il server
  // quando la connessione viene ripristinata
}

async function syncElaborati() {
  console.log('[Service Worker] Syncing elaborati...');
  // Qui andrà la logica per sincronizzare gli elaborati con il server
}

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received:', event);
  
  let notificationData = {
    title: 'ABAMC',
    body: 'Nuova notifica',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    }
  };
  
  if (event.data) {
    const data = event.data.json();
    notificationData = {
      ...notificationData,
      title: data.title || notificationData.title,
      body: data.body || notificationData.body,
      data: {
        url: data.url || notificationData.data.url
      }
    };
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Click su notifica push
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Se c'è già una finestra aperta, portala in primo piano
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Altrimenti apri una nuova finestra
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Messaggio dal client
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});
