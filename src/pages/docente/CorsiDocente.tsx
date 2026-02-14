import { BookOpen, Users, Clock, Award, Calendar, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockCorsi } from '../../utils/mockData';
import { getStatisticheDidatticaDocente, getConsegnePerCorso } from '../../utils/didatticaData';
import { Link } from 'react-router-dom';

export function CorsiDocente() {
  const { user } = useAuth();
  const corsiDocente = mockCorsi.filter(c => c.docente.includes(user?.cognome || ''));
  const nomiCorsiDocente = corsiDocente.map(c => c.nome);
  const statistiche = getStatisticheDidatticaDocente(nomiCorsiDocente);

  return (
    <div className="pb-20 md:pb-6 pt-20 md:pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1>I Miei Corsi</h1>
        <p className="text-[#666] mt-1">Gestisci i tuoi corsi e monitora l'andamento</p>
      </div>

      {/* Statistiche Generali */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-[#ff0000]" />
            <h3 className="text-sm">Corsi Attivi</h3>
          </div>
          <p className="text-3xl">{corsiDocente.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-[#f59e0b]" />
            <h3 className="text-sm">Da Valutare</h3>
          </div>
          <p className="text-3xl">{statistiche.daValutare}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-[#16a34a]" />
            <h3 className="text-sm">Valutati</h3>
          </div>
          <p className="text-3xl">{statistiche.valutati}</p>
        </div>
      </div>

      {/* Lista Corsi */}
      <div className="space-y-4">
        {corsiDocente.map(corso => {
          const consegneCorso = getConsegnePerCorso(corso.nome);
          const daValutare = consegneCorso.filter(c => c.stato === 'consegnato').length;
          const valutati = consegneCorso.filter(c => c.stato === 'valutato').length;
          const totaleStudenti = new Set(consegneCorso.map(c => c.studenteId)).size || 25;

          return (
            <div key={corso.id} className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-6 hover:shadow-md transition-shadow">
              {/* Header Corso */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg">{corso.nome}</h3>
                    <span className="px-2 py-1 bg-[#f5f5f5] text-xs rounded-lg">
                      {corso.codice}
                    </span>
                  </div>
                  <p className="text-sm text-[#666]">{corso.descrizione}</p>
                </div>
              </div>

              {/* Info Corso */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-[#afafaf]" />
                  <span>Anno {corso.anno}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-[#afafaf]" />
                  <span>{corso.cfu} CFU</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-[#afafaf]" />
                  <span>{corso.ore} ore</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-[#afafaf]" />
                  <span>{totaleStudenti} studenti</span>
                </div>
              </div>

              {/* Statistiche Elaborati */}
              {consegneCorso.length > 0 && (
                <div className="bg-[#f8f9fa] rounded-lg p-4 mb-4">
                  <h4 className="text-sm mb-3">Elaborati del corso</h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-2xl text-[#f59e0b]">{daValutare}</p>
                      <p className="text-xs text-[#666] mt-1">Da valutare</p>
                    </div>
                    <div>
                      <p className="text-2xl text-[#16a34a]">{valutati}</p>
                      <p className="text-xs text-[#666] mt-1">Valutati</p>
                    </div>
                    <div>
                      <p className="text-2xl">{consegneCorso.length}</p>
                      <p className="text-xs text-[#666] mt-1">Totale consegne</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Programma */}
              {corso.programma && (
                <div className="mb-4">
                  <h4 className="text-sm mb-2">Programma</h4>
                  <p className="text-sm text-[#666]">{corso.programma}</p>
                </div>
              )}

              {/* Modalità Accertamento */}
              {corso.modalitaAccertamento && (
                <div className="mb-4">
                  <h4 className="text-sm mb-2">Modalità di accertamento</h4>
                  <p className="text-sm text-[#666]">{corso.modalitaAccertamento}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  to="/presenze"
                  className="flex-1 py-2 px-4 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors text-center text-sm"
                >
                  Presenze
                </Link>
                <Link
                  to="/didattica"
                  className="flex-1 py-2 px-4 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors text-center text-sm"
                >
                  Elaborati
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {corsiDocente.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-8 text-center">
          <BookOpen className="w-12 h-12 text-[#afafaf] mx-auto mb-3" />
          <p className="text-[#666]">Nessun corso assegnato</p>
        </div>
      )}
    </div>
  );
}
