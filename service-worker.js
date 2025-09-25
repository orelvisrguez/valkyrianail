// Service Worker for VALKYRIA NAIL STUDIO PWA
const CACHE_NAME = 'valkyria-nail-studio-v1.0.0';
const urlsToCache = [
    './',
    './index.html',
    './login.html',
    './admin.html',
    './styles.css',
    './app.js',
    './auth.js',
    './public.js',
    './manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                // Force the service worker to skip waiting and become active
                return self.skipWaiting();
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            // Take control of all pages under this SW's scope
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', function(event) {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin) && 
        !event.request.url.startsWith('https://cdnjs.cloudflare.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    console.log('[ServiceWorker] Serving from cache:', event.request.url);
                    return response;
                }

                console.log('[ServiceWorker] Fetching from network:', event.request.url);
                return fetch(event.request).then(function(response) {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response before caching
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(function(error) {
                    console.log('[ServiceWorker] Fetch failed:', error);
                    
                    // Return offline fallback for HTML pages
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('./index.html');
                    }
                    
                    throw error;
                });
            })
    );
});

// Handle background sync (for future use)
self.addEventListener('sync', function(event) {
    console.log('[ServiceWorker] Background sync:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Handle push notifications (for future use)
self.addEventListener('push', function(event) {
    console.log('[ServiceWorker] Push received.');
    
    const options = {
        body: event.data ? event.data.text() : 'Nueva actualización disponible',
        icon: './icon-192x192.png',
        badge: './icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver detalles',
                icon: './icon-192x192.png'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: './icon-192x192.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('VALKYRIA NAIL STUDIO', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    console.log('[ServiceWorker] Notification click received.');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        // Open the app
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

// Background sync function (for future use)
async function doBackgroundSync() {
    try {
        // Here you could sync data with a server
        console.log('[ServiceWorker] Performing background sync');
        
        // For now, just log that sync happened
        return Promise.resolve();
    } catch (error) {
        console.error('[ServiceWorker] Background sync failed:', error);
        return Promise.reject(error);
    }
}

// Handle skip waiting message from main thread
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Periodic background sync (for future use)
self.addEventListener('periodicsync', function(event) {
    if (event.tag === 'content-sync') {
        event.waitUntil(doBackgroundSync());
    }
});