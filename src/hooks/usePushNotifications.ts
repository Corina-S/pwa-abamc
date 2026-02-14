import { useState, useEffect } from 'react';
import {
  requestNotificationPermission,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  getNotificationPermissionStatus
} from '../utils/pushNotifications';

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(
    getNotificationPermissionStatus()
  );
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Aggiorna lo stato del permesso quando cambia
    const interval = setInterval(() => {
      const currentPermission = getNotificationPermissionStatus();
      if (currentPermission !== permission) {
        setPermission(currentPermission);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [permission]);

  const requestPermission = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newPermission = await requestNotificationPermission();
      setPermission(newPermission);
      return newPermission;
    } catch (err) {
      setError('Errore durante la richiesta del permesso');
      console.error(err);
      return 'denied' as NotificationPermission;
    } finally {
      setIsLoading(false);
    }
  };

  const subscribe = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const sub = await subscribeToPushNotifications();
      setSubscription(sub);
      return sub;
    } catch (err) {
      setError('Errore durante la sottoscrizione alle notifiche');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await unsubscribeFromPushNotifications();
      if (success) {
        setSubscription(null);
      }
      return success;
    } catch (err) {
      setError('Errore durante la cancellazione della sottoscrizione');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    permission,
    subscription,
    isLoading,
    error,
    requestPermission,
    subscribe,
    unsubscribe,
    isSupported: 'Notification' in window && 'serviceWorker' in navigator
  };
}
