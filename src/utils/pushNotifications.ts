// Utility per gestire le Push Notifications
import { notificationLogger } from './logger';

// IMPORTANTE: In produzione, queste chiavi devono essere generate dal server
// Usa https://web-push-codelab.glitch.me/ per generare le chiavi VAPID
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || 'YOUR_VAPID_PUBLIC_KEY_HERE';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    notificationLogger.warn('Le notifiche non sono supportate');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
}

export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  try {
    const permission = await requestNotificationPermission();

    if (permission !== 'granted') {
      notificationLogger.warn('Permesso notifiche negato');
      return null;
    }

    if (!('serviceWorker' in navigator)) {
      notificationLogger.warn('Service Worker non supportato');
      return null;
    }

    const registration = await navigator.serviceWorker.ready;

    // Controlla se esiste già una subscription
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // Crea nuova subscription
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      notificationLogger.log('Nuova subscription creata');

      // Qui dovresti inviare la subscription al tuo server
      await sendSubscriptionToServer(subscription);
    }

    return subscription;
  } catch (error) {
    notificationLogger.error('Errore durante la subscription:', error);
    return null;
  }
}

export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    if (!('serviceWorker' in navigator)) {
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      notificationLogger.log('Unsubscribed');

      // Rimuovi subscription dal server
      await removeSubscriptionFromServer(subscription);
      return true;
    }

    return false;
  } catch (error) {
    notificationLogger.error('Errore durante unsubscribe:', error);
    return false;
  }
}

export async function sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
  // TODO: Implementare chiamata API al server CINECA
  notificationLogger.log('Subscription da inviare al server:', JSON.stringify(subscription));

  // Esempio di come dovrebbe essere implementato:
  /*
  try {
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription,
        userId: getCurrentUserId() // Da implementare
      }),
    });

    if (!response.ok) {
      throw new Error('Errore durante l\'invio della subscription');
    }
  } catch (error) {
    notificationLogger.error('Errore invio subscription:', error);
    throw error;
  }
  */
}

export async function removeSubscriptionFromServer(subscription: PushSubscription): Promise<void> {
  // TODO: Implementare chiamata API al server CINECA
  notificationLogger.log('Subscription da rimuovere dal server:', JSON.stringify(subscription));

  // Esempio di implementazione:
  /*
  try {
    const response = await fetch('/api/push/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        userId: getCurrentUserId()
      }),
    });

    if (!response.ok) {
      throw new Error('Errore durante la rimozione della subscription');
    }
  } catch (error) {
    notificationLogger.error('Errore rimozione subscription:', error);
  }
  */
}

export function getNotificationPermissionStatus(): NotificationPermission {
  if ('Notification' in window) {
    return Notification.permission;
  }
  return 'denied';
}

export async function showLocalNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  const permission = await requestNotificationPermission();

  if (permission === 'granted') {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        icon: '/icon-192.png',
        badge: '/icon-72.png',
        vibrate: [200, 100, 200],
        ...options
      });
    } else {
      new Notification(title, options);
    }
  }
}
