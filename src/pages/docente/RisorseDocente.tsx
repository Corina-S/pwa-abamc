import { useState } from 'react';
import { Upload, FileText, Video, Link as LinkIcon, Download, Trash2, Plus } from 'lucide-react';
import { mockRisorse, mockCorsi } from '../../utils/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export function RisorseDocente() {
  const { user } = useAuth();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [filtroCorso, setFiltroCorso] = useState<string>('tutti');
  const [tipoRisorsa, setTipoRisorsa] = useState<'pdf' | 'video' | 'link'>('pdf');
  const [titolo, setTitolo] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [corsoSelezionato, setCorsoSelezionato] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');

  // Filtra solo i corsi del docente
  const corsiDocente = mockCorsi.filter(c => c.docente.includes(user?.cognome || ''));

  // Filtra risorse del docente
  const risorseDocente = mockRisorse.filter(r => r.docenteId === user?.id);
  const risorseFiltrate = risorseDocente
    .filter(r => filtroCorso === 'tutti' || r.corso === filtroCorso)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!titolo || !corsoSelezionato) {
      alert('Compila tutti i campi obbligatori');
      return;
    }
    if (tipoRisorsa !== 'link' && !file) {
      alert('Seleziona un file da caricare');
      return;
    }
    if (tipoRisorsa === 'link' && !link) {
      alert('Inserisci un link');
      return;
    }

    // Simula upload
    toast.success(`Risorsa "${titolo}" caricata con successo!`);
    setUploadModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitolo('');
    setDescrizione('');
    setCorsoSelezionato('');
    setFile(null);
    setLink('');
    setTipoRisorsa('pdf');
  };

  const handleDownload = (risorsa: any) => {
    toast.success(`Download di "${risorsa.titolo}" avviato`, {
      description: 'Il file verrà scaricato a breve'
    });
  };

  const handleDelete = (risorsa: any) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: `Eliminazione di "${risorsa.titolo}" in corso...`,
        success: `Risorsa "${risorsa.titolo}" eliminata con successo`,
        error: 'Errore durante l\'eliminazione'
      }
    );
  };

  const handleOpenLink = (risorsa: any) => {
    toast.success(`Apertura link "${risorsa.titolo}"`, {
      description: 'Il link si aprirà in una nuova scheda'
    });
    // Simula apertura link
    // window.open(risorsa.link, '_blank');
  };

  const getIconaTipo = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-[#ff0000]" />;
      case 'video':
        return <Video className="w-5 h-5 text-[#ff0000]" />;
      case 'link':
        return <LinkIcon className="w-5 h-5 text-[#ff0000]" />;
      default:
        return <FileText className="w-5 h-5 text-[#ff0000]" />;
    }
  };

  return (
    <div className="pb-20 pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1>Risorse</h1>
        <p className="text-[#666] mt-1">Gestisci il materiale didattico dei tuoi corsi</p>
      </div>

      {/* Pulsante Carica Risorsa */}
      <button
        onClick={() => setUploadModalOpen(true)}
        className="w-full bg-[#ff0000] text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-lg transition-shadow"
      >
        <Plus className="w-6 h-6" />
        <span>Carica Nuova Risorsa</span>
      </button>

      {/* Statistiche */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 text-center">
          <FileText className="w-6 h-6 mx-auto mb-2 text-[#ff0000]" />
          <p className="text-2xl">{risorseDocente.filter(r => r.tipo === 'pdf').length}</p>
          <p className="text-xs text-[#afafaf]">PDF</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 text-center">
          <Video className="w-6 h-6 mx-auto mb-2 text-[#ff0000]" />
          <p className="text-2xl">{risorseDocente.filter(r => r.tipo === 'video').length}</p>
          <p className="text-xs text-[#afafaf]">Video</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-4 text-center">
          <LinkIcon className="w-6 h-6 mx-auto mb-2 text-[#ff0000]" />
          <p className="text-2xl">{risorseDocente.filter(r => r.tipo === 'link').length}</p>
          <p className="text-xs text-[#afafaf]">Link</p>
        </div>
      </div>

      {/* Filtro per Corso */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <label className="block text-sm mb-2">Filtra per Corso</label>
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

      {/* Lista Risorse */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <h3 className="mb-4">Le Mie Risorse</h3>
        <div className="space-y-3">
          {risorseFiltrate.length === 0 ? (
            <p className="text-center text-[#afafaf] py-8">Nessuna risorsa trovata</p>
          ) : (
            risorseFiltrate.map(risorsa => (
              <div key={risorsa.id} className="border border-[#afafaf]/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIconaTipo(risorsa.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm mb-1">{risorsa.titolo}</h4>
                    <p className="text-xs text-[#666] mb-2">{risorsa.corso}</p>
                    {risorsa.descrizione && (
                      <p className="text-xs text-[#afafaf] mb-2">{risorsa.descrizione}</p>
                    )}
                    <p className="text-xs text-[#afafaf]">
                      Caricato il {new Date(risorsa.data).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {risorsa.tipo !== 'link' ? (
                      <button
                        className="p-2 text-[#ff0000] hover:bg-[#ff0000]/10 rounded-lg transition-colors"
                        onClick={() => handleDownload(risorsa)}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        className="p-2 text-[#ff0000] hover:bg-[#ff0000]/10 rounded-lg transition-colors"
                        onClick={() => handleOpenLink(risorsa)}
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      className="p-2 text-[#ff0000] hover:bg-[#ff0000]/10 rounded-lg transition-colors"
                      onClick={() => handleDelete(risorsa)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Upload */}
      <AnimatePresence>
        {uploadModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUploadModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-xl z-50 p-6 max-h-[80vh] overflow-y-auto"
            >
              <h3 className="mb-4">Carica Nuova Risorsa</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">
                    Tipo Risorsa <span className="text-[#ff0000]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['pdf', 'video', 'link'] as const).map(tipo => (
                      <button
                        key={tipo}
                        onClick={() => setTipoRisorsa(tipo)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          tipoRisorsa === tipo
                            ? 'border-[#ff0000] bg-[#ff0000]/5'
                            : 'border-[#afafaf]/20 hover:border-[#afafaf]/40'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {tipo === 'pdf' && <FileText className="w-5 h-5" />}
                          {tipo === 'video' && <Video className="w-5 h-5" />}
                          {tipo === 'link' && <LinkIcon className="w-5 h-5" />}
                          <span className="text-xs">{tipo.toUpperCase()}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Corso <span className="text-[#ff0000]">*</span>
                  </label>
                  <select
                    value={corsoSelezionato}
                    onChange={(e) => setCorsoSelezionato(e.target.value)}
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                  >
                    <option value="">Seleziona un corso</option>
                    {corsiDocente.map(corso => (
                      <option key={corso.id} value={corso.nome}>{corso.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Titolo <span className="text-[#ff0000]">*</span>
                  </label>
                  <input
                    type="text"
                    value={titolo}
                    onChange={(e) => setTitolo(e.target.value)}
                    placeholder="Es: Dispensa Lezione 1"
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Descrizione</label>
                  <textarea
                    value={descrizione}
                    onChange={(e) => setDescrizione(e.target.value)}
                    rows={3}
                    placeholder="Descrizione opzionale..."
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
                  />
                </div>

                {tipoRisorsa === 'link' ? (
                  <div>
                    <label className="block text-sm mb-2">
                      Link <span className="text-[#ff0000]">*</span>
                    </label>
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm mb-2">
                      File <span className="text-[#ff0000]">*</span>
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept={tipoRisorsa === 'pdf' ? '.pdf' : 'video/*'}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ff0000] file:text-white hover:file:bg-[#cc0000] file:cursor-pointer cursor-pointer"
                    />
                    {file && (
                      <p className="text-xs text-[#666] mt-2">
                        File selezionato: {file.name}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setUploadModalOpen(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={handleUpload}
                    className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Carica
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