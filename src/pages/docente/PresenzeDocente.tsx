import { useState } from 'react';
import { Filter, Users, TrendingUp, TrendingDown, Download, Eye, QrCode, MessageSquare, Bell, X } from 'lucide-react';
import { mockCorsi } from '../../utils/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { AppelloModal } from '../../components/AppelloModal';
import { toast } from 'sonner@2.0.3';

export function PresenzeDocente() {
  const { user } = useAuth();
  const [filtroCorso, setFiltroCorso] = useState<string>('tutti');
  const [dettagliCorsoOpen, setDettagliCorsoOpen] = useState(false);
  const [appelloOpen, setAppelloOpen] = useState(false);
  const [messaggioOpen, setMessaggioOpen] = useState(false);
  const [corsoSelezionato, setCorsoSelezionato] = useState<string | null>(null);
  const [studenteSelezionato, setStudenteSelezionato] = useState<{ id: string; nome: string; matricola: string } | null>(null);
  const [testoMessaggio, setTestoMessaggio] = useState('');

  // Filtra solo i corsi del docente
  const corsiDocente = mockCorsi.filter(c => c.docente.includes(user?.cognome || ''));

  // Mock dati studenti per corso
  const getStudentiCorso = (corsoNome: string) => {
    // Simula lista studenti
    return [
      { id: '1', nome: 'Marco Rossi', matricola: '2023001', percentuale: 100 },
      { id: '2', nome: 'Giulia Bianchi', matricola: '2023002', percentuale: 92 },
      { id: '3', nome: 'Luca Verdi', matricola: '2023003', percentuale: 88 },
      { id: '4', nome: 'Sofia Neri', matricola: '2023004', percentuale: 75 },
      { id: '5', nome: 'Andrea Russo', matricola: '2023005', percentuale: 67 },
      { id: '6', nome: 'Chiara Ferrari', matricola: '2023006', percentuale: 95 },
      { id: '7', nome: 'Matteo Ricci', matricola: '2023007', percentuale: 83 },
      { id: '8', nome: 'Francesca Marino', matricola: '2023008', percentuale: 100 },
      { id: '9', nome: 'Alessandro Costa', matricola: '2023009', percentuale: 58 },
      { id: '10', nome: 'Elena Romano', matricola: '2023010', percentuale: 71 },
    ];
  };

  const getStatisticheCorso = (corsoNome: string) => {
    const studenti = getStudentiCorso(corsoNome);
    const totaleStudenti = studenti.length;
    const mediaPresenze = Math.round(studenti.reduce((sum, s) => sum + s.percentuale, 0) / totaleStudenti);
    const aRischio = studenti.filter(s => s.percentuale < 80).length;
    
    return { totaleStudenti, mediaPresenze, aRischio };
  };

  const handleApriDettagli = (corsoId: string) => {
    setCorsoSelezionato(corsoId);
    setDettagliCorsoOpen(true);
  };

  const handleInviaMessaggio = () => {
    if (!testoMessaggio.trim()) {
      toast.error('Scrivi un messaggio');
      return;
    }
    toast.success(`Messaggio inviato a ${studenteSelezionato?.nome}`);
    setMessaggioOpen(false);
    setStudenteSelezionato(null);
    setTestoMessaggio('');
  };

  const handleInviaCampanellina = (studente: { id: string; nome: string; matricola: string }) => {
    toast.success(`Notifica inviata a ${studente.nome}`, {
      description: 'Lo studente riceverà un promemoria sulle presenze'
    });
  };

  const handleApriMessaggio = (studente: { id: string; nome: string; matricola: string }) => {
    setStudenteSelezionato(studente);
    setMessaggioOpen(true);
  };

  const corsoDettaglio = corsoSelezionato ? mockCorsi.find(c => c.id === corsoSelezionato) : null;

  return (
    <div className="pb-20 md:pb-6 pt-20 md:pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1>Presenze</h1>
        <p className="text-[#666] mt-1">Monitora le presenze degli studenti</p>
      </div>

      {/* Statistiche Generali */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-[#ff0000]" />
            <h3>Studenti Totali</h3>
          </div>
          <p className="text-3xl">
            {corsiDocente.reduce((sum, c) => sum + getStatisticheCorso(c.nome).totaleStudenti, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#16a34a]" />
            <h3>Media Presenze</h3>
          </div>
          <p className="text-3xl">
            {Math.round(
              corsiDocente.reduce((sum, c) => sum + getStatisticheCorso(c.nome).mediaPresenze, 0) /
              corsiDocente.length
            )}%
          </p>
        </div>
      </div>

      {/* Filtro */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" />
          <h3>Filtra per Corso</h3>
        </div>
        <select
          value={filtroCorso}
          onChange={(e) => setFiltroCorso(e.target.value)}
          className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
        >
          <option value="tutti">Tutti i corsi</option>
          {corsiDocente.map(corso => (
            <option key={corso.id} value={corso.nome}>{corso.nome}</option>
          ))}
        </select>
      </div>

      {/* Riepilogo per Corso */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <h3 className="mb-4">Riepilogo Corsi</h3>
        <div className="space-y-4">
          {corsiDocente
            .filter(corso => filtroCorso === 'tutti' || corso.nome === filtroCorso)
            .map(corso => {
              const stats = getStatisticheCorso(corso.nome);
              const critico = stats.aRischio > 0;
              
              return (
                <div key={corso.id} className="border border-[#afafaf]/20 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm mb-1">{corso.nome}</h4>
                      <p className="text-xs text-[#666]">
                        {stats.totaleStudenti} studenti • {corso.cfu} CFU
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setCorsoSelezionato(corso.id);
                          setAppelloOpen(true);
                        }}
                        className="px-3 py-1.5 bg-[#16a34a] text-white text-xs rounded-lg hover:bg-[#15803d] transition-colors flex items-center gap-1"
                      >
                        <QrCode className="w-3 h-3" />
                        Appello
                      </button>
                      <button
                        onClick={() => handleApriDettagli(corso.id)}
                        className="px-3 py-1.5 bg-[#ff0000] text-white text-xs rounded-lg hover:bg-[#cc0000] transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Dettagli
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="p-3 bg-[#f5f5f5] rounded-lg text-center">
                      <p className="text-xs text-[#afafaf]">Media Presenze</p>
                      <p className="text-lg flex items-center justify-center gap-1">
                        {stats.mediaPresenze}%
                        {stats.mediaPresenze >= 80 ? (
                          <TrendingUp className="w-4 h-4 text-[#16a34a]" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-[#ff0000]" />
                        )}
                      </p>
                    </div>
                    <div className="p-3 bg-[#f5f5f5] rounded-lg text-center">
                      <p className="text-xs text-[#afafaf]">Totale</p>
                      <p className="text-lg">{stats.totaleStudenti}</p>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${
                      critico ? 'bg-[#ff0000]/10' : 'bg-[#16a34a]/10'
                    }`}>
                      <p className="text-xs text-[#afafaf]">A Rischio</p>
                      <p className={`text-lg ${critico ? 'text-[#ff0000]' : 'text-[#16a34a]'}`}>
                        {stats.aRischio}
                      </p>
                    </div>
                  </div>

                  {critico && (
                    <div className="bg-[#ff0000]/10 border-l-4 border-[#ff0000] rounded p-2">
                      <p className="text-xs text-[#ff0000]">
                        Attenzione: {stats.aRischio} {stats.aRischio === 1 ? 'studente' : 'studenti'} sotto la soglia minima (80%)
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Modal Dettagli Corso */}
      <AnimatePresence>
        {dettagliCorsoOpen && corsoDettaglio && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDettagliCorsoOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white rounded-xl z-50 p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="mb-1">{corsoDettaglio.nome}</h2>
                  <p className="text-sm text-[#666]">Dettaglio presenze studenti</p>
                </div>
                <button
                  onClick={() => setDettagliCorsoOpen(false)}
                  className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Azioni */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Esporta Excel
                  </button>
                </div>

                {/* Lista Studenti */}
                <div className="border border-[#afafaf]/20 rounded-lg overflow-hidden">
                  <div className="bg-[#f5f5f5] px-4 py-3 grid grid-cols-12 gap-2 text-xs text-[#afafaf]">
                    <span className="col-span-5">Studente</span>
                    <span className="col-span-2 text-center">Presenze</span>
                    <span className="col-span-2 text-center">Stato</span>
                    <span className="col-span-3 text-center">Azioni</span>
                  </div>
                  <div className="divide-y divide-[#afafaf]/20">
                    {getStudentiCorso(corsoDettaglio.nome).map(studente => {
                      const aRischio = studente.percentuale < 80;
                      
                      return (
                        <div key={studente.id} className="px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-[#f8f9fa] transition-colors">
                          <div className="col-span-5">
                            <p className="text-sm">{studente.nome}</p>
                            <p className="text-xs text-[#afafaf]">{studente.matricola}</p>
                          </div>
                          <div className="col-span-2 text-center">
                            <p className="text-sm font-medium">{studente.percentuale}%</p>
                          </div>
                          <div className="col-span-2 text-center">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              aRischio
                                ? 'bg-[#ff0000]/10 text-[#ff0000]'
                                : 'bg-[#16a34a]/10 text-[#16a34a]'
                            }`}>
                              {aRischio ? 'Rischio' : 'OK'}
                            </span>
                          </div>
                          <div className="col-span-3 flex flex-col items-center justify-center gap-1">
                            {aRischio ? (
                              <>
                                <button
                                  onClick={() => handleApriMessaggio(studente)}
                                  className="p-1.5 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors"
                                  title="Invia messaggio"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleInviaCampanellina(studente)}
                                  className="p-1.5 bg-[#f59e0b] text-white rounded-lg hover:bg-[#d97706] transition-colors"
                                  title="Invia notifica"
                                >
                                  <Bell className="w-3.5 h-3.5" />
                                </button>
                              </>
                            ) : (
                              <span className="text-xs text-[#afafaf]">-</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Messaggio */}
      <AnimatePresence>
        {messaggioOpen && studenteSelezionato && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMessaggioOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-xl z-50 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3>Invia Messaggio</h3>
                <button
                  onClick={() => setMessaggioOpen(false)}
                  className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-[#f5f5f5] rounded-lg p-3">
                  <p className="text-sm"><strong>{studenteSelezionato.nome}</strong></p>
                  <p className="text-xs text-[#666]">Mat. {studenteSelezionato.matricola}</p>
                </div>

                <div>
                  <label htmlFor="messaggio" className="block text-sm mb-2">
                    Messaggio <span className="text-[#ff0000]">*</span>
                  </label>
                  <textarea
                    id="messaggio"
                    value={testoMessaggio}
                    onChange={(e) => setTestoMessaggio(e.target.value)}
                    rows={5}
                    placeholder="Scrivi qui il tuo messaggio allo studente..."
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setMessaggioOpen(false);
                      setStudenteSelezionato(null);
                      setTestoMessaggio('');
                    }}
                    className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={handleInviaMessaggio}
                    disabled={!testoMessaggio.trim()}
                    className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Invia
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Appello QR */}
      <AppelloModal
        isOpen={appelloOpen}
        onClose={() => {
          setAppelloOpen(false);
          setCorsoSelezionato(null);
        }}
        corso={corsoSelezionato ? mockCorsi.find(c => c.id === corsoSelezionato)?.nome || '' : ''}
      />
    </div>
  );
}