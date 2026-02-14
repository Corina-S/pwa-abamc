import { Home, Calendar, ScanLine, BookOpen, FolderOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavProps {
  isMenuOpen?: boolean;
}

export function BottomNav({ isMenuOpen = false }: BottomNavProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/calendario', icon: Calendar, label: 'Calendario' },
    { path: '/presenze', icon: ScanLine, label: 'Presenze' },
    { path: '/didattica', icon: BookOpen, label: 'Didattica' },
    { path: '/risorse', icon: FolderOpen, label: 'Risorse' }
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#afafaf]/20 pb-safe z-50 shadow-lg transition-transform duration-300 ${
      isMenuOpen ? 'translate-y-full' : 'translate-y-0'
    }`}>
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 rounded-xl relative group ${
                active ? 'text-[#ff0000]' : 'text-[#afafaf]'
              }`}
            >
              {/* Active indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#ff0000] to-[#cc0000] rounded-b-full" />
              )}
              
              {/* Icon container with hover effect */}
              <div className={`flex items-center justify-center transition-all duration-300 ${
                active ? 'scale-110' : 'group-hover:scale-105'
              }`}>
                <Icon 
                  className={`${path === '/presenze' ? 'w-6 h-6' : 'w-5 h-5'}`}
                  strokeWidth={active ? 2.5 : 2}
                />
              </div>
              
              <span className={`text-[10px] mt-1 transition-all duration-300 ${
                active ? 'opacity-100 translate-y-0' : 'opacity-70 group-hover:opacity-100'
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}