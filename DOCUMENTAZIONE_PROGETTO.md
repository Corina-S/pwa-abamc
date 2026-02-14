# Documentazione - PWA for ABAMC Users

## 📋 Indice
1. [Panoramica](#panoramica)
2. [Caratteristiche Principali](#caratteristiche-principali)
3. [Tecnologie Utilizzate](#tecnologie-utilizzate)
4. [Struttura Generale](#struttura-generale)
5. [Descrizione Pagine](#descrizione-pagine)
6. [Colori e Branding](#colori-e-branding)
7. [Conclusioni](#conclusioni)

---

## Panoramica

**PWA for ABAMC Users** è una Progressive Web App moderna sviluppata per l'Accademia di Belle Arti di Macerata. L'applicazione fornisce un'interfaccia unica per tre categorie di utenti:

- **Studenti**: Accesso a dashboard personale, calendario lezioni, registrazione presenze, gestione elaborati, materiale didattico e profilo
- **Docenti**: Gestione lezioni, registrazione presenze degli studenti, valutazione elaborati, caricamento risorse e comunicazioni
- **Amministratori**: Gestione utenti e contenuti (in sviluppo futuro)

L'app funziona sia online che offline, con sincronizzazione automativa dei dati quando la connessione torna attiva. È installabile come app nativa su smartphone e supporta notifiche push.

---

## Caratteristiche Principali

### Per Studenti
- **Dashboard**: Panoramica con prossime lezioni, notifiche urgenti, andamento presenze e elaborati in scadenza
- **Calendario**: Visualizzazione settimanale, mensile e annuale di lezioni, esami e scadenze
- **Presenze**: Registrazione tramite QR code del docente, monitoraggio percentuale presenze per corso
- **Didattica**: Gestione elaborati da consegnare, visualizzazione feedback e voti ricevuti
- **Risorse**: Accesso a materiale didattico (PDF, video, link) caricato dai docenti
- **Profilo**: Dati personali, carriera accademica, badge digitale QR e achievement sbloccati

### Per Docenti
- **Dashboard**: Gestione lezioni odierne, monitoraggio presenze, elaborati da valutare
- **Calendario**: Creazione e gestione lezioni, generazione QR code per registrazione presenze
- **Presenze**: Lista studenti per corso, stato presenze, messaggi urgenti
- **Didattica**: Valutazione elaborati ricevuti, aggiunta feedback, caricamento risorse per gli studenti
- **Risorse**: Caricamento e gestione materiale didattico da condividere

### Funzionalità PWA
-  **Offline First**: Funzionamento completo anche senza internet
-  **Notifiche Push**: Sistema di notifiche urgenti, feedback e scadenze
-  **Installabile**: App scaricabile come app nativa su smartphone
-  **QR Code**: Registrazione presenze e identificazione tramite codice QR
-  **Sincronizzazione Background**: Sync automatico dati quando torna online
-  **Responsive**: Perfetto su mobile, tablet e desktop

---

## Tecnologie Utilizzate

### Frontend Framework
- **React 18** - Framework UI moderno con hooks
- **TypeScript** - Tipizzazione statica per sicurezza
- **React Router v6** - Routing e navigazione client-side
- **Tailwind CSS v4** - Styling utility-first
- **Motion/Framer Motion** - Animazioni fluide e transizioni
- **Lucide React** - Icone SVG scalabili
- **Radix UI** - Componenti base accessibili e unstyled

### Build & Development
- **Vite** - Build tool ultrarapido
- **SWC** - Compilatore TypeScript/JavaScript velocissimo
- **Node.js 25+** - Runtime JavaScript

### Progressive Web App
- **Service Workers** - Caching intelligente e offline support
- **Web Manifest** - Configurazione app (icone, branding, shortcut)
- **Push API** - Notifiche push native
- **Background Sync API** - Sincronizzazione dati in background
- **Local Storage & IndexedDB** - Persistenza dati client

### Altre Librerie
- **Sonner** - Toast notifications eleganti
- **React Hook Form** - Gestione form semplificata
- **Recharts** - Grafici e chart dati
- **React Day Picker** - Selector date elegante

---

## Descrizione Pagine

### Login & Onboarding

#### `pages/Login.tsx`
Pagina di accesso con validazione email/password. Sono forniti 2 utenti mock:
- **m.rossi@studenti.abamc.it** - Accede come Studente
- **l.bianchi@abamc.it** - Accede come Docente

Dopo il login, l'utente viene reindirizzato alla propria dashboard in base al ruolo.

#### `pages/Onboarding.tsx`
Guida interattiva per nuovi utenti. Presenta le principali funzionalità e come usare l'app.

---

### Pagine Studenti

#### `pages/studente/DashboardStudente.tsx`
**Panoramica personale dello studente** con:
- Lezione corrente / Prossima lezione
- Notifiche urgenti non lette
- Percentuale presenze per ogni corso (alert se sotto 75%)
- Elaborati in scadenza
- Media voti e CFU conseguiti
- Grafico andamento presenze

#### `pages/studente/CalendarioStudente.tsx`
**Calendario lezioni e eventi** con tre visualizzazioni:
- **Settimana**: Tutte le lezioni della settimana corrente
- **Mese**: Panoramica lezioni e scadenze del mese
- **Anno**: Periodi didattici, esami, vacanze

Include filtro per corso e ricerca eventi.

#### `pages/studente/PresenzeStudente.tsx`
**Sistema registrazione presenze tramite QR code**:
- Accesso fotocamera per scansionare QR del docente
- Storico presenze per ogni corso
- Percentuale presenze in tempo reale
- Alert se sotto soglia minima (75%)

#### `pages/studente/DidatticaStudente.tsx`
**Gestione elaborati e feedback**:
- Lista elaborati da consegnare con scadenze
- Elaborati già consegnati
- Feedback ricevuti dai docenti con voti
- Upload file per le consegne
- Dettagli per corso

#### `pages/studente/CorsiStudente.tsx`
**Elenco corsi iscritti** con:
- Nome corso, docente, CFU e ore
- Descrizione e programma corso
- Modalità accertamento (esame, progetto, etc)
- Link rapidi a didattica, risorse, calendario

#### `pages/studente/RisorseStudente.tsx`
**Accesso a materiale didattico** caricato dai docenti:
- Filtro per corso
- Tipi: PDF (dispense), Video (tutorial), Link (siti/database)
- Data pubblicazione
- Download risorse

#### `pages/studente/ProfiloStudente.tsx`
**Profilo personale completo** con:
- Dati anagrafici (nome, email, telefono, indirizzo)
- Badge digitale QR (ID studente)
- Carriera accademica (media voti, CFU totali, esami sostenuti)
- Esami ufficiali registrati
- Achievement/badge sbloccati
- Impostazioni password e notifiche

---

### Pagine Docenti

#### `pages/docente/DashboardDocente.tsx`
**Panoramica lezioni e compiti del docente** con:
- Lezioni odierne e prossime
- Notifiche urgenti (elaborati ricevuti, richieste studenti)
- Presenze giornaliere monitorate
- Elaborati da valutare

#### `pages/docente/CalendarioDocente.tsx`
**Gestione lezioni e generazione QR**:
- Visualizzazione settimana/mese/anno
- Creazione nuove lezioni
- Generazione QR code appello (gli studenti lo scannerizzano)
- Dettagli giornalieri con aule e orari

#### `pages/docente/PresenzeDocente.tsx`
**Registrazione e monitoraggio presenze**:
- Lista studenti per ogni corso
- Stato presenze (presente, assente, ritardo)
- Generazione QR code per l'appello
- Messaggi urgenti agli studenti
- Export/download presenze

#### `pages/docente/DidatticaDocente.tsx`
**Valutazione elaborati ricevuti**:
- Elaborati da valutare per ogni corso
- Elaborati già valutati
- Aggiunta voto e feedback personalizzato
- Allegati elaborati (PDF, immagini, etc)

#### `pages/docente/CorsiDocente.tsx`
**Gestione corsi insegnati** con:
- Elenco corsi e numero studenti iscritti
- Statistiche: consegne, presenze, medie
- Informazioni corso (CFU, ore, descrizione)
- Accesso rapido a didattica, presenze, risorse

#### `pages/docente/RisorseDocente.tsx`
**Caricamento materiale didattico**:
- Upload dispense (PDF)
- Upload video (link YouTube/Drive)
- Upload link risorse (siti, database, articoli)
- Gestione materiale già caricato
- Condivisione per corso

#### `pages/docente/ProfiloDocente.tsx`
**Profilo e credenziali docente** con:
- Dati personali
- Corsi insegnati
- Informazioni accesso sistema
- Impostazioni personali

---

### Pagine Generali

#### `pages/Contatti.tsx`
**Sistema messaging** per comunicazioni:
- Contattare docenti
- Contattare uffici amministrativi
- Storico messaggi
- Notifiche risposte

---

## Colori e Branding

### Palette ABAMC

| Colore | Hex | Utilizzo |
|--------|-----|----------|
| Nero | #000000 | Colore principale, testo |
| Rosso | #ff0000 | Accenti, bottoni, highlight |
| Grigio | #afafaf | Secondario, bordi |
| Grigio Chiaro | #f5f5f5 | Background sezioni |
| Verde | #16a34a | Success, completion |
| Rosso Errore | #dc2626 | Error messages |
| Arancione | #f59e0b | Warning, alert |

### Tipografia
- **Font sans-serif**: (BlinkMacSystemFont)

---

## Conclusioni

**PWA for ABAMC Users** è un'applicazione moderna e completa che fornisce:

###  Funzionalità Complete
- Sistema autenticazione multi-ruolo
- Gestione completa curriculum accademico
- Comunicazione studenti-docenti
- Registrazione presenze digitale
- Valutazione elaborati online
- Notifiche push in tempo reale

###  Esperienza Utente
- Design responsive e moderno
- Interfaccia intuitiva e accessibile
- Funzionamento offline completo
- Installazione come app nativa
- Animazioni fluide e piacevoli

###  Tecnologia Moderna
- React 18 con TypeScript
- Build velocissimo con Vite
- Tailwind CSS per styling scalabile
- Service Workers per offline support
- Progressive Web App standard

###  Base Solida per Produzione
- Architettura modulare e scalabile
- Tipizzazione TypeScript completa
- Mock data per sviluppo rapido
- Pronta per integrazione API CINECA
- Documentazione tecnica completa

L'applicazione rappresenta un modello moderno di piattaforma accademica digitale, combinando le migliori pratiche di web development con funzionalità specifiche per l'ambito didattico.

### Prossimi Passi
Per il deployment in produzione:
1. Connessione real API CINECA
2. Setup notifiche push con backend
3. Certificato SSL/HTTPS
4. Configurazione dominio e DNS
