import { WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { motion, AnimatePresence } from 'motion/react';

export function OfflineBanner() {
  const { isOnline, wasOffline } = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed top-16 left-4 right-4 z-40 bg-[#ff0000] text-white px-5 py-3 shadow-xl rounded-xl backdrop-blur-lg"
        >
          <div className="flex items-center justify-center gap-3 max-w-4xl mx-auto">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <WifiOff className="w-5 h-5" />
            </div>
            <p className="text-sm">
              Sei offline. Alcune funzionalità potrebbero non essere disponibili.
            </p>
          </div>
        </motion.div>
      )}
      
      {isOnline && wasOffline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, delay: 0.2 }}
          className="fixed top-16 left-4 right-4 z-40 bg-[#16a34a] text-white px-5 py-3 shadow-xl rounded-xl backdrop-blur-lg"
        >
          <div className="flex items-center justify-center gap-3 max-w-4xl mx-auto">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Wifi className="w-5 h-5" />
            </div>
            <p className="text-sm">
              Connessione ripristinata!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}