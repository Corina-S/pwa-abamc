import { Mail, Phone, MapPin, Calendar, BookOpen, Award, Edit, LogOut, Bell, Lock, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockCorsi } from '../../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ModificaPasswordModal } from '../../components/ModificaPasswordModal';
import { GestioneNotificheModal } from '../../components/GestioneNotificheModal';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';

export function ProfiloDocente() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [notificheModalOpen, setNotificheModalOpen] = useState(false);
  const [modificaDatiOpen, setModificaDatiOpen] = useState(false);
  const [modificaOrariOpen, setModificaOrariOpen] = useState(false);
  const [modificaCVOpen, setModificaCVOpen] = useState(false);
  const [datiModificati, setDatiModificati] = useState({
    email: user?.email || '',
    telefono: '+39 0733 123456',
    ufficio: 'Edificio A, Piano 2, Stanza 204',
  });
  const [orariRicevimento, setOrariRicevimento] = useState([
    { giorno: 'Martedì', orario: '14:00 - 16:00' },
    { giorno: 'Giovedì', orario: '15:00 - 17:00' },
  ]);
  const [curriculumData, setCurriculumData] = useState({
    formazione: 'Laurea in Storia dell\'Arte - Università di Bologna\nDottorato in Storia dell\'Arte Contemporanea - Università La Sapienza',
    pubblicazioni: [
      'L\'arte contemporanea in Italia (2023)',
      'Tendenze artistiche del XXI secolo (2022)',
    ],
  });

  const corsiDocente = mockCorsi.filter(c => c.docente.includes(user?.cognome || ''));
  const totaleCFU = corsiDocente.reduce((sum, c) => sum + c.cfu, 0);
  const totaleOre = corsiDocente.reduce((sum, c) => sum + c.ore, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSalvaDati = () => {
    toast.success('Dati aggiornati con successo');
    setModificaDatiOpen(false);
  };

  const handleSalvaOrari = () => {
    toast.success('Orari di ricevimento aggiornati');
    setModificaOrariOpen(false);
  };

  const handleSalvaCV = () => {
    toast.success('Curriculum Vitae aggiornato');
    setModificaCVOpen(false);
  };

  return (
    <div className="pb-20 pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1>Profilo</h1>
        <p className="text-[#666] mt-1">Le tue informazioni personali e professionali</p>
      </div>

      {/* Card Profilo */}
      <div className="bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white rounded-xl shadow-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            {user?.nome[0]}{user?.cognome[0]}
          </div>
          <div className="flex-1">
            <h2 className="text-white mb-1">
              Prof. {user?.nome} {user?.cognome}
            </h2>
            <p className="text-sm opacity-90 mb-3">Docente</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setModificaDatiOpen(true)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Informazioni Contatto */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <h3 className="mb-4">Informazioni di Contatto</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#f5f5f5] rounded-lg">
            <Mail className="w-5 h-5 text-[#ff0000]" />
            <div>
              <p className="text-xs text-[#afafaf]">Email Istituzionale</p>
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#f5f5f5] rounded-lg">
            <Phone className="w-5 h-5 text-[#ff0000]" />
            <div>
              <p className="text-xs text-[#afafaf]">Telefono</p>
              <p className="text-sm">+39 0733 123456</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#f5f5f5] rounded-lg">
            <MapPin className="w-5 h-5 text-[#ff0000]" />
            <div>
              <p className="text-xs text-[#afafaf]">Ufficio</p>
              <p className="text-sm">Edificio A, Piano 2, Stanza 204</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orari di Ricevimento */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3>Orari di Ricevimento</h3>
          <button 
            onClick={() => setModificaOrariOpen(true)}
            className="text-sm text-[#ff0000] hover:underline flex items-center gap-1"
          >
            <Edit className="w-4 h-4" />
            Modifica
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 bg-[#f5f5f5] rounded-lg">
            <Calendar className="w-5 h-5 text-[#ff0000] mt-0.5" />
            <div>
              <p className="text-sm">Martedì</p>
              <p className="text-xs text-[#afafaf]">14:00 - 16:00</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[#f5f5f5] rounded-lg">
            <Calendar className="w-5 h-5 text-[#ff0000] mt-0.5" />
            <div>
              <p className="text-sm">Giovedì</p>
              <p className="text-xs text-[#afafaf]">15:00 - 17:00</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#afafaf] mt-3">
          Si prega di prenotare via email almeno 24 ore prima
        </p>
      </div>

      {/* Carico Didattico */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <h3 className="mb-4">Carico Didattico A.A. {user?.annoAccademico}</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-[#f5f5f5] rounded-lg">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-[#ff0000]" />
            <p className="text-2xl">{corsiDocente.length}</p>
            <p className="text-xs text-[#afafaf]">Corsi</p>
          </div>
          <div className="text-center p-3 bg-[#f5f5f5] rounded-lg">
            <Award className="w-6 h-6 mx-auto mb-2 text-[#ff0000]" />
            <p className="text-2xl">{totaleCFU}</p>
            <p className="text-xs text-[#afafaf]">CFU Totali</p>
          </div>
          <div className="text-center p-3 bg-[#f5f5f5] rounded-lg">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-[#ff0000]" />
            <p className="text-2xl">{totaleOre}</p>
            <p className="text-xs text-[#afafaf]">Ore</p>
          </div>
        </div>
        <div className="space-y-2">
          {corsiDocente.map(corso => (
            <div key={corso.id} className="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg">
              <div>
                <p className="text-sm">{corso.nome}</p>
                <p className="text-xs text-[#afafaf]">Anno {corso.anno} • {corso.codice}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{corso.cfu} CFU</p>
                <p className="text-xs text-[#afafaf]">{corso.ore} ore</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum e Pubblicazioni */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3>Curriculum Vitae</h3>
          <button 
            onClick={() => setModificaCVOpen(true)}
            className="text-sm text-[#ff0000] hover:underline flex items-center gap-1"
          >
            <Edit className="w-4 h-4" />
            Modifica
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm mb-1">Formazione</h4>
            <p className="text-sm text-[#666]">
              {curriculumData.formazione}
            </p>
          </div>
          <div>
            <h4 className="text-sm mb-1">Pubblicazioni Recenti</h4>
            <ul className="text-sm text-[#666] space-y-1">
              {curriculumData.pubblicazioni.map((pubblicazione, index) => (
                <li key={index}>• {pubblicazione}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Impostazioni */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
        <h3 className="mb-4">Impostazioni</h3>
        <div className="space-y-2">
          <button 
            onClick={() => setNotificheModalOpen(true)}
            className="w-full flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg hover:bg-[#efefef] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#ff0000]" />
              <span className="text-sm">Gestisci Notifiche</span>
            </div>
            <span className="text-xs text-[#afafaf]">Gestisci preferenze</span>
          </button>
          <button 
            onClick={() => setPasswordModalOpen(true)}
            className="w-full flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg hover:bg-[#efefef] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#ff0000]" />
              <span className="text-sm">Modifica Password</span>
            </div>
            <span className="text-xs text-[#afafaf]">Cambia password</span>
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-white border-2 border-[#ff0000] text-[#ff0000] py-3 rounded-xl hover:bg-[#ff0000] hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        <span>Esci</span>
      </button>

      {/* Modals */}
      <ModificaPasswordModal isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} />
      <GestioneNotificheModal isOpen={notificheModalOpen} onClose={() => setNotificheModalOpen(false)} userRole="docente" />
      
      {/* Modal Modifica Dati */}
      <AnimatePresence>
        {modificaDatiOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModificaDatiOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white rounded-xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3>Modifica Dati Personali</h3>
                <button
                  onClick={() => setModificaDatiOpen(false)}
                  className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">
                    Email Istituzionale
                  </label>
                  <input
                    type="email"
                    value={datiModificati.email}
                    onChange={(e) => setDatiModificati({ ...datiModificati, email: e.target.value })}
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    value={datiModificati.telefono}
                    onChange={(e) => setDatiModificati({ ...datiModificati, telefono: e.target.value })}
                    placeholder="+39 0733 123456"
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Ufficio
                  </label>
                  <input
                    type="text"
                    value={datiModificati.ufficio}
                    onChange={(e) => setDatiModificati({ ...datiModificati, ufficio: e.target.value })}
                    placeholder="Edificio A, Piano 2, Stanza 204"
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setModificaDatiOpen(false)}
                  className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSalvaDati}
                  className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors"
                >
                  Salva
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Modal Modifica Orari */}
      <AnimatePresence>
        {modificaOrariOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModificaOrariOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white rounded-xl z-50 p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3>Modifica Orari di Ricevimento</h3>
                <button
                  onClick={() => setModificaOrariOpen(false)}
                  className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {orariRicevimento.map((orario, index) => (
                  <div key={index} className="p-4 bg-[#f5f5f5] rounded-lg space-y-3">
                    <div>
                      <label className="block text-sm mb-2">
                        Giorno
                      </label>
                      <select
                        value={orario.giorno}
                        onChange={(e) => {
                          const newOrari = [...orariRicevimento];
                          newOrari[index].giorno = e.target.value;
                          setOrariRicevimento(newOrari);
                        }}
                        className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] bg-white"
                      >
                        <option value="Lunedì">Lunedì</option>
                        <option value="Martedì">Martedì</option>
                        <option value="Mercoledì">Mercoledì</option>
                        <option value="Giovedì">Giovedì</option>
                        <option value="Venerdì">Venerdì</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">
                        Orario
                      </label>
                      <input
                        type="text"
                        value={orario.orario}
                        onChange={(e) => {
                          const newOrari = [...orariRicevimento];
                          newOrari[index].orario = e.target.value;
                          setOrariRicevimento(newOrari);
                        }}
                        placeholder="14:00 - 16:00"
                        className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newOrari = orariRicevimento.filter((_, i) => i !== index);
                        setOrariRicevimento(newOrari);
                      }}
                      className="text-sm text-[#ff0000] hover:underline"
                    >
                      Rimuovi
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    setOrariRicevimento([...orariRicevimento, { giorno: 'Lunedì', orario: '14:00 - 16:00' }]);
                  }}
                  className="w-full px-4 py-2 border-2 border-dashed border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors text-sm"
                >
                  + Aggiungi Orario
                </button>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setModificaOrariOpen(false)}
                  className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSalvaOrari}
                  className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors"
                >
                  Salva
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Modal Modifica CV */}
      <AnimatePresence>
        {modificaCVOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModificaCVOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white rounded-xl z-50 p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3>Modifica Curriculum Vitae</h3>
                <button
                  onClick={() => setModificaCVOpen(false)}
                  className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">
                    Formazione
                  </label>
                  <textarea
                    value={curriculumData.formazione}
                    onChange={(e) => setCurriculumData({ ...curriculumData, formazione: e.target.value })}
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Pubblicazioni Recenti
                  </label>
                  <textarea
                    value={curriculumData.pubblicazioni.join('\n')}
                    onChange={(e) => setCurriculumData({ ...curriculumData, pubblicazioni: e.target.value.split('\n') })}
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] h-24"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setModificaCVOpen(false)}
                  className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSalvaCV}
                  className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors"
                >
                  Salva
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}