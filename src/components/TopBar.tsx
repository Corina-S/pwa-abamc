import { Menu, Bell } from 'lucide-react';
import { useState } from 'react';
import { NotifichePanel } from './NotifichePanel';
import logoABAMCMobile from '../assets/logo-mobile.png';

interface TopBarProps {
  notificheCount?: number;
  onMenuToggle?: () => void;
}

export function TopBar({ notificheCount = 0, onMenuToggle }: TopBarProps) {
  const [notificheOpen, setNotificheOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#afafaf]/20 z-40 pt-safe shadow-sm md:ml-64">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo - Solo mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <img src={logoABAMCMobile} alt="ABAMC" className="h-14 w-auto" />
          </div>

          {/* Desktop spacer */}
          <div className="hidden md:block"></div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Notifiche */}
            <button
              onClick={() => setNotificheOpen(true)}
              className="relative p-2.5 hover:bg-black/5 rounded-xl transition-all duration-200 active:scale-95"
              aria-label="Notifiche"
            >
              <Bell className="w-5 h-5" />
              {notificheCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#ff0000] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                  {notificheCount > 9 ? '9+' : notificheCount}
                </span>
              )}
            </button>

            {/* Menu Hamburger - Solo mobile */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2.5 hover:bg-black/5 rounded-xl transition-all duration-200 active:scale-95"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Panel notifiche */}
      <NotifichePanel isOpen={notificheOpen} onClose={() => setNotificheOpen(false)} />
    </>
  );
}