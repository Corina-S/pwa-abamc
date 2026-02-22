import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Home, Calendar, ScanLine, BookOpen, FolderOpen, GraduationCap } from 'lucide-react';

const slides = [
  {
    title: 'Tutorial: Benvenuto su ABAMC App',
    description: 'Questa è la tua guida introduttiva alle funzionalità principali dell\'app. Scopri come gestire la tua esperienza accademica in modo semplice e veloce.',
    icon: GraduationCap,
    color: '#ff0000',
    isRed: true
  },
  {
    title: 'Tutorial: Dashboard',
    description: 'Visualizza tutte le informazioni importanti in un colpo d\'occhio: prossime lezioni, notifiche urgenti, feedback recenti e l\'andamento della tua carriera.',
    icon: Home,
    color: '#000000',
    isRed: false
  },
  {
    title: 'Tutorial: Calendario',
    description: 'Gestisci il tuo tempo con il calendario accademico completo. Visualizza lezioni, scadenze, periodi d\'esame e tutti gli eventi importanti.',
    icon: Calendar,
    color: '#ff0000',
    isRed: true
  },
  {
    title: 'Tutorial: Presenze',
    description: 'Registra facilmente la tua presenza a lezione con il QR code generato dal docente. Tieni traccia delle presenze per ogni corso.',
    icon: ScanLine,
    color: '#000000',
    isRed: false
  },
  {
    title: 'Tutorial: Didattica',
    description: 'Consegna i tuoi elaborati, ricevi feedback dai docenti e monitora il tuo progresso nei vari corsi durante l\'anno accademico.',
    icon: BookOpen,
    color: '#ff0000',
    isRed: true
  },
  {
    title: 'Tutorial: Risorse',
    description: 'Accedi a tutto il materiale didattico caricato dai docenti: dispense, video, link utili e bibliografia per ogni corso.',
    icon: FolderOpen,
    color: '#000000',
    isRed: false
  }
];

export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { completeOnboarding, user } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
      navigate('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const onboardingBackground = slide.isRed
    ? { background: '#ff5858' }
    : undefined;

  return (
    <div
      style={onboardingBackground}
      className={`min-h-screen ${slide.isRed ? '' : 'bg-white'} flex flex-col transition-colors duration-500`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex gap-1">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all ${
                index === currentSlide
                  ? slide.isRed ? 'w-8 bg-white' : 'w-8 bg-[#ff0000]'
                  : index < currentSlide
                  ? slide.isRed ? 'w-4 bg-white/60' : 'w-4 bg-[#000000]'
                  : slide.isRed ? 'w-4 bg-white/30' : 'w-4 bg-[#afafaf]'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleSkip}
          className={`text-sm ${slide.isRed ? 'text-white/80 hover:text-white' : 'text-[#afafaf] hover:text-[#000000]'} transition-colors`}
        >
          Salta tutorial
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-md"
          >
            {/* Icon */}
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                slide.isRed ? 'bg-white/20' : `bg-${slide.color}15`
              }`}
            >
              <Icon
                className="w-12 h-12"
                style={{ color: slide.isRed ? '#ffffff' : slide.color }}
                strokeWidth={2}
                aria-label={slide.title.replace('Tutorial: ', '')}
              />
            </div>

            {/* Title */}
            <h2 className={`mb-4 ${slide.isRed ? 'text-white' : ''}`}>{slide.title}</h2>

            {/* Description */}
            <p className={`leading-relaxed ${slide.isRed ? 'text-white/90' : 'text-[#666]'}`}>{slide.description}</p>

            {/* Personalizzazione per ruolo */}
            {currentSlide === 0 && user && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-sm border border-white/30"
              >
                <p className="text-sm text-white">
                  Benvenuto/a <strong>{user.nome} {user.cognome}</strong>!
                  <br />
                  Accedi come <strong>{user.ruolo}</strong>
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 flex gap-3">
        {currentSlide > 0 && (
          <button
            onClick={handlePrev}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              slide.isRed 
                ? 'border-2 border-white text-white hover:bg-white hover:text-[#ff0000]' 
                : 'border-2 border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Indietro</span>
          </button>
        )}
        
        <button
          onClick={handleNext}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors ${
            slide.isRed
              ? 'bg-white text-[#ff0000] hover:bg-white/90'
              : 'bg-[#ff0000] text-white hover:bg-[#cc0000]'
          }`}
        >
          <span>{currentSlide === slides.length - 1 ? 'Inizia' : 'Avanti'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}