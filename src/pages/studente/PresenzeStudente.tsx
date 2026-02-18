import { useState } from 'react';
import { Camera, X, CheckCircle, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockPresenze, mockCorsi, getPercentualePresenza } from '../../utils/mockData';
import { useAuth } from '../../contexts/AuthContext';

export function PresenzeStudente() {
  const { user } = useAuth();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [filtroCorso, setFiltroCorso] = useState<string>('tutti');
  const [filtroStato, setFiltroStato] = useState<string>('tutti');
  const [showCameraPermission, setShowCameraPermission] = useState(false);

  const handleOpenScanner = () => {
    setShowCameraPermission(true);
  };

  const handlePermissionAccept = () => {
    setShowCameraPermission(false);
    setScannerOpen(true);
  };

  const handlePermissionDeny = () => {
    setShowCameraPermission(false);
  };

  const handleScan = () => {
    // Simula scansione QR code
    setTimeout(() => {
      setScanSuccess(true);
      setTimeout(() => {
        setScannerOpen(false);
        setScanSuccess(false);
      }, 2000);
    }, 1500);
  };

  const presenzeFiltrate = mockPresenze
    .filter(p => p.studenteId === user?.id)
    .filter(p => filtroCorso === 'tutti' || p.corso === filtroCorso)
    .filter(p => filtroStato === 'tutti' || p.stato === filtroStato)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const corsiConPresenze = mockCorsi.map(corso => ({
    ...corso,
    percentuale: getPercentualePresenza(corso.nome, user?.id || ''),
    totalePresenze: mockPresenze.filter(p => p.corso === corso.nome && p.studenteId === user?.id).length,
    presenti: mockPresenze.filter(p => p.corso === corso.nome && p.studenteId === user?.id && (p.stato === 'presente' || p.stato === 'ritardo')).length
  }));

  return (
    <div className="pb-20 pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1>Presenze</h1>
        <p className="text-[#666] mt-1">Registra e monitora le tue presenze</p>
      </div>

      {/* Scanner QR */}
      <button
        onClick={handleOpenScanner}
        className="w-full bg-[#ff0000] text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-lg transition-shadow"
      >
        <Camera className="w-6 h-6" />
        <span>Scansiona QR Code</span>
      </button>

      {/* Riepilogo Presenze per Corso */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <h3 className="mb-4">Riepilogo per Corso</h3>
        <div className="space-y-4">
          {corsiConPresenze.map(corso => {
            const aRischio = corso.percentuale < 80;
            return (
              <div key={corso.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm">{corso.nome}</h4>
                    <p className="text-xs text-[#afafaf]">
                      {corso.presenti}/{corso.totalePresenze} presenze registrate
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 ${aRischio ? 'text-[#ff0000]' : 'text-[#16a34a]'}`}>
                    {aRischio ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                    <span className="text-sm">{corso.percentuale}%</span>
                  </div>
                </div>
                <div className="w-full bg-[#f5f5f5] rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      aRischio ? 'bg-[#ff0000]' : 'bg-[#16a34a]'
                    }`}
                    style={{ width: `${corso.percentuale}%` }}
                  />
                </div>
                {aRischio && (
                  <p className="text-xs text-[#ff0000]">
                    Attenzione: necessario almeno l&apos;80% per accedere all&apos;esame
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtri */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" />
          <h3>Filtra Presenze</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-2">Corso</label>
            <select
              value={filtroCorso}
              onChange={(e) => setFiltroCorso(e.target.value)}
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="tutti">Tutti i corsi</option>
              {mockCorsi.map(corso => (
                <option key={corso.id} value={corso.nome}>{corso.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Stato</label>
            <select
              value={filtroStato}
              onChange={(e) => setFiltroStato(e.target.value)}
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="tutti">Tutti</option>
              <option value="presente">Presente</option>
              <option value="assente">Assente</option>
              <option value="ritardo">Ritardo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista Presenze */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <h3 className="mb-4">Storico Presenze</h3>
        <div className="space-y-3">
          {presenzeFiltrate.length === 0 ? (
            <p className="text-center text-[#afafaf] py-8">Nessuna presenza trovata</p>
          ) : (
            presenzeFiltrate.map(presenza => (
              <div key={presenza.id} className="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg">
                <div>
                  <h4 className="text-sm">{presenza.corso}</h4>
                  <p className="text-xs text-[#afafaf]">
                    {new Date(presenza.data).toLocaleDateString('it-IT', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  {presenza.motivazione && (
                    <p className="text-xs text-[#666] mt-1">
                      Motivazione: {presenza.motivazione}
                    </p>
                  )}
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs ${
                    presenza.stato === 'presente'
                      ? 'bg-[#16a34a]/10 text-[#16a34a]'
                      : presenza.stato === 'ritardo'
                      ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                      : 'bg-[#ff0000]/10 text-[#ff0000]'
                  }`}
                >
                  {presenza.stato.charAt(0).toUpperCase() + presenza.stato.slice(1)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Scanner QR */}
      <AnimatePresence>
        {scannerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50"
              onClick={() => !scanSuccess && setScannerOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 z-50 flex flex-col"
            >
              <div className="flex justify-between items-center text-white mb-4">
                <h3 className="text-white">Scansiona QR Code</h3>
                <button
                  onClick={() => setScannerOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg"
                  disabled={scanSuccess}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                {scanSuccess ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center text-white"
                  >
                    <CheckCircle className="w-24 h-24 mx-auto mb-4 text-[#16a34a]" />
                    <h3 className="text-white mb-2">Presenza Registrata!</h3>
                    <p className="text-white/70">La tua presenza è stata confermata</p>
                  </motion.div>
                ) : (
                  <div className="relative">
                    {/* Simulazione frame scanner */}
                    <div className="w-64 h-64 border-4 border-white rounded-lg relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#ff0000]" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#ff0000]" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#ff0000]" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#ff0000]" />
                      
                      {/* Linea di scansione animata */}
                      <motion.div
                        className="absolute left-0 right-0 h-1 bg-[#ff0000] shadow-lg shadow-[#ff0000]/50"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                    
                    <p className="text-white text-center mt-4">
                      Posiziona il QR code nel riquadro
                    </p>
                    
                    {/* Pulsante test */}
                    <button
                      onClick={handleScan}
                      className="mt-6 mx-auto block px-6 py-2 bg-[#ff0000] text-white rounded-lg"
                    >
                      Simula scansione
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Permesso Camera */}
      <AnimatePresence>
        {showCameraPermission && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={handlePermissionDeny}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-[#ff0000]/10 rounded-xl">
                    <Camera className="w-6 h-6 text-[#ff0000]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">Accesso alla Fotocamera</h3>
                    <p className="text-sm text-[#666]">
                      L'app necessita di accedere alla fotocamera per scansionare il QR code del docente e registrare la tua presenza a lezione.
                    </p>
                  </div>
                  <button
                    onClick={handlePermissionDeny}
                    className="p-1.5 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-[#f8f9fa] rounded-xl p-4 mb-6">
                  <p className="text-xs text-[#666]">
                    <strong>Privacy:</strong> La fotocamera verrà utilizzata solo per scansionare il QR code. Nessuna immagine o video verrà salvato.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePermissionDeny}
                    className="flex-1 py-3 px-4 bg-[#f5f5f5] text-[#666] rounded-xl hover:bg-[#e5e5e5] transition-colors"
                  >
                    Rifiuta
                  </button>
                  <button
                    onClick={handlePermissionAccept}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white rounded-xl hover:shadow-lg transition-shadow"
                  >
                    Consenti
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}