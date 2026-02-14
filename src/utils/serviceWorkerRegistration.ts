// Utility per registrare e gestire il Service Worker
import { swLogger, cacheLogger, syncLogger, networkLogger } from './logger';

export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          swLogger.log('Service Worker registrato con successo:', registration.scope);

          // Controlla aggiornamenti ogni ora
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);

          // Gestisci aggiornamenti
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nuovo Service Worker disponibile
                if (confirm('Nuova versione disponibile! Vuoi aggiornare?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((error) => {
          swLogger.error('Errore durante la registrazione del Service Worker:', error);
        });

      // Ricarica la pagina quando il nuovo SW prende il controllo
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }
}

export function unregisterServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        swLogger.error('Errore durante la deregistrazione:', error);
      });
  }
}

export async function clearCache(): Promise<void> {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((cacheName) => caches.delete(cacheName))
    );
    cacheLogger.log('Cache cancellata');
  }
}

// Background Sync per sincronizzare dati quando torna online
export async function registerBackgroundSync(tag: string): Promise<void> {
  if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register(tag);
      syncLogger.log(`Background sync registrato: ${tag}`);
    } catch (error) {
      syncLogger.error('Errore durante la registrazione del background sync:', error);
    }
  }
}

// Controlla stato online/offline
export function setupOnlineOfflineListeners(
  onOnline?: () => void,
  onOffline?: () => void
): void {
  window.addEventListener('online', () => {
    networkLogger.log('Online');
    onOnline?.();
  });

  window.addEventListener('offline', () => {
    networkLogger.log('Offline');
    onOffline?.();
  });
}

export function isOnline(): boolean {
  return navigator.onLine;
}
