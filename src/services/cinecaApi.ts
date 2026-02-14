// Service layer per integrazione API CINECA
// Questo file gestisce tutte le chiamate alle API CINECA

import type { User, Corso, Presenza, Elaborato, Risorsa, EventoCalendario, Notifica } from '../types';

// Configurazione API
const API_CONFIG = {
  baseUrl: process.env.VITE_CINECA_API_URL || 'https://api.cineca.it/abamc',
  timeout: 10000, // 10 secondi
  retryAttempts: 3,
  retryDelay: 1000 // 1 secondo
};

// Interceptor per aggiungere token di autenticazione
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
    'X-Client-Version': '1.0.0'
  };
}

// Wrapper fetch con retry logic
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  attempt = 1
): Promise<Response> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok && attempt < API_CONFIG.retryAttempts) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay * attempt));
      return fetchWithRetry(url, options, attempt + 1);
    }

    return response;
  } catch (error) {
    if (attempt < API_CONFIG.retryAttempts) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay * attempt));
      return fetchWithRetry(url, options, attempt + 1);
    }
    throw error;
  }
}

// Wrapper per chiamate API
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  
  try {
    const response = await fetchWithRetry(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[API] Errore chiamata ${endpoint}:`, error);
    throw error;
  }
}

// ==================== AUTENTICAZIONE ====================

export async function login(email: string, password: string): Promise<{
  user: User;
  token: string;
}> {
  // TODO: Implementare chiamata reale API CINECA
  return apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function logout(): Promise<void> {
  // TODO: Implementare chiamata reale API CINECA
  return apiCall('/auth/logout', { method: 'POST' });
}

export async function refreshToken(): Promise<{ token: string }> {
  // TODO: Implementare chiamata reale API CINECA
  return apiCall('/auth/refresh', { method: 'POST' });
}

// ==================== PROFILO UTENTE ====================

export async function getUserProfile(userId: string): Promise<User> {
  return apiCall(`/users/${userId}`);
}

export async function updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
  return apiCall(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

// ==================== CORSI ====================

export async function getCorsi(userId: string, ruolo: string): Promise<Corso[]> {
  return apiCall(`/corsi?userId=${userId}&ruolo=${ruolo}`);
}

export async function getCorsoDettaglio(corsoId: string): Promise<Corso> {
  return apiCall(`/corsi/${corsoId}`);
}

// ==================== PRESENZE ====================

export async function getPresenze(userId: string): Promise<Presenza[]> {
  return apiCall(`/presenze?userId=${userId}`);
}

export async function registraPresenza(
  userId: string,
  lezioneId: string,
  qrCode?: string
): Promise<Presenza> {
  return apiCall('/presenze', {
    method: 'POST',
    body: JSON.stringify({ userId, lezioneId, qrCode })
  });
}

export async function getPresenzeCorso(corsoId: string): Promise<Presenza[]> {
  return apiCall(`/presenze/corso/${corsoId}`);
}

// ==================== ELABORATI ====================

export async function getElaborati(userId: string): Promise<Elaborato[]> {
  return apiCall(`/elaborati?userId=${userId}`);
}

export async function uploadElaborato(
  userId: string,
  corsoId: string,
  file: File,
  metadata: {
    titolo: string;
    descrizione?: string;
  }
): Promise<Elaborato> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);
  formData.append('corsoId', corsoId);
  formData.append('metadata', JSON.stringify(metadata));

  const response = await fetchWithRetry(`${API_CONFIG.baseUrl}/elaborati`, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeaders().Authorization as string
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Errore durante l\'upload dell\'elaborato');
  }

  return await response.json();
}

export async function valutaElaborato(
  elaboratoId: string,
  voto: number,
  feedback: string,
  lode: boolean
): Promise<Elaborato> {
  return apiCall(`/elaborati/${elaboratoId}/valuta`, {
    method: 'POST',
    body: JSON.stringify({ voto, feedback, lode })
  });
}

// ==================== RISORSE ====================

export async function getRisorse(corsoId?: string): Promise<Risorsa[]> {
  const query = corsoId ? `?corsoId=${corsoId}` : '';
  return apiCall(`/risorse${query}`);
}

export async function uploadRisorsa(
  docenteId: string,
  corsoId: string,
  file: File,
  metadata: {
    titolo: string;
    descrizione?: string;
    tipo: 'pdf' | 'video' | 'link';
  }
): Promise<Risorsa> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('docenteId', docenteId);
  formData.append('corsoId', corsoId);
  formData.append('metadata', JSON.stringify(metadata));

  const response = await fetchWithRetry(`${API_CONFIG.baseUrl}/risorse`, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeaders().Authorization as string
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Errore durante l\'upload della risorsa');
  }

  return await response.json();
}

export async function deleteRisorsa(risorsaId: string): Promise<void> {
  return apiCall(`/risorse/${risorsaId}`, { method: 'DELETE' });
}

// ==================== CALENDARIO ====================

export async function getEventiCalendario(
  userId: string,
  dataInizio?: string,
  dataFine?: string
): Promise<EventoCalendario[]> {
  const params = new URLSearchParams({ userId });
  if (dataInizio) params.append('dataInizio', dataInizio);
  if (dataFine) params.append('dataFine', dataFine);
  
  return apiCall(`/calendario?${params.toString()}`);
}

export async function createEventoCalendario(evento: Omit<EventoCalendario, 'id'>): Promise<EventoCalendario> {
  return apiCall('/calendario', {
    method: 'POST',
    body: JSON.stringify(evento)
  });
}

// ==================== NOTIFICHE ====================

export async function getNotifiche(userId: string): Promise<Notifica[]> {
  return apiCall(`/notifiche?userId=${userId}`);
}

export async function markNotificaAsRead(notificaId: string): Promise<void> {
  return apiCall(`/notifiche/${notificaId}/read`, { method: 'POST' });
}

export async function markAllNotificheAsRead(userId: string): Promise<void> {
  return apiCall(`/notifiche/read-all?userId=${userId}`, { method: 'POST' });
}

// ==================== ESAMI ====================

export async function getEsamiDisponibili(userId: string): Promise<EsameUfficiale[]> {
  return apiCall(`/esami/disponibili?userId=${userId}`);
}

export async function iscrizioneEsame(userId: string, esameId: string): Promise<void> {
  return apiCall('/esami/iscrizione', {
    method: 'POST',
    body: JSON.stringify({ userId, esameId })
  });
}

export async function getEsamiIscritto(userId: string): Promise<EsameUfficiale[]> {
  return apiCall(`/esami/iscrizioni?userId=${userId}`);
}

// ==================== CARRIERA ====================

export async function getCarriera(userId: string): Promise<Carriera> {
  return apiCall(`/carriera/${userId}`);
}

export async function getPianoStudi(userId: string): Promise<Corso[]> {
  return apiCall(`/piano-studi/${userId}`);
}

// ==================== UTILITY ====================

export function isApiAvailable(): boolean {
  // Controlla se le API sono configurate
  return !!process.env.VITE_CINECA_API_URL;
}

export function getApiBaseUrl(): string {
  return API_CONFIG.baseUrl;
}
