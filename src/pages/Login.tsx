import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Verifica se è stata inserita una mail
    if (!email.trim()) {
      setError('Inserisci un indirizzo email');
      return;
    }

    // Verifica se è una mail valida
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Inserisci un indirizzo email valido');
      return;
    }

    // Verifica se è una mail istituzionale
    if (!email.endsWith('@abamc.it') && !email.endsWith('@studenti.abamc.it')) {
      setError('Utilizza una mail istituzionale (@abamc.it o @studenti.abamc.it)');
      return;
    }

    // Verifica password
    if (!password.trim()) {
      setError('Inserisci la password');
      return;
    }

    if (!acceptedTerms) {
      setError('Devi accettare i termini e le condizioni per continuare');
      return;
    }

    setLoading(true);

    try {
      await login(email);
      navigate('/onboarding');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#f8f9fa] to-[#efefef] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0000]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#000000]/5 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo e Benvenuto */}
        <div className="text-center mb-8">
              <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 bg-white rounded-3xl shadow-lg">
              <Logo variant="mobile" size="lg" />
            </div>
          </motion.div>
          <h1 className="mb-2 gradient-text">Benvenuto</h1>
          <p className="text-[#666]">Accademia di Belle Arti di Macerata</p>
        </div>

        {/* Form Login */}
        <div className="modern-card p-6 mb-6 shadow-xl">
          <div className="mb-6">
            <h2 className="mb-2">Accedi</h2>
            <p className="text-sm text-[#666]">
              Utilizza la tua mail istituzionale per accedere
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2">
                Email istituzionale
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#afafaf]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome.cognome@studenti.abamc.it"
                  className="w-full pl-12 pr-4 py-3.5 border border-[#afafaf]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-all duration-200 bg-white"
                  required
                />
              </div>
              <p className="text-[10px] text-[#afafaf] mt-2 leading-tight">
                Esempi email valide per test: m.rossi@studenti.abamc.it (studente), l.bianchi@abamc.it (docente)
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#afafaf]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Inserisci la tua password"
                  className="w-full pl-12 pr-4 py-3.5 border border-[#afafaf]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-all duration-200 bg-white"
                  required
                />
              </div>
            </div>

            {/* Privacy e termini */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#ff0000] cursor-pointer"
                />
                <span className="text-sm text-[#666] group-hover:text-[#000] transition-colors">
                  Accetto i{' '}
                  <a href="#" className="text-[#ff0000] hover:text-[#cc0000] hover:underline transition-colors">
                    termini e condizioni
                  </a>
                  , l'
                  <a href="#" className="text-[#ff0000] hover:text-[#cc0000] hover:underline transition-colors">
                    informativa sulla privacy
                  </a>
                  {' '}e l'utilizzo di cookies e cache per migliorare l'esperienza d'uso
                </span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 bg-[#ff0000]/10 border border-[#ff0000]/30 rounded-xl text-sm text-[#ff0000]"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white py-3.5 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-98"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Accesso in corso...</span>
                </>
              ) : (
                <span>Accedi</span>
              )}
            </button>
          </form>
        </div>

        {/* Info aggiuntive */}
        <div className="text-center text-sm text-[#666] px-4">
          <p>
            Questa PWA è dedicata agli utenti ABAMC per facilitare
            la gestione quotidiana delle attività accademiche.
          </p>
          <p className="mt-3">
            I dati ufficiali sono gestiti da{' '}
            <a href="#" className="text-[#ff0000] hover:text-[#cc0000] hover:underline transition-colors">
              CINECA
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}