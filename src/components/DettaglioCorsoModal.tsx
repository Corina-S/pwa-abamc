import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, User, Calendar, Award, FileText, Clock } from 'lucide-react';
import type { Corso } from '../types';

interface DettaglioCorsoModalProps {
  isOpen: boolean;
  onClose: () => void;
  corso: Corso | null;
}

export function DettaglioCorsoModal({ isOpen, onClose, corso }: DettaglioCorsoModalProps) {
  if (!isOpen || !corso) return null;

  return (
    <AnimatePresence>
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
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#ff0000] rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" aria-label="Corso" />
            </div>
            <div>
              <h3 className="mb-0">{corso.nome}</h3>
              <p className="text-xs text-[#afafaf]">{corso.codice}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
            aria-label="Chiudi modale"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Info Base */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-[#f5f5f5] rounded-lg">
              <User className="w-5 h-5 mx-auto mb-1 text-[#ff0000]" aria-label="Anno" />
              <p className="text-xs text-[#afafaf]">Anno</p>
              <p className="text-sm">{corso.anno}°</p>
            </div>
            <div className="text-center p-3 bg-[#f5f5f5] rounded-lg">
              <Award className="w-5 h-5 mx-auto mb-1 text-[#ff0000]" aria-label="Crediti" />
              <p className="text-xs text-[#afafaf]">CFU</p>
              <p className="text-sm">{corso.cfu}</p>
            </div>
            <div className="text-center p-3 bg-[#f5f5f5] rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-1 text-[#ff0000]" aria-label="Ore" />
              <p className="text-xs text-[#afafaf]">Ore</p>
              <p className="text-sm">{corso.ore}</p>
            </div>
            <div className="text-center p-3 bg-[#f5f5f5] rounded-lg">
              <Calendar className="w-5 h-5 mx-auto mb-1 text-[#ff0000]" aria-label="Semestre" />
              <p className="text-xs text-[#afafaf]">Semestre</p>
              <p className="text-sm">I</p>
            </div>
          </div>

          {/* Docente */}
          <div className="bg-[#f5f5f5] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-[#ff0000]" aria-label="Docente" />
              <h4 className="text-sm">Docente</h4>
            </div>
            <p className="text-sm ml-8">{corso.docente}</p>
            <p className="text-xs text-[#afafaf] ml-8 mt-1">
              Ricevimento: Martedì 14:00-16:00, Giovedì 15:00-17:00
            </p>
          </div>

          {/* Descrizione */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#ff0000]" />
              <h4 className="text-sm">Descrizione</h4>
            </div>
            <p className="text-sm text-[#666] leading-relaxed">{corso.descrizione}</p>
          </div>

          {/* Programma */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-[#ff0000]" />
              <h4 className="text-sm">Programma del Corso</h4>
            </div>
            <div className="bg-[#f5f5f5] rounded-lg p-4">
              <p className="text-sm text-[#666] leading-relaxed">{corso.programma}</p>
            </div>
          </div>

          {/* Modalità Accertamento */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-[#ff0000]" />
              <h4 className="text-sm">Modalità di Accertamento</h4>
            </div>
            <div className="bg-[#f5f5f5] rounded-lg p-4">
              <p className="text-sm text-[#666]">{corso.modalitaAccertamento}</p>
            </div>
          </div>

          {/* Materiali e Risorse */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#ff0000]" />
              <h4 className="text-sm">Materiali e Risorse</h4>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-[#666] mb-2">
                Consulta la sezione "Risorse" dell'app per accedere a tutti i materiali didattici del corso.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-[#f5f5f5] rounded-full">Dispense</span>
                <span className="text-xs px-3 py-1 bg-[#f5f5f5] rounded-full">Slide</span>
                <span className="text-xs px-3 py-1 bg-[#f5f5f5] rounded-full">Bibliografia</span>
                <span className="text-xs px-3 py-1 bg-[#f5f5f5] rounded-full">Video</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#afafaf]/20">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#afafaf] text-white rounded-lg hover:bg-[#999] transition-colors"
          >
            Chiudi
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
