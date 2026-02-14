import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAppData } from '../../contexts/AppDataContext';
import { BookOpen, TrendingUp, TrendingDown, Calendar, Award, AlertCircle, MapPin, Link as LinkIcon, Clock, FileText, X } from 'lucide-react';
import { mockCorsi, getProssimaLezione, getPercentualePresenza, mockEsamiUfficiali, mockCarriera } from '../../utils/mockData';
import { getStatisticheDidatticaStudente, getConsegnePerStudente } from '../../utils/didatticaData';
import { Link } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

export function DashboardStudente() {
  const { user } = useAuth();
  const { elaborati, notifiche, leggiNotifica } = useAppData();
  const [notificheVisibili, setNotificheVisibili] = useState<string[]>([]);
  const prossimaLezione = getProssimaLezione();
  const percentualePresenza = getPercentualePresenza(user?.id || '');
  
  // Usa le statistiche dal nuovo sistema
  const studenteId = user?.id || 's1';
  const statistiche = getStatisticheDidatticaStudente(studenteId);
  const consegneStudente = getConsegnePerStudente(studenteId);
  
  // Consegne in scadenza (prossimi 7 giorni, non consegnate)
  const oggi = new Date();
  const traSetteGiorni = new Date(oggi);
  traSetteGiorni.setDate(oggi.getDate() + 7);
  
  const elaboratiDaConsegnare = consegneStudente.filter(c => {
    const scadenza = new Date(c.scadenza);
    return c.stato === 'non-consegnato' && scadenza >= oggi && scadenza <= traSetteGiorni;
  }).slice(0, 3);

  const handleRimuoviNotifica = (id: string) => {
    setNotificheVisibili([...notificheVisibili, id]);
    leggiNotifica(id);
    toast.success('Notifica archiviata');
  };
  
  // Filtra solo notifiche non archiviate, non lette e urgenti
  const notificheUrgenti = notifiche.filter(n => 
    n.userId === user?.id && !n.letta && n.tipo === 'urgente' && !notificheVisibili.includes(n.id)
  );
  
  const esamiRecenti = mockEsamiUfficiali.slice(0, 3);

  // Calcola andamento presenze per corso (solo primi 3)
  const presenzePerCorso = mockCorsi.map(corso => ({
    corso: corso.nome,
    percentuale: getPercentualePresenza(corso.nome, user?.id || '')
  })).slice(0, 3);

  return (
    <div className="pb-20 pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      {/* Benvenuto */}
      <div className="animate-fade-in">
        <h1 className="gradient-text">Ciao, {user?.nome}!</h1>
        <p className="text-[#666] mt-1">Ecco un riepilogo della tua giornata</p>
      </div>

      {/* Notifiche Urgenti */}
      {notificheUrgenti.length > 0 && (
        <div className="bg-[#ff0000]/5 border-l-4 border-[#ff0000] rounded-2xl p-5 space-y-3 shadow-sm animate-slide-in">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#ff0000]/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#ff0000]" />
            </div>
            <h3>Notifiche Urgenti</h3>
          </div>
          {notificheUrgenti.map(notifica => (
            <div key={notifica.id} className="modern-card p-4 relative">
              <h4 className="mb-1 pr-8">{notifica.titolo}</h4>
              <p className="text-sm text-[#666]">{notifica.messaggio}</p>
              <button
                className="absolute top-3 right-3 text-[#afafaf] hover:text-[#ff0000] transition-colors p-1 rounded-lg hover:bg-red-50"
                onClick={() => handleRimuoviNotifica(notifica.id)}
                title="Rimuovi notifica"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Prossima Lezione */}
      {prossimaLezione && (
        <div className="modern-card p-6 overflow-hidden relative">
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0000] to-[#cc0000]" />
          
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-[#ff0000]/10 rounded-xl">
              <Clock className="w-5 h-5 text-[#ff0000]" />
            </div>
            <h3>Prossima Lezione</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="mb-1">{prossimaLezione.corso}</h4>
              <p className="text-sm text-[#666]">{prossimaLezione.docente}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#f8f9fa] rounded-lg">
                <Calendar className="w-4 h-4 text-[#afafaf]" />
                <span>{new Date(prossimaLezione.giorno).toLocaleDateString('it-IT')}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#f8f9fa] rounded-lg">
                <Clock className="w-4 h-4 text-[#afafaf]" />
                <span>{prossimaLezione.oraInizio} - {prossimaLezione.oraFine}</span>
              </div>
            </div>
            {prossimaLezione.tipo === 'presenza' && prossimaLezione.aula && (
              <div className="flex items-center gap-2 text-sm px-3 py-2 bg-[#f8f9fa] rounded-lg w-fit">
                <MapPin className="w-4 h-4 text-[#afafaf]" />
                <span>{prossimaLezione.aula}</span>
              </div>
            )}
            {prossimaLezione.tipo === 'online' && prossimaLezione.linkOnline && (
              <a
                href={prossimaLezione.linkOnline}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white bg-[#ff0000] hover:bg-[#cc0000] px-4 py-2.5 rounded-xl transition-all duration-200 w-fit shadow-md hover:shadow-lg active:scale-95"
              >
                <LinkIcon className="w-4 h-4" />
                <span>Accedi alla lezione online</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Consegne in Scadenza */}
      {elaboratiDaConsegnare.length > 0 && (
        <div className="bg-gradient-to-br from-[#f59e0b]/10 to-[#f59e0b]/5 border-l-4 border-[#f59e0b] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-[#f59e0b]/10 rounded-lg">
              <FileText className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <h3>Consegne in Scadenza</h3>
          </div>
          <div className="space-y-3">
            {elaboratiDaConsegnare.map(elaborato => (
              <div key={elaborato.id} className="modern-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="mb-0.5">{elaborato.titolo}</h4>
                    <p className="text-xs text-[#666]">{elaborato.corso}</p>
                    <p className="text-xs text-[#f59e0b] mt-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Scadenza: {new Date(elaborato.scadenza).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                  <Link
                    to="/didattica"
                    className="px-4 py-2 bg-[#f59e0b] text-white text-xs rounded-xl hover:bg-[#d97706] transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg active:scale-95"
                  >
                    Consegna
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/didattica"
            className="block text-sm text-[#f59e0b] hover:text-[#d97706] mt-4 text-center transition-colors"
          >
            Vedi tutte le consegne →
          </Link>
        </div>
      )}

      {/* Andamento Presenze */}
      <div className="modern-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3>Andamento Presenze</h3>
          <Link to="/presenze" className="text-sm text-[#ff0000] hover:text-[#cc0000] transition-colors">
            Vedi tutto →
          </Link>
        </div>
        <div className="space-y-4">
          {presenzePerCorso.map((item, index) => {
            const aRischio = item.percentuale < 80;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className={aRischio ? 'text-[#ff0000]' : ''}>{item.corso}</span>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${aRischio ? 'text-[#ff0000] bg-red-50' : 'text-[#16a34a] bg-green-50'}`}>
                    {aRischio ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                    {item.percentuale}%
                  </span>
                </div>
                <div className="w-full bg-[#f8f9fa] rounded-full h-2.5 overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      aRischio ? 'bg-gradient-to-r from-[#ff0000] to-[#cc0000]' : 'bg-gradient-to-r from-[#16a34a] to-[#15803d]'
                    }`}
                    style={{ width: `${item.percentuale}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Esami Ufficiali */}
      <div className="modern-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3>Ultimi Esami</h3>
          <Link to="/profilo" className="text-sm text-[#ff0000] hover:text-[#cc0000] transition-colors">
            Carriera completa →
          </Link>
        </div>
        <div className="space-y-3">
          {esamiRecenti.map(esame => (
            <div key={esame.id} className="flex items-center justify-between p-4 bg-gradient-to-br from-[#f8f9fa] to-white rounded-xl border border-[#afafaf]/10 hover:shadow-md transition-all duration-200">
              <div>
                <h4>{esame.corso}</h4>
                <p className="text-xs text-[#afafaf] mt-0.5">
                  {new Date(esame.data).toLocaleDateString('it-IT')} • {esame.cfu} CFU
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#000000] to-[#333333] text-white shadow-lg">
                  <span className="text-lg">{esame.voto}</span>
                </div>
                {esame.lode && (
                  <div className="p-2 bg-[#ff0000]/10 rounded-xl">
                    <Award className="w-5 h-5 text-[#ff0000]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carriera */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#ff0000] to-[#cc0000] text-white p-6 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="p-2.5 bg-white/20 rounded-xl w-fit mb-3">
            <BookOpen className="w-7 h-7" />
          </div>
          <p className="text-sm opacity-90 mb-1">Media Ponderata</p>
          <p className="text-4xl">{mockCarriera.mediaPonderata}</p>
        </div>
        <div className="bg-gradient-to-br from-[#000000] to-[#333333] text-white p-6 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="p-2.5 bg-white/20 rounded-xl w-fit mb-3">
            <Award className="w-7 h-7" />
          </div>
          <p className="text-sm opacity-90 mb-1">CFU Conseguiti</p>
          <p className="text-4xl">{mockCarriera.cfuConseguiti}<span className="text-xl opacity-70">/{mockCarriera.cfuTotali}</span></p>
        </div>
      </div>
    </div>
  );
}