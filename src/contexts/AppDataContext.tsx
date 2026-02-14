import { createContext, useContext, useState, ReactNode } from 'react';
import { mockElaborati, mockNotifiche } from '../utils/mockData';
import type { Elaborato, Notifica } from '../types';

interface AppDataContextType {
  elaborati: Elaborato[];
  notifiche: Notifica[];
  consegnaElaborato: (elaboratoId: string, file?: File) => void;
  leggiNotifica: (notificaId: string) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [elaborati, setElaborati] = useState<Elaborato[]>(mockElaborati);
  const [notifiche, setNotifiche] = useState<Notifica[]>(mockNotifiche);

  const consegnaElaborato = (elaboratoId: string, file?: File) => {
    setElaborati(prev => prev.map(e => {
      if (e.id === elaboratoId) {
        return {
          ...e,
          dataConsegna: new Date().toISOString(),
          fileUrl: file ? URL.createObjectURL(file) : e.fileUrl,
        };
      }
      return e;
    }));
  };

  const leggiNotifica = (notificaId: string) => {
    setNotifiche(prev => prev.map(n => {
      if (n.id === notificaId) {
        return { ...n, letta: true };
      }
      return n;
    }));
  };

  return (
    <AppDataContext.Provider value={{ elaborati, notifiche, consegnaElaborato, leggiNotifica }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
}
