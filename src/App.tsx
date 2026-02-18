import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner@2.0.3';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppDataProvider } from './contexts/AppDataContext';
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { DashboardStudente } from './pages/studente/DashboardStudente';
import { PresenzeStudente } from './pages/studente/PresenzeStudente';
import { CalendarioStudente } from './pages/studente/CalendarioStudente';
import { DidatticaStudente } from './pages/studente/DidatticaStudente';
import { RisorseStudente } from './pages/studente/RisorseStudente';
import { ProfiloStudente } from './pages/studente/ProfiloStudente';
import { CorsiStudente } from './pages/studente/CorsiStudente';
import { DashboardDocente } from './pages/docente/DashboardDocente';
import { CalendarioDocente } from './pages/docente/CalendarioDocente';
import { PresenzeDocente } from './pages/docente/PresenzeDocente';
import { DidatticaDocente } from './pages/docente/DidatticaDocente';
import { RisorseDocente } from './pages/docente/RisorseDocente';
import { ProfiloDocente } from './pages/docente/ProfiloDocente';
import { CorsiDocente } from './pages/docente/CorsiDocente';
import { Contatti } from './pages/Contatti';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { SidebarMenu } from './components/SidebarMenu';
import { OfflineBanner } from './components/OfflineBanner';
import { getNotificheNonLette } from './utils/mockData';
import { registerServiceWorker } from './utils/serviceWorkerRegistration';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const notificheCount = user ? getNotificheNonLette(user.id) : 0;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#f8f9fa] to-white">
      <OfflineBanner />
      <TopBar notificheCount={notificheCount} onMenuToggle={() => setSidebarOpen(true)} />
      <div className="flex">
        <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 md:ml-64 w-full">
          {children}
        </main>
      </div>
      <BottomNav isMenuOpen={sidebarOpen} />
    </div>
  );
}

function AppRoutes() {
  const { isAuthenticated, hasCompletedOnboarding, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (!hasCompletedOnboarding) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  // Route in base al ruolo
  const dashboardRoute = user?.ruolo === 'studente' 
    ? <DashboardStudente /> 
    : user?.ruolo === 'docente'
    ? <DashboardDocente />
    : <div className="p-4">Dashboard Amministratore - In sviluppo</div>;

  return (
    <AppLayout>
      <Routes>
        <Route path="/dashboard" element={dashboardRoute} />
        <Route path="/calendario" element={
          user?.ruolo === 'studente' ? <CalendarioStudente /> : (
            user?.ruolo === 'docente' ? <CalendarioDocente /> : (
              <div className="pb-20 pt-20 px-4">
                <h1>Calendario</h1>
                <p className="text-[#666] mt-1">Pagina in sviluppo</p>
              </div>
            )
          )
        } />
        <Route path="/presenze" element={
          user?.ruolo === 'studente' ? <PresenzeStudente /> : (
            user?.ruolo === 'docente' ? <PresenzeDocente /> : (
              <div className="pb-20 pt-20 px-4">
                <h1>Presenze</h1>
                <p className="text-[#666] mt-1">Pagina in sviluppo</p>
              </div>
            )
          )
        } />
        <Route path="/didattica" element={
          user?.ruolo === 'studente' ? <DidatticaStudente /> : (
            user?.ruolo === 'docente' ? <DidatticaDocente /> : (
              <div className="pb-20 pt-20 px-4">
                <h1>Didattica</h1>
                <p className="text-[#666] mt-1">Pagina in sviluppo</p>
              </div>
            )
          )
        } />
        <Route path="/risorse" element={
          user?.ruolo === 'studente' ? <RisorseStudente /> : (
            user?.ruolo === 'docente' ? <RisorseDocente /> : (
              <div className="pb-20 pt-20 px-4">
                <h1>Risorse</h1>
                <p className="text-[#666] mt-1">Pagina in sviluppo</p>
              </div>
            )
          )
        } />
        <Route path="/profilo" element={
          user?.ruolo === 'studente' ? <ProfiloStudente /> : (
            user?.ruolo === 'docente' ? <ProfiloDocente /> : (
              <div className="pb-20 pt-20 px-4">
                <h1>Profilo</h1>
                <p className="text-[#666] mt-1">Pagina in sviluppo</p>
              </div>
            )
          )
        } />
        <Route path="/piano-studi" element={
          <div className="pb-20 pt-20 px-4">
            <h1>Piano di Studi</h1>
            <p className="text-[#666] mt-1">Pagina in sviluppo</p>
          </div>
        } />
        <Route path="/corsi" element={
          user?.ruolo === 'studente' ? <CorsiStudente /> : (
            <div className="pb-20 pt-20 px-4">
              <h1>I Miei Corsi</h1>
              <p className="text-[#666] mt-1">Pagina in sviluppo</p>
            </div>
          )
        } />
        <Route path="/corsi-docente" element={
          user?.ruolo === 'docente' ? <CorsiDocente /> : (
            <div className="pb-20 pt-20 px-4">
              <h1>I Miei Corsi</h1>
              <p className="text-[#666] mt-1">Pagina Docente in sviluppo</p>
            </div>
          )
        } />
        <Route path="/contatti" element={
          <Contatti />
        } />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default function App() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <BrowserRouter basename="/pwa-abamc">
      <AuthProvider>
        <AppDataProvider>
          <AppRoutes />
          <Toaster 
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.3)',
              },
              className: 'custom-toast',
              success: {
                style: {
                  background: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgb(22 163 74 / 0.3)',
                },
              },
              error: {
                style: {
                  background: '#ff0000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgb(255 0 0 / 0.3)',
                },
              },
            }}
            richColors
          />
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}