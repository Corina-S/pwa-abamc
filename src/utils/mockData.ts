import type { User, Lezione, Presenza, Feedback, Elaborato, Risorsa, Notifica, Corso, EsameUfficiale, Carriera, EventoCalendario, Achievement, PeriodoCalendario } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Marco',
    cognome: 'Rossi',
    email: 'm.rossi@studenti.abamc.it',
    ruolo: 'studente',
    matricola: '2023001',
    corso: 'Pittura',
    annoAccademico: '2024/2025'
  },
  {
    id: '2',
    nome: 'Laura',
    cognome: 'Bianchi',
    email: 'l.bianchi@abamc.it',
    ruolo: 'docente',
    corso: 'Storia dell\'Arte',
    annoAccademico: '2024/2025'
  },
  {
    id: '3',
    nome: 'Giuseppe',
    cognome: 'Verdi',
    email: 'g.verdi@abamc.it',
    ruolo: 'amministratore',
    annoAccademico: '2024/2025'
  }
];

export const mockCorsi: Corso[] = [
  {
    id: 'c1',
    nome: 'Storia dell\'Arte Contemporanea',
    codice: 'ABST47',
    docente: 'Prof.ssa Laura Bianchi',
    anno: 1,
    cfu: 6,
    ore: 45,
    descrizione: 'Corso dedicato allo studio delle principali correnti artistiche del XX e XXI secolo.',
    programma: 'Avanguardie storiche, Pop Art, Arte Concettuale, Arte Contemporanea',
    modalitaAccertamento: 'Esame orale con presentazione di un elaborato scritto'
  },
  {
    id: 'c2',
    nome: 'Pittura 1',
    codice: 'ABAV1',
    docente: 'Prof. Mario Neri',
    anno: 1,
    cfu: 12,
    ore: 125,
    descrizione: 'Fondamenti della tecnica pittorica',
    programma: 'Tecniche tradizionali, uso del colore, composizione',
    modalitaAccertamento: 'Valutazione elaborati pratici ed esame finale'
  },
  {
    id: 'c3',
    nome: 'Anatomia Artistica',
    codice: 'ABAV1',
    docente: 'Prof. Francesco Blu',
    anno: 1,
    cfu: 6,
    ore: 45,
    descrizione: 'Studio dell\'anatomia umana per l\'arte',
    programma: 'Struttura ossea, muscolare, proporzioni',
    modalitaAccertamento: 'Esame pratico con disegno dal vero'
  },
  {
    id: 'c4',
    nome: 'Design Grafico',
    codice: 'ABPR31',
    docente: 'Prof.ssa Anna Verde',
    anno: 2,
    cfu: 8,
    ore: 75,
    descrizione: 'Fondamenti di progettazione grafica',
    programma: 'Tipografia, layout, branding, design digitale',
    modalitaAccertamento: 'Portfolio progettuale'
  },
  {
    id: 'c5',
    nome: 'Tecniche Pittoriche',
    codice: 'ABAV3',
    docente: 'Prof. Mario Neri',
    anno: 1,
    cfu: 8,
    ore: 75,
    descrizione: 'Approfondimento sulle tecniche pittoriche classiche e contemporanee',
    programma: 'Olio, acrilico, tempera, tecniche miste',
    modalitaAccertamento: 'Realizzazione portfolio opere'
  },
  {
    id: 'c6',
    nome: 'Fenomenologia delle Arti Contemporanee',
    codice: 'ABST58',
    docente: 'Prof.ssa Laura Bianchi',
    anno: 2,
    cfu: 6,
    ore: 45,
    descrizione: 'Analisi dei fenomeni artistici contemporanei',
    programma: 'Arte relazionale, performance, installazioni',
    modalitaAccertamento: 'Esame orale'
  },
  {
    id: 'c7',
    nome: 'Fotografia',
    codice: 'ABPR31',
    docente: 'Prof.ssa Anna Verde',
    anno: 2,
    cfu: 6,
    ore: 45,
    descrizione: 'Tecniche fotografiche e composizione dell\'immagine',
    programma: 'Fotografia analogica e digitale, post-produzione',
    modalitaAccertamento: 'Presentazione portfolio fotografico'
  },
  {
    id: 'c8',
    nome: 'Teoria della Percezione',
    codice: 'ABST47',
    docente: 'Prof. Francesco Blu',
    anno: 1,
    cfu: 6,
    ore: 45,
    descrizione: 'Studio della percezione visiva e psicologia della forma',
    programma: 'Gestalt, colore, percezione spaziale',
    modalitaAccertamento: 'Esame scritto'
  }
];

export const mockLezioni: Lezione[] = [
  // Sabato 3 Gennaio 2026 (Oggi)
  {
    id: 'l1',
    corso: 'Storia dell\'Arte Contemporanea',
    docente: 'Prof.ssa Laura Bianchi',
    giorno: '2026-01-03',
    oraInizio: '09:00',
    oraFine: '11:00',
    aula: 'Aula Magna',
    tipo: 'presenza'
  },
  {
    id: 'l2',
    corso: 'Pittura 1',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-03',
    oraInizio: '11:30',
    oraFine: '13:30',
    aula: 'Atelier 3',
    tipo: 'presenza'
  },
  {
    id: 'l3',
    corso: 'Teoria della Percezione',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-03',
    oraInizio: '14:00',
    oraFine: '16:00',
    aula: 'Aula 5',
    tipo: 'presenza'
  },
  
  // Domenica 4 Gennaio - Nessuna lezione (giorno libero)
  
  // Lunedì 5 Gennaio
  {
    id: 'l4',
    corso: 'Anatomia Artistica',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-05',
    oraInizio: '09:00',
    oraFine: '11:00',
    linkOnline: 'https://meet.google.com/abc-defg-hij',
    tipo: 'online'
  },
  {
    id: 'l5',
    corso: 'Tecniche Pittoriche',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-05',
    oraInizio: '11:30',
    oraFine: '13:30',
    aula: 'Atelier 1',
    tipo: 'presenza'
  },
  {
    id: 'l6',
    corso: 'Storia dell\'Arte Contemporanea',
    docente: 'Prof.ssa Laura Bianchi',
    giorno: '2026-01-05',
    oraInizio: '14:00',
    oraFine: '16:00',
    aula: 'Aula Magna',
    tipo: 'presenza'
  },
  {
    id: 'l7',
    corso: 'Pittura 1',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-05',
    oraInizio: '16:30',
    oraFine: '18:30',
    aula: 'Atelier 3',
    tipo: 'presenza'
  },

  // Martedì 6 Gennaio
  {
    id: 'l8',
    corso: 'Teoria della Percezione',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-06',
    oraInizio: '09:00',
    oraFine: '11:00',
    aula: 'Aula 5',
    tipo: 'presenza'
  },
  {
    id: 'l9',
    corso: 'Anatomia Artistica',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-06',
    oraInizio: '11:30',
    oraFine: '13:30',
    aula: 'Aula 2',
    tipo: 'presenza'
  },
  {
    id: 'l10',
    corso: 'Tecniche Pittoriche',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-06',
    oraInizio: '14:00',
    oraFine: '17:00',
    aula: 'Atelier 1',
    tipo: 'presenza'
  },

  // Mercoledì 7 Gennaio
  {
    id: 'l11',
    corso: 'Storia dell\'Arte Contemporanea',
    docente: 'Prof.ssa Laura Bianchi',
    giorno: '2026-01-07',
    oraInizio: '09:00',
    oraFine: '11:00',
    aula: 'Aula Magna',
    tipo: 'presenza'
  },
  {
    id: 'l12',
    corso: 'Pittura 1',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-07',
    oraInizio: '11:30',
    oraFine: '14:00',
    aula: 'Atelier 3',
    tipo: 'presenza'
  },
  {
    id: 'l13',
    corso: 'Anatomia Artistica',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-07',
    oraInizio: '14:30',
    oraFine: '16:30',
    linkOnline: 'https://meet.google.com/abc-defg-hij',
    tipo: 'online'
  },

  // Giovedì 8 Gennaio  
  {
    id: 'l14',
    corso: 'Tecniche Pittoriche',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-08',
    oraInizio: '09:00',
    oraFine: '12:00',
    aula: 'Atelier 1',
    tipo: 'presenza'
  },
  {
    id: 'l15',
    corso: 'Teoria della Percezione',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-08',
    oraInizio: '12:30',
    oraFine: '14:30',
    aula: 'Aula 5',
    tipo: 'presenza'
  },
  {
    id: 'l16',
    corso: 'Storia dell\'Arte Contemporanea',
    docente: 'Prof.ssa Laura Bianchi',
    giorno: '2026-01-08',
    oraInizio: '15:00',
    oraFine: '17:00',
    aula: 'Aula Magna',
    tipo: 'presenza'
  },

  // Venerdì 9 Gennaio
  {
    id: 'l17',
    corso: 'Pittura 1',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-09',
    oraInizio: '09:00',
    oraFine: '12:00',
    aula: 'Atelier 3',
    tipo: 'presenza'
  },
  {
    id: 'l18',
    corso: 'Anatomia Artistica',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-09',
    oraInizio: '13:00',
    oraFine: '15:00',
    aula: 'Aula 2',
    tipo: 'presenza'
  },
  {
    id: 'l19',
    corso: 'Tecniche Pittoriche',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-09',
    oraInizio: '15:30',
    oraFine: '17:30',
    aula: 'Atelier 1',
    tipo: 'presenza'
  },

  // Sabato 10 Gennaio
  {
    id: 'l20',
    corso: 'Tecniche Pittoriche',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-10',
    oraInizio: '10:00',
    oraFine: '13:00',
    aula: 'Atelier 1',
    tipo: 'presenza'
  },

  // Lunedì 12 Gennaio
  {
    id: 'l21',
    corso: 'Teoria della Percezione',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-12',
    oraInizio: '09:00',
    oraFine: '11:00',
    aula: 'Aula 5',
    tipo: 'presenza'
  },
  {
    id: 'l22',
    corso: 'Anatomia Artistica',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-12',
    oraInizio: '14:00',
    oraFine: '16:00',
    linkOnline: 'https://meet.google.com/abc-defg-hij',
    tipo: 'online'
  },
  
  // Martedì 13 Gennaio
  {
    id: 'l23',
    corso: 'Storia dell\'Arte Contemporanea',
    docente: 'Prof.ssa Laura Bianchi',
    giorno: '2026-01-13',
    oraInizio: '14:00',
    oraFine: '16:00',
    aula: 'Aula Magna',
    tipo: 'presenza'
  },

  // Mercoledì 14 Gennaio
  {
    id: 'l24',
    corso: 'Pittura 1',
    docente: 'Prof. Mario Neri',
    giorno: '2026-01-14',
    oraInizio: '09:00',
    oraFine: '12:00',
    aula: 'Atelier 3',
    tipo: 'presenza'
  },

  // Giovedì 16 Gennaio - Solo una lezione
  {
    id: 'l25',
    corso: 'Anatomia Artistica',
    docente: 'Prof. Francesco Blu',
    giorno: '2026-01-16',
    oraInizio: '10:00',
    oraFine: '12:00',
    aula: 'Aula 2',
    tipo: 'presenza'
  },
  {
    id: 'l6',
    corso: 'Storia dell\'Arte Contemporanea',
    docente: 'Prof.ssa Laura Bianchi',
    giorno: '2024-12-09',
    oraInizio: '14:00',
    oraFine: '16:00',
    aula: 'Aula 12',
    tipo: 'presenza'
  },
  {
    id: 'l7',
    corso: 'Pittura 1',
    docente: 'Prof. Mario Neri',
    giorno: '2024-12-10',
    oraInizio: '09:00',
    oraFine: '12:00',
    aula: 'Laboratorio A',
    tipo: 'presenza'
  },
  {
    id: 'l8',
    corso: 'Anatomia Artistica',
    docente: 'Prof. Francesco Blu',
    giorno: '2024-12-12',
    oraInizio: '10:00',
    oraFine: '12:00',
    aula: 'Aula 15',
    tipo: 'presenza'
  }
];

export const mockPresenze: Presenza[] = [
  // Storia dell'Arte Contemporanea - 100% presenze (completo)
  { id: 'p1', studenteId: '1', lezioneId: 'l1', corso: 'Storia dell\'Arte Contemporanea', data: '2024-10-07', stato: 'presente' },
  { id: 'p2', studenteId: '1', lezioneId: 'l1', corso: 'Storia dell\'Arte Contemporanea', data: '2024-10-14', stato: 'presente' },
  { id: 'p3', studenteId: '1', lezioneId: 'l1', corso: 'Storia dell\'Arte Contemporanea', data: '2024-10-21', stato: 'presente' },
  { id: 'p4', studenteId: '1', lezioneId: 'l1', corso: 'Storia dell\'Arte Contemporanea', data: '2024-10-28', stato: 'presente' },
  { id: 'p5', studenteId: '1', lezioneId: 'l1', corso: 'Storia dell\'Arte Contemporanea', data: '2024-11-04', stato: 'presente' },
  { id: 'p6', studenteId: '1', lezioneId: 'l1', corso: 'Storia dell\'Arte Contemporanea', data: '2024-11-11', stato: 'presente' },
  { id: 'p7', studenteId: '1', lezioneId: 'l1', corso: 'Storia dell\'Arte Contemporanea', data: '2024-11-18', stato: 'presente' },
  { id: 'p8', studenteId: '1', lezioneId: 'l1', corso: 'Storia dell\'Arte Contemporanea', data: '2024-11-25', stato: 'presente' },
  { id: 'p9', studenteId: '1', lezioneId: 'l1', corso: 'Storia dell\'Arte Contemporanea', data: '2024-12-02', stato: 'presente' },
  
  // Pittura 1 - 87.5% presenze (a rischio lieve)
  { id: 'p10', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-10-03', stato: 'presente' },
  { id: 'p11', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-10-10', stato: 'presente' },
  { id: 'p12', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-10-17', stato: 'ritardo', motivazione: 'Ritardo mezzi pubblici' },
  { id: 'p13', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-10-24', stato: 'presente' },
  { id: 'p14', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-10-31', stato: 'assente', motivazione: 'Malattia' },
  { id: 'p15', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-11-07', stato: 'presente' },
  { id: 'p16', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-11-14', stato: 'presente' },
  { id: 'p17', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-11-21', stato: 'presente' },
  { id: 'p18', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-11-28', stato: 'presente' },
  { id: 'p19', studenteId: '1', lezioneId: 'l2', corso: 'Pittura 1', data: '2024-12-05', stato: 'presente' },

  // Anatomia Artistica - 70% presenze (a rischio sforamento!)
  { id: 'p20', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-10-04', stato: 'presente' },
  { id: 'p21', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-10-11', stato: 'assente' },
  { id: 'p22', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-10-18', stato: 'presente' },
  { id: 'p23', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-10-25', stato: 'assente', motivazione: 'Problemi familiari' },
  { id: 'p24', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-11-08', stato: 'ritardo', motivazione: 'Ritardo mezzi pubblici' },
  { id: 'p25', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-11-15', stato: 'presente' },
  { id: 'p26', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-11-22', stato: 'presente' },
  { id: 'p27', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-11-29', stato: 'assente' },
  { id: 'p28', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-12-06', stato: 'presente' },
  { id: 'p29', studenteId: '1', lezioneId: 'l3', corso: 'Anatomia Artistica', data: '2024-12-13', stato: 'ritardo', motivazione: 'Visita medica' },

  // Tecniche Pittoriche - 92% presenze (ottimo)
  { id: 'p30', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-10-02', stato: 'presente' },
  { id: 'p31', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-10-09', stato: 'presente' },
  { id: 'p32', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-10-16', stato: 'presente' },
  { id: 'p33', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-10-23', stato: 'presente' },
  { id: 'p34', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-10-30', stato: 'presente' },
  { id: 'p35', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-11-06', stato: 'assente', motivazione: 'Malattia' },
  { id: 'p36', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-11-13', stato: 'presente' },
  { id: 'p37', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-11-20', stato: 'presente' },
  { id: 'p38', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-11-27', stato: 'presente' },
  { id: 'p39', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-12-04', stato: 'presente' },
  { id: 'p40', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-12-11', stato: 'presente' },
  { id: 'p41', studenteId: '1', lezioneId: 'l4', corso: 'Tecniche Pittoriche', data: '2024-12-18', stato: 'presente' },

  // Teoria della Percezione - 83% presenze (buono)
  { id: 'p42', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-10-01', stato: 'presente' },
  { id: 'p43', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-10-08', stato: 'presente' },
  { id: 'p44', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-10-15', stato: 'presente' },
  { id: 'p45', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-10-22', stato: 'assente' },
  { id: 'p46', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-10-29', stato: 'ritardo', motivazione: 'Traffico' },
  { id: 'p47', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-11-05', stato: 'presente' },
  { id: 'p48', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-11-12', stato: 'presente' },
  { id: 'p49', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-11-19', stato: 'presente' },
  { id: 'p50', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-11-26', stato: 'assente' },
  { id: 'p51', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-12-03', stato: 'presente' },
  { id: 'p52', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-12-10', stato: 'presente' },
  { id: 'p53', studenteId: '1', lezioneId: 'l5', corso: 'Teoria della Percezione', data: '2024-12-17', stato: 'presente' }
];

export const mockFeedback: Feedback[] = [
  {
    id: 'f1',
    studenteId: '1',
    corso: 'Pittura 1',
    elaborato: 'Studio compositivo n.3',
    voto: 28,
    commento: 'Ottimo uso del colore e buona composizione generale. Si nota un miglioramento significativo rispetto agli elaborati precedenti, soprattutto nella gestione degli spazi e nella resa cromatica. Lavorare ancora sulle proporzioni, in particolare nel rapporto figura-sfondo. Continua così!',
    data: '2024-12-01',
    letto: false
  },
  {
    id: 'f2',
    studenteId: '1',
    corso: 'Storia dell\'Arte Contemporanea',
    elaborato: 'Analisi critica Warhol',
    voto: 30,
    commento: 'Eccellente analisi critica. Approfondimento molto interessante sul contesto storico e sociale della Pop Art. La tua interpretazione del ruolo di Warhol nella società consumistica è particolarmente acuta. Ottima capacità di collegamento tra l\'opera artistica e il periodo storico. La bibliografia utilizzata è appropriata e ben integrata nel discorso. Complimenti per la qualità della ricerca!',
    data: '2024-11-28',
    letto: true
  },
  {
    id: 'f3',
    studenteId: '1',
    corso: 'Tecniche Pittoriche',
    elaborato: 'Esercitazione acrilico su tela',
    voto: 26,
    commento: 'Buon lavoro complessivo sull\'uso dell\'acrilico. La scelta cromatica è interessante e dimostra una buona comprensione della teoria del colore. Tuttavia, si nota ancora qualche difficoltà nella gestione dei tempi di asciugatura rapida tipici di questo medium. Ti consiglio di lavorare per velature sovrapposte per ottenere maggiore profondità. La composizione funziona bene, ma potresti osare di più con i contrasti tonali.',
    data: '2024-11-15',
    letto: true
  }
];

export const mockElaborati: Elaborato[] = [
  {
    id: 'e1',
    studenteId: '1',
    corso: 'Pittura 1',
    titolo: 'Studio compositivo n.3',
    descrizione: 'Elaborato pratico su composizione e teoria del colore',
    dataConsegna: '2024-11-30',
    scadenza: '2024-11-30',
    voto: 28,
    feedback: 'Ottimo uso del colore e buona composizione.',
    stato: 'valutato'
  },
  {
    id: 'e2',
    studenteId: '1',
    corso: 'Anatomia Artistica',
    titolo: 'Disegno anatomico - Figura intera',
    descrizione: 'Studio anatomico della figura umana',
    scadenza: '2025-12-15',
    stato: 'in-attesa'
  },
  {
    id: 'e3',
    studenteId: '1',
    corso: 'Storia dell\'Arte Contemporanea',
    titolo: 'Analisi critica Andy Warhol',
    descrizione: 'Saggio critico sull\'opera di Andy Warhol e la Pop Art',
    dataConsegna: '2024-11-25',
    scadenza: '2024-11-28',
    voto: 30,
    feedback: 'Eccellente analisi critica. Approfondimento molto interessante sul contesto storico e sociale. Ottima capacità di collegare l\'opera al periodo di riferimento.',
    stato: 'valutato'
  },
  {
    id: 'e4',
    studenteId: '1',
    corso: 'Tecniche Pittoriche',
    titolo: 'Esercitazione tecnica ad olio',
    descrizione: 'Studio sulla tecnica pittorica ad olio',
    dataConsegna: '2024-11-18',
    scadenza: '2024-11-20',
    voto: 27,
    feedback: 'Buon lavoro sulle tecniche di base. La stesura del colore è migliorata rispetto agli elaborati precedenti. Continuare a lavorare sulla gestione della luce.',
    stato: 'valutato'
  },
  {
    id: 'e5',
    studenteId: '1',
    corso: 'Pittura 1',
    titolo: 'Studio compositivo n.2',
    descrizione: 'Composizione con natura morta',
    dataConsegna: '2024-11-10',
    scadenza: '2024-11-15',
    voto: 26,
    feedback: 'Buona impostazione generale. Migliorare il rapporto tra luci e ombre.',
    stato: 'valutato'
  },
  {
    id: 'e6',
    studenteId: '1',
    corso: 'Teoria della Percezione',
    titolo: 'Relazione su Gestalt e percezione',
    descrizione: 'Approfondimento teorico sui principi della Gestalt',
    dataConsegna: '2024-11-05',
    scadenza: '2024-11-08',
    voto: 29,
    feedback: 'Ottima trattazione teorica. Esempi pratici molto pertinenti e ben argomentati.',
    stato: 'valutato'
  },
  {
    id: 'e7',
    studenteId: '1',
    corso: 'Tecniche Pittoriche',
    titolo: 'Portfolio tecniche miste',
    descrizione: 'Raccolta di elaborati con diverse tecniche pittoriche',
    scadenza: '2025-12-18',
    stato: 'in-attesa'
  },
  {
    id: 'e8',
    studenteId: '1',
    corso: 'Anatomia Artistica',
    titolo: 'Studio mani e piedi',
    descrizione: 'Disegni anatomici di dettaglio',
    dataConsegna: '2024-10-28',
    scadenza: '2024-10-30',
    voto: 25,
    feedback: 'Buon inizio. Le proporzioni necessitano di maggiore attenzione. Esercitarsi con il disegno dal vero.',
    stato: 'valutato'
  },
  {
    id: 'e9',
    studenteId: '1',
    corso: 'Storia dell\'Arte Contemporanea',
    titolo: 'Ricerca su Arte Concettuale',
    descrizione: 'Elaborato di ricerca sull\'arte concettuale degli anni \'60-\'70',
    dataConsegna: '2024-12-05',
    scadenza: '2024-12-20',
    stato: 'in-attesa'
  },
  {
    id: 'e10',
    studenteId: '1',
    corso: 'Pittura 1',
    titolo: 'Progetto finale semestre',
    descrizione: 'Opera pittorica originale che sintetizza le tecniche apprese',
    dataConsegna: '2024-12-06',
    scadenza: '2024-12-22',
    stato: 'in-attesa'
  }
];

export const mockRisorse: Risorsa[] = [
  {
    id: 'r1',
    corso: 'Storia dell\'Arte Contemporanea',
    docenteId: '2',
    titolo: 'Dispensa - Le Avanguardie del \'900',
    descrizione: 'Materiale didattico sulle avanguardie storiche: Futurismo, Dadaismo, Surrealismo',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-10-15'
  },
  {
    id: 'r2',
    corso: 'Pittura 1',
    docenteId: '2',
    titolo: 'Tutorial - Tecnica ad olio',
    descrizione: 'Video tutorial sulla tecnica pittorica ad olio',
    tipo: 'video',
    link: 'https://youtube.com/example',
    data: '2024-10-20'
  },
  {
    id: 'r3',
    corso: 'Anatomia Artistica',
    docenteId: '2',
    titolo: 'Bibliografia consigliata',
    descrizione: 'Elenco testi di approfondimento per lo studio anatomico',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-09-30'
  },
  {
    id: 'r4',
    corso: 'Storia dell\'Arte Contemporanea',
    docenteId: '2',
    titolo: 'Dispensa - Pop Art e Warhol',
    descrizione: 'Materiale didattico sulla Pop Art americana e il contributo di Andy Warhol',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-11-05'
  },
  {
    id: 'r5',
    corso: 'Pittura 1',
    docenteId: '2',
    titolo: 'Dispensa - Teoria del Colore',
    descrizione: 'Approfondimento sulla teoria del colore e le armonie cromatiche',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-10-01'
  },
  {
    id: 'r6',
    corso: 'Tecniche Pittoriche',
    docenteId: '2',
    titolo: 'Dispensa - Tecniche miste',
    descrizione: 'Guida completa alle tecniche pittoriche miste e sperimentali',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-10-10'
  },
  {
    id: 'r7',
    corso: 'Anatomia Artistica',
    docenteId: '2',
    titolo: 'Atlante Anatomico',
    descrizione: 'Tavole anatomiche per lo studio della figura umana',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-10-05'
  },
  {
    id: 'r8',
    corso: 'Storia dell\'Arte Contemporanea',
    docenteId: '2',
    titolo: 'Video - Documentario Arte Concettuale',
    descrizione: 'Documentario RAI sull\'arte concettuale degli anni \'60-\'70',
    tipo: 'video',
    link: 'https://youtube.com/example2',
    data: '2024-11-20'
  },
  {
    id: 'r9',
    corso: 'Teoria della Percezione',
    docenteId: '2',
    titolo: 'Dispensa - Principi della Gestalt',
    descrizione: 'Approfondimento sui principi della psicologia della forma',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-09-25'
  },
  {
    id: 'r10',
    corso: 'Pittura 1',
    docenteId: '2',
    titolo: 'Slide - Composizione e Spazio',
    descrizione: 'Presentazione sulle regole compositive e la gestione dello spazio pittorico',
    tipo: 'link',
    link: 'https://drive.google.com/example',
    data: '2024-11-12'
  },
  {
    id: 'r11',
    corso: 'Tecniche Pittoriche',
    docenteId: '2',
    titolo: 'Tutorial - Velature ad olio',
    descrizione: 'Video tutorial sulla tecnica delle velature nella pittura ad olio',
    tipo: 'video',
    link: 'https://youtube.com/example3',
    data: '2024-11-25'
  },
  {
    id: 'r12',
    corso: 'Storia dell\'Arte Contemporanea',
    docenteId: '2',
    titolo: 'Dispensa - Arte Relazionale',
    descrizione: 'Materiale sulle pratiche artistiche relazionali contemporanee',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-11-30'
  },
  {
    id: 'r13',
    corso: 'Pittura 1',
    docenteId: '2',
    titolo: 'Dispensa - Chiaroscuro',
    descrizione: 'Guida completa alla tecnica del chiaroscuro nella pittura',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-11-15'
  },
  {
    id: 'r14',
    corso: 'Anatomia Artistica',
    docenteId: '2',
    titolo: 'Video - Proporzioni del Corpo Umano',
    descrizione: 'Lezione registrata sulle proporzioni anatomiche',
    tipo: 'video',
    link: 'https://youtube.com/example4',
    data: '2024-10-20'
  },
  {
    id: 'r15',
    corso: 'Tecniche Pittoriche',
    docenteId: '2',
    titolo: 'Dispensa - Impasti e Texture',
    descrizione: 'Tecniche per creare impasti e texture pittoriche',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-11-08'
  },
  {
    id: 'r16',
    corso: 'Storia dell\'Arte Contemporanea',
    docenteId: '2',
    titolo: 'Link - Database Museum of Modern Art',
    descrizione: 'Accesso alla collezione digitale del MoMA',
    tipo: 'link',
    link: 'https://moma.org/collection',
    data: '2024-10-12'
  },
  {
    id: 'r17',
    corso: 'Teoria della Percezione',
    docenteId: '2',
    titolo: 'Dispensa - Colore e Percezione',
    descrizione: 'Approfondimento sulla percezione del colore',
    tipo: 'pdf',
    fileUrl: '#',
    data: '2024-10-18'
  },
  {
    id: 'r18',
    corso: 'Pittura 1',
    docenteId: '2',
    titolo: 'Video - Tecniche di Pennellata',
    descrizione: 'Dimostrazione pratica delle diverse tecniche di pennellata',
    tipo: 'video',
    link: 'https://youtube.com/example5',
    data: '2024-12-01'
  }
];

export const mockNotifiche: Notifica[] = [
  // Notifiche studente
  {
    id: 'n1',
    userId: '1',
    tipo: 'urgente',
    titolo: 'Cambio aula - Storia dell\'Arte',
    messaggio: 'La lezione di domani si terrà in Aula 15 anziché Aula 12',
    data: '2024-12-04T15:30:00',
    letta: false,
    priorita: 'alta',
    link: '/calendario'
  },
  {
    id: 'n2',
    userId: '1',
    tipo: 'normale',
    titolo: 'Nuovo feedback disponibile',
    messaggio: 'Il Prof. Neri ha pubblicato il feedback per "Studio compositivo n.3"',
    data: '2024-12-01T10:00:00',
    letta: false,
    priorita: 'media',
    link: '/didattica'
  },
  {
    id: 'n3',
    userId: '1',
    tipo: 'info',
    titolo: 'Scadenza consegna',
    messaggio: 'Ricorda: consegna elaborato Anatomia Artistica entro il 10/12',
    data: '2024-12-03T09:00:00',
    letta: true,
    priorita: 'media',
    link: '/didattica'
  },
  {
    id: 'n4',
    userId: '1',
    tipo: 'normale',
    titolo: 'Nuovo materiale didattico',
    messaggio: 'Nuova dispensa disponibile per Storia dell\'Arte Contemporanea',
    data: '2024-11-29T14:20:00',
    letta: true,
    priorita: 'media',
    link: '/risorse'
  },
  {
    id: 'n5',
    userId: '1',
    tipo: 'info',
    titolo: 'Prossimo appello d\'esame',
    messaggio: 'Appello di Storia dell\'Arte Contemporanea previsto per il 15 gennaio',
    data: '2024-11-28T09:00:00',
    letta: true,
    priorita: 'bassa',
    link: '/calendario'
  },
  {
    id: 'n6',
    userId: '1',
    tipo: 'urgente',
    titolo: 'Attenzione presenze Anatomia Artistica',
    messaggio: 'La tua percentuale di presenza è sotto la soglia minima (70%). Rischi di non poter sostenere l\'esame.',
    data: '2024-12-02T11:00:00',
    letta: false,
    priorita: 'alta',
    link: '/presenze'
  },
  {
    id: 'n7',
    userId: '1',
    tipo: 'info',
    titolo: 'Workshop Fotografia',
    messaggio: 'Workshop con fotografo professionista mercoledì 11 dicembre ore 15:00',
    data: '2024-12-01T16:45:00',
    letta: true,
    priorita: 'media',
    link: '/calendario'
  },
  {
    id: 'n8',
    userId: '1',
    tipo: 'normale',
    titolo: 'Feedback Tecniche Pittoriche',
    messaggio: 'Il Prof. Neri ha valutato il tuo elaborato "Esercitazione tecnica ad olio"',
    data: '2024-11-20T12:30:00',
    letta: true,
    priorita: 'media',
    link: '/didattica'
  },
  
  // Notifiche docente
  {
    id: 'nd1',
    userId: '2',
    tipo: 'urgente',
    titolo: 'Nuovo elaborato consegnato',
    messaggio: 'Marco Rossi ha consegnato l\'elaborato "Analisi critica Warhol" per Storia dell\'Arte Contemporanea',
    data: '2024-12-04T16:20:00',
    letta: false,
    priorita: 'alta',
    link: '/didattica'
  },
  {
    id: 'nd2',
    userId: '2',
    tipo: 'normale',
    titolo: 'Promemoria verbalizzazione esami',
    messaggio: 'Scadenza verbalizzazione appello del 15 gennaio: 31 gennaio 2025',
    data: '2024-12-03T09:00:00',
    letta: false,
    priorita: 'media',
    link: '/didattica'
  },
  {
    id: 'nd3',
    userId: '2',
    tipo: 'urgente',
    titolo: 'Richiesta ricevimento studente',
    messaggio: 'Giulia Verdi ha richiesto un ricevimento urgente per chiarimenti sul progetto finale',
    data: '2024-12-01T11:30:00',
    letta: false,
    priorita: 'alta',
    link: '/contatti'
  },
  {
    id: 'nd4',
    userId: '2',
    tipo: 'info',
    titolo: 'Convocazione collegio docenti',
    messaggio: 'Collegio docenti straordinario mercoledì 18 dicembre ore 14:30 - Aula Magna',
    data: '2024-12-02T10:15:00',
    letta: true,
    priorita: 'alta',
    link: '/calendario'
  },
  {
    id: 'nd5',
    userId: '2',
    titolo: 'Presenze lezione incomplete',
    messaggio: 'Attenzione: presenze della lezione del 28 novembre non ancora confermate',
    data: '2024-11-29T08:00:00',
    letta: true,
    priorita: 'media',
    link: '/presenze'
  },
  {
    id: 'nd6',
    userId: '2',
    tipo: 'normale',
    titolo: '5 elaborati in attesa di valutazione',
    messaggio: 'Hai 5 elaborati di Storia dell\'Arte Contemporanea da valutare entro il 15 dicembre',
    data: '2024-12-01T09:00:00',
    letta: false,
    priorita: 'media',
    link: '/didattica'
  },
  {
    id: 'nd7',
    userId: '2',
    tipo: 'info',
    titolo: 'Aggiornamento aule esami',
    messaggio: 'L\'appello del 15 gennaio si terrà in Aula 20 anziché Aula 12',
    data: '2024-11-30T14:45:00',
    letta: true,
    priorita: 'bassa',
    link: '/calendario'
  },
  {
    id: 'nd8',
    userId: '2',
    tipo: 'normale',
    titolo: 'Richiesta materiali workshop',
    messaggio: 'La segreteria richiede la lista dei materiali necessari per il workshop del 14 dicembre',
    data: '2024-11-28T10:30:00',
    letta: true,
    priorita: 'media',
    link: '/risorse'
  },
  {
    id: 'nd9',
    userId: '2',
    tipo: 'info',
    titolo: 'Nuova circolare didattica',
    messaggio: 'Disponibile la circolare n.45/2024 sulle modalità di valutazione',
    data: '2024-11-27T15:00:00',
    letta: true,
    priorita: 'bassa',
    link: '/risorse'
  },
  {
    id: 'nd10',
    userId: '2',
    tipo: 'normale',
    titolo: 'Feedback richiesto dagli studenti',
    messaggio: '3 studenti hanno richiesto chiarimenti sui feedback degli elaborati precedenti',
    data: '2024-11-26T16:20:00',
    letta: true,
    priorita: 'media',
    link: '/didattica'
  }
];

export const mockEsamiUfficiali: EsameUfficiale[] = [
  {
    id: 'eu1',
    corso: 'Fenomenologia dell\'Arte',
    voto: 28,
    data: '2024-07-15',
    cfu: 6,
    lode: false
  },
  {
    id: 'eu2',
    corso: 'Cromatologia',
    voto: 30,
    data: '2024-07-20',
    cfu: 6,
    lode: true
  }
];

export const mockCarriera: Carriera = {
  mediaPonderata: 28.5,
  cfuTotali: 180,
  cfuConseguiti: 12,
  esamiSostenuti: 2
};

export const mockEventiCalendario: EventoCalendario[] = [
  // SETTIMANA CORRENTE - 3-9 Gennaio 2026
  // Sabato 3 Gennaio (Oggi)
  { id: 'ev1', titolo: 'Storia dell\'Arte Contemporanea', data: '2026-01-03', oraInizio: '09:00', oraFine: '11:00', tipo: 'lezione', corso: 'Storia dell\'Arte Contemporanea', aula: 'Aula Magna' },
  { id: 'ev2', titolo: 'Pittura 1', data: '2026-01-03', oraInizio: '11:30', oraFine: '13:30', tipo: 'lezione', corso: 'Pittura 1', aula: 'Atelier 3' },
  { id: 'ev3', titolo: 'Teoria della Percezione', data: '2026-01-03', oraInizio: '14:00', oraFine: '16:00', tipo: 'lezione', corso: 'Teoria della Percezione', aula: 'Aula 5' },

  // Lunedì 5 Gennaio
  { id: 'ev4', titolo: 'Anatomia Artistica (Online)', data: '2026-01-05', oraInizio: '09:00', oraFine: '11:00', tipo: 'lezione', corso: 'Anatomia Artistica', linkMeet: 'https://meet.google.com/abc-defg-hij', linkClassroom: 'https://classroom.google.com/c/NjY4OTQ1Njc4OTEz' },
  { id: 'ev5', titolo: 'Tecniche Pittoriche', data: '2026-01-05', oraInizio: '11:30', oraFine: '13:30', tipo: 'lezione', corso: 'Tecniche Pittoriche', aula: 'Atelier 1' },
  { id: 'ev6', titolo: 'Storia dell\'Arte Contemporanea', data: '2026-01-05', oraInizio: '14:00', oraFine: '16:00', tipo: 'lezione', corso: 'Storia dell\'Arte Contemporanea', aula: 'Aula Magna' },
  { id: 'ev7', titolo: 'Pittura 1 - Laboratorio', data: '2026-01-05', oraInizio: '16:30', oraFine: '18:30', tipo: 'lezione', corso: 'Pittura 1', aula: 'Atelier 3' },

  // Martedì 6 Gennaio
  { id: 'ev8', titolo: 'Teoria della Percezione', data: '2026-01-06', oraInizio: '09:00', oraFine: '11:00', tipo: 'lezione', corso: 'Teoria della Percezione', aula: 'Aula 5' },
  { id: 'ev9', titolo: 'Anatomia Artistica', data: '2026-01-06', oraInizio: '11:30', oraFine: '13:30', tipo: 'lezione', corso: 'Anatomia Artistica', aula: 'Aula 2' },
  { id: 'ev10', titolo: 'Tecniche Pittoriche - Pratica', data: '2026-01-06', oraInizio: '14:00', oraFine: '17:00', tipo: 'lezione', corso: 'Tecniche Pittoriche', aula: 'Atelier 1' },
  { id: 'ev10a', titolo: 'Grafica Editoriale (Online)', data: '2026-01-06', oraInizio: '15:00', oraFine: '17:00', tipo: 'lezione', corso: 'Grafica Editoriale', linkMeet: 'https://meet.google.com/ghi-jklm-nop', linkClassroom: 'https://classroom.google.com/c/NjY4OTQ1Njc4OTE0' },
  { id: 'ev11', titolo: 'Seminario Design', data: '2026-01-06', oraInizio: '17:30', oraFine: '19:00', tipo: 'evento', descrizione: 'Seminario introduttivo al design contemporaneo', aula: 'Aula 3' },

  // Mercoledì 7 Gennaio
  { id: 'ev12', titolo: 'Storia dell\'Arte Contemporanea', data: '2026-01-07', oraInizio: '09:00', oraFine: '11:00', tipo: 'lezione', corso: 'Storia dell\'Arte Contemporanea', aula: 'Aula Magna' },
  { id: 'ev13', titolo: 'Pittura 1', data: '2026-01-07', oraInizio: '11:30', oraFine: '14:00', tipo: 'lezione', corso: 'Pittura 1', aula: 'Atelier 3' },
  { id: 'ev14', titolo: 'Anatomia Artistica (Online)', data: '2026-01-07', oraInizio: '14:30', oraFine: '16:30', tipo: 'lezione', corso: 'Anatomia Artistica', linkMeet: 'https://meet.google.com/abc-defg-hij', linkClassroom: 'https://classroom.google.com/c/NjY4OTQ1Njc4OTEz' },
  { id: 'ev14a', titolo: 'Illustrazione Digitale', data: '2026-01-07', oraInizio: '15:00', oraFine: '17:00', tipo: 'lezione', corso: 'Illustrazione Digitale', aula: 'Lab Informatico 2' },
  { id: 'ev15', titolo: 'Workshop Fotografia', data: '2026-01-07', oraInizio: '17:00', oraFine: '19:00', tipo: 'evento', descrizione: 'Workshop con fotografo professionista', aula: 'Aula 3' },

  // Giovedì 8 Gennaio
  { id: 'ev16', titolo: 'Tecniche Pittoriche', data: '2026-01-08', oraInizio: '09:00', oraFine: '12:00', tipo: 'lezione', corso: 'Tecniche Pittoriche', aula: 'Atelier 1' },
  { id: 'ev16a', titolo: 'Storia del Design (Online)', data: '2026-01-08', oraInizio: '10:00', oraFine: '12:00', tipo: 'lezione', corso: 'Storia del Design', linkMeet: 'https://meet.google.com/qrs-tuvw-xyz', linkClassroom: 'https://classroom.google.com/c/NjY4OTQ1Njc4OTE1' },
  { id: 'ev17', titolo: 'Teoria della Percezione', data: '2026-01-08', oraInizio: '12:30', oraFine: '14:30', tipo: 'lezione', corso: 'Teoria della Percezione', aula: 'Aula 5' },
  { id: 'ev18', titolo: 'Consegna elaborato Anatomia', data: '2026-01-08', tipo: 'scadenza', corso: 'Anatomia Artistica', descrizione: 'Disegno anatomico - Figura intera' },
  { id: 'ev19', titolo: 'Storia dell\'Arte - Revisione', data: '2026-01-08', oraInizio: '15:00', oraFine: '17:00', tipo: 'lezione', corso: 'Storia dell\'Arte Contemporanea', aula: 'Aula Magna' },

  // Venerdì 9 Gennaio
  { id: 'ev20', titolo: 'Pittura 1 - Esercitazione', data: '2026-01-09', oraInizio: '09:00', oraFine: '12:00', tipo: 'lezione', corso: 'Pittura 1', aula: 'Atelier 3' },
  { id: 'ev20a', titolo: 'Video Art (Online)', data: '2026-01-09', oraInizio: '10:00', oraFine: '12:00', tipo: 'lezione', corso: 'Video Art', linkMeet: 'https://meet.google.com/vwa-bcde-fgh', linkClassroom: 'https://classroom.google.com/c/NjY4OTQ1Njc4OTE2' },
  { id: 'ev21', titolo: 'Anatomia Artistica', data: '2026-01-09', oraInizio: '13:00', oraFine: '15:00', tipo: 'lezione', corso: 'Anatomia Artistica', aula: 'Aula 2' },
  { id: 'ev22', titolo: 'Tecniche Pittoriche - Teoria', data: '2026-01-09', oraInizio: '15:30', oraFine: '17:30', tipo: 'lezione', corso: 'Tecniche Pittoriche', aula: 'Atelier 1' },
  { id: 'ev23', titolo: 'Aperitivo culturale', data: '2026-01-09', oraInizio: '18:00', oraFine: '20:00', tipo: 'evento', descrizione: 'Incontro informale con artisti locali', aula: 'Galleria ABAMC' },

  // SETTIMANA SUCCESSIVA - 10-16 Gennaio
  { id: 'ev24', titolo: 'Tecniche Pittoriche', data: '2026-01-10', oraInizio: '10:00', oraFine: '13:00', tipo: 'lezione', corso: 'Tecniche Pittoriche', aula: 'Atelier 1' },
  { id: 'ev25', titolo: 'Scadenza iscrizione esami', data: '2026-01-10', tipo: 'scadenza', descrizione: 'Ultimo giorno per iscriversi agli esami della sessione invernale' },
  { id: 'ev26', titolo: 'Workshop Fotografia Avanzato', data: '2026-01-11', oraInizio: '15:00', oraFine: '18:00', tipo: 'evento', descrizione: 'Workshop con fotografo professionista', aula: 'Aula 3' },
  { id: 'ev27', titolo: 'Teoria della Percezione', data: '2026-01-12', oraInizio: '09:00', oraFine: '11:00', tipo: 'lezione', corso: 'Teoria della Percezione', aula: 'Aula 5' },
  { id: 'ev27a', titolo: 'Multimedialità (Online)', data: '2026-01-12', oraInizio: '10:00', oraFine: '12:00', tipo: 'lezione', corso: 'Multimedialità', linkMeet: 'https://meet.google.com/ijk-lmno-pqr', linkClassroom: 'https://classroom.google.com/c/NjY4OTQ1Njc4OTE3' },
  { id: 'ev28', titolo: 'Consegna portfolio Tecniche Pittoriche', data: '2026-01-12', tipo: 'scadenza', corso: 'Tecniche Pittoriche', descrizione: 'Portfolio tecniche miste' },
  { id: 'ev29', titolo: 'Storia dell\'Arte Contemporanea', data: '2026-01-13', oraInizio: '14:00', oraFine: '16:00', tipo: 'lezione', corso: 'Storia dell\'Arte Contemporanea', aula: 'Aula Magna' },
  { id: 'ev30', titolo: 'Pittura 1', data: '2026-01-14', oraInizio: '09:00', oraFine: '12:00', tipo: 'lezione', corso: 'Pittura 1', aula: 'Atelier 3' },
  { id: 'ev31', titolo: 'Conferenza Arte Contemporanea', data: '2026-01-14', oraInizio: '15:00', oraFine: '18:00', tipo: 'evento', descrizione: 'Incontro con curatore d\'arte contemporanea', aula: 'Aula Magna' },
  { id: 'ev32', titolo: 'Appello Storia dell\'Arte Contemporanea', data: '2026-01-15', oraInizio: '09:00', tipo: 'esame', corso: 'Storia dell\'Arte Contemporanea', descrizione: 'Primo appello sessione invernale', aula: 'Aula Magna' },
  { id: 'ev33', titolo: 'Anatomia Artistica', data: '2026-01-16', oraInizio: '10:00', oraFine: '12:00', tipo: 'lezione', corso: 'Anatomia Artistica', aula: 'Aula 2' },
  
  // RESTO DEL MESE - Eventi importanti
  { id: 'ev34', titolo: 'Appello Teoria della Percezione', data: '2026-01-18', oraInizio: '14:00', tipo: 'esame', corso: 'Teoria della Percezione', descrizione: 'Esame scritto', aula: 'Aula 5' },
  { id: 'ev35', titolo: 'Consegna progetto Pittura', data: '2026-01-20', tipo: 'scadenza', corso: 'Pittura 1', descrizione: 'Consegna elaborato finale primo semestre' },
  { id: 'ev36', titolo: 'Mostra di fine semestre', data: '2026-01-21', oraInizio: '18:00', tipo: 'evento', descrizione: 'Inaugurazione mostra collettiva degli studenti del primo anno', aula: 'Galleria ABAMC' },
  { id: 'ev37', titolo: 'Appello Anatomia Artistica', data: '2026-01-22', oraInizio: '10:00', tipo: 'esame', corso: 'Anatomia Artistica', descrizione: 'Esame pratico', aula: 'Atelier 2' },
  { id: 'ev38', titolo: 'Relazione Storia dell\'Arte', data: '2026-01-24', tipo: 'scadenza', corso: 'Storia dell\'Arte Contemporanea', descrizione: 'Relazione scritta su artista contemporaneo' },
  { id: 'ev39', titolo: 'Appello Pittura 1', data: '2026-01-25', oraInizio: '09:00', tipo: 'esame', corso: 'Pittura 1', descrizione: 'Presentazione portfolio', aula: 'Atelier 3' },
  { id: 'ev40', titolo: 'Appello Tecniche Pittoriche', data: '2026-01-29', oraInizio: '09:00', tipo: 'esame', corso: 'Tecniche Pittoriche', descrizione: 'Esame pratico e teorico', aula: 'Atelier 1' }
];

export const mockPeriodiCalendario: PeriodoCalendario[] = [
  // Anno Accademico 2025-2026 - Calendario Completo
  
  // SETTEMBRE 2025 - Attività Pre-Accademiche
  { id: 'p1', titolo: 'Iscrizioni/Immatricolazioni', dataInizio: '2025-09-01', dataFine: '2025-09-15', tipo: 'iscrizioni', descrizione: 'Periodo iscrizioni e immatricolazioni' },
  { id: 'p2', titolo: 'Orientamento e Accoglienza', dataInizio: '2025-09-16', dataFine: '2025-09-27', tipo: 'workshop', descrizione: 'Giornate di orientamento per nuovi iscritti' },
  { id: 'p3', titolo: 'Preparazione Anno Accademico', dataInizio: '2025-09-28', dataFine: '2025-09-30', tipo: 'pausa-didattica', descrizione: 'Organizzazione aule e materiali didattici' },
  
  // OTTOBRE 2025
  { id: 'p4', titolo: 'Inizio Primo Semestre', dataInizio: '2025-10-01', dataFine: '2025-10-11', tipo: 'lezioni', descrizione: 'Prime settimane di lezione AA 2025-26' },
  { id: 'p5', titolo: 'Seminario di Benvenuto', dataInizio: '2025-10-12', dataFine: '2025-10-18', tipo: 'workshop', descrizione: 'Seminari introduttivi ai corsi' },
  { id: 'p6', titolo: 'Primo Semestre - Lezioni', dataInizio: '2025-10-19', dataFine: '2025-10-31', tipo: 'lezioni', descrizione: 'Lezioni primo semestre' },
  
  // NOVEMBRE 2025
  { id: 'p7', titolo: 'Primo Semestre - Lezioni', dataInizio: '2025-11-01', dataFine: '2025-11-01', tipo: 'lezioni', descrizione: 'Lezioni primo semestre' },
  { id: 'p8', titolo: 'Workshop Autunnale Intensivo', dataInizio: '2025-11-02', dataFine: '2025-11-08', tipo: 'workshop', descrizione: 'Settimana di workshop e laboratori intensivi' },
  { id: 'p9', titolo: 'Primo Semestre - Lezioni', dataInizio: '2025-11-09', dataFine: '2025-11-15', tipo: 'lezioni', descrizione: 'Lezioni primo semestre' },
  { id: 'p10', titolo: 'Revisione Intermedia I Semestre', dataInizio: '2025-11-16', dataFine: '2025-11-22', tipo: 'pausa-didattica', descrizione: 'Pausa didattica per revisioni intermedie progetti' },
  { id: 'p11', titolo: 'Primo Semestre - Lezioni', dataInizio: '2025-11-23', dataFine: '2025-11-30', tipo: 'lezioni', descrizione: 'Lezioni primo semestre' },
  
  // DICEMBRE 2025
  { id: 'p12', titolo: 'Primo Semestre - Lezioni', dataInizio: '2025-12-01', dataFine: '2025-12-07', tipo: 'lezioni', descrizione: 'Lezioni primo semestre' },
  { id: 'p13', titolo: 'Workshop Arte Digitale', dataInizio: '2025-12-08', dataFine: '2025-12-13', tipo: 'workshop', descrizione: 'Workshop tematico arte digitale' },
  { id: 'p14', titolo: 'Primo Semestre - Lezioni Finali', dataInizio: '2025-12-14', dataFine: '2025-12-20', tipo: 'lezioni', descrizione: 'Ultime lezioni primo semestre' },
  { id: 'p15', titolo: 'Vacanze Natalizie', dataInizio: '2025-12-21', dataFine: '2026-01-07', tipo: 'vacanze', descrizione: 'Chiusura per festività natalizie' },
  
  // GENNAIO 2026
  { id: 'p16', titolo: 'Sessione Esami Invernale', dataInizio: '2026-01-08', dataFine: '2026-01-31', tipo: 'esami', descrizione: 'Prima sessione esami AA 2025-26' },
  
  // FEBBRAIO 2026
  { id: 'p17', titolo: 'Sessione Esami Invernale', dataInizio: '2026-02-01', dataFine: '2026-02-08', tipo: 'esami', descrizione: 'Continuazione prima sessione esami' },
  { id: 'p18', titolo: 'Sessione Tesi - Febbraio', dataInizio: '2026-02-09', dataFine: '2026-02-13', tipo: 'tesi', descrizione: 'Sessione lauree e diplomi accademici' },
  { id: 'p19', titolo: 'Pausa Intersemestrale', dataInizio: '2026-02-14', dataFine: '2026-02-15', tipo: 'pausa-didattica', descrizione: 'Preparazione secondo semestre' },
  { id: 'p20', titolo: 'Inizio Secondo Semestre', dataInizio: '2026-02-16', dataFine: '2026-02-28', tipo: 'lezioni', descrizione: 'Lezioni secondo semestre' },
  
  // MARZO 2026
  { id: 'p21', titolo: 'Secondo Semestre - Lezioni', dataInizio: '2026-03-01', dataFine: '2026-03-07', tipo: 'lezioni', descrizione: 'Lezioni secondo semestre' },
  { id: 'p22', titolo: 'Festa della Donna - Evento Speciale', dataInizio: '2026-03-08', dataFine: '2026-03-08', tipo: 'altro', descrizione: 'Conferenza e mostra tematica' },
  { id: 'p23', titolo: 'Secondo Semestre - Lezioni', dataInizio: '2026-03-09', dataFine: '2026-03-14', tipo: 'lezioni', descrizione: 'Lezioni secondo semestre' },
  { id: 'p24', titolo: 'Workshop Primaverile', dataInizio: '2026-03-15', dataFine: '2026-03-21', tipo: 'workshop', descrizione: 'Settimana workshop con artisti ospiti' },
  { id: 'p25', titolo: 'Secondo Semestre - Lezioni', dataInizio: '2026-03-22', dataFine: '2026-03-31', tipo: 'lezioni', descrizione: 'Lezioni secondo semestre' },
  
  // APRILE 2026
  { id: 'p26', titolo: 'Secondo Semestre - Lezioni', dataInizio: '2026-04-01', dataFine: '2026-04-01', tipo: 'lezioni', descrizione: 'Lezioni secondo semestre' },
  { id: 'p27', titolo: 'Vacanze Pasquali', dataInizio: '2026-04-02', dataFine: '2026-04-07', tipo: 'vacanze', descrizione: 'Pausa pasquale' },
  { id: 'p28', titolo: 'Secondo Semestre - Lezioni', dataInizio: '2026-04-08', dataFine: '2026-04-11', tipo: 'lezioni', descrizione: 'Lezioni secondo semestre' },
  { id: 'p29', titolo: 'Revisione Intermedia II Semestre', dataInizio: '2026-04-12', dataFine: '2026-04-18', tipo: 'pausa-didattica', descrizione: 'Pausa didattica per revisioni intermedie progetti' },
  { id: 'p30', titolo: 'Secondo Semestre - Lezioni', dataInizio: '2026-04-19', dataFine: '2026-04-30', tipo: 'lezioni', descrizione: 'Lezioni secondo semestre' },
  
  // MAGGIO 2026
  { id: 'p31', titolo: 'Festa del Lavoro', dataInizio: '2026-05-01', dataFine: '2026-05-01', tipo: 'vacanze', descrizione: 'Festa del Lavoro - Accademia chiusa' },
  { id: 'p32', titolo: 'Secondo Semestre - Lezioni', dataInizio: '2026-05-02', dataFine: '2026-05-09', tipo: 'lezioni', descrizione: 'Lezioni secondo semestre' },
  { id: 'p33', titolo: 'Mostra di Fine Anno', dataInizio: '2026-05-10', dataFine: '2026-05-16', tipo: 'workshop', descrizione: 'Preparazione e allestimento mostra studenti' },
  { id: 'p34', titolo: 'Secondo Semestre - Lezioni Finali', dataInizio: '2026-05-17', dataFine: '2026-05-23', tipo: 'lezioni', descrizione: 'Ultime lezioni secondo semestre' },
  { id: 'p35', titolo: 'Preparazione Esami Estivi', dataInizio: '2026-05-24', dataFine: '2026-05-31', tipo: 'pausa-didattica', descrizione: 'Settimana di preparazione agli esami' },
  
  // GIUGNO 2026
  { id: 'p36', titolo: 'Festa della Repubblica', dataInizio: '2026-06-01', dataFine: '2026-06-02', tipo: 'vacanze', descrizione: 'Festa della Repubblica' },
  { id: 'p37', titolo: 'Sessione Esami Estiva', dataInizio: '2026-06-03', dataFine: '2026-06-30', tipo: 'esami', descrizione: 'Seconda sessione esami AA 2025-26' },
  
  // LUGLIO 2026
  { id: 'p38', titolo: 'Sessione Esami Estiva', dataInizio: '2026-07-01', dataFine: '2026-07-12', tipo: 'esami', descrizione: 'Continuazione seconda sessione esami' },
  { id: 'p39', titolo: 'Sessione Tesi - Luglio', dataInizio: '2026-07-13', dataFine: '2026-07-18', tipo: 'tesi', descrizione: 'Sessione lauree estiva' },
  { id: 'p40', titolo: 'Esami Estivi - Recuperi', dataInizio: '2026-07-19', dataFine: '2026-07-31', tipo: 'esami', descrizione: 'Appelli di recupero sessione estiva' },
  
  // AGOSTO 2026 - VACANZE
  { id: 'p41', titolo: 'Vacanze Estive', dataInizio: '2026-08-01', dataFine: '2026-08-31', tipo: 'vacanze', descrizione: 'Chiusura estiva' },
  
  // SETTEMBRE 2026
  { id: 'p42', titolo: 'Sessione Esami Autunnale', dataInizio: '2026-09-01', dataFine: '2026-09-20', tipo: 'esami', descrizione: 'Terza sessione esami AA 2025-26' },
  { id: 'p43', titolo: 'Sessione Tesi - Settembre', dataInizio: '2026-09-21', dataFine: '2026-09-25', tipo: 'tesi', descrizione: 'Sessione lauree autunnale' },
  { id: 'p44', titolo: 'Chiusura Anno Accademico', dataInizio: '2026-09-26', dataFine: '2026-09-30', tipo: 'pausa-didattica', descrizione: 'Attività amministrative di chiusura AA 2025-26' },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'a1',
    titolo: 'Presenza Perfetta',
    descrizione: '100% di presenze in un corso',
    icona: 'trophy',
    sbloccato: false
  },
  {
    id: 'a2',
    titolo: 'Studente Modello',
    descrizione: 'Tutte le consegne in orario per un mese',
    icona: 'star',
    sbloccato: true,
    dataSblocco: '2024-11-30'
  },
  {
    id: 'a3',
    titolo: 'Esploratore',
    descrizione: 'Hai scaricato tutte le risorse disponibili',
    icona: 'book-open',
    sbloccato: false
  },
  {
    id: 'a4',
    titolo: 'Eccellenza',
    descrizione: 'Media superiore a 28',
    icona: 'award',
    sbloccato: true,
    dataSblocco: '2024-07-20'
  }
];

// Funzioni helper per simulare chiamate API
export const getLezioneCorrente = (): Lezione | null => {
  const ora = new Date();
  const oggi = ora.toISOString().split('T')[0];
  
  return mockLezioni.find(l => {
    if (l.giorno !== oggi) return false;
    const [oraInizio] = l.oraInizio.split(':').map(Number);
    const [oraFine] = l.oraFine.split(':').map(Number);
    const oraCorrente = ora.getHours();
    return oraCorrente >= oraInizio && oraCorrente < oraFine;
  }) || null;
};

export const getProssimaLezione = (): Lezione | null => {
  const ora = new Date();
  const oggi = ora.toISOString().split('T')[0];
  
  return mockLezioni.find(l => {
    if (l.giorno < oggi) return false;
    if (l.giorno === oggi) {
      const [oraInizio] = l.oraInizio.split(':').map(Number);
      return ora.getHours() < oraInizio;
    }
    return true;
  }) || null;
};

export const getPercentualePresenza = (corsoId: string, studenteId: string): number => {
  const presenzeCorso = mockPresenze.filter(
    p => p.corso === corsoId && p.studenteId === studenteId
  );
  
  if (presenzeCorso.length === 0) return 100;
  
  const presenti = presenzeCorso.filter(p => p.stato === 'presente' || p.stato === 'ritardo').length;
  return Math.round((presenti / presenzeCorso.length) * 100);
};

export const getNotificheNonLette = (userId: string): number => {
  return mockNotifiche.filter(n => n.userId === userId && !n.letta).length;
};

export const getNotificheUrgenti = (userId: string): Notifica[] => {
  return mockNotifiche.filter(
    n => n.userId === userId && n.tipo === 'urgente' && !n.letta
  );
};