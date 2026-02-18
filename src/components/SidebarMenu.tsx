import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  BookOpen, 
  FolderOpen,
  GraduationCap,
  FileText,
  Users,
  Settings,
  LogOut,
  UserCircle,
  X,
  Mail,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoABAMC from '../assets/logo-desktop.png';

interface SidebarMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function SidebarMenu({ isOpen = true, onClose }: SidebarMenuProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getMainMenuItems = () => {
    if (user?.ruolo === 'studente') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Calendar, label: 'Calendario', path: '/calendario' },
        { icon: CheckSquare, label: 'Presenze', path: '/presenze' },
        { icon: BookOpen, label: 'Didattica', path: '/didattica' },
        { icon: FolderOpen, label: 'Risorse', path: '/risorse' },
      ];
    } else if (user?.ruolo === 'docente') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Calendar, label: 'Calendario', path: '/calendario' },
        { icon: CheckSquare, label: 'Presenze', path: '/presenze' },
        { icon: BookOpen, label: 'Didattica', path: '/didattica' },
        { icon: FolderOpen, label: 'Risorse', path: '/risorse' },
      ];
    } else {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Utenti', path: '/utenti' },
        { icon: GraduationCap, label: 'Corsi', path: '/corsi' },
        { icon: FileText, label: 'Report', path: '/report' },
        { icon: Settings, label: 'Impostazioni', path: '/impostazioni' },
      ];
    }
  };

  const getSecondaryMenuItems = () => {
    if (user?.ruolo === 'studente') {
      return [
        { icon: GraduationCap, label: 'I Miei Corsi', path: '/corsi' },
        { icon: Mail, label: 'Contatti', path: '/contatti' },
      ];
    } else if (user?.ruolo === 'docente') {
      return [
        { icon: GraduationCap, label: 'I Miei Corsi', path: '/corsi-docente' },
        { icon: Mail, label: 'Contatti', path: '/contatti' },
      ];
    }
    return [];
  };

  const mainMenuItems = getMainMenuItems();
  const secondaryMenuItems = getSecondaryMenuItems();

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  return (
    <>
      {/* Desktop Sidebar - Always visible */}
      <aside className="hidden md:flex md:flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#afafaf]/20 shadow-lg z-40">
        {/* Header Sidebar */}
        <div className="p-6 border-b border-[#afafaf]/20">
          <div className="flex items-center justify-center">
            <img src={logoABAMC} alt="ABAMC" className="h-20 w-auto" />
          </div>
        </div>

        {/* User Info - Clickable */}
        <Link to="/profilo" className="p-4 border-b border-[#afafaf]/20 hover:bg-[#f5f5f5] transition-colors">
          <div className="flex items-center gap-3 p-3 bg-[#ff0000]/5 rounded-xl">
            <div className="w-10 h-10 bg-[#ff0000] rounded-full flex items-center justify-center shadow-md">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#000] truncate">
                {user?.nome} {user?.cognome}
              </p>
              <p className="text-xs text-[#666] capitalize">{user?.ruolo}</p>
            </div>
          </div>
        </Link>

        {/* Main Navigation Menu */}
        <nav className="overflow-y-auto p-4 space-y-1">
          <div className="px-2 py-1 text-xs text-[#afafaf] uppercase tracking-wide">Navigazione</div>
          {mainMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[#ff0000] text-white shadow-md'
                      : 'text-[#666] hover:bg-[#f5f5f5] hover:text-[#000]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Secondary Navigation Menu */}
        {secondaryMenuItems.length > 0 && (
          <nav className="overflow-y-auto p-4 space-y-1 border-t border-[#afafaf]/10">
            <div className="px-2 py-1 text-xs text-[#afafaf] uppercase tracking-wide">Altro</div>
            {secondaryMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#ff0000] text-white shadow-md'
                        : 'text-[#666] hover:bg-[#f5f5f5] hover:text-[#000]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Collegamenti esterni */}
        <nav className="overflow-y-auto p-4 space-y-1 border-t border-[#afafaf]/10">
          <div className="px-2 py-1 text-xs text-[#afafaf] uppercase tracking-wide">Collegamenti</div>
          <a
            href="https://www.abamc.it"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#666] hover:bg-[#f5f5f5] hover:text-[#000] transition-all duration-200"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="text-sm font-medium">Sito ABAMC</span>
          </a>
          <a
            href="https://abamc.esse3.cineca.it/Home.do"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-3 text-[#000] hover:bg-[#ff0000]/5 rounded-xl transition-all duration-200 hover:translate-x-1 hover:shadow-sm"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="text-sm font-medium">CINECA</span>
          </a>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-[#afafaf]/20 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#666] hover:bg-[#ff0000]/10 hover:text-[#ff0000] transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar - Slide in from left */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col overflow-y-auto"
            >
              {/* Header Sidebar with Close Button */}
              <div className="p-6 border-b border-[#afafaf]/20 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                <div className="flex items-center justify-end">
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-black/5 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* User Info - Clickable */}
              <Link to="/profilo" onClick={handleLinkClick} className="p-4 border-b border-[#afafaf]/20 hover:bg-[#f5f5f5] transition-colors">
                <div className="flex items-center gap-3 p-3 bg-[#ff0000]/5 rounded-xl">
                  <div className="w-10 h-10 bg-[#ff0000] rounded-full flex items-center justify-center shadow-md">
                    <UserCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#000] truncate">
                      {user?.nome} {user?.cognome}
                    </p>
                    <p className="text-xs text-[#666] capitalize">{user?.ruolo}</p>
                  </div>
                </div>
              </Link>

              {/* Secondary Navigation Menu */}
              {secondaryMenuItems.length > 0 && (
                <nav className="p-4 space-y-1">
                  <div className="px-2 py-1 text-xs text-[#afafaf] uppercase tracking-wide">Altro</div>
                  {secondaryMenuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                      <Link key={item.path} to={item.path} onClick={handleLinkClick}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'bg-[#ff0000] text-white shadow-md'
                              : 'text-[#666] hover:bg-[#f5f5f5] hover:text-[#000]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </nav>
              )}

              {/* Collegamenti esterni */}
              <nav className="p-4 space-y-1 border-t border-[#afafaf]/10">
                <div className="px-2 py-1 text-xs text-[#afafaf] uppercase tracking-wide">Collegamenti</div>
                <a
                  href="https://www.abamc.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#666] hover:bg-[#f5f5f5] hover:text-[#000] transition-all duration-200"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-sm font-medium">Sito ABAMC</span>
                </a>
                <a
                  href="https://abamc.esse3.cineca.it/Home.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-3 text-[#000] hover:bg-[#ff0000]/5 rounded-xl transition-all duration-200 hover:translate-x-1 hover:shadow-sm"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-sm font-medium">CINECA</span>
                </a>
              </nav>

              {/* Footer Sidebar */}
              <div className="p-4 border-t border-[#afafaf]/20 mt-auto">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#666] hover:bg-[#ff0000]/10 hover:text-[#ff0000] transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}