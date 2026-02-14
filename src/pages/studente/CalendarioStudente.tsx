import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockEventiCalendario, mockPeriodiCalendario } from '../../utils/mockData';
import type { EventoCalendario, PeriodoCalendario } from '../../types';
import { DettaglioGiornoModal } from '../../components/DettaglioGiornoModal';

type VistaCalendario = 'settimana' | 'mese' | 'anno';

export function CalendarioStudente() {
  const [vista, setVista] = useState<VistaCalendario>('settimana');
  const [dataCorrente, setDataCorrente] = useState(new Date());
  const [giornoSelezionato, setGiornoSelezionato] = useState<Date | null>(null);

  const eventi = mockEventiCalendario;
  const periodi = mockPeriodiCalendario;

  const getSettimanaCorrente = () => {
    const giorni = [];
    const oggi = new Date(dataCorrente);
    const giornoSettimana = oggi.getDay();
    const lunedi = new Date(oggi);
    lunedi.setDate(oggi.getDate() - (giornoSettimana === 0 ? 6 : giornoSettimana - 1));

    for (let i = 0; i < 7; i++) {
      const giorno = new Date(lunedi);
      giorno.setDate(lunedi.getDate() + i);
      giorni.push(giorno);
    }
    return giorni;
  };

  const getMeseCorrente = () => {
    const anno = dataCorrente.getFullYear();
    const mese = dataCorrente.getMonth();
    const primoGiorno = new Date(anno, mese, 1);
    const ultimoGiorno = new Date(anno, mese + 1, 0);
    const giorni = [];

    // Giorni del mese precedente per riempire
    const giornoInizioSettimana = primoGiorno.getDay();
    const giorniPrecedenti = giornoInizioSettimana === 0 ? 6 : giornoInizioSettimana - 1;
    
    for (let i = giorniPrecedenti; i > 0; i--) {
      const giorno = new Date(anno, mese, -i + 1);
      giorni.push({ data: giorno, altroPeriodo: true });
    }

    // Giorni del mese corrente
    for (let i = 1; i <= ultimoGiorno.getDate(); i++) {
      giorni.push({ data: new Date(anno, mese, i), altroPeriodo: false });
    }

    return giorni;
  };

  const getEventiGiorno = (data: Date) => {
    const dataStr = data.toISOString().split('T')[0];
    return eventi.filter(e => e.data === dataStr);
  };

  const navigaPrecedente = () => {
    const nuovaData = new Date(dataCorrente);
    if (vista === 'settimana') {
      nuovaData.setDate(nuovaData.getDate() - 7);
    } else if (vista === 'mese') {
      nuovaData.setMonth(nuovaData.getMonth() - 1);
    } else {
      nuovaData.setFullYear(nuovaData.getFullYear() - 1);
    }
    setDataCorrente(nuovaData);
  };

  const navigaSuccessivo = () => {
    const nuovaData = new Date(dataCorrente);
    if (vista === 'settimana') {
      nuovaData.setDate(nuovaData.getDate() + 7);
    } else if (vista === 'mese') {
      nuovaData.setMonth(nuovaData.getMonth() + 1);
    } else {
      nuovaData.setFullYear(nuovaData.getFullYear() + 1);
    }
    setDataCorrente(nuovaData);
  };

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

  const getPeriodoPerGiorno = (data: Date): PeriodoCalendario | null => {
    const dataStr = data.toISOString().split('T')[0];
    
    // Trova tutti i periodi che includono questo giorno
    const periodiAttivi = periodi.filter(p => {
      return dataStr >= p.dataInizio && dataStr <= p.dataFine;
    });
    
    // Priorità: vacanze > tesi > esami > workshop > pausa-didattica > lezioni > iscrizioni > altro
    const priorita: PeriodoCalendario['tipo'][] = [
      'vacanze', 
      'tesi', 
      'esami', 
      'workshop', 
      'pausa-didattica', 
      'lezioni', 
      'iscrizioni', 
      'altro'
    ];
    
    for (const tipo of priorita) {
      const periodo = periodiAttivi.find(p => p.tipo === tipo);
      if (periodo) return periodo;
    }
    
    return null;
  };

  const getColorePeriodo = (tipo: PeriodoCalendario['tipo']) => {
    switch (tipo) {
      case 'vacanze':
        return 'bg-[#16a34a] text-white border-[#16a34a]';
      case 'esami':
        return 'bg-[#000000] text-white border-[#000000]';
      case 'lezioni':
        return 'bg-[#dc6b5c] text-white border-[#dc6b5c]';
      case 'tesi':
        return 'bg-[#7c3aed] text-white border-[#7c3aed]';
      case 'pausa-didattica':
        return 'bg-[#f59e0b] text-white border-[#f59e0b]';
      case 'workshop':
        return 'bg-[#0891b2] text-white border-[#0891b2]';
      case 'iscrizioni':
        return 'bg-[#afafaf] text-white border-[#afafaf]';
      default:
        return 'bg-[#666666] text-white border-[#666666]';
    }
  };

  return (
    <div className="pb-20 pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1>Calendario</h1>
        <p className="text-[#666] mt-1">Pianifica le tue attività accademiche</p>
      </div>

      {/* Controlli */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={navigaPrecedente}
            className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h3>
              {vista === 'settimana' && `Settimana del ${getSettimanaCorrente()[0].toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}`}
              {vista === 'mese' && dataCorrente.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
              {vista === 'anno' && dataCorrente.getFullYear()}
            </h3>
          </div>
          
          <button
            onClick={navigaSuccessivo}
            className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle Vista */}
        <div className="flex gap-2">
          {(['settimana', 'mese', 'anno'] as VistaCalendario[]).map(v => (
            <button
              key={v}
              onClick={() => setVista(v)}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                vista === v
                  ? 'bg-[#ff0000] text-white'
                  : 'bg-[#f5f5f5] text-[#666] hover:bg-[#efefef]'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Vista Settimana */}
      {vista === 'settimana' && (
        <div className="space-y-4">
          {getSettimanaCorrente().map((giorno, index) => {
            const eventiGiorno = getEventiGiorno(giorno);
            const oggi = new Date().toDateString() === giorno.toDateString();
            
            return (
              <button
                key={index}
                onClick={() => setGiornoSelezionato(giorno)}
                className={`w-full bg-white rounded-xl shadow-sm border ${
                  oggi ? 'border-[#ff0000]' : 'border-[#afafaf]/20'
                } p-4 text-left hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className={oggi ? 'text-[#ff0000]' : ''}>
                      {giorno.toLocaleDateString('it-IT', { weekday: 'long' })}
                    </h4>
                    <p className="text-sm text-[#666]">
                      {giorno.toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                  {oggi && (
                    <span className="px-3 py-1 bg-[#ff0000] text-white text-xs rounded-full">
                      Oggi
                    </span>
                  )}
                </div>
                
                {eventiGiorno.length > 0 ? (
                  <div className="space-y-2">
                    {eventiGiorno.slice(0, 3).map(evento => (
                      <div
                        key={evento.id}
                        className={`p-3 rounded-lg ${getTipoEventoColor(evento.tipo)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="text-sm">{evento.titolo}</h5>
                            {evento.descrizione && (
                              <p className="text-xs opacity-90 mt-1 line-clamp-1">{evento.descrizione}</p>
                            )}
                          </div>
                          {evento.oraInizio && (
                            <span className="text-xs opacity-90">
                              {evento.oraInizio} - {evento.oraFine}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {eventiGiorno.length > 3 && (
                      <p className="text-xs text-[#666] text-center pt-1">
                        +{eventiGiorno.length - 3} altri eventi
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[#afafaf] text-center py-2">
                    Nessun evento programmato
                  </p>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Vista Mese */}
      {vista === 'mese' && (
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(giorno => (
              <div key={giorno} className="text-center text-xs text-[#afafaf] py-2">
                {giorno}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {getMeseCorrente().map((item, index) => {
              const eventiGiorno = getEventiGiorno(item.data);
              const eventiScadenze = eventiGiorno.filter(e => e.tipo === 'scadenza');
              const oggi = new Date().toDateString() === item.data.toDateString();
              
              return (
                <button
                  key={index}
                  onClick={() => !item.altroPeriodo && setGiornoSelezionato(item.data)}
                  disabled={item.altroPeriodo}
                  className={`aspect-square p-2 rounded-lg border ${
                    oggi
                      ? 'border-[#ff0000] bg-[#ff0000]/10'
                      : item.altroPeriodo
                      ? 'border-transparent bg-transparent cursor-default'
                      : 'border-[#afafaf]/20 bg-white hover:bg-[#f5f5f5] cursor-pointer'
                  } transition-colors`}
                >
                  <div
                    className={`text-sm ${
                      item.altroPeriodo ? 'text-[#afafaf]' : oggi ? 'text-[#ff0000]' : ''
                    }`}
                  >
                    {item.data.getDate()}
                  </div>
                  {eventiScadenze.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {eventiScadenze.slice(0, 2).map(evento => (
                        <div
                          key={evento.id}
                          className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"
                          title={evento.titolo}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Legenda */}
          <div className="mt-4 pt-4 border-t border-[#afafaf]/20">
            <p className="text-xs text-[#afafaf] mb-2">In questo mese:</p>
            <div className="space-y-1">
              {eventi
                .filter(e => {
                  const eventoData = new Date(e.data);
                  return eventoData.getMonth() === dataCorrente.getMonth() && 
                         eventoData.getFullYear() === dataCorrente.getFullYear() &&
                         e.tipo === 'scadenza';
                })
                .map(evento => (
                  <div key={evento.id} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                    <span>{new Date(evento.data).getDate()} - {evento.titolo}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Vista Anno */}
      {vista === 'anno' && (
        <div className="space-y-6">
          {/* Griglia 12 mesi */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => {
              const meseData = new Date(dataCorrente.getFullYear(), i, 1);
              const ultimoGiorno = new Date(dataCorrente.getFullYear(), i + 1, 0);
              const primoGiornoSettimana = meseData.getDay();
              const giorniPrecedenti = primoGiornoSettimana === 0 ? 6 : primoGiornoSettimana - 1;
              
              const giorni = [];
              
              // Giorni del mese precedente (vuoti)
              for (let j = giorniPrecedenti; j > 0; j--) {
                giorni.push({ giorno: 0, altroPeriodo: true });
              }
              
              // Giorni del mese corrente
              for (let j = 1; j <= ultimoGiorno.getDate(); j++) {
                giorni.push({ giorno: j, altroPeriodo: false });
              }
              
              return (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4">
                  <h4 className="mb-3 text-center">
                    {meseData.toLocaleDateString('it-IT', { month: 'long' })}
                  </h4>
                  
                  {/* Giorni della settimana */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((g, idx) => (
                      <div key={idx} className="text-center text-xs text-[#afafaf] py-1">
                        {g}
                      </div>
                    ))}
                  </div>
                  
                  {/* Griglia giorni */}
                  <div className="grid grid-cols-7 gap-1">
                    {giorni.map((item, idx) => {
                      if (item.altroPeriodo) {
                        return <div key={idx} className="aspect-square" />;
                      }
                      
                      const dataGiorno = new Date(dataCorrente.getFullYear(), i, item.giorno);
                      const eventiGiorno = getEventiGiorno(dataGiorno);
                      const periodo = getPeriodoPerGiorno(dataGiorno);
                      const oggi = new Date().toDateString() === dataGiorno.toDateString();
                      
                      // Verifica se è domenica (0 = domenica)
                      const isDomenica = dataGiorno.getDay() === 0;
                      
                      const hasScadenza = eventiGiorno.some(e => e.tipo === 'scadenza');
                      const hasEsame = eventiGiorno.some(e => e.tipo === 'esame');
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => setGiornoSelezionato(dataGiorno)}
                          title={isDomenica ? 'Domenica - Accademia chiusa' : periodo?.titolo}
                          className={`aspect-square rounded text-xs flex flex-col items-center justify-center transition-all border ${
                            oggi
                              ? 'border-[#ff0000] ring-2 ring-[#ff0000] font-bold shadow-lg bg-white'
                              : isDomenica
                              ? 'bg-[#f5f5f5] border-[#afafaf]/30 text-[#afafaf] cursor-pointer hover:bg-[#efefef]'
                              : periodo && periodo.tipo !== 'lezioni'
                              ? `${getColorePeriodo(periodo.tipo)} border cursor-pointer hover:opacity-80`
                              : periodo && periodo.tipo === 'lezioni'
                              ? 'bg-[#dc6b5c]/20 text-[#000] border-[#dc6b5c]/40 cursor-pointer hover:bg-[#dc6b5c]/30'
                              : 'bg-white border-[#afafaf]/20 text-[#000] hover:bg-[#f5f5f5] cursor-pointer'
                          }`}
                        >
                          <span>{item.giorno}</span>
                          {(hasScadenza || hasEsame) && !oggi && (
                            <div className="flex gap-0.5 mt-0.5">
                              {hasScadenza && <div className="w-1 h-1 rounded-full bg-[#f59e0b] opacity-90" />}
                              {hasEsame && <div className="w-1 h-1 rounded-full bg-[#000] opacity-90" />}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Legenda */}
          <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4">
            <h4 className="mb-3">Legenda Periodi</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#16a34a]" />
                <span className="text-sm text-[#666]">Vacanze</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#000000]" />
                <span className="text-sm text-[#666]">Esami</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#7c3aed]" />
                <span className="text-sm text-[#666]">Tesi/Lauree</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#0891b2]" />
                <span className="text-sm text-[#666]">Workshop</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#f59e0b]" />
                <span className="text-sm text-[#666]">Pausa Didattica</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#dc6b5c]" />
                <span className="text-sm text-[#666]">Lezioni</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#afafaf]" />
                <span className="text-sm text-[#666]">Iscrizioni</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#000]" />
                <span className="text-sm text-[#666]">Eventi specifici</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale Dettaglio Giorno */}
      {giornoSelezionato && (
        <DettaglioGiornoModal
          isOpen={true}
          onClose={() => setGiornoSelezionato(null)}
          data={giornoSelezionato}
          eventi={getEventiGiorno(giornoSelezionato)}
        />
      )}
    </div>
  );
}