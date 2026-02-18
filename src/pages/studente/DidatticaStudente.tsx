import { useState } from 'react';
import { FileText, Upload, X, Eye, Download, Filter, Calendar, CheckCircle, Clock, Award } from 'lucide-react';
import { getConsegnePerStudente, getStatisticheDidatticaStudente, studenti } from '../../utils/didatticaData';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { useAuth } from '../../contexts/AuthContext';

export function DidatticaStudente() {
  const { user } = useAuth();
  const [filtroCorso, setFiltroCorso] = useState<string>('tutti');
  const [filtroStato, setFiltroStato] = useState<string>('tutti');
  const [consegnaOpen, setConsegnaOpen] = useState(false);
  const [dettaglioOpen, setDettaglioOpen] = useState(false);
  const [consegnaSelezionata, setConsegnaSelezionata] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [commento, setCommento] = useState('');

  const studenteMatch = user ? studenti.find(s => s.email === user.email || s.matricola === (user as any).matricola) : undefined;
  const studenteId = studenteMatch ? studenteMatch.id : (user?.id && String(user.id).startsWith('s') ? String(user.id) : 's1');
  const consegne = getConsegnePerStudente(studenteId);
  const statistiche = getStatisticheDidatticaStudente(studenteId);

  // Filtri
  const consegneFiltrate = consegne.filter(c => {
    const matchCorso = filtroCorso === 'tutti' || c.corso === filtroCorso;
    const matchStato = filtroStato === 'tutti' || c.stato === filtroStato;
    return matchCorso && matchStato;
  });

  const corsiUnici = Array.from(new Set(consegne.map(c => c.corso)));

  const consegnaCorrente = consegne.find(c => c.id === consegnaSelezionata);

  const handleApriConsegna = (id: string) => {
    setConsegnaSelezionata(id);
    setConsegnaOpen(true);
  };

  const handleApriDettaglio = (id: string) => {
    setConsegnaSelezionata(id);
    setDettaglioOpen(true);
  };

  const handleInviaConsegna = () => {
    if (!file) {
      toast.error('Carica un file');
      return;
    }
    toast.success('Elaborato consegnato con successo!');
    setConsegnaOpen(false);
    setFile(null);
    setCommento('');
    setConsegnaSelezionata(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const getStatoBadge = (stato: string) => {
    switch (stato) {
      case 'non-consegnato':
        return <span className="px-2 py-1 bg-[#ff0000]/10 text-[#ff0000] text-xs rounded-full whitespace-nowrap">Da consegnare</span>;
      case 'consegnato':
        return <span className="px-2 py-1 bg-[#f59e0b]/10 text-[#f59e0b] text-xs rounded-full whitespace-nowrap">In valutazione</span>;
      case 'valutato':
        return <span className="px-2 py-1 bg-[#16a34a]/10 text-[#16a34a] text-xs rounded-full whitespace-nowrap">Valutato</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pb-20 md:pb-6 pt-20 md:pt-20 px-4 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1>Didattica</h1>
        <p className="text-[#666] mt-1">Gestisci i tuoi elaborati e consegne</p>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-[#ff0000]" />
            <h3 className="text-sm whitespace-nowrap">Da Consegnare</h3>
          </div>
          <p className="text-3xl">{statistiche.daConsegnare}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-[#f59e0b]" />
            <h3 className="text-sm">In Valutazione</h3>
          </div>
          <p className="text-3xl">{statistiche.inValutazione}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-[#16a34a]" />
            <h3 className="text-sm">Valutati</h3>
          </div>
          <p className="text-3xl">{statistiche.valutati}</p>
        </div>
      </div>

      {/* Filtri */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" />
          <h3>Filtri</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Corso</label>
            <select
              value={filtroCorso}
              onChange={(e) => setFiltroCorso(e.target.value)}
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="tutti">Tutti i corsi</option>
              {corsiUnici.map(corso => (
                <option key={corso} value={corso}>{corso}</option>
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
              <option value="non-consegnato">Da consegnare</option>
              <option value="consegnato">In valutazione</option>
              <option value="valutato">Valutati</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabella Elaborati */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 overflow-hidden">
        <div className="p-5 border-b border-[#afafaf]/20">
          <h3>I Miei Elaborati</h3>
          <p className="text-sm text-[#666] mt-1">Clicca su una riga per vedere i dettagli</p>
        </div>
        
        {/* Desktop: Tabella */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f9fa]">
              <tr>
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
                const scaduto = new Date(consegna.scadenza) < new Date() && consegna.stato === 'non-consegnato';
                
                return (
                  <tr
                    key={consegna.id}
                    onClick={() => handleApriDettaglio(consegna.id)}
                    className="hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-4">
                      <p className="text-sm">{consegna.titolo}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-[#666]">{consegna.corso}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className={`text-sm ${scaduto ? 'text-[#ff0000]' : ''}`}>
                        {new Date(consegna.scadenza).toLocaleDateString('it-IT')}
                      </p>
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
                      {consegna.stato === 'non-consegnato' && (
                        <button
                          onClick={() => handleApriConsegna(consegna.id)}
                          className="px-3 py-1.5 bg-[#ff0000] text-white text-xs rounded-lg hover:bg-[#cc0000] transition-colors"
                        >
                          Consegna
                        </button>
                      )}
                      {consegna.stato === 'consegnato' && (
                        <span className="px-3 py-1.5 bg-[#f59e0b]/10 text-[#f59e0b] text-xs rounded-lg">
                          In attesa
                        </span>
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
            const scaduto = new Date(consegna.scadenza) < new Date() && consegna.stato === 'non-consegnato';
            
            return (
              <div
                key={consegna.id}
                onClick={() => handleApriDettaglio(consegna.id)}
                className="p-4 hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              >
                {/* Header: Titolo e Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm mb-1 truncate">{consegna.titolo}</h4>
                    <p className="text-xs text-[#666] truncate">{consegna.corso}</p>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                    {getStatoBadge(consegna.stato)}
                  </div>
                </div>

                {/* Scadenza evidenziata */}
                <div className={`rounded-lg p-3 mb-3 ${scaduto ? 'bg-red-50 border border-red-200' : 'bg-[#f8f9fa]'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${scaduto ? 'text-[#ff0000]' : 'text-[#666]'}`} />
                      <div>
                        <p className="text-xs text-[#afafaf]">Scadenza</p>
                        <p className={`text-sm ${scaduto ? 'text-[#ff0000]' : ''}`}>
                          {new Date(consegna.scadenza).toLocaleDateString('it-IT')} · {consegna.oraScadenza}
                        </p>
                      </div>
                    </div>
                    {consegna.dataConsegna && (
                      <div className="text-right">
                        <p className="text-xs text-[#afafaf]">Consegnato</p>
                        <p className="text-sm">{new Date(consegna.dataConsegna).toLocaleDateString('it-IT')}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer: Voto e Azioni */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {consegna.voto && (
                      <div className="flex items-center gap-1.5 bg-[#16a34a]/10 px-2.5 py-1.5 rounded-lg">
                        <Award className="w-4 h-4 text-[#16a34a]" />
                        <span className="text-lg">{consegna.voto}</span>
                        {consegna.pesoVoto && (
                          <span className="text-xs text-[#afafaf]">({consegna.pesoVoto}%)</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    {consegna.stato === 'non-consegnato' && (
                      <button
                        onClick={() => handleApriConsegna(consegna.id)}
                        className="px-4 py-2 bg-[#ff0000] text-white text-sm rounded-lg hover:bg-[#cc0000] transition-colors shadow-sm"
                      >
                        Consegna
                      </button>
                    )}
                    {consegna.stato === 'valutato' && (
                      <button
                        onClick={() => handleApriDettaglio(consegna.id)}
                        className="px-3 py-2 bg-[#16a34a] text-white text-sm rounded-lg hover:bg-[#15803d] transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-4 h-4" />
                        Dettagli
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

      {/* Modal Dettaglio */}
      <AnimatePresence>
        {dettaglioOpen && consegnaCorrente && (
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
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-xl z-50 p-6 max-h-[90vh] overflow-y-auto"
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

                {/* Tuo Commento */}
                {consegnaCorrente.testoConsegna && (
                  <div className="bg-[#f8f9fa] rounded-lg p-4">
                    <h4 className="text-sm mb-2">Il tuo commento</h4>
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
                        className="px-3 py-1.5 bg-[#ff0000] text-white text-xs rounded-lg hover:bg-[#cc0000] transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Scarica
                      </a>
                    </div>
                  </div>
                )}

                {/* Valutazione Docente */}
                {consegnaCorrente.stato === 'valutato' && (
                  <div className="bg-white border-l-4 border-[#16a34a] rounded-lg p-4">
                    <h4 className="text-sm mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#16a34a]" />
                      Valutazione
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
                        <h5 className="text-xs text-[#afafaf] mb-1">Feedback del docente</h5>
                        <p className="text-sm">{consegnaCorrente.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                {consegnaCorrente.stato === 'non-consegnato' && (
                  <>
                    <button
                      onClick={() => {
                        setDettaglioOpen(false);
                        setConsegnaSelezionata(null);
                      }}
                      className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                    >
                      Chiudi
                    </button>
                    <button
                      onClick={() => {
                        setDettaglioOpen(false);
                        handleApriConsegna(consegnaCorrente.id);
                      }}
                      className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors"
                    >
                      Consegna Ora
                    </button>
                  </>
                )}
                {consegnaCorrente.stato !== 'non-consegnato' && (
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

      {/* Modal Consegna */}
      <AnimatePresence>
        {consegnaOpen && consegnaCorrente && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConsegnaOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-xl z-50 p-6"
            >
              <h3 className="mb-4">Consegna Elaborato</h3>
              
              <div className="bg-[#f8f9fa] rounded-lg p-4 mb-4">
                <h4 className="text-sm mb-1">{consegnaCorrente.titolo}</h4>
                <p className="text-xs text-[#666]">{consegnaCorrente.corso}</p>
                <p className="text-xs text-[#afafaf] mt-2">
                  Scadenza: {new Date(consegnaCorrente.scadenza).toLocaleDateString('it-IT')} alle {consegnaCorrente.oraScadenza}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">
                    Carica File <span className="text-[#ff0000]">*</span>
                  </label>
                  <div className="border-2 border-dashed border-[#afafaf]/30 rounded-lg p-6 text-center hover:border-[#ff0000]/50 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-[#afafaf]" />
                      {file ? (
                        <p className="text-sm text-[#16a34a]">{file.name}</p>
                      ) : (
                        <>
                          <p className="text-sm text-[#666]">Clicca per caricare</p>
                          <p className="text-xs text-[#afafaf] mt-1">PDF, DOC, IMG (max 10MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="commento" className="block text-sm mb-2">
                    Commento (opzionale)
                  </label>
                  <textarea
                    id="commento"
                    value={commento}
                    onChange={(e) => setCommento(e.target.value)}
                    rows={4}
                    placeholder="Aggiungi un commento alla tua consegna..."
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setConsegnaOpen(false);
                      setFile(null);
                      setCommento('');
                      setConsegnaSelezionata(null);
                    }}
                    className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={handleInviaConsegna}
                    disabled={!file}
                    className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Consegna
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