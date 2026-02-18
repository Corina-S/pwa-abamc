
  # PWA for ABAMC Users

Progressive Web App ufficiale dell'Accademia di Belle Arti di Macerata per studenti, docenti e amministratori.

## 📱 Live Demo
Disponibile su: https://corina-s.github.io/pwa-abamc/

## Getting Started

### Prerequisites
- Node.js 20+ (scarica da https://nodejs.org)

### Installation & Development

```bash
# Installa le dipendenze
npm i

# Avvia il server di sviluppo (http://localhost:3000)
npm run dev

# Build per produzione
npm run build
```

### Deployment

Il progetto è configurato per il deployment automatico su GitHub Pages:
- **Branch:** gh-pages
- **Routing:** HashRouter (#/rotta) per subpath compatibility
- **Build output:** /build directory (inviato a gh-pages)

Per deployare manualmente:
```bash
npm run build
git subtree split --prefix build --branch gh-pages-deploy
git push origin gh-pages-deploy:gh-pages --force
```

## ✨ Caratteristiche Principali

### PWA Features
- ✅ Installabile come app nativa
- ✅ Funzionamento offline-first
- ✅ Notifiche push
- ✅ Sincronizzazione automatica
- ✅ Service Worker per caching intelligente

### Per Studenti
- Dashboard personalizzata
- Calendario lezioni
- Registrazione presenze  
- Gestione elaborati
- Accesso a risorse didattiche
- Profilo personale con badge

### Per Docenti
- Gestione lezioni e presenze
- Generazione QR code
- Valutazione elaborati
- Caricamento risorse
- Dashboard amministrativa

## 🎨 Design

- **Colori**: Rosso (#ff0000), Verde (#16a34a), Nero (#000000)
- **Tipografia**: Flat design minimalista
- **Accessibilità**: WCAG 2.1 compliant

## 📦 Tecnologie

- React 18.3.1
- TypeScript 5
- Tailwind CSS 4
- Vite 6.3.5
- React Router Dom (HashRouter)
- Radix UI Components
- PWA APIs

## 🔐 Note su Sicurezza

- Questo è un prototipo demo
- I dati sono mockerati (mockData)
- Per produzione: integrare API reali CINECA
- Implementare autenticazione JWT
  