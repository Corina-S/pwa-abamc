import { Download, FileText, Clock, Award, GraduationCap } from 'lucide-react';
import { mockCorsi, mockCarriera, mockEsamiUfficiali } from '../../utils/mockData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CorsiStudente() {
  const [corsoSelezionato, setCorsoSelezionato] = useState<string | null>(null);
  const [annoSelezionato, setAnnoSelezionato] = useState<number>(1);

  const corso = corsoSelezionato ? mockCorsi.find(c => c.id === corsoSelezionato) : null;

  // Dividi i corsi per anno
  const corsiPerAnno = {
    1: mockCorsi.filter(c => c.anno === 1),
    2: mockCorsi.filter(c => c.anno === 2),
    3: mockCorsi.filter(c => c.anno === 3)
  };

  // Calcola CFU per anno
  const cfuPerAnno = (anno: number) => {
    return corsiPerAnno[anno as keyof typeof corsiPerAnno].reduce((sum, c) => sum + c.cfu, 0);
  };

  const orePerAnno = (anno: number) => {
    return corsiPerAnno[anno as keyof typeof corsiPerAnno].reduce((sum, c) => sum + c.ore, 0);
  };

  return (
    <div className="pb-20 pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1>Piano di Studi & Corsi</h1>
        <p className="text-[#666] mt-1">Consulta il tuo piano di studi e le informazioni sui corsi</p>
      </div>

      {/* Riepilogo Carriera */}
      <div className="bg-[#ff0000] text-white rounded-xl shadow-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-6 h-6" />
          <h3 className="text-white">Riepilogo Carriera</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm opacity-90">Media Ponderata</p>
            <p className="text-2xl">{mockCarriera.mediaPonderata}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">CFU Conseguiti</p>
            <p className="text-2xl">{mockCarriera.cfuConseguiti}/{mockCarriera.cfuTotali}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Esami Sostenuti</p>
            <p className="text-2xl">{mockCarriera.esamiSostenuti}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Anno Corrente</p>
            <p className="text-2xl">1°</p>
          </div>
        </div>
      </div>

      {/* Documento Piano di Studi */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#ff0000]" />
          <h3>Documento Ufficiale</h3>
        </div>
        <p className="text-sm text-[#666] mb-4">
          Scarica il piano di studi completo del corso di Pittura - Anno Accademico 2024/2025
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#ff0000]" />
              <div>
                <p className="text-sm">Piano di Studi Completo</p>
                <p className="text-xs text-[#afafaf]">PDF - 2.3 MB</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-[#ff0000] text-white text-xs rounded-lg hover:bg-[#cc0000] transition-colors flex items-center gap-1">
              <Download className="w-3 h-3" />
              Scarica
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#ff0000]" />
              <div>
                <p className="text-sm">Regolamento Didattico</p>
                <p className="text-xs text-[#afafaf]">PDF - 1.8 MB</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-[#ff0000] text-white text-xs rounded-lg hover:bg-[#cc0000] transition-colors flex items-center gap-1">
              <Download className="w-3 h-3" />
              Scarica
            </button>
          </div>
        </div>
      </div>

      {/* Esami Superati */}
      {mockEsamiUfficiali.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
          <h3 className="mb-4">Esami Superati</h3>
          <div className="space-y-2">
            {mockEsamiUfficiali.map(esame => (
              <div key={esame.id} className="flex items-center justify-between p-3 bg-[#16a34a]/10 rounded-lg">
                <div>
                  <h4 className="text-sm">{esame.corso}</h4>
                  <p className="text-xs text-[#afafaf]">
                    {new Date(esame.data).toLocaleDateString('it-IT')} • {esame.cfu} CFU
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg">{esame.voto}{esame.lode ? 'L' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selector Anno */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <h3 className="mb-4">Seleziona Anno</h3>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map(anno => (
            <button
              key={anno}
              onClick={() => setAnnoSelezionato(anno)}
              className={`p-4 rounded-lg border-2 transition-all ${
                annoSelezionato === anno
                  ? 'border-[#ff0000] bg-[#ff0000]/5'
                  : 'border-[#afafaf]/20 hover:border-[#afafaf]/40'
              }`}
            >
              <p className="text-sm">Anno {anno}</p>
              <p className="text-xs text-[#afafaf] mt-1">{cfuPerAnno(anno)} CFU</p>
            </button>
          ))}
        </div>
      </div>

      {/* Info Anno Selezionato */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3>Anno {annoSelezionato}</h3>
          <div className="text-right">
            <p className="text-xs text-[#afafaf]">Totale</p>
            <p className="text-sm">{cfuPerAnno(annoSelezionato)} CFU • {orePerAnno(annoSelezionato)} ore</p>
          </div>
        </div>

        {/* Lista Corsi Anno Selezionato */}
        <div className="space-y-3">
          {corsiPerAnno[annoSelezionato as keyof typeof corsiPerAnno].length === 0 ? (
            <p className="text-center text-[#afafaf] py-8">Nessun corso per questo anno</p>
          ) : (
            corsiPerAnno[annoSelezionato as keyof typeof corsiPerAnno].map(c => (
              <button
                key={c.id}
                onClick={() => setCorsoSelezionato(c.id)}
                className="w-full bg-[#f5f5f5] rounded-lg p-4 hover:bg-[#efefef] transition-all text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">{c.nome}</h4>
                    <p className="text-xs text-[#666]">{c.docente}</p>
                  </div>
                  <div className="text-xs px-2 py-1 bg-white rounded">
                    {c.codice}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-[#afafaf]">
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {c.cfu} CFU
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {c.ore} ore
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Modal Dettaglio Corso */}
      <AnimatePresence>
        {corso && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCorsoSelezionato(null)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-xl z-50 p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="mb-1">{corso.nome}</h2>
                  <p className="text-sm text-[#666]">{corso.docente}</p>
                </div>
                <button
                  onClick={() => setCorsoSelezionato(null)}
                  className="text-2xl leading-none text-[#afafaf] hover:text-[#000]"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-[#f5f5f5] rounded-lg text-center">
                    <p className="text-xs text-[#afafaf]">Codice</p>
                    <p className="text-sm">{corso.codice}</p>
                  </div>
                  <div className="p-3 bg-[#f5f5f5] rounded-lg text-center">
                    <p className="text-xs text-[#afafaf]">CFU</p>
                    <p className="text-sm">{corso.cfu}</p>
                  </div>
                  <div className="p-3 bg-[#f5f5f5] rounded-lg text-center">
                    <p className="text-xs text-[#afafaf]">Ore</p>
                    <p className="text-sm">{corso.ore}</p>
                  </div>
                </div>

                {corso.descrizione && (
                  <div>
                    <h4 className="text-sm mb-2">Descrizione</h4>
                    <p className="text-sm text-[#666]">{corso.descrizione}</p>
                  </div>
                )}

                {corso.programma && (
                  <div>
                    <h4 className="text-sm mb-2">Programma</h4>
                    <p className="text-sm text-[#666]">{corso.programma}</p>
                  </div>
                )}

                {corso.modalitaAccertamento && (
                  <div>
                    <h4 className="text-sm mb-2">Modalità di Accertamento</h4>
                    <p className="text-sm text-[#666]">{corso.modalitaAccertamento}</p>
                  </div>
                )}

                <button className="w-full py-3 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Scarica Guida al Corso (PDF)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}