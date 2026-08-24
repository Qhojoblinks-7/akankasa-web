// src/api/index.js
// API layer: all data must come from the backend.

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function callApi(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    let err;
    try { err = JSON.parse(text); } catch { err = { error: text }; }
    throw new Error(err.error || res.statusText || 'API error');
  }
  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
}

// --- Auth ---
export const login = async ({ email, password }) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const text = await res.text();
    let err;
    try { err = JSON.parse(text); } catch { err = { error: text || 'Login failed' }; }
    throw new Error(err.error || 'Login failed');
  }
  const text = await res.text();
  if (!text || !text.trim()) throw new Error('Empty response from server');
  return JSON.parse(text);
};

export const register = async ({ name, email, password }) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Registration failed' }));
    throw new Error(err.error || 'Registration failed');
  }
  return res.json();
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('akankasa:auth_token');
  if (!token) return null;
  const res = await fetch('/api/auth/me', {
    headers: { Authorization: token },
  });
  if (!res.ok) return null;
  return res.json();
};

export const updateUserProfile = async (updates) => {
  const token = localStorage.getItem('akankasa:auth_token');
  const res = await fetch('/api/users/me', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
};

export const changeUserPassword = async ({ currentPassword, newPassword }) => {
  const token = localStorage.getItem('akankasa:auth_token');
  const res = await fetch('/api/users/me/password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Password update failed' }));
    throw new Error(err.error || 'Password update failed');
  }
  return res.json();
};

export const saveUserProgress = async (progress) => {
  const token = localStorage.getItem('akankasa:auth_token');
  if (!token) return { success: true };
  const res = await fetch('/api/users/me/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(progress),
  });
  if (!res.ok) throw new Error('Progress save failed');
  return res.json();
};

export const getUserProgress = async () => {
  const token = localStorage.getItem('akankasa:auth_token');
  if (!token) return { progress: {} };
  const res = await fetch('/api/users/me/progress', {
    headers: { Authorization: token },
  });
  if (!res.ok) return { progress: {} };
  return res.json();
};

// --- Dictionary ---
export const getDictionary = async ({ q, direction, dialect, partOfSpeech, sort, page, limit } = {}) => {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (direction) params.set('direction', direction);
  if (dialect && dialect !== 'all') params.set('dialect', dialect);
  if (partOfSpeech && partOfSpeech !== 'all') params.set('partOfSpeech', partOfSpeech);
  if (sort) params.set('sort', sort);
  if (page) params.set('page', String(page));
  if (limit) params.set('limit', String(limit));
  const qs = params.toString();
  return callApi(`/api/dictionary${qs ? `?${qs}` : ''}`);
};

export const getFavorites = async () => {
  const data = await callApi('/api/favorites');
  return data.favorites || [];
};

export const saveFavorites = async (favorites) => {
  return callApi('/api/favorites', {
    method: 'PUT',
    body: JSON.stringify({ favorites }),
  });
};

export const submitDictionarySuggestion = async (suggestion) => {
  const token = localStorage.getItem('akankasa:auth_token');
  const res = await fetch('/api/dictionary/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
    body: JSON.stringify(suggestion),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Submission failed' }));
    throw new Error(err.error || 'Submission failed');
  }
  return res.json();
};

// --- Forum ---
export const getForumPosts = async ({ category, q, page, limit } = {}) => {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.set('category', category);
  if (q) params.set('q', q);
  if (page) params.set('page', page);
  if (limit) params.set('limit', limit);
  const qs = params.toString();
  return callApi(`/api/forum/posts${qs ? `?${qs}` : ''}`);
};

export const getForumPost = async (id) => {
  if (!id) return null;
  return callApi(`/api/forum/posts/${id}`);
};

export const createForumPost = async (post) => {
  const token = localStorage.getItem('akankasa:auth_token');
  const res = await fetch('/api/forum/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
    body: JSON.stringify(post),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create post' }));
    throw new Error(err.error || 'Failed to create post');
  }
  return res.json();
};

export const getForumComments = async (postId) => {
  return callApi(`/api/forum/posts/${postId}/comments`);
};

export const createForumComment = async (postId, comment) => {
  const token = localStorage.getItem('akankasa:auth_token');
  const res = await fetch(`/api/forum/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
    body: JSON.stringify(comment),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create comment' }));
    throw new Error(err.error || 'Failed to create comment');
  }
  return res.json();
};

// --- Events ---
export const getEvents = async () => {
  const data = await callApi('/api/events');
  const items = Array.isArray(data) ? data : (data.results || []);
  return items.map(event => ({
    ...event,
    date: event.event_date || event.date,
    time: event.event_time || event.time,
    type: event.event_type || event.type
  }));
};

export const createEvent = async (eventData) => {
  const token = localStorage.getItem('akankasa:auth_token');
  const res = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create event' }));
    throw new Error(err.error || 'Failed to create event');
  }
  return res.json();
};

export const registerForEvent = async (eventId, data) => {
  if (!eventId) throw new Error('Event ID is required');
  const token = localStorage.getItem('akankasa:auth_token');
  const res = await fetch(`/api/events/${eventId}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
    body: JSON.stringify(data || {}),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Registration failed' }));
    throw new Error(err.error || 'Registration failed');
  }
  return res.json();
};

// --- Profiles ---
export const getProfiles = async () => {
  return callApi('/api/profiles');
};

// --- Admin / Moderation ---
export const getModerationQueue = async () => {
  return callApi('/api/admin/moderation');
};

export const moderateArticle = async (id, updates) => {
  return callApi(`/api/admin/moderation/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
};

// --- Culture ---
export const getCultureArticles = async ({ category, q, page, limit } = {}) => {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.set('category', category);
  if (q) params.set('q', q);
  if (page) params.set('page', String(page));
  if (limit) params.set('limit', String(limit));
  const qs = params.toString();
  return callApi(`/api/culture${qs ? `?${qs}` : ''}`);
};

export const getCultureArticle = async (id) => {
  if (!id) return null;
  return callApi(`/api/culture/${id}`);
};

export const submitCultureArticle = async (article) => {
  const token = localStorage.getItem('akankasa:auth_token');
  const res = await fetch('/api/culture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
    body: JSON.stringify(article),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Submission failed' }));
    throw new Error(err.error || 'Submission failed');
  }
  return res.json();
};

// --- Greetings / Phrasebook ---
export const getGreetings = async () => {
  return callApi('/api/greetings');
};

// --- Lessons ---
export const getLessons = async () => {
  return callApi('/api/lessons');
};

export const getLesson = async (id) => {
  if (!id) return null;
  return callApi(`/api/lessons/${id}`);
};

// --- Vocabulary ---
export const getVocabularyModules = async () => {
  return callApi('/api/vocabulary/modules');
};

export const getVocabularyModule = async (id) => {
  if (!id) return null;
  return callApi(`/api/vocabulary/modules/${id}`);
};

// --- Documents / Research ---
export const getDocuments = async ({ category, level, q, page, limit } = {}) => {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.set('category', category);
  if (level && level !== 'all') params.set('level', level);
  if (q) params.set('q', q);
  if (page) params.set('page', String(page));
  if (limit) params.set('limit', String(limit));
  const qs = params.toString();
  return callApi(`/api/documents${qs ? `?${qs}` : ''}`);
};

export const getDocument = async (id) => {
  if (!id) return null;
  return callApi(`/api/documents/${id}`);
};

export const downloadDocument = async (id) => {
  if (!id) throw new Error('Document ID is required');
  const url = `${API_BASE}/api/documents/${id}/download`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    let err;
    try { err = JSON.parse(text); } catch { err = { error: text }; }
    throw new Error(err.error || `Download failed (${res.status})`);
  }
  const blob = await res.blob();
  const disposition = res.headers.get('Content-Disposition');
  let filename = `document_${id}`;
  if (disposition && disposition.includes('filename=')) {
    filename = disposition.split('filename=')[1].replace(/"/g, '').trim() || filename;
  }
  return { blob, filename };
};

export const exportVocabulary = async (id, format = 'json') => {
  if (!id) throw new Error('Vocabulary module ID is required');
  const url = `${API_BASE}/api/vocabulary/${id}/export?format=${encodeURIComponent(format)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    let err;
    try { err = JSON.parse(text); } catch { err = { error: text }; }
    throw new Error(err.error || `Export failed (${res.status})`);
  }
  const blob = await res.blob();
  const disposition = res.headers.get('Content-Disposition');
  let filename = `vocabulary_${id}.${format}`;
  if (disposition && disposition.includes('filename=')) {
    filename = disposition.split('filename=')[1].replace(/"/g, '').trim() || filename;
  }
  return { blob, filename };
};

// --- Alphabet ---
export const getAlphabet = async () => {
  return callApi('/api/alphabet');
};

// --- Festivals ---
export const getFestivals = async () => {
  return callApi('/api/festivals');
};

export const getFestival = async (id) => {
  if (!id) return null;
  return callApi(`/api/festivals/${id}`);
};

// --- Homepage ---
export const getHomepage = async () => {
  return callApi('/api/homepage');
};

// --- Legal ---
export const getLegalPage = async (slug) => {
  return callApi(`/api/legal/${slug}`);
};

// --- Proposals ---
export const submitProposal = async (proposal) => {
  const token = localStorage.getItem('akankasa:auth_token');
  const res = await fetch('/api/proposals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
    body: JSON.stringify(proposal),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Submission failed' }));
    throw new Error(err.error || 'Submission failed');
  }
  return res.json();
};

// --- Config ---
export const getConfig = async () => {
  return callApi('/api/config');
};

// --- Admin API helpers (include admin token automatically) ---
const getAdminToken = () => localStorage.getItem('akankasa:admin_token');

const adminHeaders = () => {
  const token = getAdminToken();
  return token ? { Authorization: token } : {};
};

export const adminGet = async (path) => {
  const res = await fetch(path, { headers: { ...adminHeaders() } });
  if (!res.ok) {
    const text = await res.text();
    let err;
    try { err = JSON.parse(text); } catch { err = { error: text }; }
    throw new Error(err.error || res.statusText || 'Admin API error');
  }
  const text = await res.text();
  if (!text || !text.trim()) return [];
  try { return JSON.parse(text); } catch { return []; }
};

export const adminPost = async (path, body) => {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...adminHeaders() },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text();
    let err;
    try { err = JSON.parse(text); } catch { err = { error: text }; }
    throw new Error(err.error || res.statusText || 'Admin API error');
  }
  const text = await res.text();
  if (!text || !text.trim()) return null;
  try { return JSON.parse(text); } catch { return text; }
};

export const adminPut = async (path, body) => {
  const res = await fetch(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...adminHeaders() },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text();
    let err;
    try { err = JSON.parse(text); } catch { err = { error: text }; }
    throw new Error(err.error || res.statusText || 'Admin API error');
  }
  const text = await res.text();
  if (!text || !text.trim()) return null;
  try { return JSON.parse(text); } catch { return text; }
};

export const adminDelete = async (path) => {
  const res = await fetch(path, {
    method: 'DELETE',
    headers: { ...adminHeaders() }
  });
  if (!res.ok) {
    const text = await res.text();
    let err;
    try { err = JSON.parse(text); } catch { err = { error: text }; }
    throw new Error(err.error || res.statusText || 'Admin API error');
  }
  return true;
};

// --- Collaborative documents / drafts ---
const STORAGE_KEY_DRAFTS = 'akankasa:drafts';

export const getEditorDocument = async (id) => {
  if (!id) return null;
  const data = await callApi(`/api/editor-documents/${id}`);
  return data || null;
};

export const listEditorDocuments = async () => {
  return callApi('/api/editor-documents');
};

export const saveEditorDocument = async (doc) => {
  const { id, title, content, category, region, tags, author } = doc;
  const token = localStorage.getItem('akankasa:auth_token');
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(`${API_BASE}/api/editor-documents${method === 'PUT' ? `/${id}` : ''}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
    body: JSON.stringify({ id, title, content, category, region, tags, author }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Save failed' }));
    throw new Error(err.error || 'Save failed');
  }
  return res.json();
};

// --- Media Library ---
export const mediaApi = {
  async upload(file, onProgress) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE}/api/uploads`);
      if (onProgress) xhr.upload.addEventListener('progress', onProgress);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try { resolve(JSON.parse(xhr.responseText)); } catch { reject(new Error('Invalid response')); }
        } else {
          reject(new Error(`Upload failed (${xhr.status})`));
        }
      };
      xhr.onerror = () => reject(new Error('Upload failed'));
      xhr.send(formData);
    });
  },

  async uploadBulk(files, onProgress) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      files.forEach((f) => formData.append('files', f));
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE}/api/uploads/bulk`);
      if (onProgress) xhr.upload.addEventListener('progress', onProgress);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try { resolve(JSON.parse(xhr.responseText)); } catch { reject(new Error('Invalid response')); }
        } else {
          reject(new Error(`Bulk upload failed (${xhr.status})`));
        }
      };
      xhr.onerror = () => reject(new Error('Bulk upload failed'));
      xhr.send(formData);
    });
  },

  async list({ type = 'all', search = '', limit = 48, offset = 0 } = {}) {
    const params = new URLSearchParams({ type, search, limit: String(limit), offset: String(offset) });
    return callApi(`/api/media?${params.toString()}`);
  },

  async updateAlt(id, altText) {
    if (!id) return { id, alt_text: altText };
    return callApi(`/api/media/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alt_text: altText }),
    });
  },

  async remove(id) {
    if (!id) return { success: true, id };
    return callApi(`/api/media/${id}`, { method: 'DELETE' });
  },
};

// --- Folk Stories ---
export const getFolkStories = async () => {
  return callApi('/api/folk-stories');
};

export const getAdminFolkStories = async () => {
  return adminGet('/api/admin/folk-stories');
};

export const saveFolkStory = async (item) => {
  if (item.id) return adminPut(`/api/admin/folk-stories/${item.id}`, item);
  return adminPost('/api/admin/folk-stories', { ...item, status: 'approved' });
};

export const deleteFolkStory = async (id) => {
  return adminDelete(`/api/admin/folk-stories/${id}`);
};

export const submitFolkStoryContribution = async (item) => {
  return callApi('/api/contributions/folk-stories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, status: 'pending' }),
  });
};

// --- Drumming ---
export const getDrumming = async () => {
  return callApi('/api/drumming');
};

export const getAdminDrumming = async () => {
  return adminGet('/api/admin/drumming');
};

export const saveDrumming = async (item) => {
  if (item.id) return adminPut(`/api/admin/drumming/${item.id}`, item);
  return adminPost('/api/admin/drumming', { ...item, status: 'approved' });
};

export const deleteDrumming = async (id) => {
  return adminDelete(`/api/admin/drumming/${id}`);
};

export const submitDrummingContribution = async (item) => {
  return callApi('/api/contributions/drumming', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, status: 'pending' }),
  });
};

// --- Festival Photos ---
export const getFestivalPhotos = async () => {
  return callApi('/api/festival-photos');
};

export const getAdminFestivalPhotos = async () => {
  return adminGet('/api/admin/festival-photos');
};

export const saveFestivalPhoto = async (item) => {
  if (item.id) return adminPut(`/api/admin/festival-photos/${item.id}`, item);
  return adminPost('/api/admin/festival-photos', { ...item, status: 'approved' });
};

export const deleteFestivalPhoto = async (id) => {
  return adminDelete(`/api/admin/festival-photos/${id}`);
};

export const submitFestivalPhotoContribution = async (item) => {
  return callApi('/api/contributions/festival-photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, status: 'pending' }),
  });
};

// --- Research Papers ---
export const getResearchPapers = async () => {
  return callApi('/api/research-papers');
};

export const getAdminResearchPapers = async () => {
  return adminGet('/api/admin/research-papers');
};

export const saveResearchPaper = async (item) => {
  if (item.id) return adminPut(`/api/admin/research-papers/${item.id}`, item);
  return adminPost('/api/admin/research-papers', { ...item, status: 'approved' });
};

export const deleteResearchPaper = async (id) => {
  return adminDelete(`/api/admin/research-papers/${id}`);
};

export const submitResearchPaperContribution = async (item) => {
  return callApi('/api/contributions/research-papers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, status: 'pending' }),
  });
};

// --- Contributions / Approval Queue ---
export const getPendingContributions = async (type) => {
  return adminGet(`/api/admin/contributions/${type}`);
};

export const approveContribution = async (type, id) => {
  return adminPost(`/api/admin/contributions/${type}/${id}/approve`, {});
};

export const rejectContribution = async (type, id) => {
  return adminPost(`/api/admin/contributions/${type}/${id}/reject`, {});
};
