import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ModificaPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModificaPasswordModal({ isOpen, onClose }: ModificaPasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Le password non coincidono');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('La password deve essere di almeno 8 caratteri');
      return;
    }

    setLoading(true);

    // Simula chiamata API
    setTimeout(() => {
      toast.success('Password modificata con successo!');
      setLoading(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white rounded-xl z-50 p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#ff0000]" aria-label="Modifica password" />
                Modifica Password
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
                aria-label="Chiudi modale"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Attuale */}
              <div>
                <label className="block text-sm mb-2">Password Attuale</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#afafaf]" aria-label="Password attuale" />
                  <input
                    type={showOld ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#f5f5f5] rounded"
                    aria-label={showOld ? 'Nascondi password' : 'Mostra password'}
                  >
                    {showOld ? <EyeOff className="w-5 h-5 text-[#afafaf]" /> : <Eye className="w-5 h-5 text-[#afafaf]" />}
                  </button>
                </div>
              </div>

              {/* Nuova Password */}
              <div>
                <label className="block text-sm mb-2">Nuova Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#afafaf]" aria-label="Nuova password" />
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#f5f5f5] rounded"
                    aria-label={showNew ? 'Nascondi password' : 'Mostra password'}
                  >
                    {showNew ? <EyeOff className="w-5 h-5 text-[#afafaf]" /> : <Eye className="w-5 h-5 text-[#afafaf]" />}
                  </button>
                </div>
                <p className="text-xs text-[#afafaf] mt-1">Minimo 8 caratteri</p>
              </div>

              {/* Conferma Password */}
              <div>
                <label className="block text-sm mb-2">Conferma Nuova Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#afafaf]" aria-label="Conferma password" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#f5f5f5] rounded"
                    aria-label={showConfirm ? 'Nascondi password' : 'Mostra password'}
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5 text-[#afafaf]" /> : <Eye className="w-5 h-5 text-[#afafaf]" />}
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border-2 border-[#afafaf] text-[#000] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  aria-label="Salva nuova password"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Salvataggio...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Salva</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
