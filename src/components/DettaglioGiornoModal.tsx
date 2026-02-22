import { X, Clock, MapPin, Video, FileText, ExternalLink } from 'lucide-react';
import type { EventoCalendario } from '../types';

interface DettaglioGiornoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Date;
  eventi: EventoCalendario[];
}

export function DettaglioGiornoModal({ isOpen, onClose, data, eventi }: DettaglioGiornoModalProps) {
  if (!isOpen) return null;

  const getTipoEventoColor = (tipo: EventoCalendario['tipo']) => {
    switch (tipo) {
      case 'lezione':
        return 'bg-[#dc6b5c] text-white';
      case 'scadenza':
        return 'bg-[#f59e0b] text-white';
      case 'esame':
        return 'bg-[#000000] text-white';
      case 'vacanza':
        return 'bg-[#16a34a] text-white';
      default:
        return 'bg-[#afafaf] text-white';
    }
  };

  const getTipoEventoIcon = (tipo: EventoCalendario['tipo']) => {
    switch (tipo) {
      case 'lezione':
        return <Clock className="w-4 h-4" aria-label="Lezione" />;
      case 'scadenza':
        return <FileText className="w-4 h-4" aria-label="Scadenza" />;
      case 'esame':
        return <FileText className="w-4 h-4" aria-label="Esame" />;
      default:
        return <Clock className="w-4 h-4" aria-label="Evento" />;
    }
  };

  const getTipoEventoLabel = (tipo: EventoCalendario['tipo']) => {
    switch (tipo) {
      case 'lezione':
        return 'Lezione';
      case 'scadenza':
        return 'Scadenza';
      case 'esame':
        return 'Esame';
      case 'vacanza':
        return 'Vacanza';
      default:
        return 'Evento';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#afafaf]/20 p-4 flex items-center justify-between">
          <div>
            <h2>
              {data.toLocaleDateString('it-IT', { weekday: 'long' })}
            </h2>
            <p className="text-[#666] mt-1">
              {data.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
            aria-label="Chiudi modale"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {eventi.length > 0 ? (
            <div className="space-y-4">
              {eventi
                .sort((a, b) => {
                  if (!a.oraInizio) return 1;
                  if (!b.oraInizio) return -1;
                  return a.oraInizio.localeCompare(b.oraInizio);
                })
                .map(evento => (
                  <div
                    key={evento.id}
                    className="bg-[#f5f5f5] rounded-xl p-4 border border-[#afafaf]/20"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icona Tipo */}
                      <div className={`p-2 rounded-lg ${getTipoEventoColor(evento.tipo)}`}>
                        {getTipoEventoIcon(evento.tipo)}
                      </div>

                      {/* Contenuto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="text-xs text-[#666] mb-1 block">
                              {getTipoEventoLabel(evento.tipo)}
                            </span>
                            <h4>{evento.titolo}</h4>
                          </div>
                          {evento.oraInizio && (
                            <span className="text-sm text-[#666] whitespace-nowrap">
                              {evento.oraInizio}
                              {evento.oraFine && ` - ${evento.oraFine}`}
                            </span>
                          )}
                        </div>

                        {evento.corso && (
                          <p className="text-sm text-[#666] mb-2">
                            {evento.corso}
                          </p>
                        )}

                        {evento.descrizione && (
                          <p className="text-sm text-[#666] bg-white p-3 rounded-lg border border-[#afafaf]/20">
                            {evento.descrizione}
                          </p>
                        )}

                        {/* Dettagli lezione */}
                        {evento.tipo === 'lezione' && (
                          <div className="mt-3 flex flex-wrap gap-3">
                            {evento.aula && (
                              <div className="flex items-center gap-2 text-sm text-[#666]">
                                <MapPin className="w-4 h-4" />
                                <span>{evento.aula}</span>
                              </div>
                            )}
                            {evento.linkMeet && (
                              <div className="flex items-center gap-2 text-sm">
                                <Video className="w-4 h-4 text-[#ff0000]" />
                                <a
                                  href={evento.linkMeet}
                                  className="text-[#ff0000] hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Partecipa online
                                </a>
                              </div>
                            )}
                            {evento.linkClassroom && (
                              <div className="flex items-center gap-2 text-sm">
                                <ExternalLink className="w-4 h-4 text-[#ff0000]" />
                                <a
                                  href={evento.linkClassroom}
                                  className="text-[#ff0000] hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Vai a Classroom
                                </a>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Dettagli esame */}
                        {evento.tipo === 'esame' && evento.aula && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-[#666]">
                            <MapPin className="w-4 h-4" />
                            <span>{evento.aula}</span>
                          </div>
                        )}

                        {/* Azioni per tipo evento */}
                        {evento.tipo === 'esame' && (
                          <button className="mt-3 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors text-sm">
                            Dettagli iscrizione
                          </button>
                        )}

                        {evento.tipo === 'scadenza' && (
                          <button className="mt-3 px-4 py-2 bg-[#f59e0b] text-white rounded-lg hover:bg-[#d97706] transition-colors text-sm">
                            Vai a Didattica
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#f5f5f5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#afafaf]" />
              </div>
              <h4 className="mb-2">Nessun evento</h4>
              <p className="text-[#666]">
                Non ci sono eventi programmati per questo giorno
              </p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-[#afafaf]/20 p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#f5f5f5] text-black rounded-xl hover:bg-[#efefef] transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}