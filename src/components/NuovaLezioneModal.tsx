import { useState } from 'react';
import { X, Calendar, Clock, MapPin, Video, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Corso {
  id: string;
  nome: string;
  codice: string;
}

interface NuovaLezioneModalProps {
  isOpen: boolean;
  onClose: () => void;
  corsi: Corso[];
}

export function NuovaLezioneModal({ isOpen, onClose, corsi }: NuovaLezioneModalProps) {
  const [corsoSelezionato, setCorsoSelezionato] = useState<string>('');
  const [tipoEvento, setTipoEvento] = useState<'lezione' | 'appello'>('lezione');
  const [data, setData] = useState<string>('');
  const [oraInizio, setOraInizio] = useState<string>('');
  const [oraFine, setOraFine] = useState<string>('');
  const [modalita, setModalita] = useState<'presenza' | 'online' | 'mista'>('presenza');
  const [aula, setAula] = useState<string>('');
  const [linkOnline, setLinkOnline] = useState<string>('');
  const [argomento, setArgomento] = useState<string>('');
  const [note, setNote] = useState<string>('');

  // Date periodo esami
  const periodoEsamiInvernale = { inizio: '2025-01-15', fine: '2025-02-28' };
  const periodoEsamiEstivo = { inizio: '2025-06-01', fine: '2025-07-31' };
  const periodoEsamiAutunnale = { inizio: '2025-09-01', fine: '2025-09-30' };

  const isDataValidaPerAppello = (dataSelezionata: string) => {
    if (!dataSelezionata) return true; // Non validare se vuoto
    
    const data = new Date(dataSelezionata);
    const invernaleInizio = new Date(periodoEsamiInvernale.inizio);
    const invernaleFine = new Date(periodoEsamiInvernale.fine);
    const estivoInizio = new Date(periodoEsamiEstivo.inizio);
    const estivoFine = new Date(periodoEsamiEstivo.fine);
    const autunnaleInizio = new Date(periodoEsamiAutunnale.inizio);
    const autunnaleFine = new Date(periodoEsamiAutunnale.fine);

    return (
      (data >= invernaleInizio && data <= invernaleFine) ||
      (data >= estivoInizio && data <= estivoFine) ||
      (data >= autunnaleInizio && data <= autunnaleFine)
    );
  };

  const handleSalva = () => {
    // Validazioni
    if (!data || !oraInizio || !oraFine) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    if (tipoEvento === 'appello' && !isDataValidaPerAppello(data)) {
      toast.error('La data dell\'appello deve essere in un periodo ufficiale di esami');
      return;
    }

    if (modalita === 'presenza' && !aula) {
      toast.error('Specifica l\'aula per lezioni in presenza');
      return;
    }

    if ((modalita === 'online' || modalita === 'mista') && !linkOnline) {
      toast.error('Inserisci il link per lezioni online/miste');
      return;
    }

    if (tipoEvento === 'lezione' && !argomento) {
      toast.error('Specifica l\'argomento della lezione');
      return;
    }

    // Simula salvataggio
    toast.success(
      tipoEvento === 'lezione' 
        ? 'Lezione creata con successo!' 
        : 'Appello d\'esame creato con successo!'
    );
    
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCorsoSelezionato('');
    setTipoEvento('lezione');
    setData('');
    setOraInizio('');
    setOraFine('');
    setModalita('presenza');
    setAula('');
    setLinkOnline('');
    setArgomento('');
    setNote('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#ff0000] text-white p-6 flex items-center justify-between">
          <div>
            <h2>Nuovo Evento - {corsoSelezionato ? corsi.find(c => c.id === corsoSelezionato)?.nome : 'Seleziona un corso'}</h2>
            <p className="text-sm opacity-90 mt-1">{corsoSelezionato ? corsi.find(c => c.id === corsoSelezionato)?.codice : ''}</p>
          </div>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Chiudi form nuovo evento"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Corso */}
          <div>
            <label className="block text-sm mb-2">
              Corso <span className="text-[#ff0000]">*</span>
            </label>
            <select
              value={corsoSelezionato}
              onChange={(e) => setCorsoSelezionato(e.target.value)}
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="">Seleziona un corso</option>
              {corsi.map(c => (
                <option key={c.id} value={c.id}>{c.nome} ({c.codice})</option>
              ))}
            </select>
          </div>

          {/* Tipo Evento */}
          <div>
            <label className="block text-sm mb-2">
              Tipo di evento <span className="text-[#ff0000]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTipoEvento('lezione')}
                className={`py-3 rounded-lg border-2 transition-colors ${
                  tipoEvento === 'lezione'
                    ? 'border-[#ff0000] bg-[#ff0000]/10 text-[#ff0000]'
                    : 'border-[#afafaf]/30 hover:border-[#afafaf]'
                }`}
              >
                Lezione
              </button>
              <button
                onClick={() => setTipoEvento('appello')}
                className={`py-3 rounded-lg border-2 transition-colors ${
                  tipoEvento === 'appello'
                    ? 'border-[#ff0000] bg-[#ff0000]/10 text-[#ff0000]'
                    : 'border-[#afafaf]/30 hover:border-[#afafaf]'
                }`}
              >
                Appello d&apos;Esame
              </button>
            </div>
          </div>

          {/* Data e Ora */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3 md:col-span-1">
              <label className="block text-sm mb-2">
                Data <span className="text-[#ff0000]">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#afafaf]" aria-label="Seleziona data" />
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    tipoEvento === 'appello' && data && !isDataValidaPerAppello(data)
                      ? 'border-[#ff0000] focus:ring-[#ff0000]'
                      : 'border-[#afafaf]/30 focus:ring-[#ff0000]'
                  }`}
                />
              </div>
              {tipoEvento === 'appello' && data && !isDataValidaPerAppello(data) && (
                <p className="text-xs text-[#ff0000] mt-1">
                  Data non valida per appelli
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-2">
                Inizio <span className="text-[#ff0000]">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#afafaf]" aria-label="Seleziona ora inizio" />
                <input
                  type="time"
                  value={oraInizio}
                  onChange={(e) => setOraInizio(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">
                Fine <span className="text-[#ff0000]">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#afafaf]" aria-label="Seleziona ora fine" />
                <input
                  type="time"
                  value={oraFine}
                  onChange={(e) => setOraFine(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                />
              </div>
            </div>
          </div>

          {/* Periodi esami (solo se appello) */}
          {tipoEvento === 'appello' && (
            <div className="bg-[#f5f5f5] rounded-lg p-4">
              <p className="text-sm mb-2">Periodi ufficiali per appelli d&apos;esame:</p>
              <div className="space-y-1 text-xs text-[#666]">
                <p>• Invernale: 15 gennaio - 28 febbraio</p>
                <p>• Estiva: 1 giugno - 31 luglio</p>
                <p>• Autunnale: 1 settembre - 30 settembre</p>
              </div>
            </div>
          )}

          {/* Modalità */}
          <div>
            <label className="block text-sm mb-2">
              Modalità <span className="text-[#ff0000]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['presenza', 'online', 'mista'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setModalita(m)}
                  className={`py-2 rounded-lg border-2 text-sm transition-colors ${
                    modalita === m
                      ? 'border-[#ff0000] bg-[#ff0000]/10 text-[#ff0000]'
                      : 'border-[#afafaf]/30 hover:border-[#afafaf]'
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Aula (se presenza o mista) */}
          {(modalita === 'presenza' || modalita === 'mista') && (
            <div>
              <label className="block text-sm mb-2">
                Aula <span className="text-[#ff0000]">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#afafaf]" aria-label="Seleziona aula" />
                <input
                  type="text"
                  value={aula}
                  onChange={(e) => setAula(e.target.value)}
                  placeholder="es. Aula 12, Lab Scultura"
                  className="w-full pl-10 pr-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                />
              </div>
            </div>
          )}

          {/* Link Online (se online o mista) */}
          {(modalita === 'online' || modalita === 'mista') && (
            <div>
              <label className="block text-sm mb-2">
                Link Online <span className="text-[#ff0000]">*</span>
              </label>
              <div className="relative">
                <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#afafaf]" aria-label="Input link online" />
                <input
                  type="url"
                  value={linkOnline}
                  onChange={(e) => setLinkOnline(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full pl-10 pr-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                />
              </div>
            </div>
          )}

          {/* Argomento (solo lezione) */}
          {tipoEvento === 'lezione' && (
            <div>
              <label className="block text-sm mb-2">
                Argomento <span className="text-[#ff0000]">*</span>
              </label>
              <input
                type="text"
                value={argomento}
                onChange={(e) => setArgomento(e.target.value)}
                placeholder="es. Tecniche di modellazione digitale"
                className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
              />
            </div>
          )}

          {/* Note */}
          <div>
            <label className="block text-sm mb-2">
              Note aggiuntive
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Materiali da portare, preparazione richiesta, ecc."
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#afafaf]/20 p-4 bg-white flex gap-3">
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="flex-1 py-3 border-2 border-[#afafaf] rounded-xl hover:bg-[#f5f5f5] transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={handleSalva}
            className="flex-1 py-3 bg-[#ff0000] text-white rounded-xl hover:bg-[#cc0000] transition-colors flex items-center justify-center gap-2"
            aria-label={`Salva ${tipoEvento === 'lezione' ? 'lezione' : 'appello'}`}
          >
            <Save className="w-5 h-5" />
            Salva {tipoEvento === 'lezione' ? 'Lezione' : 'Appello'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}