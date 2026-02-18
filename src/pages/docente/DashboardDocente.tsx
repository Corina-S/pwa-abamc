import { useState, useMemo } from 'react';
import { Users, AlertTriangle, Clock, Calendar, Send, MapPin, Link as LinkIcon, MessageSquare, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockCorsi, getProssimaLezione, getNotificheUrgenti } from '../../utils/mockData';
import { getStatisticheDidatticaDocente } from '../../utils/didatticaData';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

export function DashboardDocente() {
  const { user } = useAuth();
  const [comunicazioneOpen, setComunicazioneOpen] = useState(false);
  const [corsoSelezionato, setCorsoSelezionato] = useState<string[]>([]);
  const [messaggio, setMessaggio] = useState('');
  const [notificheVisibili, setNotificheVisibili] = useState<string[]>([]);
  
  const prossimaLezione = getProssimaLezione();
  const allNotifiche = getNotificheUrgenti(user?.id || '');
  const notificheUrgenti = allNotifiche.filter(n => !notificheVisibili.includes(n.id));
  
  const corsiDocente = mockCorsi.filter(c => c.docente.includes(user?.cognome || ''));
  const nomiCorsiDocente = corsiDocente.map(c => c.nome);
  
  // Usa le statistiche dal nuovo sistema
  const statistiche = getStatisticheDidatticaDocente(nomiCorsiDocente);
  const elaboratiDaValutare = statistiche.daValutare;

  // Dati di presenza mock (valori fissi per demo)
  const presenzeCorsi = useMemo(() => {
    const mockPresenze = [22, 24]; // Valori fissi per i primi 2 corsi
    return corsiDocente.slice(0, 2).map((corso, index) => {
      const totaleStudenti = 25;
      const studentiPresenti = mockPresenze[index] || 23;
      const percentuale = Math.round((studentiPresenti / totaleStudenti) * 100);
      return { corso, totaleStudenti, studentiPresenti, percentuale };
    });
  }, [corsiDocente]);

  const handleRimuoviNotifica = (id: string) => {
    setNotificheVisibili([...notificheVisibili, id]);
    toast.success('Comunicazione archiviata');
  };

  const handleInviaComunicazione = () => {
    // Simula invio comunicazione
    toast.success(`Comunicazione inviata con successo a ${corsoSelezionato.length} corso/i`, {
      description: `${corsoSelezionato.length} studente/i riceveranno la notifica`
    });
    setComunicazioneOpen(false);
    setCorsoSelezionato([]);
    setMessaggio('');
  };

  return (
    <div className="pb-20 pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      {/* Benvenuto */}
      <div>
        <h1>Benvenuto/a, Prof. {user?.cognome}!</h1>
        <p className="text-[#666] mt-1">Panoramica delle tue attività didattiche</p>
      </div>

      {/* Notifiche Urgenti */}
      {notificheUrgenti.length > 0 && (
        <div className="bg-[#ff0000]/10 border-l-4 border-[#ff0000] rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#ff0000]" />
            <h3 className="text-sm">Comunicazioni dall&apos;Accademia</h3>
          </div>
          {notificheUrgenti.map(notifica => (
            <div key={notifica.id} className="bg-white rounded-lg p-3 relative">
              <button
                onClick={() => handleRimuoviNotifica(notifica.id)}
                className="absolute top-2 right-2 p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                title="Archivia comunicazione"
              >
                <X className="w-4 h-4 text-[#afafaf] hover:text-[#ff0000]" />
              </button>
              <h4 className="text-sm mb-1 pr-8">{notifica.titolo}</h4>
              <p className="text-sm text-[#666]">{notifica.messaggio}</p>
            </div>
          ))}
        </div>
      )}

      {/* Prossima Lezione */}
      {prossimaLezione && (
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#ff0000]" />
            <h3>Prossima Lezione</h3>
          </div>
          <div className="space-y-3">
            <div>
              <h4>{prossimaLezione.corso}</h4>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#afafaf]" />
                <span>{new Date(prossimaLezione.giorno).toLocaleDateString('it-IT')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#afafaf]" />
                <span>{prossimaLezione.oraInizio} - {prossimaLezione.oraFine}</span>
              </div>
            </div>
            {prossimaLezione.tipo === 'presenza' && prossimaLezione.aula && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#afafaf]" />
                <span>{prossimaLezione.aula}</span>
              </div>
            )}
            {prossimaLezione.linkOnline ? (
              <div className="flex items-center gap-2 text-sm text-[#ff0000]">
                <LinkIcon className="w-4 h-4" />
                <span>{prossimaLezione.linkOnline}</span>
              </div>
            ) : (
              <button className="text-sm text-[#ff0000] hover:underline">
                + Aggiungi link lezione online
              </button>
            )}
          </div>
        </div>
      )}

      {/* Comunicazioni Urgenti */}
      <button
        onClick={() => setComunicazioneOpen(true)}
        className="w-full bg-[#ff0000] text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-lg transition-shadow"
      >
        <Send className="w-6 h-6" />
        <span>Invia Comunicazione Urgente</span>
      </button>

      {/* Andamento Presenze */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#ff0000]" />
            <h3>Presenze Studenti</h3>
          </div>
          <Link to="/presenze" className="text-sm text-[#ff0000] hover:underline">
            Vedi dettagli
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {presenzeCorsi.map(({ corso, totaleStudenti, studentiPresenti, percentuale }) => (
            <div key={corso.id} className="p-4 bg-[#f5f5f5] rounded-lg">
              <h4 className="text-sm mb-2">{corso.nome}</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl">{studentiPresenti}</span>
                <span className="text-sm text-[#afafaf]">/{totaleStudenti}</span>
              </div>
              <p className="text-xs text-[#afafaf] mt-1">{percentuale}% presenza media</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback da dare */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#ff0000]" />
            <h3>Elaborati da Valutare</h3>
          </div>
          <Link to="/didattica" className="text-sm text-[#ff0000] hover:underline">
            Vai alla didattica
          </Link>
        </div>
        {elaboratiDaValutare > 0 ? (
          <div className="p-4 bg-[#ff0000]/10 border border-[#ff0000]/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#ff0000] text-white rounded-full flex items-center justify-center">
                <span className="text-xl">{elaboratiDaValutare}</span>
              </div>
              <div>
                <h4 className="text-sm">Elaborati in attesa di feedback</h4>
                <p className="text-xs text-[#666]">Ricordati di fornire valutazioni agli studenti</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#afafaf] text-center py-4">
            Tutti gli elaborati sono stati valutati
          </p>
        )}
      </div>

      {/* I Miei Corsi */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <h3 className="mb-4">I Miei Corsi</h3>
        <div className="space-y-3">
          {corsiDocente.map(corso => (
            <Link
              key={corso.id}
              to={`/corsi-docente/${corso.id}`}
              className="block p-4 bg-[#f5f5f5] rounded-lg hover:bg-[#efefef] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm mb-1">{corso.nome}</h4>
                  <p className="text-xs text-[#afafaf]">
                    Anno {corso.anno} • {corso.cfu} CFU • {corso.ore} ore
                  </p>
                </div>
                <div className="text-xs bg-white px-2 py-1 rounded">
                  {corso.codice}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modal Comunicazione */}
      <AnimatePresence>
        {comunicazioneOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setComunicazioneOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-xl z-50 p-6 overflow-y-auto"
            >
              <h3 className="mb-4">Invia Comunicazione Urgente</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Seleziona corsi destinatari</label>
                  <div className="space-y-2">
                    {corsiDocente.map(corso => (
                      <label key={corso.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={corsoSelezionato.includes(corso.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCorsoSelezionato([...corsoSelezionato, corso.id]);
                            } else {
                              setCorsoSelezionato(corsoSelezionato.filter(id => id !== corso.id));
                            }
                          }}
                          className="w-4 h-4 accent-[#ff0000]"
                        />
                        <span className="text-sm">{corso.nome}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="messaggio" className="block text-sm mb-2">Messaggio</label>
                  <textarea
                    id="messaggio"
                    value={messaggio}
                    onChange={(e) => setMessaggio(e.target.value)}
                    rows={4}
                    placeholder="Scrivi qui la comunicazione urgente..."
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setComunicazioneOpen(false)}
                    className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={handleInviaComunicazione}
                    disabled={corsoSelezionato.length === 0 || !messaggio.trim()}
                    className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Invia
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