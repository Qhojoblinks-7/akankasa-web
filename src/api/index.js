import { dictionaryData, communityData } from '../data/mockData';

// Lightweight promise-based API wrapper for frontend-backend handoff
// Replace implementations with real HTTP calls when backend is ready.

export const getDictionary = async () => {
  // simulate async behavior
  return new Promise((resolve) => setTimeout(() => resolve(dictionaryData), 50));
};

export const getEvents = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(communityData.events || []), 50));
};

export const getRegistrations = async () => {
  try {
    const raw = localStorage.getItem('akan:registrations');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveRegistration = async (registration) => {
  const regs = await getRegistrations();
  regs.push(registration);
  try {
    localStorage.setItem('akan:registrations', JSON.stringify(regs));
  } catch {}
  return registration;
};

export const getFavorites = async () => {
  try {
    const raw = localStorage.getItem('akan:favorites');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = async (favorites) => {
  try {
    localStorage.setItem('akan:favorites', JSON.stringify(favorites));
  } catch {}
  return favorites;
};

// ---------------- Word Lists API (beyond favorites) ----------------
const WORD_LISTS_KEY = 'akan:wordlists';

export const getWordLists = async () => {
  try {
    const raw = localStorage.getItem(WORD_LISTS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed;
  } catch {
    return {};
  }
};

export const saveWordLists = async (lists) => {
  try {
    localStorage.setItem(WORD_LISTS_KEY, JSON.stringify(lists));
  } catch {}
  return lists;
};

export const createWordList = async (name) => {
  const lists = await getWordLists();
  const id = `list_${Date.now()}`;
  lists[id] = { id, name, wordIds: [] };
  await saveWordLists(lists);
  return lists[id];
};

export const renameWordList = async (listId, newName) => {
  const lists = await getWordLists();
  if (lists[listId]) {
    lists[listId].name = newName;
    await saveWordLists(lists);
  }
  return lists[listId] || null;
};

export const deleteWordList = async (listId) => {
  const lists = await getWordLists();
  delete lists[listId];
  await saveWordLists(lists);
  return true;
};

export const addWordToList = async (listId, wordId) => {
  const lists = await getWordLists();
  if (!lists[listId]) return null;
  const set = new Set(lists[listId].wordIds);
  set.add(wordId);
  lists[listId].wordIds = Array.from(set);
  await saveWordLists(lists);
  return lists[listId];
};

export const removeWordFromList = async (listId, wordId) => {
  const lists = await getWordLists();
  if (!lists[listId]) return null;
  lists[listId].wordIds = (lists[listId].wordIds || []).filter(id => id !== wordId);
  await saveWordLists(lists);
  return lists[listId];
};

// ---------------- Dictionary Moderation Queue ----------------
const DICT_MOD_QUEUE_KEY = 'akan:moderation-queue:dictionary';

export const submitDictionaryContribution = async (payload) => {
  const item = { ...payload, id: `dict_${Date.now()}`, status: 'pending', submittedAt: new Date().toISOString() };
  try {
    const raw = localStorage.getItem(DICT_MOD_QUEUE_KEY);
    const queue = raw ? JSON.parse(raw) : [];
    queue.push(item);
    localStorage.setItem(DICT_MOD_QUEUE_KEY, JSON.stringify(queue));
  } catch {}
  return item;
};

export const getDictionaryModerationQueue = async () => {
  try {
    const raw = localStorage.getItem(DICT_MOD_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const setDictionaryModerationQueue = async (queue) => {
  try {
    localStorage.setItem(DICT_MOD_QUEUE_KEY, JSON.stringify(queue));
  } catch {}
  return queue;
};

// ---------------- Research Uploads + Moderation ----------------
const RESEARCH_QUEUE_KEY = 'akan:moderation-queue:research';

export const submitResearchUpload = async (payload) => {
  const item = {
    ...payload,
    id: `res_${Date.now()}`,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };
  try {
    const raw = localStorage.getItem(RESEARCH_QUEUE_KEY);
    const queue = raw ? JSON.parse(raw) : [];
    queue.push(item);
    localStorage.setItem(RESEARCH_QUEUE_KEY, JSON.stringify(queue));
  } catch {}
  return item;
};

export const getResearchModerationQueue = async () => {
  try {
    const raw = localStorage.getItem(RESEARCH_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const setResearchModerationQueue = async (queue) => {
  try {
    localStorage.setItem(RESEARCH_QUEUE_KEY, JSON.stringify(queue));
  } catch {}
  return queue;
};

// ---------------- Scheduling & Published Stores ----------------
const PUBLISHED_CULTURE_KEY = 'akan:published:culture';
const PUBLISHED_RESEARCH_KEY = 'akan:published:research';

export const getPublishedCulture = async () => {
  try {
    const raw = localStorage.getItem(PUBLISHED_CULTURE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

export const setPublishedCulture = async (list) => {
  try { localStorage.setItem(PUBLISHED_CULTURE_KEY, JSON.stringify(list)); } catch {}
  return list;
};

export const getPublishedResearch = async () => {
  try {
    const raw = localStorage.getItem(PUBLISHED_RESEARCH_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

export const setPublishedResearch = async (list) => {
  try { localStorage.setItem(PUBLISHED_RESEARCH_KEY, JSON.stringify(list)); } catch {}
  return list;
};
