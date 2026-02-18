import { useState } from 'react';
import { FileText, Download, X, Eye, Filter, Calendar, CheckCircle, Award, User } from 'lucide-react';
import { tutteLeConsegne, getStudenteById, getStatisticheDidatticaDocente } from '../../utils/didatticaData';
import { mockCorsi } from '../../utils/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

export function DidatticaDocente() {
  const { user } = useAuth();
  const [filtroCorso, setFiltroCorso] = useState<string>('tutti');
  const [filtroStato, setFiltroStato] = useState<string>('tutti');
  const [filtroConsegna, setFiltroConsegna] = useState<string>('tutte');
  const [dettaglioOpen, setDettaglioOpen] = useState(false);
  const [consegnaSelezionata, setConsegnaSelezionata] = useState<string | null>(null);
  const [voto, setVoto] = useState<number>(18);
  const [lode, setLode] = useState(false);
  const [feedback, setFeedback] = useState('');

  const corsiDocente = mockCorsi.filter(c => c.docente.includes(user?.cognome || ''));
  const nomiCorsiDocente = corsiDocente.map(c => c.nome);
  const statistiche = getStatisticheDidatticaDocente(nomiCorsiDocente);

  // Filtra consegne per i corsi del docente
  const consegneDocente = tutteLeConsegne.filter(c => nomiCorsiDocente.includes(c.corso));

  // Applica filtri
  const consegneFiltrate = consegneDocente.filter(c => {
    const matchCorso = filtroCorso === 'tutti' || c.corso === filtroCorso;
    const matchStato = filtroStato === 'tutti' || c.stato === filtroStato;
    const matchConsegna = filtroConsegna === 'tutte' || c.titolo === filtroConsegna;
    return matchCorso && matchStato && matchConsegna;
  });

  // Ottieni titoli consegne unici
  const consegneUniche = Array.from(new Set(consegneDocente.map(c => c.titolo)));

  const consegnaCorrente = tutteLeConsegne.find(c => c.id === consegnaSelezionata);
  const studenteCorrente = consegnaCorrente ? getStudenteById(consegnaCorrente.studenteId) : null;

  const handleApriDettaglio = (id: string) => {
    const consegna = tutteLeConsegne.find(c => c.id === id);
    if (consegna && consegna.stato === 'valutato') {
      // Se già valutato, carica i dati
      setVoto(consegna.voto || 18);
      setLode(consegna.voto === 30);
      setFeedback(consegna.feedback || '');
    } else {
      // Reset per nuova valutazione
      setVoto(18);
      setLode(false);
      setFeedback('');
    }
    setConsegnaSelezionata(id);
    setDettaglioOpen(true);
  };

  const handleSalvaValutazione = () => {
    if (!feedback.trim()) {
      toast.error('Inserisci un feedback');
      return;
    }
    const votoFinale = lode ? 30 : voto;
    toast.success(`Valutazione salvata: ${votoFinale}${lode ? ' e Lode' : ''}`);
    setDettaglioOpen(false);
    setConsegnaSelezionata(null);
  };

  const getStatoBadge = (stato: string) => {
    switch (stato) {
      case 'non-consegnato':
        return <span className="px-2 py-1 bg-[#afafaf]/10 text-[#afafaf] text-xs rounded-full whitespace-nowrap">Non consegnato</span>;
      case 'consegnato':
        return <span className="px-2 py-1 bg-[#f59e0b]/10 text-[#f59e0b] text-xs rounded-full whitespace-nowrap">Da valutare</span>;
      case 'valutato':
        return <span className="px-2 py-1 bg-[#16a34a]/10 text-[#16a34a] text-xs rounded-full whitespace-nowrap">Valutato</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pb-20 md:pb-6 pt-20 md:pt-20 px-4 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1>Didattica</h1>
        <p className="text-[#666] mt-1">Gestisci gli elaborati degli studenti</p>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-md border border-[#f59e0b]/20 p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-[#f59e0b]/10 rounded-xl">
              <FileText className="w-6 h-6 text-[#f59e0b]" />
            </div>
            <h3 className="text-sm font-semibold text-[#666]">Da Valutare</h3>
          </div>
          <p className="text-4xl font-bold text-[#000]">{statistiche.daValutare}</p>
          <div className="mt-2 h-1 bg-[#f59e0b]/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#f59e0b] w-3/4 rounded-full" />
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-md border border-[#16a34a]/20 p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-[#16a34a]/10 rounded-xl">
              <CheckCircle className="w-6 h-6 text-[#16a34a]" />
            </div>
            <h3 className="text-sm font-semibold text-[#666]">Valutati</h3>
          </div>
          <p className="text-4xl font-bold text-[#000]">{statistiche.valutati}</p>
          <div className="mt-2 h-1 bg-[#16a34a]/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#16a34a] w-3/4 rounded-full" />
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-md border border-[#ff0000]/20 p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-[#ff0000]/10 rounded-xl">
              <FileText className="w-6 h-6 text-[#ff0000]" />
            </div>
            <h3 className="text-sm font-semibold text-[#666]">Totale Consegne</h3>
          </div>
          <p className="text-4xl font-bold text-[#000]">{statistiche.totaleConsegne}</p>
          <div className="mt-2 h-1 bg-[#ff0000]/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#ff0000] w-full rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Filtri */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" />
          <h3>Filtri</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Corso</label>
            <select
              value={filtroCorso}
              onChange={(e) => setFiltroCorso(e.target.value)}
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="tutti">Tutti i corsi</option>
              {nomiCorsiDocente.map(corso => (
                <option key={corso} value={corso}>{corso}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Consegna</label>
            <select
              value={filtroConsegna}
              onChange={(e) => setFiltroConsegna(e.target.value)}
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="tutte">Tutte le consegne</option>
              {consegneUniche.map(cons => (
                <option key={cons} value={cons}>{cons}</option>
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
              <option value="tutti">Tutti gli stati</option>
              <option value="non-consegnato">Non consegnati</option>
              <option value="consegnato">Da valutare</option>
              <option value="valutato">Valutati</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabella Elaborati */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 overflow-hidden">
        <div className="p-5 border-b border-[#afafaf]/20">
          <h3>Elaborati Studenti</h3>
          <p className="text-sm text-[#666] mt-1">Clicca su una riga per vedere i dettagli e valutare</p>
        </div>
        
        {/* Desktop: Tabella */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-[#afafaf]">Studente</th>
                <th className="px-4 py-3 text-left text-xs text-[#afafaf]">Matricola</th>
                <th className="px-4 py-3 text-left text-xs text-[#afafaf]">Esercizio</th>
                <th className="px-4 py-3 text-left text-xs text-[#afafaf]">Materia</th>
                <th className="px-4 py-3 text-left text-xs text-[#afafaf]">Scadenza</th>
                <th className="px-4 py-3 text-left text-xs text-[#afafaf]">Consegna</th>
                <th className="px-4 py-3 text-center text-xs text-[#afafaf]">Voto</th>
                <th className="px-4 py-3 text-center text-xs text-[#afafaf]">Peso</th>
                <th className="px-4 py-3 text-center text-xs text-[#afafaf]">Stato</th>
                <th className="px-4 py-3 text-center text-xs text-[#afafaf]">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#afafaf]/20">
              {consegneFiltrate.map(consegna => {
                const studente = getStudenteById(consegna.studenteId);
                if (!studente) return null;
                
                return (
                  <tr
                    key={consegna.id}
                    onClick={() => handleApriDettaglio(consegna.id)}
                    className="hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-4">
                      <p className="text-sm">{studente.nome} {studente.cognome}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-[#666]">{studente.matricola}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm">{consegna.titolo}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-[#666]">{consegna.corso}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm">{new Date(consegna.scadenza).toLocaleDateString('it-IT')}</p>
                      <p className="text-xs text-[#afafaf]">{consegna.oraScadenza}</p>
                    </td>
                    <td className="px-4 py-4">
                      {consegna.dataConsegna ? (
                        <>
                          <p className="text-sm">{new Date(consegna.dataConsegna).toLocaleDateString('it-IT')}</p>
                          <p className="text-xs text-[#afafaf]">{consegna.oraConsegna}</p>
                        </>
                      ) : (
                        <span className="text-xs text-[#afafaf]">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {consegna.voto ? (
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-lg">{consegna.voto}</span>
                          {consegna.voto === 30 && (
                            <Award className="w-4 h-4 text-[#ff0000]" />
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-[#afafaf]">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {consegna.pesoVoto ? (
                        <span className="text-sm">{consegna.pesoVoto}%</span>
                      ) : (
                        <span className="text-xs text-[#afafaf]">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {getStatoBadge(consegna.stato)}
                    </td>
                    <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      {consegna.stato === 'consegnato' && (
                        <button
                          onClick={() => handleApriDettaglio(consegna.id)}
                          className="px-3 py-1.5 bg-[#ff0000] text-white text-xs rounded-lg hover:bg-[#cc0000] transition-colors"
                        >
                          Valuta
                        </button>
                      )}
                      {consegna.stato === 'valutato' && (
                        <button
                          onClick={() => handleApriDettaglio(consegna.id)}
                          className="px-3 py-1.5 bg-[#16a34a] text-white text-xs rounded-lg hover:bg-[#15803d] transition-colors flex items-center gap-1 mx-auto"
                        >
                          <Eye className="w-3 h-3" />
                          Vedi
                        </button>
                      )}
                      {consegna.stato === 'non-consegnato' && (
                        <span className="text-xs text-[#afafaf]">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card Layout */}
        <div className="md:hidden divide-y divide-[#afafaf]/20">
          {consegneFiltrate.map(consegna => {
            const studente = getStudenteById(consegna.studenteId);
            if (!studente) return null;
            
            return (
              <div
                key={consegna.id}
                onClick={() => handleApriDettaglio(consegna.id)}
                className="p-4 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              >
                {/* Header con studente e stato */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-[#ff0000]" />
                      <h4 className="text-sm">{studente.nome} {studente.cognome}</h4>
                    </div>
                    <p className="text-xs text-[#afafaf]">Mat. {studente.matricola}</p>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    {getStatoBadge(consegna.stato)}
                  </div>
                </div>

                {/* Info elaborato */}
                <div className="mb-3 p-3 bg-[#f8f9fa] rounded-lg">
                  <p className="text-sm mb-0.5">{consegna.titolo}</p>
                  <p className="text-xs text-[#666]">{consegna.corso}</p>
                </div>

                {/* Date e voti */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-[#afafaf] mb-1">Scadenza</p>
                    <p className="text-sm">{new Date(consegna.scadenza).toLocaleDateString('it-IT')}</p>
                    <p className="text-xs text-[#afafaf]">{consegna.oraScadenza}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#afafaf] mb-1">Consegna</p>
                    {consegna.dataConsegna ? (
                      <>
                        <p className="text-sm">{new Date(consegna.dataConsegna).toLocaleDateString('it-IT')}</p>
                        <p className="text-xs text-[#afafaf]">{consegna.oraConsegna}</p>
                      </>
                    ) : (
                      <span className="text-sm text-[#afafaf]">-</span>
                    )}
                  </div>
                </div>

                {/* Voto/Peso e azione */}
                <div className="flex items-center justify-between pt-3 border-t border-[#afafaf]/20">
                  <div className="flex items-center gap-4">
                    {consegna.voto && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#afafaf]">Voto:</span>
                        <span className="text-lg">{consegna.voto}</span>
                        {consegna.voto === 30 && <Award className="w-4 h-4 text-[#ff0000]" />}
                      </div>
                    )}
                    {consegna.pesoVoto && (
                      <div>
                        <span className="text-xs text-[#afafaf]">Peso: </span>
                        <span className="text-sm">{consegna.pesoVoto}%</span>
                      </div>
                    )}
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    {consegna.stato === 'consegnato' && (
                      <button
                        onClick={() => handleApriDettaglio(consegna.id)}
                        className="px-3 py-1.5 bg-[#ff0000] text-white text-xs rounded-lg hover:bg-[#cc0000] transition-colors"
                      >
                        Valuta
                      </button>
                    )}
                    {consegna.stato === 'valutato' && (
                      <button
                        onClick={() => handleApriDettaglio(consegna.id)}
                        className="px-3 py-1.5 bg-[#16a34a] text-white text-xs rounded-lg hover:bg-[#15803d] transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Vedi
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {consegneFiltrate.length === 0 && (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-[#afafaf] mx-auto mb-3" />
            <p className="text-[#666]">Nessun elaborato trovato</p>
          </div>
        )}
      </div>

      {/* Modal Dettaglio/Valutazione */}
      <AnimatePresence>
        {dettaglioOpen && consegnaCorrente && studenteCorrente && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDettaglioOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white rounded-xl z-50 p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="mb-2">{consegnaCorrente.titolo}</h2>
                  <p className="text-sm text-[#666]">{consegnaCorrente.corso}</p>
                </div>
                <button
                  onClick={() => setDettaglioOpen(false)}
                  className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Info Studente */}
                <div className="bg-[#f8f9fa] rounded-lg p-4">
                  <h4 className="text-sm mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#ff0000]" />
                    Studente
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#afafaf]">Nome</p>
                      <p className="text-sm">{studenteCorrente.nome} {studenteCorrente.cognome}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#afafaf]">Matricola</p>
                      <p className="text-sm">{studenteCorrente.matricola}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-[#afafaf]">Email</p>
                      <p className="text-sm">{studenteCorrente.email}</p>
                    </div>
                  </div>
                </div>

                {/* Descrizione */}
                <div className="bg-[#f8f9fa] rounded-lg p-4">
                  <h4 className="text-sm mb-2">Descrizione del compito</h4>
                  <p className="text-sm text-[#666]">{consegnaCorrente.descrizione}</p>
                </div>

                {/* Info Scadenza e Consegna */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f8f9fa] rounded-lg p-4">
                    <h4 className="text-sm mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#ff0000]" />
                      Scadenza
                    </h4>
                    <p className="text-sm">
                      {new Date(consegnaCorrente.scadenza).toLocaleDateString('it-IT')} alle {consegnaCorrente.oraScadenza}
                    </p>
                  </div>
                  {consegnaCorrente.dataConsegna && (
                    <div className="bg-[#f8f9fa] rounded-lg p-4">
                      <h4 className="text-sm mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#16a34a]" />
                        Consegnato
                      </h4>
                      <p className="text-sm">
                        {new Date(consegnaCorrente.dataConsegna).toLocaleDateString('it-IT')} alle {consegnaCorrente.oraConsegna}
                      </p>
                    </div>
                  )}
                </div>

                {/* Commento Studente */}
                {consegnaCorrente.testoConsegna && (
                  <div className="bg-[#f8f9fa] rounded-lg p-4">
                    <h4 className="text-sm mb-2">Commento dello studente</h4>
                    <p className="text-sm text-[#666]">{consegnaCorrente.testoConsegna}</p>
                  </div>
                )}

                {/* File Consegnato */}
                {consegnaCorrente.nomeFile && (
                  <div className="bg-[#f8f9fa] rounded-lg p-4">
                    <h4 className="text-sm mb-3">File consegnato</h4>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-sm">{consegnaCorrente.nomeFile}</span>
                      <a
                        href={consegnaCorrente.fileUrl}
                        download
                        onClick={(e) => {
                          e.preventDefault();
                          toast.success(`Download di ${consegnaCorrente.nomeFile} avviato`);
                        }}
                        className="px-3 py-1.5 bg-[#ff0000] text-white text-xs rounded-lg hover:bg-[#cc0000] transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Scarica
                      </a>
                    </div>
                  </div>
                )}

                {/* Sezione Valutazione */}
                {consegnaCorrente.stato === 'consegnato' && (
                  <div className="bg-white border-l-4 border-[#ff0000] rounded-lg p-4">
                    <h4 className="text-sm mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#ff0000]" />
                      Valutazione
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2">
                            Voto <span className="text-[#ff0000]">*</span>
                          </label>
                          <input
                            type="number"
                            min="18"
                            max="30"
                            value={voto}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (val >= 18 && val <= 30) {
                                setVoto(val);
                                if (val < 30) setLode(false);
                              }
                            }}
                            className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                          />
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={lode}
                              onChange={(e) => {
                                setLode(e.target.checked);
                                if (e.target.checked) setVoto(30);
                              }}
                              disabled={voto < 30}
                              className="w-4 h-4 accent-[#ff0000]"
                            />
                            <span className="text-sm">Lode</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm mb-2">
                          Feedback <span className="text-[#ff0000]">*</span>
                        </label>
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={4}
                          placeholder="Inserisci il tuo feedback per lo studente..."
                          className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Visualizza Valutazione Esistente */}
                {consegnaCorrente.stato === 'valutato' && (
                  <div className="bg-white border-l-4 border-[#16a34a] rounded-lg p-4">
                    <h4 className="text-sm mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#16a34a]" />
                      Valutazione Assegnata
                    </h4>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-center">
                        <p className="text-3xl">{consegnaCorrente.voto}</p>
                        <p className="text-xs text-[#afafaf] mt-1">Voto</p>
                      </div>
                      {consegnaCorrente.pesoVoto && (
                        <div className="text-center">
                          <p className="text-2xl">{consegnaCorrente.pesoVoto}%</p>
                          <p className="text-xs text-[#afafaf] mt-1">Peso</p>
                        </div>
                      )}
                    </div>
                    {consegnaCorrente.feedback && (
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="text-xs text-[#afafaf] mb-1">Feedback</h5>
                        <p className="text-sm">{consegnaCorrente.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                {consegnaCorrente.stato === 'consegnato' && (
                  <>
                    <button
                      onClick={() => {
                        setDettaglioOpen(false);
                        setConsegnaSelezionata(null);
                      }}
                      className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                    >
                      Annulla
                    </button>
                    <button
                      onClick={handleSalvaValutazione}
                      disabled={!feedback.trim()}
                      className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Salva Valutazione
                    </button>
                  </>
                )}
                {consegnaCorrente.stato !== 'consegnato' && (
                  <button
                    onClick={() => {
                      setDettaglioOpen(false);
                      setConsegnaSelezionata(null);
                    }}
                    className="w-full px-4 py-2 bg-[#afafaf] text-white rounded-lg hover:bg-[#999] transition-colors"
                  >
                    Chiudi
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}