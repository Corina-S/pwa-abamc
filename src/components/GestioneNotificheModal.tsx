import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface GestioneNotificheModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'studente' | 'docente';
}

export function GestioneNotificheModal({ isOpen, onClose, userRole = 'studente' }: GestioneNotificheModalProps) {
  const [notifiche, setNotifiche] = useState({
    urgenti: true,
    feedback: true,
    presenze: true,
    scadenze: true,
    comunicazioni: true,
    valutazioni: userRole === 'docente',
    elaborati: userRole === 'docente',
  });
  const [loading, setLoading] = useState(false);

  const handleToggle = (key: keyof typeof notifiche) => {
    setNotifiche(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simula chiamata API
    setTimeout(() => {
      toast.success('Preferenze notifiche salvate!');
      setLoading(false);
      onClose();
    }, 1000);
  };

  const notificheStudente = [
    { key: 'urgenti' as const, label: 'Comunicazioni Urgenti', description: 'Avvisi importanti dai docenti' },
    { key: 'feedback' as const, label: 'Feedback e Valutazioni', description: 'Nuovi feedback sui tuoi elaborati' },
    { key: 'presenze' as const, label: 'Presenze', description: 'Conferme di registrazione presenza' },
    { key: 'scadenze' as const, label: 'Scadenze', description: 'Promemoria per consegne e esami' },
    { key: 'comunicazioni' as const, label: 'Comunicazioni Generali', description: 'Aggiornamenti e notizie dall\'Accademia' },
  ];

  const notificheDocente = [
    { key: 'urgenti' as const, label: 'Comunicazioni Urgenti', description: 'Avvisi importanti dall\'Accademia' },
    { key: 'elaborati' as const, label: 'Nuovi Elaborati', description: 'Notifica quando gli studenti caricano elaborati' },
    { key: 'valutazioni' as const, label: 'Richieste Valutazione', description: 'Promemoria per valutazioni pending' },
    { key: 'presenze' as const, label: 'Presenze', description: 'Riepilogo presenze delle lezioni' },
    { key: 'comunicazioni' as const, label: 'Comunicazioni Generali', description: 'Aggiornamenti e notizie istituzionali' },
  ];

  const listaNotifiche = userRole === 'docente' ? notificheDocente : notificheStudente;

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
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white rounded-xl z-50 p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#ff0000]" />
                Gestione Notifiche
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#666] mb-6">
              Scegli quali notifiche ricevere dall'app
            </p>

            <div className="space-y-4 mb-6">
              {listaNotifiche.map(({ key, label, description }) => (
                <div key={key} className="flex items-start gap-3 p-4 bg-[#f5f5f5] rounded-lg">
                  <button
                    onClick={() => handleToggle(key)}
                    className={`mt-0.5 w-12 h-6 rounded-full transition-colors relative ${
                      notifiche[key] ? 'bg-[#ff0000]' : 'bg-[#afafaf]'
                    }`}
                  >
                    <motion.div
                      animate={{ x: notifiche[key] ? 24 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                  <div className="flex-1">
                    <p className="text-sm mb-0.5">{label}</p>
                    <p className="text-xs text-[#afafaf]">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border-2 border-[#afafaf] text-[#000] rounded-lg hover:bg-[#f5f5f5] transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Salvataggio...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Salva</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
