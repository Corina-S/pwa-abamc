import { useState } from 'react';
import { Filter, Search, Download, ExternalLink, FileText, Video, Link2, File } from 'lucide-react';
import { mockRisorse, mockCorsi } from '../../utils/mockData';
import { toast } from 'sonner@2.0.3';

export function RisorseStudente() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroAnno, setFiltroAnno] = useState<string>('tutti');
  const [filtroCorso, setFiltroCorso] = useState<string>('tutti');
  const [filtroTipo, setFiltroTipo] = useState<string>('tutti');

  const risorseFiltrate = mockRisorse
    .filter(r => {
      if (filtroCorso !== 'tutti' && r.corso !== filtroCorso) return false;
      if (filtroTipo !== 'tutti' && r.tipo !== filtroTipo) return false;
      if (searchQuery && !r.titolo.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-[#ff0000]" />;
      case 'video':
        return <Video className="w-5 h-5 text-[#ff0000]" />;
      case 'link':
        return <Link2 className="w-5 h-5 text-[#ff0000]" />;
      default:
        return <File className="w-5 h-5 text-[#ff0000]" />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
        return 'PDF';
      case 'video':
        return 'Video';
      case 'link':
        return 'Link';
      default:
        return 'File';
    }
  };

  return (
    <div className="pb-20 pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1>Risorse</h1>
        <p className="text-[#666] mt-1">Materiale didattico dei tuoi corsi</p>
      </div>

      {/* Ricerca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#afafaf]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cerca risorse..."
          className="w-full pl-10 pr-4 py-3 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] bg-white"
        />
      </div>

      {/* Filtri */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" />
          <h3>Filtri</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-2">Anno</label>
            <select
              value={filtroAnno}
              onChange={(e) => setFiltroAnno(e.target.value)}
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="tutti">Tutti gli anni</option>
              <option value="1">Anno 1</option>
              <option value="2">Anno 2</option>
              <option value="3">Anno 3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Corso</label>
            <select
              value={filtroCorso}
              onChange={(e) => setFiltroCorso(e.target.value)}
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="tutti">Tutti i corsi</option>
              {mockCorsi.map(corso => (
                <option key={corso.id} value={corso.nome}>{corso.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="tutti">Tutti i tipi</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="link">Link</option>
              <option value="altro">Altro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 text-center">
          <FileText className="w-8 h-8 mx-auto mb-2 text-[#ff0000]" />
          <p className="text-2xl">{mockRisorse.filter(r => r.tipo === 'pdf').length}</p>
          <p className="text-xs text-[#afafaf]">PDF</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 text-center">
          <Video className="w-8 h-8 mx-auto mb-2 text-[#ff0000]" />
          <p className="text-2xl">{mockRisorse.filter(r => r.tipo === 'video').length}</p>
          <p className="text-xs text-[#afafaf]">Video</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 text-center">
          <Link2 className="w-8 h-8 mx-auto mb-2 text-[#ff0000]" />
          <p className="text-2xl">{mockRisorse.filter(r => r.tipo === 'link').length}</p>
          <p className="text-xs text-[#afafaf]">Link</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 text-center">
          <File className="w-8 h-8 mx-auto mb-2 text-[#ff0000]" />
          <p className="text-2xl">{mockRisorse.length}</p>
          <p className="text-xs text-[#afafaf]">Totali</p>
        </div>
      </div>

      {/* Lista Risorse */}
      <div className="space-y-3">
        {risorseFiltrate.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-8 text-center">
            <p className="text-[#afafaf]">Nessuna risorsa trovata</p>
          </div>
        ) : (
          risorseFiltrate.map(risorsa => (
            <div
              key={risorsa.id}
              className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#f5f5f5] rounded-lg flex items-center justify-center">
                  {getTipoIcon(risorsa.tipo)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm mb-1">{risorsa.titolo}</h4>
                      <p className="text-xs text-[#666]">{risorsa.corso}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-[#f5f5f5] rounded">
                      {getTipoLabel(risorsa.tipo)}
                    </span>
                  </div>
                  
                  {risorsa.descrizione && (
                    <p className="text-sm text-[#afafaf] mb-3">{risorsa.descrizione}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#afafaf]">
                      Pubblicato il {new Date(risorsa.data).toLocaleDateString('it-IT')}
                    </p>
                    
                    {risorsa.tipo === 'link' ? (
                      <a
                        href={risorsa.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#ff0000] hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Apri link
                      </a>
                    ) : (
                      <button 
                        onClick={() => toast.success('Download avvenuto con successo')}
                        className="text-sm text-[#ff0000] hover:underline flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Scarica
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}