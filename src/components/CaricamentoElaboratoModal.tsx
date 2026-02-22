import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText, Check, Download, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useAppData } from '../contexts/AppDataContext';

interface Consegna {
  id: string;
  corso: string;
  nomeElaborato: string;
  scadenza: string;
  oraScadenza: string;
  luogoConsegna: string;
  stato: 'da_consegnare' | 'consegnato' | 'scaduto';
  fileCaricato?: string;
  dataConsegna?: string;
  oraConsegna?: string;
  commento?: string;
}

interface CaricamentoElaboratoModalProps {
  isOpen: boolean;
  onClose: () => void;
  consegne: Consegna[];
}

export function CaricamentoElaboratoModal({ isOpen, onClose, consegne }: CaricamentoElaboratoModalProps) {
  const { consegnaElaborato } = useAppData();
  const [selectedConsegna, setSelectedConsegna] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [commento, setCommento] = useState('');
  const [loading, setLoading] = useState(false);

  const consegnaSelezionata = consegne.find(c => c.id === selectedConsegna);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 3 * 1024 * 1024) {
        toast.error('Il file non può superare i 3MB');
        return;
      }
      setFile(selectedFile);
      toast.success('File selezionato');
    }
  };

  const handleSubmit = () => {
    if (!file) {
      toast.error('Seleziona un file da caricare');
      return;
    }

    if (!selectedConsegna) {
      return;
    }

    setLoading(true);

    // Simula upload
    setTimeout(() => {
      // Aggiorna lo stato tramite context
      consegnaElaborato(selectedConsegna, file);
      
      setLoading(false);
      
      // Mostra toast di successo
      toast.success(
        '✅ Consegna avvenuta con successo! Il docente riceverà una notifica.',
        { duration: 4000 }
      );
      
      // Chiudi il modale dopo un breve delay per far vedere il toast
      setTimeout(() => {
        setFile(null);
        setCommento('');
        setSelectedConsegna(null);
        onClose();
      }, 500);
    }, 2000);
  };

  const handleDownload = () => {
    toast.success('Download elaborato avviato');
  };

  const handleRicarica = () => {
    setFile(null);
    toast.info('Puoi ricaricare un nuovo file');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-xl z-50 p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#ff0000]" aria-label="Caricamento elaborati" />
                Caricamento Elaborati
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                aria-label="Chiudi modale"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!selectedConsegna ? (
              <div className="space-y-3">
                <p className="text-sm text-[#666] mb-4">
                  Seleziona la consegna per cui vuoi caricare l'elaborato
                </p>
                {consegne.map(consegna => {
                  const scadenza = new Date(`${consegna.scadenza} ${consegna.oraScadenza}`);
                  const isScaduto = scadenza < new Date();
                  const hasFile = consegna.stato === 'consegnato';
                  
                  return (
                    <button
                      key={consegna.id}
                      onClick={() => setSelectedConsegna(consegna.id)}
                      disabled={isScaduto && !hasFile}
                      className={`w-full p-4 rounded-lg text-left transition-colors ${
                        isScaduto && !hasFile
                          ? 'bg-[#afafaf]/10 cursor-not-allowed'
                          : 'bg-[#f5f5f5] hover:bg-[#e5e5e5]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">{consegna.corso}</h4>
                          <p className="text-xs text-[#afafaf]">{consegna.nomeElaborato}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          hasFile
                            ? 'bg-[#16a34a] text-white'
                            : isScaduto
                            ? 'bg-[#dc2626] text-white'
                            : 'bg-[#f59e0b] text-white'
                        }`}>
                          {hasFile ? 'Consegnato' : isScaduto ? 'Scaduto' : 'Da consegnare'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#666]">
                        <span>Scadenza: {new Date(consegna.scadenza).toLocaleDateString('it-IT')} ore {consegna.oraScadenza}</span>
                        <span>•</span>
                        <span>{consegna.luogoConsegna}</span>
                      </div>
                      {hasFile && consegna.dataConsegna && (
                        <div className="mt-2 text-xs text-[#16a34a]">
                          Consegnato il {new Date(consegna.dataConsegna).toLocaleDateString('it-IT')} ore {consegna.oraConsegna}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedConsegna(null)}
                  className="text-sm text-[#666] hover:text-[#000] flex items-center gap-1"
                >
                  ← Torna alle consegne
                </button>

                <div className="p-4 bg-[#f5f5f5] rounded-lg">
                  <h4 className="mb-2">{consegnaSelezionata?.corso}</h4>
                  <p className="text-sm text-[#666] mb-3">{consegnaSelezionata?.nomeElaborato}</p>
                  <div className="space-y-1 text-xs text-[#afafaf]">
                    <p>Scadenza: {consegnaSelezionata && new Date(consegnaSelezionata.scadenza).toLocaleDateString('it-IT')} ore {consegnaSelezionata?.oraScadenza}</p>
                    <p>Consegna: {consegnaSelezionata?.luogoConsegna}</p>
                  </div>
                </div>

                {consegnaSelezionata?.stato === 'consegnato' && consegnaSelezionata.fileCaricato ? (
                  <div className="p-4 bg-[#16a34a]/10 border border-[#16a34a]/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Check className="w-5 h-5 text-[#16a34a]" aria-label="Elaborato consegnato" />
                      <div className="flex-1">
                        <p className="text-sm">Elaborato già consegnato</p>
                        <p className="text-xs text-[#afafaf]">
                          {consegnaSelezionata.dataConsegna && new Date(consegnaSelezionata.dataConsegna).toLocaleDateString('it-IT')} ore {consegnaSelezionata.oraConsegna}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDownload}
                        className="flex-1 py-2 bg-[#000] text-white rounded-lg hover:bg-[#333] transition-colors flex items-center justify-center gap-2 text-sm"
                        aria-label="Scarica elaborato"
                      >
                        <Download className="w-4 h-4" />
                        Scarica
                      </button>
                      <button
                        onClick={handleRicarica}
                        className="flex-1 py-2 border-2 border-[#ff0000] text-[#ff0000] rounded-lg hover:bg-[#ff0000] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                        aria-label="Ricarica nuovo elaborato"
                      >
                        <Upload className="w-4 h-4" />
                        Ricarica
                      </button>
                    </div>
                    {consegnaSelezionata.commento && (
                      <div className="mt-3 p-3 bg-white rounded-lg">
                        <p className="text-xs text-[#afafaf] mb-1">Commento allegato:</p>
                        <p className="text-sm">{consegnaSelezionata.commento}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm mb-2">File Elaborato (max 3MB)</label>
                      <div className="relative">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[#afafaf]/50 rounded-lg hover:border-[#ff0000] hover:bg-[#ff0000]/5 transition-colors cursor-pointer"
                        >
                          <FileText className="w-5 h-5 text-[#afafaf]" aria-label="Carica file" />
                          <span className="text-sm text-[#666]">
                            {file ? file.name : 'Clicca per selezionare il file'}
                          </span>
                        </label>
                      </div>
                      {file && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-[#16a34a]">
                          <Check className="w-4 h-4" aria-label="File selezionato" />
                          <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      )}
                      <p className="text-xs text-[#afafaf] mt-1">
                        Formati accettati: PDF, DOC, DOCX, JPG, PNG, ZIP
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Commento (opzionale)</label>
                      <textarea
                        value={commento}
                        onChange={(e) => setCommento(e.target.value)}
                        placeholder="Aggiungi un commento al tuo elaborato..."
                        rows={4}
                        className="w-full p-3 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent resize-none"
                      />
                    </div>

                    {new Date(`${consegnaSelezionata?.scadenza} ${consegnaSelezionata?.oraScadenza}`) < new Date() && (
                      <div className="flex items-start gap-2 p-3 bg-[#dc2626]/10 border border-[#dc2626]/30 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-[#dc2626] flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-[#dc2626]">
                          Attenzione: la scadenza è già passata. Contatta il docente per valutare la possibilità di una consegna in ritardo.
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setSelectedConsegna(null)}
                        className="flex-1 py-3 border-2 border-[#afafaf] text-[#000] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                      >
                        Annulla
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!file || loading}
                        className="flex-1 py-3 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Caricamento...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5" />
                            <span>Invia Elaborato</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}