import { X, User, Home, Calendar, ScanLine, BookOpen, FolderOpen, FileText, GraduationCap, Mail, LogOut, ExternalLink, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface MenuItemProps {
  to: string;
  icon: LucideIcon;
  children: ReactNode;
  onClick: () => void;
}

function MenuItem({ to, icon: Icon, children, onClick }: MenuItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#f8f9fa] rounded-xl mx-2 transition-all duration-200 group"
    >
      <div className="p-2 bg-[#f8f9fa] group-hover:bg-white rounded-lg transition-colors">
        <Icon className="w-5 h-5" aria-label={children?.toString() || ''} />
      </div>
      <span>{children}</span>
    </Link>
  );
}

interface ExternalMenuItemProps {
  href: string;
  icon: LucideIcon;
  children: ReactNode;
}

function ExternalMenuItem({ href, icon: Icon, children }: ExternalMenuItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#f8f9fa] rounded-xl mx-2 transition-all duration-200 group"
    >
      <div className="p-2 bg-[#f8f9fa] group-hover:bg-white rounded-lg transition-colors">
        <Icon className="w-5 h-5" aria-label={children?.toString() || ''} />
      </div>
      <span>{children}</span>
      <ExternalLink className="w-4 h-4 ml-auto text-[#afafaf]" aria-label="Apri in nuova scheda" />
    </a>
  );
}

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white z-[60] shadow-2xl flex flex-col md:hidden"
          >
            {/* Header - Fixed */}
            <div className="flex-shrink-0 bg-white border-b border-[#afafaf]/20 p-4 flex items-center justify-between">
              <h2>Menu</h2>
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-black/5 rounded-xl transition-all duration-200 active:scale-95"
                aria-label="Chiudi menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content - Con padding alla fine */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="pb-8">{/* Ridotto padding perché la navbar ora si nasconde */}

                {/* Profilo */}
                <div className="border-b border-[#afafaf]/20 py-2 mb-2 mt-2">
                  <MenuItem to="/profilo" icon={User} onClick={onClose}>
                    Profilo
                  </MenuItem>
                </div>

                {/* Navigazione principale */}
                <div className="border-b border-[#afafaf]/30 py-2">
                  <div className="px-4 py-2 text-sm text-[#afafaf]">Navigazione</div>
                  <MenuItem to="/dashboard" icon={Home} onClick={onClose}>
                    Dashboard
                  </MenuItem>
                  <MenuItem to="/calendario" icon={Calendar} onClick={onClose}>
                    Calendario
                  </MenuItem>
                  <MenuItem to="/presenze" icon={ScanLine} onClick={onClose}>
                    Presenze
                  </MenuItem>
                  <MenuItem to="/didattica" icon={BookOpen} onClick={onClose}>
                    Didattica
                  </MenuItem>
                  <MenuItem to="/risorse" icon={FolderOpen} onClick={onClose}>
                    Risorse
                  </MenuItem>
                </div>

                {/* Altro - Studente */}
                {user?.ruolo === 'studente' && (
                  <div className="border-b border-[#afafaf]/30 py-2">
                    <div className="px-4 py-2 text-sm text-[#afafaf]">Altro</div>
                    <MenuItem to="/piano-studi" icon={FileText} onClick={onClose}>
                      Piano di Studi
                    </MenuItem>
                    <MenuItem to="/corsi" icon={GraduationCap} onClick={onClose}>
                      I Miei Corsi
                    </MenuItem>
                    <MenuItem to="/contatti" icon={Mail} onClick={onClose}>
                      Contatti
                    </MenuItem>
                  </div>
                )}

                {/* Altro - Docente */}
                {user?.ruolo === 'docente' && (
                  <div className="border-b border-[#afafaf]/30 py-2">
                    <div className="px-4 py-2 text-sm text-[#afafaf]">Altro</div>
                    <MenuItem to="/corsi-docente" icon={GraduationCap} onClick={onClose}>
                      I Miei Corsi
                    </MenuItem>
                    <MenuItem to="/contatti" icon={Mail} onClick={onClose}>
                      Contatti
                    </MenuItem>
                  </div>
                )}

                {/* Collegamenti esterni */}
                <div className="border-b border-[#afafaf]/30 py-2">
                  <div className="px-4 py-2 text-sm text-[#afafaf]">Collegamenti</div>
                  <ExternalMenuItem href="https://www.abamc.it" icon={ExternalLink}>
                    Sito ABAMC
                  </ExternalMenuItem>
                  <ExternalMenuItem href="https://abamc.esse3.cineca.it/Home.do" icon={ExternalLink}>
                    CINECA
                  </ExternalMenuItem>
                </div>

                {/* Logout - Ultimo elemento */}
                <div className="py-4 px-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 rounded-xl transition-all duration-200 w-full text-[#ff0000] group"
                  >
                    <div className="p-2 bg-red-50 group-hover:bg-red-100 rounded-lg transition-colors">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span>Esci</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
