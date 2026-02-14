export type UserRole = 'studente' | 'docente' | 'amministratore';

export interface User {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: UserRole;
  matricola?: string;
  foto?: string;
  corso?: string;
  annoAccademico?: string;
}

export interface Lezione {
  id: string;
  corso: string;
  docente: string;
  giorno: string;
  oraInizio: string;
  oraFine: string;
  aula?: string;
  linkOnline?: string;
  tipo: 'presenza' | 'online';
}

export interface Presenza {
  id: string;
  studenteId: string;
  lezioneId: string;
  corso: string;
  data: string;
  stato: 'presente' | 'assente' | 'ritardo';
  motivazione?: string;
}

export interface Feedback {
  id: string;
  studenteId: string;
  corso: string;
  elaborato: string;
  voto?: number;
  commento: string;
  data: string;
  letto: boolean;
}

export interface Elaborato {
  id: string;
  studenteId: string;
  corso: string;
  titolo: string;
  descrizione?: string;
  fileUrl?: string;
  dataConsegna: string;
  scadenza: string;
  voto?: number;
  feedback?: string;
  stato: 'in-attesa' | 'valutato';
}

export interface Risorsa {
  id: string;
  corso: string;
  docenteId: string;
  titolo: string;
  descrizione?: string;
  tipo: 'pdf' | 'link' | 'video' | 'altro';
  fileUrl?: string;
  link?: string;
  data: string;
}

export interface Notifica {
  id: string;
  userId: string;
  tipo: 'urgente' | 'normale' | 'info';
  titolo: string;
  messaggio: string;
  data: string;
  letta: boolean;
  priorita: 'alta' | 'media' | 'bassa';
  link?: string; // Link alla risorsa correlata (calendario, didattica, ecc.)
}

export interface Corso {
  id: string;
  nome: string;
  codice: string;
  docente: string;
  anno: number;
  cfu: number;
  ore: number;
  descrizione?: string;
  programma?: string;
  modalitaAccertamento?: string;
  materialeDidattico?: string;
}

export interface EsameUfficiale {
  id: string;
  corso: string;
  voto: number;
  data: string;
  cfu: number;
  lode: boolean;
}

export interface Carriera {
  mediaPonderata: number;
  cfuTotali: number;
  cfuConseguiti: number;
  esamiSostenuti: number;
}

export interface EventoCalendario {
  id: string;
  titolo: string;
  descrizione?: string;
  data: string;
  oraInizio?: string;
  oraFine?: string;
  tipo: 'lezione' | 'scadenza' | 'esame' | 'vacanza' | 'evento';
  corso?: string;
  aula?: string;
  linkMeet?: string;
  linkClassroom?: string;
}

export interface Achievement {
  id: string;
  titolo: string;
  descrizione: string;
  icona: string;
  sbloccato: boolean;
  dataSblocco?: string;
}

export interface PeriodoCalendario {
  id: string;
  titolo: string;
  dataInizio: string;
  dataFine: string;
  tipo: 'vacanze' | 'esami' | 'lezioni' | 'tesi' | 'pausa-didattica' | 'workshop' | 'iscrizioni' | 'altro';
  descrizione?: string;
}