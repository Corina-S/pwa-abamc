import { useState } from 'react';
import { Mail, Send, Inbox, Clock, CheckCircle, User, Building, Users, Reply, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

type TabType = 'invia' | 'inviate' | 'ricevute';

interface Email {
  id: string;
  destinatari?: string[];
  mittente?: string;
  oggetto: string;
  data: string;
  risposto?: boolean;
  letta?: boolean;
  corpo?: string;
}

export function Contatti() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('invia');
  const [destinatari, setDestinatari] = useState<string[]>([]);
  const [oggetto, setOggetto] = useState('');
  const [messaggio, setMessaggio] = useState('');
  const [emailAperta, setEmailAperta] = useState<Email | null>(null);
  const [rispondi, setRispondi] = useState(false);
  const [testoRisposta, setTestoRisposta] = useState('');

  const categorieDestinatari = user?.ruolo === 'docente' ? [
    {
      categoria: 'Amministrazione',
      contatti: [
        { label: 'Segreteria Didattica', value: 'segreteria.didattica@abamc.it' },
        { label: 'Direzione', value: 'direzione@abamc.it' },
        { label: 'Ufficio Personale', value: 'personale@abamc.it' },
      ]
    },
    {
      categoria: 'Servizi',
      contatti: [
        { label: 'Biblioteca', value: 'biblioteca@abamc.it' },
        { label: 'Servizi Informatici', value: 'informatica@abamc.it' },
        { label: 'Aule e Attrezzature', value: 'aule@abamc.it' },
      ]
    },
    {
      categoria: 'Studenti',
      contatti: [
        { label: 'Tutti gli studenti - Storia dell\'Arte Contemporanea', value: 'studenti.storia.arte@abamc.it' },
        { label: 'Tutti gli studenti - Fenomenologia delle Arti', value: 'studenti.fenomenologia@abamc.it' },
      ]
    }
  ] : [
    {
      categoria: 'Segreteria e Servizi',
      contatti: [
        { label: 'Segreteria Studenti', value: 'segreteria@abamc.it' },
        { label: 'Ufficio Erasmus', value: 'erasmus@abamc.it' },
        { label: 'Biblioteca', value: 'biblioteca@abamc.it' },
        { label: 'Servizi agli studenti', value: 'servizi.studenti@abamc.it' },
        { label: 'Orientamento', value: 'orientamento@abamc.it' },
      ]
    },
    {
      categoria: 'Docenti',
      contatti: [
        { label: 'Prof.ssa Laura Bianchi (Storia dell\'Arte)', value: 'l.bianchi@abamc.it' },
        { label: 'Prof. Mario Neri (Pittura)', value: 'm.neri@abamc.it' },
        { label: 'Prof. Francesco Blu (Anatomia Artistica)', value: 'f.blu@abamc.it' },
        { label: 'Prof.ssa Anna Verde (Design Grafico)', value: 'a.verde@abamc.it' },
      ]
    }
  ];

  const handleInvia = () => {
    if (destinatari.length === 0 || !oggetto || !messaggio) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    toast.success(`Email inviata a ${destinatari.length} destinatario/i`);
    setDestinatari([]);
    setOggetto('');
    setMessaggio('');
  };

  const handleRispondi = () => {
    if (!testoRisposta.trim()) {
      toast.error('Scrivi un messaggio');
      return;
    }
    toast.success('Risposta inviata con successo');
    setRispondi(false);
    setTestoRisposta('');
    setEmailAperta(null);
  };

  const mailInviate: Email[] = user?.ruolo === 'docente' ? [
    {
      id: '1',
      destinatari: ['Segreteria Didattica'],
      oggetto: 'Richiesta aula per esami sessione invernale',
      data: '2024-12-20T10:30:00',
      risposto: true,
      corpo: 'Buongiorno,\n\nvorrei richiedere la disponibilità di un\'aula per lo svolgimento degli esami della sessione invernale per il corso di Storia dell\'Arte Contemporanea.\n\nLe date previste sono:\n- 15 gennaio 2025, ore 9:00\n- 22 gennaio 2025, ore 9:00\n\nStimando circa 30 studenti per appello, avrei bisogno di un\'aula con almeno 40 posti.\n\nGrazie per la collaborazione.\n\nCordiali saluti,\nProf.ssa Laura Bianchi'
    },
    {
      id: '2',
      destinatari: ['Direzione'],
      oggetto: 'Proposta modifica programma Storia dell\'Arte Contemporanea',
      data: '2024-12-15T14:20:00',
      risposto: false,
      corpo: 'Gentile Direzione,\n\nvolevo sottoporre alla vostra attenzione una proposta di modifica del programma del corso di Storia dell\'Arte Contemporanea per il prossimo anno accademico.\n\nIn particolare, vorrei:\n1. Aggiungere un modulo sulla street art contemporanea (10 ore)\n2. Organizzare una visita guidata alla Biennale di Venezia\n3. Invitare un artista contemporaneo per una masterclass\n\nResto a disposizione per discuterne.\n\nCordiali saluti'
    },
    {
      id: '3',
      destinatari: ['Tutti gli studenti - Storia dell\'Arte Contemporanea'],
      oggetto: 'Comunicazione date esami e materiale didattico',
      data: '2024-12-10T16:00:00',
      risposto: false,
      corpo: 'Cari studenti,\n\nvi comunico le date degli esami:\n- 15 gennaio 2025\n- 22 gennaio 2025\n- 5 febbraio 2025\n\nTutto il materiale didattico è disponibile sulla piattaforma.\n\nBuono studio!\nProf.ssa Bianchi'
    },
    {
      id: '4',
      destinatari: ['Servizi Informatici'],
      oggetto: 'Richiesta accesso piattaforma valutazione elaborati',
      data: '2024-12-05T09:15:00',
      risposto: true,
      corpo: 'Buongiorno,\n\nho bisogno di accedere alla piattaforma per la valutazione degli elaborati ma il mio account sembra essere stato disattivato.\n\nPotreste riattivarlo?\n\nGrazie'
    },
    {
      id: '5',
      destinatari: ['Biblioteca'],
      oggetto: 'Richiesta acquisto nuovi volumi per corso',
      data: '2024-11-28T11:45:00',
      risposto: true,
      corpo: 'Gentile Biblioteca,\n\nvorrei richiedere l\'acquisto dei seguenti volumi per il corso:\n\n1. "Contemporary Art: A Very Short Introduction" - Julian Stallabrass\n2. "The Power of Art" - Simon Schama\n3. "Ways of Seeing" - John Berger\n\nGrazie per la disponibilità.'
    }
  ] : [
    {
      id: '1',
      destinatari: ['Prof.ssa Laura Bianchi'],
      oggetto: 'Richiesta chiarimenti esame Storia dell\'Arte',
      data: '2024-12-20T10:30:00',
      risposto: true,
      corpo: 'Gentile Prof.ssa Bianchi,\n\nvolevo chiederle alcuni chiarimenti sul programma d\'esame, in particolare riguardo al capitolo sulla Pop Art.\n\nÈ necessario studiare anche gli artisti europei o solo quelli americani?\n\nGrazie mille,\nMarco Rossi'
    },
    {
      id: '2',
      destinatari: ['Segreteria'],
      oggetto: 'Richiesta certificato iscrizione',
      data: '2024-12-18T14:20:00',
      risposto: false,
      corpo: 'Buongiorno,\n\navrei bisogno di un certificato di iscrizione per richiedere la borsa di studio regionale.\n\nÈ possibile averlo in formato digitale?\n\nGrazie'
    },
    {
      id: '3',
      destinatari: ['Ufficio Erasmus'],
      oggetto: 'Informazioni Erasmus+ 2025',
      data: '2024-12-15T09:00:00',
      risposto: true,
      corpo: 'Gentile Ufficio Erasmus,\n\nsono interessato a partecipare al programma Erasmus+ per il prossimo anno accademico.\n\nPotreste inviarmi informazioni sulle destinazioni disponibili per il corso di Pittura?\n\nGrazie'
    },
    {
      id: '4',
      destinatari: ['Prof. Mario Neri'],
      oggetto: 'Richiesta materiali per elaborato Pittura',
      data: '2024-12-10T16:30:00',
      risposto: false,
      corpo: 'Gentile Prof. Neri,\n\nper il progetto finale avrei bisogno di accedere al laboratorio per utilizzare i materiali.\n\nÈ possibile prenotare il laboratorio per il weekend?\n\nGrazie'
    },
    {
      id: '5',
      destinatari: ['Biblioteca'],
      oggetto: 'Prestito libri testo',
      data: '2024-12-05T11:15:00',
      risposto: true,
      corpo: 'Buongiorno,\n\nvorrei prendere in prestito i seguenti libri:\n- Storia dell\'Arte Contemporanea (vol. 2)\n- Tecniche Pittoriche - Manuale pratico\n\nSono disponibili?\n\nGrazie'
    }
  ];

  const mailRicevute: Email[] = user?.ruolo === 'docente' ? [
    {
      id: '1',
      mittente: 'Marco Rossi (Studente)',
      oggetto: 'Richiesta chiarimenti progetto finale',
      data: '2025-01-03T15:45:00',
      letta: false,
      corpo: 'Gentile Prof.ssa Bianchi,\n\nsto lavorando al progetto finale su Banksy e volevo chiederle se è possibile includere anche un\'analisi delle sue opere più recenti in Ucraina.\n\nAttendo un suo riscontro.\n\nGrazie,\nMarco Rossi'
    },
    {
      id: '2',
      mittente: 'Giulia Verdi (Studente)',
      oggetto: 'Richiesta ricevimento urgente',
      data: '2025-01-03T11:30:00',
      letta: false,
      corpo: 'Gentile Professoressa,\n\navrei bisogno di un ricevimento urgente per discutere della mia tesi.\n\nÈ possibile vederci questa settimana?\n\nGrazie mille,\nGiulia'
    },
    {
      id: '3',
      mittente: 'Segreteria Didattica',
      oggetto: 'Promemoria verbali esami - Scadenza 15 gennaio',
      data: '2025-01-02T09:00:00',
      letta: false,
      corpo: 'Gentile Docente,\n\nle ricordiamo che i verbali degli esami della sessione invernale dovranno essere caricati entro il 15 gennaio 2025.\n\nLa preghiamo di rispettare la scadenza.\n\nCordiali saluti,\nSegreteria Didattica'
    },
    {
      id: '4',
      mittente: 'Alessandro Neri (Studente)',
      oggetto: 'Impossibilità presenza esame - certificato medico',
      data: '2024-12-28T14:20:00',
      letta: true,
      corpo: 'Gentile Professoressa,\n\nle comunico che non potrò presentarmi all\'esame del 15 gennaio a causa di problemi di salute.\n\nAllegherò il certificato medico appena possibile.\n\nCordiali saluti,\nAlessandro'
    },
    {
      id: '5',
      mittente: 'Direzione',
      oggetto: 'Re: Proposta modifica programma',
      data: '2024-12-22T10:30:00',
      letta: true,
      corpo: 'Gentile Prof.ssa Bianchi,\n\nabbiamo esaminato la sua proposta e siamo favorevoli.\n\nLa invitiamo a presentare un piano dettagliato entro fine gennaio.\n\nCordiali saluti,\nLa Direzione'
    },
    {
      id: '6',
      mittente: 'Sofia Marino (Studente)',
      oggetto: 'Ringraziamenti per il corso',
      data: '2024-12-20T16:00:00',
      letta: true,
      corpo: 'Gentile Professoressa,\n\nvolevo ringraziarla per il bellissimo corso di quest\'anno.\n\nLe sue lezioni mi hanno appassionato moltissimo.\n\nBuone feste!\nSofia'
    },
    {
      id: '7',
      mittente: 'Biblioteca',
      oggetto: 'Re: Richiesta acquisto nuovi volumi',
      data: '2024-12-15T11:45:00',
      letta: true,
      corpo: 'Gentile Prof.ssa Bianchi,\n\nabbiamo acquistato i volumi richiesti.\n\nSaranno disponibili dalla prossima settimana.\n\nCordiali saluti,\nBiblioteca ABAMC'
    }
  ] : [
    {
      id: '1',
      mittente: 'Prof.ssa Laura Bianchi',
      oggetto: 'Re: Richiesta chiarimenti esame',
      data: '2024-12-21T15:45:00',
      letta: true,
      corpo: 'Caro Marco,\n\nper l\'esame è necessario studiare sia gli artisti americani che quelli europei, come indicato nel programma.\n\nIn particolare, per la Pop Art europea devi conoscere almeno:\n- Allen Jones\n- David Hockney\n- Eduardo Paolozzi\n\nBuono studio!\nProf.ssa Bianchi'
    },
    {
      id: '2',
      mittente: 'Ufficio Erasmus',
      oggetto: 'Bando Erasmus+ 2025 - Scadenza candidature',
      data: '2024-12-20T09:00:00',
      letta: false,
      corpo: 'Gentile Studente,\n\nti informiamo che il bando Erasmus+ 2025 è aperto.\n\nScadenza candidature: 31 gennaio 2025\n\nDestinazioni disponibili:\n- Royal College of Art (Londra)\n- Beaux-Arts de Paris (Parigi)\n- UdK Berlin (Berlino)\n\nMaggiori info sul nostro sito.\n\nUfficio Erasmus'
    },
    {
      id: '3',
      mittente: 'Segreteria',
      oggetto: 'Certificato iscrizione pronto per il ritiro',
      data: '2024-12-19T11:30:00',
      letta: false,
      corpo: 'Buongiorno,\n\nil certificato di iscrizione richiesto è pronto.\n\nPuoi scaricarlo dalla tua area riservata oppure ritirarlo in segreteria.\n\nCordiali saluti,\nSegreteria Studenti'
    },
    {
      id: '4',
      mittente: 'Prof. Mario Neri',
      oggetto: 'Comunicazione date laboratorio Pittura',
      data: '2024-12-15T14:20:00',
      letta: true,
      corpo: 'Cari studenti,\n\nil laboratorio sarà aperto anche durante le vacanze nei seguenti orari:\n\n- Lunedì-Venerdì: 9:00-18:00\n- Sabato: 9:00-13:00\n\nPrenotazione obbligatoria.\n\nProf. Neri'
    },
    {
      id: '5',
      mittente: 'Biblioteca',
      oggetto: 'Re: Prestito libri testo - Disponibili',
      data: '2024-12-12T10:00:00',
      letta: true,
      corpo: 'Buongiorno,\n\ni libri richiesti sono disponibili e prenotati per te.\n\nPuoi ritirarli entro 3 giorni.\n\nBiblioteca ABAMC'
    },
    {
      id: '6',
      mittente: 'Servizi agli studenti',
      oggetto: 'Nuove convenzioni per studenti ABAMC',
      data: '2024-12-10T16:30:00',
      letta: true,
      corpo: 'Cari studenti,\n\nabbiamo attivato nuove convenzioni:\n\n- Musei cittadini: ingresso gratuito\n- Librerie: sconto 15%\n- Trasporti: abbonamento agevolato\n\nDettagli sul sito.\n\nServizi agli Studenti'
    },
    {
      id: '7',
      mittente: 'Orientamento',
      oggetto: 'Workshop orientamento professionale - 15 gennaio',
      data: '2024-12-08T09:15:00',
      letta: true,
      corpo: 'Cari studenti,\n\nvi invitiamo al workshop sull\'orientamento professionale che si terrà il 15 gennaio 2025 alle ore 15:00 in Aula Magna.\n\nIscrizioni entro il 10 gennaio.\n\nUfficio Orientamento'
    }
  ];

  const handleApriEmail = (email: Email) => {
    setEmailAperta(email);
    setRispondi(false);
  };

  const handleChiudiEmail = () => {
    setEmailAperta(null);
    setRispondi(false);
    setTestoRisposta('');
  };

  return (
    <div className="pb-20 md:pb-6 pt-20 md:pt-20 px-4 space-y-6 max-w-4xl mx-auto">
      {emailAperta ? (
        // Vista Email Aperta
        <div className="space-y-6">
          <button
            onClick={handleChiudiEmail}
            className="flex items-center gap-2 text-[#ff0000] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alle email
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-6">
            <h2 className="mb-4">{emailAperta.oggetto}</h2>
            
            <div className="space-y-3 mb-6 pb-6 border-b border-[#afafaf]/20">
              {emailAperta.mittente && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#afafaf]">Da:</span>
                  <span>{emailAperta.mittente}</span>
                </div>
              )}
              {emailAperta.destinatari && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#afafaf]">A:</span>
                  <span>{emailAperta.destinatari.join(', ')}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-[#afafaf]">
                <Clock className="w-4 h-4" />
                {new Date(emailAperta.data).toLocaleString('it-IT')}
              </div>
            </div>

            <div className="whitespace-pre-wrap text-sm leading-relaxed mb-6">
              {emailAperta.corpo}
            </div>

            {!rispondi && (
              <button
                onClick={() => setRispondi(true)}
                className="px-6 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors flex items-center gap-2"
              >
                <Reply className="w-4 h-4" />
                Rispondi
              </button>
            )}
          </div>

          {rispondi && (
            <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-6">
              <h3 className="mb-4">Rispondi</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="risposta" className="block text-sm mb-2">
                    Messaggio <span className="text-[#ff0000]">*</span>
                  </label>
                  <textarea
                    id="risposta"
                    value={testoRisposta}
                    onChange={(e) => setTestoRisposta(e.target.value)}
                    rows={8}
                    placeholder="Scrivi qui la tua risposta..."
                    className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setRispondi(false);
                      setTestoRisposta('');
                    }}
                    className="flex-1 px-4 py-2 border-2 border-[#afafaf] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={handleRispondi}
                    disabled={!testoRisposta.trim()}
                    className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Invia Risposta
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Vista Lista Email
        <>
          <div>
            <h1>Contatti</h1>
            <p className="text-[#666] mt-1">Gestisci la tua comunicazione</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-[#afafaf]/20">
            <button
              onClick={() => setActiveTab('invia')}
              className={`px-4 py-2 text-sm transition-all ${
                activeTab === 'invia'
                  ? 'border-b-2 border-[#ff0000] text-[#ff0000]'
                  : 'text-[#666] hover:text-[#000]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Invia Email
              </div>
            </button>
            <button
              onClick={() => setActiveTab('inviate')}
              className={`px-4 py-2 text-sm transition-all ${
                activeTab === 'inviate'
                  ? 'border-b-2 border-[#ff0000] text-[#ff0000]'
                  : 'text-[#666] hover:text-[#000]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Inviate ({mailInviate.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('ricevute')}
              className={`px-4 py-2 text-sm transition-all ${
                activeTab === 'ricevute'
                  ? 'border-b-2 border-[#ff0000] text-[#ff0000]'
                  : 'text-[#666] hover:text-[#000]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4" />
                Ricevute ({mailRicevute.filter(m => !m.letta).length})
              </div>
            </button>
          </div>

          {/* Contenuto Tab Invia */}
          {activeTab === 'invia' && (
            <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5 space-y-5">
              <h3>Nuova Email</h3>

              {/* Destinatari */}
              <div>
                <label className="block text-sm mb-2">
                  Destinatari <span className="text-[#ff0000]">*</span>
                </label>
                <div className="space-y-3">
                  {categorieDestinatari.map(cat => (
                    <div key={cat.categoria}>
                      <div className="flex items-center gap-2 mb-2">
                        {cat.categoria === 'Amministrazione' || cat.categoria === 'Segreteria e Servizi' ? (
                          <Building className="w-4 h-4 text-[#afafaf]" />
                        ) : cat.categoria === 'Studenti' ? (
                          <Users className="w-4 h-4 text-[#afafaf]" />
                        ) : (
                          <User className="w-4 h-4 text-[#afafaf]" />
                        )}
                        <span className="text-sm text-[#afafaf]">{cat.categoria}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                        {cat.contatti.map(contatto => (
                          <label key={contatto.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={destinatari.includes(contatto.value)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setDestinatari([...destinatari, contatto.value]);
                                } else {
                                  setDestinatari(destinatari.filter(d => d !== contatto.value));
                                }
                              }}
                              className="w-4 h-4 accent-[#ff0000]"
                            />
                            <span className="text-sm">{contatto.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Oggetto */}
              <div>
                <label htmlFor="oggetto" className="block text-sm mb-2">
                  Oggetto <span className="text-[#ff0000]">*</span>
                </label>
                <input
                  id="oggetto"
                  type="text"
                  value={oggetto}
                  onChange={(e) => setOggetto(e.target.value)}
                  placeholder="Inserisci l'oggetto dell'email"
                  className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
                />
              </div>

              {/* Messaggio */}
              <div>
                <label htmlFor="messaggio" className="block text-sm mb-2">
                  Messaggio <span className="text-[#ff0000]">*</span>
                </label>
                <textarea
                  id="messaggio"
                  value={messaggio}
                  onChange={(e) => setMessaggio(e.target.value)}
                  rows={8}
                  placeholder="Scrivi qui il tuo messaggio..."
                  className="w-full px-3 py-2 border border-[#afafaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
                />
              </div>

              {/* Bottone Invia */}
              <button
                onClick={handleInvia}
                disabled={destinatari.length === 0 || !oggetto || !messaggio}
                className="w-full px-6 py-3 bg-[#ff0000] text-white rounded-lg hover:bg-[#cc0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Invia Email
              </button>
            </div>
          )}

          {/* Contenuto Tab Inviate */}
          {activeTab === 'inviate' && (
            <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
              <h3 className="mb-4">Email Inviate</h3>
              <div className="space-y-3">
                {mailInviate.map(mail => (
                  <div
                    key={mail.id}
                    onClick={() => handleApriEmail(mail)}
                    className="border border-[#afafaf]/20 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-[#ff0000]/30"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm mb-1">{mail.oggetto}</h4>
                        <p className="text-xs text-[#666]">A: {mail.destinatari?.join(', ')}</p>
                      </div>
                      {mail.risposto && (
                        <span className="px-2 py-1 bg-[#16a34a]/10 text-[#16a34a] text-xs rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Risposto
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#afafaf]">
                      <Clock className="w-3 h-3" />
                      {new Date(mail.data).toLocaleString('it-IT')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contenuto Tab Ricevute */}
          {activeTab === 'ricevute' && (
            <div className="bg-white rounded-xl shadow-sm border border-[#afafaf]/20 p-5">
              <h3 className="mb-4">Email Ricevute</h3>
              <div className="space-y-3">
                {mailRicevute.map(mail => (
                  <div
                    key={mail.id}
                    onClick={() => handleApriEmail(mail)}
                    className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                      mail.letta ? 'border-[#afafaf]/20 hover:border-[#ff0000]/30' : 'border-[#ff0000]/30 bg-[#ff0000]/5'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm ${!mail.letta ? 'font-semibold' : ''}`}>
                            {mail.oggetto}
                          </h4>
                          {!mail.letta && (
                            <span className="w-2 h-2 bg-[#ff0000] rounded-full"></span>
                          )}
                        </div>
                        <p className="text-xs text-[#666]">Da: {mail.mittente}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#afafaf]">
                      <Clock className="w-3 h-3" />
                      {new Date(mail.data).toLocaleString('it-IT')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
