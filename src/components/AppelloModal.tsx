import { useState } from 'react';
import { X, QrCode, Users, Check, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface AppelloModalProps {
  isOpen: boolean;
  onClose: () => void;
  corso: string | { nome: string; codice: string };
}

interface Studente {
  id: string;
  nome: string;
  matricola: string;
  stato: 'presente' | 'assente' | 'ritardo' | null;
}

export function AppelloModal({ isOpen, onClose, corso }: AppelloModalProps) {
  const [step, setStep] = useState<'info' | 'qr' | 'appello'>('info');
  const [durataQR, setDurataQR] = useState<string>('5');
  const [qrGenerator, setQrGenerator] = useState(false);
  const [tempoRimasto, setTempoRimasto] = useState<number>(0);
  
  // Mock studenti
  const [studenti, setStudenti] = useState<Studente[]>([
    { id: '1', nome: 'Marco Rossi', matricola: '2023001', stato: null },
    { id: '2', nome: 'Giulia Bianchi', matricola: '2023002', stato: null },
    { id: '3', nome: 'Luca Verdi', matricola: '2023003', stato: null },
    { id: '4', nome: 'Sofia Neri', matricola: '2023004', stato: null },
    { id: '5', nome: 'Andrea Russo', matricola: '2023005', stato: null },
    { id: '6', nome: 'Chiara Ferrari', matricola: '2023006', stato: null },
    { id: '7', nome: 'Matteo Ricci', matricola: '2023007', stato: null },
    { id: '8', nome: 'Francesca Marino', matricola: '2023008', stato: null },
  ]);

  const handleGeneraQR = () => {
    setQrGenerator(true);
    setTempoRimasto(parseInt(durataQR) * 60);
    setStep('qr');
    
    // Simula countdown
    const interval = setInterval(() => {
      setTempoRimasto(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Simula scansioni QR casuali
    setTimeout(() => {
      setStudenti(prev => prev.map(s => 
        Math.random() > 0.3 ? { ...s, stato: 'presente' } : s
      ));
    }, 2000);
  };

  const togglePresenza = (studenteId: string, stato: 'presente' | 'assente' | 'ritardo') => {
    setStudenti(prev => prev.map(s => 
      s.id === studenteId ? { ...s, stato: s.stato === stato ? null : stato } : s
    ));
  };

  const handleChiudiAppello = () => {
    // Segna tutti gli studenti senza stato come assenti
    setStudenti(prev => prev.map(s => 
      s.stato === null ? { ...s, stato: 'assente' } : s
    ));
    setStep('appello');
  };

  const getStatistiche = () => {
    const presenti = studenti.filter(s => s.stato === 'presente').length;
    const assenti = studenti.filter(s => s.stato === 'assente').length;
    const ritardi = studenti.filter(s => s.stato === 'ritardo').length;
    const nonRisposto = studenti.filter(s => s.stato === null).length;
    
    return { presenti, assenti, ritardi, nonRisposto };
  };

  const stats = getStatistiche();

  const formatTempo = (secondi: number) => {
    const minuti = Math.floor(secondi / 60);
    const sec = secondi % 60;
    return `${minuti}:${sec.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#ff0000] text-white p-6 flex items-center justify-between">
          <div>
            <h2>Appello - {typeof corso === 'string' ? corso : corso.nome}</h2>
            <p className="text-sm opacity-90 mt-1">{typeof corso === 'string' ? 'LEZIONE' : corso.codice}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Chiudi appello"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Info */}
          {step === 'info' && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">Configura l&apos;appello</h3>
                <p className="text-[#666]">
                  Genera un codice QR per consentire agli studenti di registrare la presenza
                </p>
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Durata QR Code (minuti)
                </label>
                <select
                  value={durataQR}
                  onChange={(e) => setDurataQR(e.target.value)}
                  className="w-full px-4 py-3 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                >
                  <option value="2">2 minuti</option>
                  <option value="5">5 minuti</option>
                  <option value="10">10 minuti</option>
                  <option value="15">15 minuti</option>
                </select>
              </div>

              <div className="bg-[#f5f5f5] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-[#ff0000]" aria-label="Studenti iscritti" />
                  <h4 className="text-sm">Studenti iscritti</h4>
                </div>
                <p className="text-2xl">{studenti.length}</p>
              </div>

              <button
                onClick={handleGeneraQR}
                className="w-full py-4 bg-[#ff0000] text-white rounded-xl hover:bg-[#cc0000] transition-colors flex items-center justify-center gap-2 text-lg"
                aria-label="Genera QR code per l'appello"
              >
                <QrCode className="w-6 h-6" />
                Genera QR Code
              </button>
            </div>
          )}

          {/* Step 2: QR Code */}
          {step === 'qr' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="mb-2">QR Code Attivo</h3>
                <p className="text-[#666]">
                  Gli studenti possono scansionare il codice per registrare la presenza
                </p>
              </div>

              {/* Mock QR Code */}
              <div className="bg-white border-4 border-[#ff0000] rounded-2xl p-8 flex items-center justify-center mx-auto max-w-sm">
                <div className="w-64 h-64 bg-[#f5f5f5] rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-[#afafaf]" aria-label="QR code per la registrazione della presenza" />
                </div>
              </div>

              {/* Timer */}
              <div className="bg-[#f5f5f5] rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[#ff0000]" aria-label="Timer" />
                  <p className="text-sm text-[#666]">Tempo rimasto</p>
                </div>
                <p className="text-3xl text-[#ff0000]">{formatTempo(tempoRimasto)}</p>
              </div>

              {/* Statistiche Real-time */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#16a34a]/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-[#666] mb-1">Presenti</p>
                  <p className="text-2xl text-[#16a34a]">{stats.presenti}</p>
                </div>
                <div className="bg-[#f59e0b]/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-[#666] mb-1">In attesa</p>
                  <p className="text-2xl text-[#f59e0b]">{stats.nonRisposto}</p>
                </div>
                <div className="bg-[#ff0000]/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-[#666] mb-1">Assenti</p>
                  <p className="text-2xl text-[#ff0000]">{stats.assenti}</p>
                </div>
              </div>

              <button
                onClick={handleChiudiAppello}
                className="w-full py-3 bg-[#000000] text-white rounded-xl hover:bg-[#333] transition-colors"
              >
                Chiudi QR e Verifica Presenze
              </button>
            </div>
          )}

          {/* Step 3: Verifica Appello */}
          {step === 'appello' && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">Verifica Presenze</h3>
                <p className="text-[#666]">
                  Modifica manualmente le presenze se necessario
                </p>
              </div>

              {/* Statistiche finali */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-[#16a34a]/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-[#666] mb-1">Presenti</p>
                  <p className="text-xl text-[#16a34a]">{stats.presenti}</p>
                </div>
                <div className="bg-[#f59e0b]/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-[#666] mb-1">Ritardi</p>
                  <p className="text-xl text-[#f59e0b]">{stats.ritardi}</p>
                </div>
                <div className="bg-[#ff0000]/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-[#666] mb-1">Assenti</p>
                  <p className="text-xl text-[#ff0000]">{stats.assenti}</p>
                </div>
                <div className="bg-[#afafaf]/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-[#666] mb-1">Totale</p>
                  <p className="text-xl">{studenti.length}</p>
                </div>
              </div>

              {/* Lista studenti modificabile */}
              <div className="border border-[#afafaf]/20 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                <div className="sticky top-0 bg-[#f5f5f5] px-4 py-3 grid grid-cols-2 gap-2 text-xs text-[#afafaf]">
                  <span>Studente</span>
                  <span className="text-center">Stato</span>
                </div>
                <div className="divide-y divide-[#afafaf]/20">
                  {studenti.map(studente => (
                    <div key={studente.id} className="px-4 py-3 grid grid-cols-2 gap-2 items-center">
                      <div>
                        <p className="text-sm">{studente.nome}</p>
                        <p className="text-xs text-[#afafaf]">{studente.matricola}</p>
                      </div>
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={() => togglePresenza(studente.id, 'presente')}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            studente.stato === 'presente'
                              ? 'bg-[#16a34a] text-white'
                              : 'bg-[#f5f5f5] text-[#666] hover:bg-[#16a34a]/20'
                          }`}
                        >
                          P
                        </button>
                        <button
                          onClick={() => togglePresenza(studente.id, 'ritardo')}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            studente.stato === 'ritardo'
                              ? 'bg-[#f59e0b] text-white'
                              : 'bg-[#f5f5f5] text-[#666] hover:bg-[#f59e0b]/20'
                          }`}
                        >
                          R
                        </button>
                        <button
                          onClick={() => togglePresenza(studente.id, 'assente')}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            studente.stato === 'assente'
                              ? 'bg-[#ff0000] text-white'
                              : 'bg-[#f5f5f5] text-[#666] hover:bg-[#ff0000]/20'
                          }`}
                        >
                          A
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#afafaf]/20 p-4 bg-white flex gap-3">
          {step === 'appello' ? (
            <>
              <button
                onClick={() => setStep('qr')}
                className="flex-1 py-3 border-2 border-[#afafaf] rounded-xl hover:bg-[#f5f5f5] transition-colors"
              >
                Indietro
              </button>
              <button
                onClick={() => {
                  alert('Appello salvato con successo!');
                  onClose();
                }}
                className="flex-1 py-3 bg-[#16a34a] text-white rounded-xl hover:bg-[#15803d] transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Salva Appello
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 border-2 border-[#afafaf] rounded-xl hover:bg-[#f5f5f5] transition-colors"
            >
              Annulla
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
