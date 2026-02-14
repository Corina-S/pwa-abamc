// Dati completi per il sistema Didattica - Studenti e Consegne

export interface StudenteCompleto {
  id: string;
  nome: string;
  cognome: string;
  matricola: string;
  email: string;
}

export interface ConsegnaCompleta {
  id: string;
  corso: string;
  titolo: string;
  descrizione: string;
  scadenza: string; // ISO date
  oraScadenza: string;
  studenteId: string;
  dataConsegna?: string; // ISO date
  oraConsegna?: string;
  testoConsegna?: string;
  fileUrl?: string;
  nomeFile?: string;
  voto?: number;
  feedback?: string;
  stato: 'non-consegnato' | 'consegnato' | 'valutato';
  pesoVoto?: number; // Peso percentuale del voto (es. 20% = 20)
}

// 25 studenti di esempio per i corsi
export const studenti: StudenteCompleto[] = [
  { id: 's1', nome: 'Marco', cognome: 'Rossi', matricola: '2023001', email: 'm.rossi@studenti.abamc.it' },
  { id: 's2', nome: 'Giulia', cognome: 'Bianchi', matricola: '2023002', email: 'g.bianchi@studenti.abamc.it' },
  { id: 's3', nome: 'Alessandro', cognome: 'Verdi', matricola: '2023003', email: 'a.verdi@studenti.abamc.it' },
  { id: 's4', nome: 'Sofia', cognome: 'Neri', matricola: '2023004', email: 's.neri@studenti.abamc.it' },
  { id: 's5', nome: 'Lorenzo', cognome: 'Russo', matricola: '2023005', email: 'l.russo@studenti.abamc.it' },
  { id: 's6', nome: 'Emma', cognome: 'Ferrari', matricola: '2023006', email: 'e.ferrari@studenti.abamc.it' },
  { id: 's7', nome: 'Matteo', cognome: 'Romano', matricola: '2023007', email: 'm.romano@studenti.abamc.it' },
  { id: 's8', nome: 'Chiara', cognome: 'Colombo', matricola: '2023008', email: 'c.colombo@studenti.abamc.it' },
  { id: 's9', nome: 'Luca', cognome: 'Ricci', matricola: '2023009', email: 'l.ricci@studenti.abamc.it' },
  { id: 's10', nome: 'Anna', cognome: 'Marino', matricola: '2023010', email: 'a.marino@studenti.abamc.it' },
  { id: 's11', nome: 'Francesco', cognome: 'Greco', matricola: '2023011', email: 'f.greco@studenti.abamc.it' },
  { id: 's12', nome: 'Martina', cognome: 'Bruno', matricola: '2023012', email: 'm.bruno@studenti.abamc.it' },
  { id: 's13', nome: 'Davide', cognome: 'Gallo', matricola: '2023013', email: 'd.gallo@studenti.abamc.it' },
  { id: 's14', nome: 'Federica', cognome: 'Conti', matricola: '2023014', email: 'f.conti@studenti.abamc.it' },
  { id: 's15', nome: 'Andrea', cognome: 'De Luca', matricola: '2023015', email: 'a.deluca@studenti.abamc.it' },
  { id: 's16', nome: 'Alessia', cognome: 'Mancini', matricola: '2023016', email: 'a.mancini@studenti.abamc.it' },
  { id: 's17', nome: 'Simone', cognome: 'Costa', matricola: '2023017', email: 's.costa@studenti.abamc.it' },
  { id: 's18', nome: 'Elisa', cognome: 'Giordano', matricola: '2023018', email: 'e.giordano@studenti.abamc.it' },
  { id: 's19', nome: 'Nicola', cognome: 'Marchetti', matricola: '2023019', email: 'n.marchetti@studenti.abamc.it' },
  { id: 's20', nome: 'Valentina', cognome: 'Barbieri', matricola: '2023020', email: 'v.barbieri@studenti.abamc.it' },
  { id: 's21', nome: 'Riccardo', cognome: 'Fontana', matricola: '2023021', email: 'r.fontana@studenti.abamc.it' },
  { id: 's22', nome: 'Camilla', cognome: 'Santoro', matricola: '2023022', email: 'c.santoro@studenti.abamc.it' },
  { id: 's23', nome: 'Filippo', cognome: 'Caruso', matricola: '2023023', email: 'f.caruso@studenti.abamc.it' },
  { id: 's24', nome: 'Beatrice', cognome: 'Lombardi', matricola: '2023024', email: 'b.lombardi@studenti.abamc.it' },
  { id: 's25', nome: 'Gabriele', cognome: 'Moretti', matricola: '2023025', email: 'g.moretti@studenti.abamc.it' },
];

// Funzione helper per creare consegne
function creaConsegna(
  id: string,
  corso: string,
  titolo: string,
  descrizione: string,
  scadenza: string,
  oraScadenza: string,
  studenteId: string,
  stato: 'non-consegnato' | 'consegnato' | 'valutato',
  dataConsegna?: string,
  oraConsegna?: string,
  testoConsegna?: string,
  nomeFile?: string,
  voto?: number,
  feedback?: string,
  pesoVoto?: number
): ConsegnaCompleta {
  return {
    id,
    corso,
    titolo,
    descrizione,
    scadenza,
    oraScadenza,
    studenteId,
    stato,
    dataConsegna,
    oraConsegna,
    testoConsegna,
    fileUrl: dataConsegna ? `/elaborati/${nomeFile}` : undefined,
    nomeFile,
    voto,
    feedback,
    pesoVoto,
  };
}

// ===== STORIA DELL'ARTE CONTEMPORANEA (Prof.ssa Laura Bianchi) =====

// Elaborato 1: Analisi critica Andy Warhol (SCADUTO - valutati tutti)
const storiaArte_Warhol: ConsegnaCompleta[] = [
  creaConsegna('csa1-1', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's1', 'valutato', '2024-12-14', '18:30', 'Ho analizzato il rapporto tra Warhol e la società consumistica.', 'rossi_warhol.pdf', 30, 'Eccellente analisi critica. Approfondimento molto interessante sul contesto storico e sociale della Pop Art.', 20),
  creaConsegna('csa1-2', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's2', 'valutato', '2024-12-15', '22:45', 'Relazione completata con focus su Marilyn Monroe.', 'bianchi_warhol.pdf', 28, 'Ottimo lavoro. Buona analisi iconografica.', 20),
  creaConsegna('csa1-3', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's3', 'valutato', '2024-12-13', '10:15', 'Studio su Campbell Soup e serialità.', 'verdi_warhol.pdf', 27, 'Buono. Migliorare la bibliografia.', 20),
  creaConsegna('csa1-4', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's5', 'valutato', '2024-12-15', '20:00', 'Analisi completata.', 'russo_warhol.pdf', 26, 'Sufficiente. Approfondire il contesto storico.', 20),
  creaConsegna('csa1-5', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's6', 'valutato', '2024-12-14', '16:30', 'Saggio sulla Factory.', 'ferrari_warhol.pdf', 29, 'Eccellente ricerca sul contesto sociale.', 20),
  creaConsegna('csa1-6', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's7', 'valutato', '2024-12-15', '19:15', 'Elaborato pronto.', 'romano_warhol.pdf', 25, 'Discreto. Lavorare sulla struttura.', 20),
  creaConsegna('csa1-7', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's9', 'valutato', '2024-12-15', '23:50', 'Consegna ultimo momento.', 'ricci_warhol.pdf', 24, 'Sufficiente ma superficiale.', 20),
  creaConsegna('csa1-8', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's10', 'valutato', '2024-12-12', '11:20', 'Studio approfondito su Pop Art.', 'marino_warhol.pdf', 30, 'Eccellente! Ottima capacità critica.', 20),
  creaConsegna('csa1-9', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's11', 'valutato', '2024-12-15', '21:30', 'Analisi completata.', 'greco_warhol.pdf', 27, 'Molto buono. Ottime fonti.', 20),
  creaConsegna('csa1-10', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's12', 'valutato', '2024-12-14', '14:45', 'Saggio pronto.', 'bruno_warhol.pdf', 28, 'Ottimo lavoro complessivo.', 20),
  creaConsegna('csa1-11', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's16', 'valutato', '2024-12-15', '17:00', 'Elaborato consegnato.', 'mancini_warhol.pdf', 26, 'Buono ma può migliorare.', 20),
  creaConsegna('csa1-12', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's17', 'valutato', '2024-12-15', '15:20', 'Studio completo.', 'costa_warhol.pdf', 29, 'Eccellente analisi critica.', 20),
  creaConsegna('csa1-13', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's20', 'valutato', '2024-12-13', '09:30', 'Saggio anticipato.', 'barbieri_warhol.pdf', 30, 'Perfetto! Ottima scrittura e ricerca.', 20),
  creaConsegna('csa1-14', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's21', 'valutato', '2024-12-15', '12:00', 'Elaborato finito.', 'fontana_warhol.pdf', 27, 'Molto buono.', 20),
  creaConsegna('csa1-15', "Storia dell'Arte Contemporanea", 'Analisi critica Andy Warhol', 'Saggio critico sull\'opera di Andy Warhol e la Pop Art (min. 2000 parole)', '2024-12-15', '23:59', 's24', 'valutato', '2024-12-14', '20:15', 'Consegna pronta.', 'lombardi_warhol.pdf', 28, 'Ottimo approfondimento.', 20),
];

// Elaborato 2: Relazione su artista contemporaneo (IN SCADENZA - mix stati)
const storiaArte_Contemporaneo: ConsegnaCompleta[] = [
  creaConsegna('csa2-1', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's1', 'non-consegnato'),
  creaConsegna('csa2-2', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's2', 'consegnato', '2026-01-02', '10:15', 'Consegno la mia analisi su Banksy e la street art contemporanea.', 'bianchi_banksy.pdf'),
  creaConsegna('csa2-3', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's3', 'consegnato', '2026-01-03', '14:20', 'Studio su Ai Weiwei.', 'verdi_aiweiwei.pdf'),
  creaConsegna('csa2-4', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's5', 'non-consegnato'),
  creaConsegna('csa2-5', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's6', 'consegnato', '2026-01-02', '16:45', 'Analisi Damien Hirst.', 'ferrari_hirst.pdf'),
  creaConsegna('csa2-6', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's7', 'non-consegnato'),
  creaConsegna('csa2-7', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's9', 'non-consegnato'),
  creaConsegna('csa2-8', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's10', 'consegnato', '2026-01-03', '15:20', 'Relazione completata su Marina Abramović.', 'marino_abramovic.pdf'),
  creaConsegna('csa2-9', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's11', 'non-consegnato'),
  creaConsegna('csa2-10', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's12', 'consegnato', '2026-01-03', '11:00', 'Studio su Jeff Koons.', 'bruno_koons.pdf'),
  creaConsegna('csa2-11', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's16', 'non-consegnato'),
  creaConsegna('csa2-12', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's17', 'consegnato', '2026-01-02', '19:30', 'Analisi Yayoi Kusama.', 'costa_kusama.pdf'),
  creaConsegna('csa2-13', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's20', 'non-consegnato'),
  creaConsegna('csa2-14', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's21', 'consegnato', '2026-01-03', '09:15', 'Studio Olafur Eliasson.', 'fontana_eliasson.pdf'),
  creaConsegna('csa2-15', "Storia dell'Arte Contemporanea", 'Relazione su artista contemporaneo', 'Analisi critica di un artista contemporaneo a scelta (min. 2000 parole)', '2026-01-24', '23:59', 's24', 'non-consegnato'),
];

// ===== TECNICHE PITTORICHE (Prof. Mario Neri) =====

// Elaborato 1: Esercitazione acrilico (VALUTATO)
const tecnichePitt_Acrilico: ConsegnaCompleta[] = [
  creaConsegna('ctp1-1', 'Tecniche Pittoriche', 'Esercitazione tecnica acrilico', 'Studio sulla tecnica pittorica con acrilico su tela', '2024-12-10', '23:59', 's1', 'valutato', '2024-12-09', '16:20', 'Ho lavorato con velature sovrapposte.', 'rossi_acrilico.pdf', 26, 'Buon lavoro complessivo sull\'uso dell\'acrilico. Lavorare sui tempi di asciugatura.', 20),
  creaConsegna('ctp1-2', 'Tecniche Pittoriche', 'Esercitazione tecnica acrilico', 'Studio sulla tecnica pittorica con acrilico su tela', '2024-12-10', '23:59', 's4', 'valutato', '2024-12-10', '18:45', 'Studio completo.', 'neri_acrilico.pdf', 28, 'Ottimo controllo della tecnica.', 20),
  creaConsegna('ctp1-3', 'Tecniche Pittoriche', 'Esercitazione tecnica acrilico', 'Studio sulla tecnica pittorica con acrilico su tela', '2024-12-10', '23:59', 's8', 'valutato', '2024-12-09', '14:30', 'Elaborato finito.', 'colombo_acrilico.pdf', 27, 'Molto buona gestione del colore.', 20),
  creaConsegna('ctp1-4', 'Tecniche Pittoriche', 'Esercitazione tecnica acrilico', 'Studio sulla tecnica pittorica con acrilico su tela', '2024-12-10', '23:59', 's13', 'valutato', '2024-12-10', '20:00', 'Lavoro completato.', 'gallo_acrilico.pdf', 25, 'Sufficiente. Migliorare la stesura.', 20),
  creaConsegna('ctp1-5', 'Tecniche Pittoriche', 'Esercitazione tecnica acrilico', 'Studio sulla tecnica pittorica con acrilico su tela', '2024-12-10', '23:59', 's15', 'valutato', '2024-12-08', '11:15', 'Consegna anticipata.', 'deluca_acrilico.pdf', 29, 'Eccellente padronanza tecnica!', 20),
  creaConsegna('ctp1-6', 'Tecniche Pittoriche', 'Esercitazione tecnica acrilico', 'Studio sulla tecnica pittorica con acrilico su tela', '2024-12-10', '23:59', 's19', 'valutato', '2024-12-10', '22:30', 'Studio pronto.', 'marchetti_acrilico.pdf', 24, 'Sufficiente ma può migliorare.', 20),
  creaConsegna('ctp1-7', 'Tecniche Pittoriche', 'Esercitazione tecnica acrilico', 'Studio sulla tecnica pittorica con acrilico su tela', '2024-12-10', '23:59', 's23', 'valutato', '2024-12-10', '19:00', 'Elaborato completo.', 'caruso_acrilico.pdf', 27, 'Molto buono.', 20),
];

// Elaborato 2: Portfolio tecniche miste (IN SCADENZA - mix stati)
const tecnichePitt_Portfolio: ConsegnaCompleta[] = [
  creaConsegna('ctp2-1', 'Tecniche Pittoriche', 'Portfolio tecniche miste', 'Raccolta di elaborati con diverse tecniche pittoriche (min. 5 opere)', '2026-01-18', '23:59', 's1', 'non-consegnato'),
  creaConsegna('ctp2-2', 'Tecniche Pittoriche', 'Portfolio tecniche miste', 'Raccolta di elaborati con diverse tecniche pittoriche (min. 5 opere)', '2026-01-18', '23:59', 's4', 'consegnato', '2026-01-02', '12:30', 'Portfolio con olio, acrilico, tempera, acquarello e tecnica mista.', 'neri_portfolio.pdf'),
  creaConsegna('ctp2-3', 'Tecniche Pittoriche', 'Portfolio tecniche miste', 'Raccolta di elaborati con diverse tecniche pittoriche (min. 5 opere)', '2026-01-18', '23:59', 's8', 'consegnato', '2026-01-03', '10:45', 'Raccolta completata.', 'colombo_portfolio.pdf'),
  creaConsegna('ctp2-4', 'Tecniche Pittoriche', 'Portfolio tecniche miste', 'Raccolta di elaborati con diverse tecniche pittoriche (min. 5 opere)', '2026-01-18', '23:59', 's13', 'non-consegnato'),
  creaConsegna('ctp2-5', 'Tecniche Pittoriche', 'Portfolio tecniche miste', 'Raccolta di elaborati con diverse tecniche pittoriche (min. 5 opere)', '2026-01-18', '23:59', 's15', 'consegnato', '2026-01-02', '18:20', 'Portfolio pronto.', 'deluca_portfolio.pdf'),
  creaConsegna('ctp2-6', 'Tecniche Pittoriche', 'Portfolio tecniche miste', 'Raccolta di elaborati con diverse tecniche pittoriche (min. 5 opere)', '2026-01-18', '23:59', 's19', 'non-consegnato'),
  creaConsegna('ctp2-7', 'Tecniche Pittoriche', 'Portfolio tecniche miste', 'Raccolta di elaborati con diverse tecniche pittoriche (min. 5 opere)', '2026-01-18', '23:59', 's23', 'consegnato', '2026-01-03', '15:00', 'Elaborato completo con 6 opere.', 'caruso_portfolio.pdf'),
];

// ===== FENOMENOLOGIA DELLE ARTI CONTEMPORANEE (Prof.ssa Laura Bianchi) =====

const fenomenologia_Ricerca: ConsegnaCompleta[] = [
  creaConsegna('cfac1-1', 'Fenomenologia delle Arti Contemporanee', 'Ricerca fenomenologica', 'Analisi fenomenologica di un movimento artistico contemporaneo', '2026-01-28', '23:59', 's1', 'non-consegnato'),
  creaConsegna('cfac1-2', 'Fenomenologia delle Arti Contemporanee', 'Ricerca fenomenologica', 'Analisi fenomenologica di un movimento artistico contemporaneo', '2026-01-28', '23:59', 's3', 'consegnato', '2026-01-02', '11:20', 'Ricerca su arte relazionale.', 'verdi_fenomenologia.pdf'),
  creaConsegna('cfac1-3', 'Fenomenologia delle Arti Contemporanee', 'Ricerca fenomenologica', 'Analisi fenomenologica di un movimento artistico contemporaneo', '2026-01-28', '23:59', 's6', 'non-consegnato'),
  creaConsegna('cfac1-4', 'Fenomenologia delle Arti Contemporanee', 'Ricerca fenomenologica', 'Analisi fenomenologica di un movimento artistico contemporaneo', '2026-01-28', '23:59', 's10', 'consegnato', '2026-01-03', '16:40', 'Studio fenomenologico completato.', 'marino_fenomenologia.pdf'),
  creaConsegna('cfac1-5', 'Fenomenologia delle Arti Contemporanee', 'Ricerca fenomenologica', 'Analisi fenomenologica di un movimento artistico contemporaneo', '2026-01-28', '23:59', 's17', 'non-consegnato'),
];

// ===== CONSEGNE URGENTI (IN SCADENZA NEI PROSSIMI 7 GIORNI) =====

// Consegne urgenti per avere sempre qualcosa nella dashboard "Consegne in Scadenza"
const consegneUrgenti: ConsegnaCompleta[] = [
  // Scadenza 6 gennaio (tra 3 giorni)
  creaConsegna('urg1-1', "Storia dell'Arte Contemporanea", 'Scheda artista street art', 'Breve scheda su un artista di street art (max 500 parole)', '2026-01-06', '23:59', 's1', 'non-consegnato'),
  creaConsegna('urg1-2', "Storia dell'Arte Contemporanea", 'Scheda artista street art', 'Breve scheda su un artista di street art (max 500 parole)', '2026-01-06', '23:59', 's5', 'consegnato', '2026-01-02', '14:30', 'Scheda Basquiat.', 'russo_basquiat.pdf'),
  
  // Scadenza 8 gennaio (tra 5 giorni)
  creaConsegna('urg2-1', 'Tecniche Pittoriche', 'Bozzetto progetto finale', 'Bozzetto preparatorio per il progetto finale del corso', '2026-01-08', '23:59', 's1', 'non-consegnato'),
  creaConsegna('urg2-2', 'Tecniche Pittoriche', 'Bozzetto progetto finale', 'Bozzetto preparatorio per il progetto finale del corso', '2026-01-08', '23:59', 's4', 'consegnato', '2026-01-03', '09:00', 'Bozzetto completato.', 'neri_bozzetto.pdf'),
  
  // Scadenza 9 gennaio (tra 6 giorni)
  creaConsegna('urg3-1', 'Fenomenologia delle Arti Contemporanee', 'Riflessione personale', 'Riflessione personale su esperienza artistica contemporanea (300 parole)', '2026-01-09', '23:59', 's1', 'non-consegnato'),
  creaConsegna('urg3-2', 'Fenomenologia delle Arti Contemporanee', 'Riflessione personale', 'Riflessione personale su esperienza artistica contemporanea (300 parole)', '2026-01-09', '23:59', 's3', 'non-consegnato'),
];

// Aggrega tutte le consegne
export const tutteLeConsegne: ConsegnaCompleta[] = [
  ...storiaArte_Warhol,
  ...storiaArte_Contemporaneo,
  ...tecnichePitt_Acrilico,
  ...tecnichePitt_Portfolio,
  ...fenomenologia_Ricerca,
  ...consegneUrgenti,
];

// Helper functions
export function getConsegnePerStudente(studenteId: string): ConsegnaCompleta[] {
  return tutteLeConsegne.filter(c => c.studenteId === studenteId);
}

export function getConsegnePerCorso(corso: string): ConsegnaCompleta[] {
  return tutteLeConsegne.filter(c => c.corso === corso);
}

export function getStudenteById(id: string): StudenteCompleto | undefined {
  return studenti.find(s => s.id === id);
}

export function getConsegnePerCorsoEStudente(corso: string): Map<string, ConsegnaCompleta[]> {
  const mappa = new Map<string, ConsegnaCompleta[]>();
  const consegneCorso = getConsegnePerCorso(corso);
  
  // Raggruppa per titolo consegna
  const consegnePerTitolo = new Map<string, ConsegnaCompleta[]>();
  consegneCorso.forEach(c => {
    const lista = consegnePerTitolo.get(c.titolo) || [];
    lista.push(c);
    consegnePerTitolo.set(c.titolo, lista);
  });
  
  return consegnePerTitolo;
}

// Statistiche globali per dashboard
export function getStatisticheDidatticaDocente(corsiDocente: string[]): {
  daValutare: number;
  valutati: number;
  totaleConsegne: number;
} {
  const consegneDocente = tutteLeConsegne.filter(c => corsiDocente.includes(c.corso));
  return {
    daValutare: consegneDocente.filter(c => c.stato === 'consegnato').length,
    valutati: consegneDocente.filter(c => c.stato === 'valutato').length,
    totaleConsegne: consegneDocente.length,
  };
}

export function getStatisticheDidatticaStudente(studenteId: string): {
  daConsegnare: number;
  inValutazione: number;
  valutati: number;
  totaleConsegne: number;
} {
  const consegneStudente = getConsegnePerStudente(studenteId);
  return {
    daConsegnare: consegneStudente.filter(c => c.stato === 'non-consegnato').length,
    inValutazione: consegneStudente.filter(c => c.stato === 'consegnato').length,
    valutati: consegneStudente.filter(c => c.stato === 'valutato').length,
    totaleConsegne: consegneStudente.length,
  };
}