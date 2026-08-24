import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '..', 'akankasa.db');

export const getDb = () => {
  return new sqlite3.Database(dbPath);
};

const runSql = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const safeAddColumn = async (db, table, column, type) => {
  try {
    await runSql(db, `ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  } catch (err) {
    // Column already exists, ignore
    if (!err.message.includes('duplicate column name')) {
      throw err;
    }
  }
};

const safeCreateIndex = async (db, sql) => {
  try {
    await runSql(db, sql);
  } catch (err) {
    // Index references missing column, skip
    if (err.message.includes('no such column')) {
      return;
    }
    throw err;
  }
};

export const initDatabase = async () => {
  const db = getDb();

  await runSql(db, `PRAGMA journal_mode = WAL`);
  await runSql(db, `PRAGMA foreign_keys = ON`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS dictionary_terms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      primary_akan TEXT NOT NULL,
      english_translation TEXT NOT NULL,
      part_of_speech TEXT NOT NULL,
      etymology TEXT,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS dialect_variations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      term_id INTEGER NOT NULL,
      dialect TEXT NOT NULL,
      spelling TEXT NOT NULL,
      phonetic_script TEXT,
      example_sentence_akan TEXT,
      example_sentence_english TEXT,
      FOREIGN KEY (term_id) REFERENCES dictionary_terms(id) ON DELETE CASCADE
    )
  `);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS audio_pronunciations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      term_id INTEGER NOT NULL,
      dialect TEXT NOT NULL,
      audio_url TEXT NOT NULL,
      speaker_gender TEXT,
      is_verified INTEGER DEFAULT 0,
      FOREIGN KEY (term_id) REFERENCES dictionary_terms(id) ON DELETE CASCADE
    )
  `);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'editor',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_akan ON dictionary_terms(primary_akan)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_english ON dictionary_terms(english_translation)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_published ON dictionary_terms(is_published)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_dialect_term ON dialect_variations(term_id)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_audio_term ON audio_pronunciations(term_id)`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS culture_articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      region TEXT,
      timeline TEXT,
      significance TEXT,
      examples TEXT,
      instruments TEXT,
      tags TEXT,
      author_name TEXT,
      author_email TEXT,
      author_user_id INTEGER,
      status TEXT DEFAULT 'pending',
      is_published INTEGER DEFAULT 0,
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  await safeAddColumn(db, 'culture_articles', 'author_user_id', 'INTEGER');
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_culture_category ON culture_articles(category)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_culture_status ON culture_articles(status)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_culture_published ON culture_articles(is_published)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_culture_publish_at ON culture_articles(publish_at)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_culture_unpublish_at ON culture_articles(unpublish_at)`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      file_url TEXT NOT NULL,
      file_type TEXT DEFAULT 'pdf',
      category TEXT NOT NULL,
      level TEXT DEFAULT 'beginner',
      author TEXT,
      tags TEXT,
      is_published INTEGER DEFAULT 1,
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_document_category ON documents(category)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_document_level ON documents(level)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_document_published ON documents(is_published)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_document_publish_at ON documents(publish_at)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_document_unpublish_at ON documents(unpublish_at)`);
  await safeAddColumn(db, 'documents', 'publish_at', 'TEXT');
  await safeAddColumn(db, 'documents', 'unpublish_at', 'TEXT');
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS forum_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      author_name TEXT,
      author_email TEXT,
      author_user_id INTEGER,
      status TEXT DEFAULT 'approved',
      is_pinned INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  await safeAddColumn(db, 'forum_posts', 'author_user_id', 'INTEGER');
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_forum_category ON forum_posts(category)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_forum_status ON forum_posts(status)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_forum_author ON forum_posts(author_user_id)`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS forum_comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      author_name TEXT,
      author_email TEXT,
      author_user_id INTEGER,
      status TEXT DEFAULT 'approved',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
      FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  await safeAddColumn(db, 'forum_comments', 'author_user_id', 'INTEGER');
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_comment_post ON forum_comments(post_id)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_comment_author ON forum_comments(author_user_id)`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      event_date TEXT NOT NULL,
      event_time TEXT,
      location TEXT,
      event_type TEXT DEFAULT 'online',
      max_participants INTEGER,
      status TEXT DEFAULT 'upcoming',
      publish_at TEXT,
      unpublish_at TEXT,
      created_by INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  await safeAddColumn(db, 'events', 'created_by', 'INTEGER');
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_event_date ON events(event_date)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_event_status ON events(status)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_event_publish_at ON events(publish_at)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_event_unpublish_at ON events(unpublish_at)`);
  await safeAddColumn(db, 'events', 'publish_at', 'TEXT');
  await safeAddColumn(db, 'events', 'unpublish_at', 'TEXT');
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      level TEXT DEFAULT 'beginner',
      duration TEXT,
      overview TEXT,
      objectives TEXT,
      content TEXT,
      quiz TEXT,
      is_published INTEGER DEFAULT 1,
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_lesson_level ON lessons(level)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_lesson_published ON lessons(is_published)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_lesson_publish_at ON lessons(publish_at)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_lesson_unpublish_at ON lessons(unpublish_at)`);
  await safeAddColumn(db, 'lessons', 'publish_at', 'TEXT');
  await safeAddColumn(db, 'lessons', 'unpublish_at', 'TEXT');
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS vocabulary_modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      words TEXT,
      is_published INTEGER DEFAULT 1,
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_vocab_published ON vocabulary_modules(is_published)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_vocab_publish_at ON vocabulary_modules(publish_at)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_vocab_unpublish_at ON vocabulary_modules(unpublish_at)`);
  await safeAddColumn(db, 'vocabulary_modules', 'publish_at', 'TEXT');
  await safeAddColumn(db, 'vocabulary_modules', 'unpublish_at', 'TEXT');
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS greetings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      akan TEXT NOT NULL,
      english TEXT NOT NULL,
      pronunciation TEXT,
      context TEXT,
      audio_url TEXT,
      time_of_day TEXT DEFAULT 'general',
      is_published INTEGER DEFAULT 1,
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_greeting_time ON greetings(time_of_day)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_greeting_publish_at ON greetings(publish_at)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_greeting_unpublish_at ON greetings(unpublish_at)`);
  await safeAddColumn(db, 'greetings', 'publish_at', 'TEXT');
  await safeAddColumn(db, 'greetings', 'unpublish_at', 'TEXT');
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS legal_pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS user_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT,
      location TEXT,
      contributions INTEGER DEFAULT 0,
      joined TEXT,
      specialties TEXT,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_profile_published ON user_profiles(is_published)`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS project_proposals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      proposer_name TEXT,
      proposer_email TEXT,
      proposer_user_id INTEGER,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (proposer_user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  await safeAddColumn(db, 'project_proposals', 'proposer_user_id', 'INTEGER');
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_proposal_status ON project_proposals(status)`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS homepage_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT NOT NULL,
      title TEXT,
      subtitle TEXT,
      body TEXT,
      image_url TEXT,
      link_url TEXT,
      link_text TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_homepage_section ON homepage_content(section)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_homepage_publish_at ON homepage_content(publish_at)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_homepage_unpublish_at ON homepage_content(unpublish_at)`);
  await safeAddColumn(db, 'homepage_content', 'publish_at', 'TEXT');
  await safeAddColumn(db, 'homepage_content', 'unpublish_at', 'TEXT');
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS festivals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      category TEXT DEFAULT 'festival',
      location TEXT,
      event_date TEXT,
      photographer TEXT,
      tags TEXT,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_festival_category ON festivals(category)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_festival_published ON festivals(is_published)`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS alphabets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      letter TEXT NOT NULL,
      pronunciation TEXT NOT NULL,
      example TEXT,
      audio_url TEXT,
      is_published INTEGER DEFAULT 1,
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_alphabet_letter ON alphabets(letter)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_alphabet_publish_at ON alphabets(publish_at)`);
  await safeCreateIndex(db, `CREATE INDEX IF NOT EXISTS idx_alphabet_unpublish_at ON alphabets(unpublish_at)`);
  await safeAddColumn(db, 'alphabets', 'publish_at', 'TEXT');
  await safeAddColumn(db, 'alphabets', 'unpublish_at', 'TEXT');
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_user_email ON users(email)`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS dictionary_suggestions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      primary_akan TEXT NOT NULL,
      english_translation TEXT NOT NULL,
      part_of_speech TEXT,
      etymology TEXT,
      notes TEXT,
      author_name TEXT,
      author_email TEXT,
      author_user_id INTEGER,
      status TEXT DEFAULT 'pending',
      admin_notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  await safeAddColumn(db, 'dictionary_suggestions', 'author_user_id', 'INTEGER');
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_suggestion_status ON dictionary_suggestions(status)`);
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS content_versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_name TEXT NOT NULL,
      record_id TEXT NOT NULL,
      data TEXT NOT NULL,
      changed_by TEXT DEFAULT 'admin',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_version_table ON content_versions(table_name, record_id)`);

  await runSql(db, `
    CREATE TABLE IF NOT EXISTS editor_documents (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      category TEXT,
      region TEXT,
      tags TEXT,
      author TEXT,
      author_user_id INTEGER,
      version INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  await safeAddColumn(db, 'editor_documents', 'author_user_id', 'INTEGER');
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_editor_documents_updated ON editor_documents(updated_at)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_editor_documents_author ON editor_documents(author_user_id)`);

  await runSql(db, `
    CREATE TABLE IF NOT EXISTS media_library (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT,
      url TEXT NOT NULL,
      mime_type TEXT,
      media_type TEXT NOT NULL DEFAULT 'image',
      size INTEGER DEFAULT 0,
      width INTEGER,
      height INTEGER,
      duration INTEGER,
      alt_text TEXT,
      uploaded_by TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_media_library_type ON media_library(media_type)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_media_library_created ON media_library(created_at)`);

  // --- Folk Stories ---
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS folk_stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      thumbnail TEXT,
      category TEXT,
      language TEXT DEFAULT 'Twi',
      duration TEXT,
      type TEXT DEFAULT 'audio',
      audio_url TEXT,
      video_url TEXT,
      transcript TEXT,
      narrator TEXT,
      region TEXT,
      is_published INTEGER DEFAULT 1,
      status TEXT DEFAULT 'approved',
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_folk_story_category ON folk_stories(category)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_folk_story_published ON folk_stories(is_published)`);

  // --- Drumming ---
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS drumming (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      thumbnail TEXT,
      instrument TEXT,
      difficulty TEXT DEFAULT 'Beginner',
      bpm INTEGER,
      type TEXT DEFAULT 'video',
      video_url TEXT,
      audio_url TEXT,
      pattern_notation TEXT,
      transcript TEXT,
      instructor TEXT,
      duration TEXT,
      region TEXT,
      is_published INTEGER DEFAULT 1,
      status TEXT DEFAULT 'approved',
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_drumming_instrument ON drumming(instrument)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_drumming_published ON drumming(is_published)`);

  // --- Festival Photos ---
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS festival_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      category TEXT DEFAULT 'festival',
      location TEXT,
      event_date TEXT,
      photographer TEXT,
      tags TEXT,
      is_published INTEGER DEFAULT 1,
      status TEXT DEFAULT 'approved',
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_festival_photo_category ON festival_photos(category)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_festival_photo_published ON festival_photos(is_published)`);

  // --- Research Papers ---
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS research_papers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      thumbnail TEXT,
      author TEXT,
      institution TEXT,
      category TEXT,
      language TEXT DEFAULT 'English',
      type TEXT DEFAULT 'pdf',
      pdf_url TEXT,
      audio_url TEXT,
      video_url TEXT,
      abstract TEXT,
      publication_date TEXT,
      pages INTEGER,
      keywords TEXT,
      doi TEXT,
      citation TEXT,
      is_published INTEGER DEFAULT 1,
      status TEXT DEFAULT 'approved',
      publish_at TEXT,
      unpublish_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_research_category ON research_papers(category)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_research_published ON research_papers(is_published)`);

  // --- Contributions (public submissions) ---
  await runSql(db, `
    CREATE TABLE IF NOT EXISTS contributions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_type TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      content TEXT,
      category TEXT,
      region TEXT,
      tags TEXT,
      media_url TEXT,
      audio_url TEXT,
      video_url TEXT,
      thumbnail TEXT,
      author_name TEXT,
      author_email TEXT,
      author_user_id INTEGER,
      status TEXT DEFAULT 'pending',
      admin_notes TEXT,
      reviewed_by TEXT,
      reviewed_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  await safeAddColumn(db, 'contributions', 'author_user_id', 'INTEGER');
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_contribution_type ON contributions(content_type)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_contribution_status ON contributions(status)`);
  await runSql(db, `CREATE INDEX IF NOT EXISTS idx_contribution_author ON contributions(author_user_id)`);

  return db;
};

export default { getDb, initDatabase };
