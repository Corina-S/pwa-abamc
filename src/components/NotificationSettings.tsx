import { Bell, BellOff, AlertCircle } from 'lucide-react';
import { usePushNotifications } from '../hooks/usePushNotifications';

export function NotificationSettings() {
  const {
    permission,
    subscription,
    isLoading,
    error,
    requestPermission,
    subscribe,
    unsubscribe,
    isSupported
  } = usePushNotifications();

  if (!isSupported) {
    return (
      <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm mb-1">Notifiche Push non supportate</h4>
            <p className="text-xs text-[#666]">
              Il tuo browser non supporta le notifiche push.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleToggleNotifications = async () => {
    if (subscription) {
      await unsubscribe();
    } else {
      if (permission === 'default') {
        const newPermission = await requestPermission();
        if (newPermission === 'granted') {
          await subscribe();
        }
      } else if (permission === 'granted') {
        await subscribe();
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Stato permesso */}
      {permission === 'denied' && (
        <div className="bg-[#ff0000]/10 border border-[#ff0000]/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <BellOff className="w-5 h-5 text-[#ff0000] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm mb-1">Notifiche bloccate</h4>
              <p className="text-xs text-[#666]">
                Hai bloccato le notifiche. Per ricevere aggiornamenti importanti,
                abilita le notifiche dalle impostazioni del browser.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle notifiche */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {subscription ? (
              <Bell className="w-5 h-5 text-[#16a34a]" />
            ) : (
              <BellOff className="w-5 h-5 text-[#afafaf]" />
            )}
            <div>
              <h4 className="text-sm">Notifiche Push</h4>
              <p className="text-xs text-[#666]">
                {subscription
                  ? 'Riceverai notifiche in tempo reale'
                  : 'Abilita per ricevere aggiornamenti'}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleNotifications}
            disabled={isLoading || permission === 'denied'}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              subscription ? 'bg-[#16a34a]' : 'bg-[#afafaf]'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                subscription ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Preferenze notifiche */}
      {subscription && (
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
          <h4 className="text-sm mb-4">Preferenze Notifiche</h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Nuovi elaborati da valutare</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[#ff0000]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Promemoria lezioni</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[#ff0000]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Comunicazioni urgenti</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[#ff0000]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Scadenze imminenti</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[#ff0000]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Feedback elaborati</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[#ff0000]"
              />
            </label>
          </div>
        </div>
      )}

      {/* Errori */}
      {error && (
        <div className="bg-[#ff0000]/10 border border-[#ff0000]/20 rounded-lg p-3">
          <p className="text-xs text-[#ff0000]">{error}</p>
        </div>
      )}
    </div>
  );
}
