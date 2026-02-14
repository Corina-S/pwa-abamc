import { useState } from 'react';
import { User, CreditCard, Award, Bell, Eye, EyeOff, QrCode, ExternalLink, ShieldCheck, Lock, Edit, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockCarriera, mockEsamiUfficiali, mockAchievements } from '../../utils/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { NotificationSettings } from '../../components/NotificationSettings';
import { ModificaPasswordModal } from '../../components/ModificaPasswordModal';
import { GestioneNotificheModal } from '../../components/GestioneNotificheModal';
import { toast } from 'sonner@2.0.3';

export function ProfiloStudente() {
  const { user } = useAuth();
  const [votiNascosti, setVotiNascosti] = useState(false);
  const [badgeOpen, setBadgeOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [notificheModalOpen, setNotificheModalOpen] = useState(false);
  const [modificaDatiOpen, setModificaDatiOpen] = useState(false);
  const [datiModificati, setDatiModificati] = useState({
    email: user?.email || '',
    telefono: user?.telefono || '340 1234567',
    indirizzo: user?.indirizzo || 'Via Roma 123, Macerata (MC)',
  });
  const [notificheSettings, setNotificheSettings] = useState({
    urgenti: true,
    feedback: true,
    presenze: true,
    scadenze: true,
    comunicazioni: true
  });

  const achievementsBloccati = mockAchievements.filter(a => a.sbloccato);

  const handleSalvaDati = () => {
    // Simulazione salvataggio
    toast.success('Dati aggiornati con successo');
    setModificaDatiOpen(false);
  };

  return (
    <div className="pb-20 pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1>Profilo</h1>
        <p className="text-[#666] mt-1">Gestisci le tue informazioni personali</p>
      </div>

      {/* Info Personali */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#ff0000] to-[#cc0000] rounded-full flex items-center justify-center text-white text-2xl">
            {user?.nome?.charAt(0)}{user?.cognome?.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="mb-1">{user?.nome} {user?.cognome}</h2>
            <p className="text-sm text-[#666]">{user?.email}</p>
            <p className="text-sm text-[#afafaf] mt-1">Matricola: {user?.matricola}</p>
            <p className="text-sm text-[#afafaf]">Corso: {user?.corso}</p>
            <p className="text-sm text-[#afafaf]">A.A. {user?.annoAccademico}</p>
          </div>
        </div>

        <button
          onClick={() => setBadgeOpen(true)}
          className="w-full py-3 bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
        >
          <QrCode className="w-5 h-5" />
          Mostra Badge Studente
        </button>
      </div>

      {/* Carriera */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Carriera Accademica</h3>
          <button
            onClick={() => setVotiNascosti(!votiNascosti)}
            className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
            title={votiNascosti ? 'Mostra voti' : 'Nascondi voti'}
          >
            {votiNascosti ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-[#f5f5f5] rounded-lg">
            <Award className="w-8 h-8 mx-auto mb-2 text-[#ff0000]" />
            <p className="text-2xl">
              {votiNascosti ? '***' : mockCarriera.mediaPonderata.toFixed(2)}
            </p>
            <p className="text-xs text-[#afafaf]">Media</p>
          </div>
          <div className="text-center p-4 bg-[#f5f5f5] rounded-lg">
            <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#ff0000]" />
            <p className="text-2xl">{mockCarriera.cfuConseguiti}</p>
            <p className="text-xs text-[#afafaf]">CFU Conseguiti</p>
          </div>
          <div className="text-center p-4 bg-[#f5f5f5] rounded-lg">
            <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#000000]" />
            <p className="text-2xl">{mockCarriera.cfuTotali}</p>
            <p className="text-xs text-[#afafaf]">CFU Totali</p>
          </div>
          <div className="text-center p-4 bg-[#f5f5f5] rounded-lg">
            <Award className="w-8 h-8 mx-auto mb-2 text-[#000000]" />
            <p className="text-2xl">{mockCarriera.esamiSostenuti}</p>
            <p className="text-xs text-[#afafaf]">Esami</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm">Ultimi Esami</h4>
          {mockEsamiUfficiali.map(esame => (
            <div key={esame.id} className="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg">
              <div>
                <p className="text-sm">{esame.corso}</p>
                <p className="text-xs text-[#afafaf]">
                  {new Date(esame.data).toLocaleDateString('it-IT')} • {esame.cfu} CFU
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {votiNascosti ? '**' : esame.voto}
                </span>
                {esame.lode && !votiNascosti && (
                  <Award className="w-5 h-5 text-[#ff0000]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gamification - Achievements */}
      {achievementsBloccati.length > 0 && (
        <div className="bg-gradient-to-br from-[#ff0000]/10 to-[#000000]/10 rounded-xl border-2 border-[#ff0000]/20 p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#ff0000]" />
            Traguardi Raggiunti
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {achievementsBloccati.map(achievement => (
              <div key={achievement.id} className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="text-sm mb-1">{achievement.titolo}</h4>
                <p className="text-xs text-[#666]">{achievement.descrizione}</p>
                {achievement.dataSblocco && (
                  <p className="text-xs text-[#afafaf] mt-2">
                    {new Date(achievement.dataSblocco).toLocaleDateString('it-IT')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Andamento Tasse */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-6">
        <h3 className="mb-4">Situazione Tasse</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#16a34a]/10 border-l-4 border-[#16a34a] rounded">
            <div>
              <p className="text-sm">Prima rata</p>
              <p className="text-xs text-[#afafaf]">Scadenza: 15/10/2024</p>
            </div>
            <span className="text-xs px-3 py-1 bg-[#16a34a] text-white rounded-full">Pagata</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#f59e0b]/10 border-l-4 border-[#f59e0b] rounded">
            <div>
              <p className="text-sm">Seconda rata</p>
              <p className="text-xs text-[#afafaf]">Scadenza: 15/12/2024</p>
            </div>
            <span className="text-xs px-3 py-1 bg-[#f59e0b] text-white rounded-full">In scadenza</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#afafaf]/10 border-l-4 border-[#afafaf] rounded">
            <div>
              <p className="text-sm">Terza rata</p>
              <p className="text-xs text-[#afafaf]">Scadenza: 15/03/2025</p>
            </div>
            <span className="text-xs px-3 py-1 bg-[#afafaf] text-white rounded-full">Da pagare</span>
          </div>
        </div>
      </div>

      {/* Impostazioni */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-6">
        <h3 className="mb-4">Impostazioni</h3>
        <div className="space-y-2">
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
          <button 
            onClick={() => setNotificheModalOpen(true)}
            className="w-full flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg hover:bg-[#efefef] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#ff0000]" />
              <span className="text-sm">Gestisci Notifiche</span>
            </div>
            <span className="text-xs text-[#afafaf]">Preferenze notifiche</span>
          </button>
          <button
            onClick={() => setModificaDatiOpen(true)}
            className="w-full flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg hover:bg-[#efefef] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Edit className="w-5 h-5 text-[#ff0000]" />
              <span className="text-sm">Modifica Dati</span>
            </div>
            <span className="text-xs text-[#afafaf]">Aggiorna informazioni personali</span>
          </button>
        </div>
      </div>

      {/* Gestione Notifiche */}
      <NotificationSettings />

      {/* Link Esterni */}
      <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-6">
        <h3 className="mb-4">Collegamenti Esterni</h3>
        <div className="space-y-2">
          <a
            href="https://www.abamc.it"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 hover:bg-[#f5f5f5] rounded-lg transition-colors"
          >
            <span className="text-sm">Sito ABAMC</span>
            <ExternalLink className="w-4 h-4 text-[#afafaf]" />
          </a>
          <a
            href="https://www.cineca.it"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 hover:bg-[#f5f5f5] rounded-lg transition-colors"
          >
            <span className="text-sm">Portale CINECA</span>
            <ExternalLink className="w-4 h-4 text-[#afafaf]" />
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#afafaf]/10 border-l-4 border-[#afafaf] rounded-lg p-4">
        <div className="flex gap-3">
          <ShieldCheck className="w-5 h-5 text-[#afafaf] flex-shrink-0" />
          <div>
            <h4 className="text-sm mb-1">Informazioni importanti</h4>
            <p className="text-xs text-[#666]">
              Le modifiche ai dati ufficiali (anagrafica, carriera, iscrizioni) devono essere effettuate
              esclusivamente tramite il portale CINECA. Questa PWA serve per agevolare la visualizzazione
              e la gestione quotidiana, ma non modifica i dati ufficiali.
            </p>
            <div className="mt-2 space-x-2">
              <a href="#" className="text-xs text-[#ff0000] hover:underline">Privacy Policy</a>
              <span className="text-xs text-[#afafaf]">•</span>
              <a href="#" className="text-xs text-[#ff0000] hover:underline">Termini e Condizioni</a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Badge */}
      <AnimatePresence>
        {badgeOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBadgeOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-gradient-to-br from-white to-[#f8f9fa] rounded-2xl z-50 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="gradient-text">Badge Studente</h3>
                <button
                  onClick={() => setBadgeOpen(false)}
                  className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Badge Card */}
              <div className="relative bg-[#000000] text-white rounded-2xl p-8 mb-6 shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#ff0000]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                
                {/* Logo/Header */}
                <div className="relative mb-6 pb-4 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider opacity-75">Accademia di Belle Arti</p>
                      <p className="text-sm opacity-90">Macerata</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                      <User className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                {/* Student Info */}
                <div className="relative mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-white to-[#f5f5f5] rounded-2xl flex items-center justify-center text-[#ff0000] text-2xl shadow-xl border-4 border-white/30">
                      {user?.nome?.charAt(0)}{user?.cognome?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl mb-1">{user?.nome} {user?.cognome}</h4>
                      <p className="text-sm opacity-90">{user?.corso}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs border border-white/30">
                          Mat. {user?.matricola}
                        </div>
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs border border-white/30">
                          A.A. {user?.annoAccademico}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* QR Code Section */}
                <div className="relative bg-white rounded-2xl p-5 shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-28 h-28 bg-gradient-to-br from-[#f8f9fa] to-white rounded-xl flex items-center justify-center border-2 border-[#afafaf]/20 shadow-inner">
                        <QrCode className="w-16 h-16 text-[#000000]" />
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h5 className="text-sm text-[#000000] mb-1">Badge Digitale</h5>
                      <p className="text-xs text-[#666] leading-relaxed">
                        Utilizza questo QR code per accedere ai servizi convenzionati e identificarti all'interno dell'Accademia
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Validity indicator */}
                <div className="relative mt-4 flex items-center justify-center gap-2 text-xs opacity-75">
                  <div className="w-2 h-2 bg-[#16a34a] rounded-full animate-pulse" />
                  <span>Badge valido • Aggiornato al {new Date().toLocaleDateString('it-IT')}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setBadgeOpen(false)}
                  className="flex-1 px-4 py-3 bg-[#afafaf] text-white rounded-xl hover:bg-[#999] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
                  Chiudi
                </button>
                <button
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-md active:scale-95"
                  onClick={() => {
                    toast.success('Badge salvato come immagine');
                  }}
                >
                  Salva Badge
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      <ModificaPasswordModal isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} />
      <GestioneNotificheModal isOpen={notificheModalOpen} onClose={() => setNotificheModalOpen(false)} userRole="studente" />

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
              <div className="flex items-center justify-between mb-6">
                <h3>Modifica Dati Personali</h3>
                <button
                  onClick={() => setModificaDatiOpen(false)}
                  className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={datiModificati.email}
                    onChange={(e) => setDatiModificati({ ...datiModificati, email: e.target.value })}
                    className="w-full px-3 py-2.5 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Telefono</label>
                  <input
                    type="tel"
                    value={datiModificati.telefono}
                    onChange={(e) => setDatiModificati({ ...datiModificati, telefono: e.target.value })}
                    placeholder="340 1234567"
                    className="w-full px-3 py-2.5 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Indirizzo</label>
                  <input
                    type="text"
                    value={datiModificati.indirizzo}
                    onChange={(e) => setDatiModificati({ ...datiModificati, indirizzo: e.target.value })}
                    placeholder="Via Roma 123, Macerata (MC)"
                    className="w-full px-3 py-2.5 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setModificaDatiOpen(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSalvaDati}
                  className="flex-1 px-4 py-2.5 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors"
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