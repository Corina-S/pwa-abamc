import { X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockNotifiche } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import type { Notifica } from '../types';
import { useNavigate } from 'react-router-dom';

interface NotifichePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotifichePanel({ isOpen, onClose }: NotifichePanelProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const notifiche = mockNotifiche.filter(n => n.userId === user?.id);

  const getIcon = (tipo: Notifica['tipo']) => {
    switch (tipo) {
      case 'urgente':
        return <AlertTriangle className="w-5 h-5 text-[#ff0000]" />;
      case 'normale':
        return <Info className="w-5 h-5 text-[#0000ff]" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-[#16a34a]" />;
    }
  };

  const formatData = (data: string) => {
    const d = new Date(data);
    const oggi = new Date();
    const ieri = new Date(oggi);
    ieri.setDate(ieri.getDate() - 1);

    if (d.toDateString() === oggi.toDateString()) {
      return `Oggi ${d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (d.toDateString() === ieri.toDateString()) {
      return `Ieri ${d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }
  };

  const handleNotificaClick = (notifica: Notifica) => {
    if (notifica.link) {
      onClose();
      navigate(notifica.link);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-96 max-w-[85vw] bg-white z-50 overflow-y-auto shadow-lg"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#afafaf]/30 p-4 flex items-center justify-between">
              <h2>Notifiche</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                aria-label="Chiudi notifiche"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="divide-y divide-[#afafaf]/30">
              {notifiche.length === 0 ? (
                <div className="p-8 text-center text-[#afafaf]">
                  <Info className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nessuna notifica</p>
                </div>
              ) : (
                notifiche.map((notifica) => (
                  <div
                    key={notifica.id}
                    onClick={() => handleNotificaClick(notifica)}
                    className={`p-4 hover:bg-[#f5f5f5] transition-colors ${
                      !notifica.letta ? 'bg-[#ff0000]/5' : ''
                    } ${notifica.link ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notifica.tipo)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm">{notifica.titolo}</h4>
                          {!notifica.letta && (
                            <div className="w-2 h-2 bg-[#ff0000] rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-sm text-[#666] mt-1">{notifica.messaggio}</p>
                        <p className="text-xs text-[#afafaf] mt-2">{formatData(notifica.data)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}