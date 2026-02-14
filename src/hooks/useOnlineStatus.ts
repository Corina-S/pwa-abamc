import { useState, useEffect } from 'react';
import { networkLogger } from '../utils/logger';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      if (wasOffline) {
        // Mostra notifica che sei tornato online
        networkLogger.log('Connessione ripristinata');
        setWasOffline(false);
      }
    }

    function handleOffline() {
      setIsOnline(false);
      setWasOffline(true);
      networkLogger.log('Connessione persa');
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  return { isOnline, wasOffline };
}
