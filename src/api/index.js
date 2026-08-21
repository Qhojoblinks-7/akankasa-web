// src/api/index.js
// API layer: uses real backend when available, otherwise falls back to mock data + localStorage.

import { dictionaryData, communityData, alphabetData, greetingsData, lessonsData, vocabularyModules } from '../data/mockData';

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

function mockDelay(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), 50));
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
  if (!API_BASE) return mockDelay(dictionaryData);
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
  if (!API_BASE) {
    try {
      const raw = localStorage.getItem('akan:favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  const data = await callApi('/api/favorites');
  return data.favorites || [];
};

export const saveFavorites = async (favorites) => {
  if (!API_BASE) {
    localStorage.setItem('akan:favorites', JSON.stringify(favorites));
    return favorites;
  }
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
  if (!API_BASE) {
    const posts = communityData?.forumPosts || [];
    const filtered = category && category !== 'all' ? posts.filter((p) => p.category === category) : posts;
    return { total: filtered.length, page: page || 1, limit: limit || 20, results: filtered };
  }
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
  if (!API_BASE) {
    const posts = communityData?.forumPosts || [];
    return posts.find((p) => p.id === id) || null;
  }
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
  if (!API_BASE) {
    const all = communityData?.forumComments || [];
    return all.filter((c) => c.post_id === postId);
  }
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
  if (!API_BASE) {
    return mockDelay(communityData?.events || []);
  }
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
  if (!API_BASE) {
    return mockDelay(communityData?.profiles || []);
  }
  return callApi('/api/profiles');
};

// --- Admin / Moderation ---
export const getModerationQueue = async () => {
  if (!API_BASE) return [];
  return callApi('/api/admin/moderation');
};

export const moderateArticle = async (id, updates) => {
  if (!API_BASE) return updates;
  return callApi(`/api/admin/moderation/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
};

// --- Culture ---
export const getCultureArticles = async ({ category, q, page, limit } = {}) => {
  if (!API_BASE) return [];
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
  if (!API_BASE) return null;
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
  if (!API_BASE) return mockDelay(greetingsData || []);
  return callApi('/api/greetings');
};

// --- Lessons ---
export const getLessons = async () => {
  if (!API_BASE) return mockDelay(lessonsData || []);
  return callApi('/api/lessons');
};

export const getLesson = async (id) => {
  if (!id) return null;
  if (!API_BASE) {
    const lessons = lessonsData || [];
    return lessons.find((l) => String(l.id) === String(id)) || null;
  }
  return callApi(`/api/lessons/${id}`);
};

// --- Vocabulary ---
export const getVocabularyModules = async () => {
  if (!API_BASE) return mockDelay(vocabularyModules || []);
  return callApi('/api/vocabulary/modules');
};

export const getVocabularyModule = async (id) => {
  if (!id) return null;
  if (!API_BASE) {
    const modules = vocabularyModules || [];
    return modules.find((m) => String(m.id) === String(id)) || null;
  }
  return callApi(`/api/vocabulary/modules/${id}`);
};

// --- Documents / Research ---
export const getDocuments = async ({ category, level, q, page, limit } = {}) => {
  if (!API_BASE) return [];
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
  if (!API_BASE) return null;
  return callApi(`/api/documents/${id}`);
};

export const downloadDocument = async (id) => {
  if (!id) throw new Error('Document ID is required');
  const url = `${API_BASE || ''}/api/documents/${id}/download`;
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
  const url = `${API_BASE || ''}/api/vocabulary/${id}/export?format=${encodeURIComponent(format)}`;
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
  if (!API_BASE) return mockDelay(alphabetData || []);
  return callApi('/api/alphabet');
};

// --- Festivals ---
export const getFestivals = async () => {
  if (!API_BASE) return [];
  return callApi('/api/festivals');
};

export const getFestival = async (id) => {
  if (!id) return null;
  if (!API_BASE) return null;
  return callApi(`/api/festivals/${id}`);
};

// --- Homepage ---
export const getHomepage = async () => {
  if (!API_BASE) return [];
  return callApi('/api/homepage');
};

// --- Legal ---
export const getLegalPage = async (slug) => {
  if (!API_BASE) return null;
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
  if (!API_BASE) {
    return {
      dialects: ['Twi', 'Fante', 'Akuapem'],
      partsOfSpeech: ['noun', 'verb', 'adjective', 'adverb', 'interjection', 'phrase'],
      featureFlags: { showResearch: true, showAdmin: true, showAdvancedCulturePages: true },
    };
  }
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
  if (!API_BASE) {
    const content = localStorage.getItem(`akankasa:draft:${id}:content`);
    if (content !== null) return { id, content };
    return null;
  }
  const data = await callApi(`/api/editor-documents/${id}`);
  return data || null;
};

export const listEditorDocuments = async () => {
  if (!API_BASE) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY_DRAFTS) || '[]');
    return { total: list.length, results: list };
  }
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
    if (!API_BASE) return mediaApi._localFallback(file);
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
    if (!API_BASE) {
      const results = [];
      for (const f of files) results.push(await mediaApi._localFallback(f));
      return { results };
    }
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

  async _localFallback(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const item = {
          id,
          url: reader.result,
          mediaType: file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image',
          mimeType: file.type,
          size: file.size,
          filename: file.name,
          success: true,
        };
        mediaApi.cacheLocal(item);
        resolve(item);
      };
      reader.readAsDataURL(file);
    });
  },

  async list({ type = 'all', search = '', limit = 48, offset = 0 } = {}) {
    if (!API_BASE) {
      const stored = JSON.parse(localStorage.getItem('akankasa:local_media') || '[]');
      let results = stored;
      if (type !== 'all') results = results.filter((m) => m.mediaType === type);
      if (search) {
        const q = search.toLowerCase();
        results = results.filter((m) => (m.filename || '').toLowerCase().includes(q));
      }
      return { results, total: results.length };
    }
    const params = new URLSearchParams({ type, search, limit: String(limit), offset: String(offset) });
    return callApi(`/api/media?${params.toString()}`);
  },

  async updateAlt(id, altText) {
    if (!id) return { id, alt_text: altText };
    if (!API_BASE) return { id, alt_text: altText };
    return callApi(`/api/media/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alt_text: altText }),
    });
  },

  async remove(id) {
    if (!id) return { success: true, id };
    if (!API_BASE) {
      const stored = JSON.parse(localStorage.getItem('akankasa:local_media') || '[]');
      localStorage.setItem('akankasa:local_media', JSON.stringify(stored.filter((m) => String(m.id) !== String(id))));
      return { success: true, id };
    }
    return callApi(`/api/media/${id}`, { method: 'DELETE' });
  },

  cacheLocal(item) {
    const stored = JSON.parse(localStorage.getItem('akankasa:local_media') || '[]');
    stored.unshift({ ...item, created_at: new Date().toISOString() });
    localStorage.setItem('akankasa:local_media', JSON.stringify(stored.slice(0, 200)));
  },
};

// --- Folk Stories ---
const FOLK_STORIES_KEY = 'akankasa:folk_stories';
const FOLK_STORIES_CONTRIB_KEY = 'akankasa:folk_stories_contributions';

function _getFolkStories() {
  const approved = JSON.parse(localStorage.getItem(FOLK_STORIES_KEY) || '[]');
  return approved.filter(i => i.status === 'approved' || i.status === undefined);
}

function _getAllFolkStories() {
  return JSON.parse(localStorage.getItem(FOLK_STORIES_KEY) || '[]');
}

function _saveFolkStories(items) {
  localStorage.setItem(FOLK_STORIES_KEY, JSON.stringify(items));
}

export const getFolkStories = async () => {
  if (!API_BASE) return mockDelay(_getFolkStories());
  return callApi('/api/folk-stories');
};

export const getAdminFolkStories = async () => {
  if (!API_BASE) return mockDelay(_getAllFolkStories());
  return adminGet('/api/admin/folk-stories');
};

export const saveFolkStory = async (item) => {
  if (!API_BASE) {
    const items = _getAllFolkStories();
    if (item.id) {
      const idx = items.findIndex(i => String(i.id) === String(item.id));
      if (idx >= 0) items[idx] = { ...items[idx], ...item };
      else items.unshift({ ...item, status: 'approved' });
    } else {
      items.unshift({ ...item, id: Date.now(), status: 'approved', created_at: new Date().toISOString() });
    }
    _saveFolkStories(items);
    return mockDelay(items.find(i => i.id === item.id || i.title === item.title));
  }
  if (item.id) return adminPut(`/api/admin/folk-stories/${item.id}`, item);
  return adminPost('/api/admin/folk-stories', { ...item, status: 'approved' });
};

export const deleteFolkStory = async (id) => {
  if (!API_BASE) {
    const items = _getAllFolkStories().filter(i => String(i.id) !== String(id));
    _saveFolkStories(items);
    return mockDelay(true);
  }
  return adminDelete(`/api/admin/folk-stories/${id}`);
};

export const submitFolkStoryContribution = async (item) => {
  if (!API_BASE) {
    const items = JSON.parse(localStorage.getItem(FOLK_STORIES_CONTRIB_KEY) || '[]');
    const newItem = { ...item, id: Date.now(), status: 'pending', created_at: new Date().toISOString() };
    items.unshift(newItem);
    localStorage.setItem(FOLK_STORIES_CONTRIB_KEY, JSON.stringify(items));
    return mockDelay(newItem);
  }
  return callApi('/api/contributions/folk-stories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, status: 'pending' }),
  });
};

// --- Drumming ---
const DRUMMING_KEY = 'akankasa:drumming';
const DRUMMING_CONTRIB_KEY = 'akankasa:drumming_contributions';

function _getDrumming() {
  const approved = JSON.parse(localStorage.getItem(DRUMMING_KEY) || '[]');
  return approved.filter(i => i.status === 'approved' || i.status === undefined);
}

function _getAllDrumming() {
  return JSON.parse(localStorage.getItem(DRUMMING_KEY) || '[]');
}

function _saveDrumming(items) {
  localStorage.setItem(DRUMMING_KEY, JSON.stringify(items));
}

export const getDrumming = async () => {
  if (!API_BASE) return mockDelay(_getDrumming());
  return callApi('/api/drumming');
};

export const getAdminDrumming = async () => {
  if (!API_BASE) return mockDelay(_getAllDrumming());
  return adminGet('/api/admin/drumming');
};

export const saveDrumming = async (item) => {
  if (!API_BASE) {
    const items = _getAllDrumming();
    if (item.id) {
      const idx = items.findIndex(i => String(i.id) === String(item.id));
      if (idx >= 0) items[idx] = { ...items[idx], ...item };
      else items.unshift({ ...item, status: 'approved' });
    } else {
      items.unshift({ ...item, id: Date.now(), status: 'approved', created_at: new Date().toISOString() });
    }
    _saveDrumming(items);
    return mockDelay(items.find(i => i.id === item.id || i.title === item.title));
  }
  if (item.id) return adminPut(`/api/admin/drumming/${item.id}`, item);
  return adminPost('/api/admin/drumming', { ...item, status: 'approved' });
};

export const deleteDrumming = async (id) => {
  if (!API_BASE) {
    const items = _getAllDrumming().filter(i => String(i.id) !== String(id));
    _saveDrumming(items);
    return mockDelay(true);
  }
  return adminDelete(`/api/admin/drumming/${id}`);
};

export const submitDrummingContribution = async (item) => {
  if (!API_BASE) {
    const items = JSON.parse(localStorage.getItem(DRUMMING_CONTRIB_KEY) || '[]');
    const newItem = { ...item, id: Date.now(), status: 'pending', created_at: new Date().toISOString() };
    items.unshift(newItem);
    localStorage.setItem(DRUMMING_CONTRIB_KEY, JSON.stringify(items));
    return mockDelay(newItem);
  }
  return callApi('/api/contributions/drumming', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, status: 'pending' }),
  });
};

// --- Festival Photos ---
const FESTIVAL_PHOTOS_KEY = 'akankasa:festival_photos';
const FESTIVAL_PHOTOS_CONTRIB_KEY = 'akankasa:festival_photos_contributions';

function _getFestivalPhotos() {
  const approved = JSON.parse(localStorage.getItem(FESTIVAL_PHOTOS_KEY) || '[]');
  return approved.filter(i => i.status === 'approved' || i.status === undefined);
}

function _getAllFestivalPhotos() {
  return JSON.parse(localStorage.getItem(FESTIVAL_PHOTOS_KEY) || '[]');
}

function _saveFestivalPhotos(items) {
  localStorage.setItem(FESTIVAL_PHOTOS_KEY, JSON.stringify(items));
}

export const getFestivalPhotos = async () => {
  if (!API_BASE) return mockDelay(_getFestivalPhotos());
  return callApi('/api/festival-photos');
};

export const getAdminFestivalPhotos = async () => {
  if (!API_BASE) return mockDelay(_getAllFestivalPhotos());
  return adminGet('/api/admin/festival-photos');
};

export const saveFestivalPhoto = async (item) => {
  if (!API_BASE) {
    const items = _getAllFestivalPhotos();
    if (item.id) {
      const idx = items.findIndex(i => String(i.id) === String(item.id));
      if (idx >= 0) items[idx] = { ...items[idx], ...item };
      else items.unshift({ ...item, status: 'approved' });
    } else {
      items.unshift({ ...item, id: Date.now(), status: 'approved', created_at: new Date().toISOString() });
    }
    _saveFestivalPhotos(items);
    return mockDelay(items.find(i => i.id === item.id || i.title === item.title));
  }
  if (item.id) return adminPut(`/api/admin/festival-photos/${item.id}`, item);
  return adminPost('/api/admin/festival-photos', { ...item, status: 'approved' });
};

export const deleteFestivalPhoto = async (id) => {
  if (!API_BASE) {
    const items = _getAllFestivalPhotos().filter(i => String(i.id) !== String(id));
    _saveFestivalPhotos(items);
    return mockDelay(true);
  }
  return adminDelete(`/api/admin/festival-photos/${id}`);
};

export const submitFestivalPhotoContribution = async (item) => {
  if (!API_BASE) {
    const items = JSON.parse(localStorage.getItem(FESTIVAL_PHOTOS_CONTRIB_KEY) || '[]');
    const newItem = { ...item, id: Date.now(), status: 'pending', created_at: new Date().toISOString() };
    items.unshift(newItem);
    localStorage.setItem(FESTIVAL_PHOTOS_CONTRIB_KEY, JSON.stringify(items));
    return mockDelay(newItem);
  }
  return callApi('/api/contributions/festival-photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, status: 'pending' }),
  });
};

// --- Research Papers ---
const RESEARCH_PAPERS_KEY = 'akankasa:research_papers';
const RESEARCH_PAPERS_CONTRIB_KEY = 'akankasa:research_papers_contributions';

function _getResearchPapers() {
  const approved = JSON.parse(localStorage.getItem(RESEARCH_PAPERS_KEY) || '[]');
  return approved.filter(i => i.status === 'approved' || i.status === undefined);
}

function _getAllResearchPapers() {
  return JSON.parse(localStorage.getItem(RESEARCH_PAPERS_KEY) || '[]');
}

function _saveResearchPapers(items) {
  localStorage.setItem(RESEARCH_PAPERS_KEY, JSON.stringify(items));
}

export const getResearchPapers = async () => {
  if (!API_BASE) return mockDelay(_getResearchPapers());
  return callApi('/api/research-papers');
};

export const getAdminResearchPapers = async () => {
  if (!API_BASE) return mockDelay(_getAllResearchPapers());
  return adminGet('/api/admin/research-papers');
};

export const saveResearchPaper = async (item) => {
  if (!API_BASE) {
    const items = _getAllResearchPapers();
    if (item.id) {
      const idx = items.findIndex(i => String(i.id) === String(item.id));
      if (idx >= 0) items[idx] = { ...items[idx], ...item };
      else items.unshift({ ...item, status: 'approved' });
    } else {
      items.unshift({ ...item, id: Date.now(), status: 'approved', created_at: new Date().toISOString() });
    }
    _saveResearchPapers(items);
    return mockDelay(items.find(i => i.id === item.id || i.title === item.title));
  }
  if (item.id) return adminPut(`/api/admin/research-papers/${item.id}`, item);
  return adminPost('/api/admin/research-papers', { ...item, status: 'approved' });
};

export const deleteResearchPaper = async (id) => {
  if (!API_BASE) {
    const items = _getAllResearchPapers().filter(i => String(i.id) !== String(id));
    _saveResearchPapers(items);
    return mockDelay(true);
  }
  return adminDelete(`/api/admin/research-papers/${id}`);
};

export const submitResearchPaperContribution = async (item) => {
  if (!API_BASE) {
    const items = JSON.parse(localStorage.getItem(RESEARCH_PAPERS_CONTRIB_KEY) || '[]');
    const newItem = { ...item, id: Date.now(), status: 'pending', created_at: new Date().toISOString() };
    items.unshift(newItem);
    localStorage.setItem(RESEARCH_PAPERS_CONTRIB_KEY, JSON.stringify(items));
    return mockDelay(newItem);
  }
  return callApi('/api/contributions/research-papers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, status: 'pending' }),
  });
};

// --- Contributions / Approval Queue ---
export const getPendingContributions = async (type) => {
  if (!API_BASE) {
    const keys = {
      'folk-stories': FOLK_STORIES_CONTRIB_KEY,
      'drumming': DRUMMING_CONTRIB_KEY,
      'festival-photos': FESTIVAL_PHOTOS_CONTRIB_KEY,
      'research-papers': RESEARCH_PAPERS_CONTRIB_KEY,
    };
    const mainKeys = {
      'folk-stories': FOLK_STORIES_KEY,
      'drumming': DRUMMING_KEY,
      'festival-photos': FESTIVAL_PHOTOS_KEY,
      'research-papers': RESEARCH_PAPERS_KEY,
    };
    // Check both contribution queue and main list for pending items
    const contribs = JSON.parse(localStorage.getItem(keys[type]) || '[]');
    const mainItems = JSON.parse(localStorage.getItem(mainKeys[type]) || '[]');
    const pending = [...contribs.filter(i => i.status === 'pending'), ...mainItems.filter(i => i.status === 'pending')];
    return mockDelay(pending);
  }
  return adminGet(`/api/admin/contributions/${type}`);
};

export const approveContribution = async (type, id) => {
  if (!API_BASE) {
    const keys = {
      'folk-stories': FOLK_STORIES_CONTRIB_KEY,
      'drumming': DRUMMING_CONTRIB_KEY,
      'festival-photos': FESTIVAL_PHOTOS_CONTRIB_KEY,
      'research-papers': RESEARCH_PAPERS_CONTRIB_KEY,
    };
    const mainKeys = {
      'folk-stories': FOLK_STORIES_KEY,
      'drumming': DRUMMING_KEY,
      'festival-photos': FESTIVAL_PHOTOS_KEY,
      'research-papers': RESEARCH_PAPERS_KEY,
    };
    // Find in contributions
    const contribs = JSON.parse(localStorage.getItem(keys[type]) || '[]');
    const item = contribs.find(i => String(i.id) === String(id));
    if (item) {
      // Move to main list as approved
      const mainItems = JSON.parse(localStorage.getItem(mainKeys[type]) || '[]');
      mainItems.unshift({ ...item, status: 'approved', approved_at: new Date().toISOString() });
      localStorage.setItem(mainKeys[type], JSON.stringify(mainItems));
      // Remove from contributions
      const updated = contribs.filter(i => String(i.id) !== String(id));
      localStorage.setItem(keys[type], JSON.stringify(updated));
    }
    return mockDelay(true);
  }
  return adminPost(`/api/admin/contributions/${type}/${id}/approve`, {});
};

export const rejectContribution = async (type, id) => {
  if (!API_BASE) {
    const keys = {
      'folk-stories': FOLK_STORIES_CONTRIB_KEY,
      'drumming': DRUMMING_CONTRIB_KEY,
      'festival-photos': FESTIVAL_PHOTOS_CONTRIB_KEY,
      'research-papers': RESEARCH_PAPERS_CONTRIB_KEY,
    };
    const contribs = JSON.parse(localStorage.getItem(keys[type]) || '[]');
    const updated = contribs.map(i => String(i.id) === String(id) ? { ...i, status: 'rejected' } : i);
    localStorage.setItem(keys[type], JSON.stringify(updated));
    return mockDelay(true);
  }
  return adminPost(`/api/admin/contributions/${type}/${id}/reject`, {});
};
