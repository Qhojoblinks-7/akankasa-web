import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { initDatabase, getDb } from './database.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, unlinkSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const BOT_REGEX = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|crawler|spider/i;
const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN || '';
const PRERENDER_HOST = process.env.PRERENDER_HOST || 'service.prerender.io';

app.use((req, res, next) => {
  if (!PRERENDER_TOKEN) return next();
  const userAgent = req.headers['user-agent'] || '';
  if (!BOT_REGEX.test(userAgent)) return next();
  const prerenderUrl = `https://${PRERENDER_HOST}${req.protocol}://${req.get('host')}${req.originalUrl}`;
  fetch(prerenderUrl, {
    headers: {
      'User-Agent': userAgent,
      'X-Prerender-Token': PRERENDER_TOKEN,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Pre-render failed: ${response.status}`);
      return response.text();
    })
    .then((html) => {
      res.set('Content-Type', 'text/html');
      res.set('X-Prerender-Cache', 'HIT');
      res.send(html);
    })
    .catch((err) => {
      console.error('Prerender error:', err.message);
      next();
    });
});

const requireAuth = (req, res, next) => {
  const raw = req.headers.authorization;
  if (!raw) return res.status(401).json({ error: 'Authentication required' });
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    const userId = decoded.split(':')[0];
    const db = getDb();
    db.get('SELECT id, name, email, role FROM users WHERE id = ? AND is_active = 1', [userId], (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: 'Invalid or expired token' });
      req.user = user;
      next();
    });
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const uploadDir = join(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const typeDir = join(uploadDir, file.mimetype.startsWith('video') ? 'video' : file.mimetype.startsWith('audio') ? 'audio' : 'image');
    mkdirSync(typeDir, { recursive: true });
    cb(null, typeDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safe = file.originalname.replace(/[^a-zA-Z0-9.\-]/g, '_');
    cb(null, unique + '-' + safe);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    const audioTypes = ['audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/x-wav', 'audio/m4a', 'audio/mp4', 'audio/webm'];
    const videoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    const docTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const allowed = [...imageTypes, ...audioTypes, ...videoTypes, ...docTypes];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Allowed: images, audio, video, PDF, DOC/DOCX, TXT'));
    }
  }
});

app.use('/uploads', express.static(uploadDir));

const seedAdmin = async () => {
  const db = getDb();
  const hash = await bcrypt.hash('admin123', 10);
  db.run(
    'INSERT OR IGNORE INTO admin_users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
    ['admin@akankasa.org', hash, 'Admin', 'admin']
  );
};

const seedDemoUser = async () => {
  const db = getDb();
  const hash = await bcrypt.hash('user123', 10);
  db.run(
    'INSERT OR IGNORE INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    ['Demo User', 'user@akankasa.org', hash, 'user']
  );
};

const seedAlphabets = async () => {
  const db = getDb();
  const count = await new Promise((resolve, reject) => {
    db.get('SELECT COUNT(*) as c FROM alphabets', (err, row) => {
      if (err) reject(err);
      else resolve(row.c);
    });
  });
  if (count > 0) return;
  const alphabets = [
    { letter: 'A', pronunciation: 'ah', example: 'Aba (child)', audio_url: '/audio/a.mp3' },
    { letter: 'B', pronunciation: 'bay', example: 'Boa (help)', audio_url: '/audio/b.mp3' },
    { letter: 'D', pronunciation: 'day', example: 'Da (day)', audio_url: '/audio/d.mp3' },
    { letter: 'E', pronunciation: 'eh', example: 'Efie (house)', audio_url: '/audio/e.mp3' },
    { letter: 'Ɛ', pronunciation: 'eh (open)', example: 'Ɛpo (sea)', audio_url: '/audio/e_open.mp3' },
    { letter: 'F', pronunciation: 'fay', example: 'Fie (home)', audio_url: '/audio/f.mp3' },
    { letter: 'G', pronunciation: 'gay', example: 'Gua (dog)', audio_url: '/audio/g.mp3' },
    { letter: 'H', pronunciation: 'hay', example: 'Hwe (look)', audio_url: '/audio/h.mp3' },
    { letter: 'I', pronunciation: 'ee', example: 'Ino (there)', audio_url: '/audio/i.mp3' },
    { letter: 'K', pronunciation: 'kay', example: 'Kasa (speak)', audio_url: '/audio/k.mp3' },
    { letter: 'L', pronunciation: 'lay', example: 'Lɛ (eat)', audio_url: '/audio/l.mp3' },
    { letter: 'M', pronunciation: 'may', example: 'Me (I/my)', audio_url: '/audio/m.mp3' },
    { letter: 'N', pronunciation: 'nay', example: 'Na (and/then)', audio_url: '/audio/n.mp3' },
    { letter: 'O', pronunciation: 'oh', example: 'Obi (someone)', audio_url: '/audio/o.mp3' },
    { letter: 'Ɔ', pronunciation: 'aw', example: 'Ɔhene (king)', audio_url: '/audio/o_open.mp3' },
    { letter: 'P', pronunciation: 'pay', example: 'Papa (father)', audio_url: '/audio/p.mp3' },
    { letter: 'R', pronunciation: 'ray', example: 'Ra (sleep)', audio_url: '/audio/r.mp3' },
    { letter: 'S', pronunciation: 'say', example: 'Sua (learn)', audio_url: '/audio/s.mp3' },
    { letter: 'T', pronunciation: 'tay', example: 'To (buy)', audio_url: '/audio/t.mp3' },
    { letter: 'U', pronunciation: 'oo', example: 'Uni (drink)', audio_url: '/audio/u.mp3' },
    { letter: 'W', pronunciation: 'way', example: 'Wo (you)', audio_url: '/audio/w.mp3' },
    { letter: 'Y', pronunciation: 'yay', example: 'Ye (do)', audio_url: '/audio/y.mp3' }
  ];
  for (const a of alphabets) {
    db.run(
      'INSERT INTO alphabets (letter, pronunciation, example, audio_url, is_published) VALUES (?, ?, ?, ?, ?)',
      [a.letter, a.pronunciation, a.example, a.audio_url, 1]
    );
  }
};

const init = async () => {
  const db = await initDatabase();
  await seedAdmin();
  await seedDemoUser();
  await seedAlphabets();

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  app.get('/api/config', (req, res) => {
    res.json({
      dialects: ['Twi', 'Fante', 'Akuapem'],
      partsOfSpeech: ['noun', 'verb', 'adjective', 'adverb', 'interjection', 'phrase'],
      featureFlags: { showResearch: true, showAdmin: true, showAdvancedCulturePages: true }
    });
  });

  app.get('/api/dictionary', (req, res) => {
    const { q, direction, dialect, partOfSpeech, sort, page, limit } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 10);
    const offset = (pageNum - 1) * limitNum;

    let where = 'WHERE 1=1';
    const params = [];

    if (q) {
      const searchCol = direction === 'english-akan' ? 'english_translation' : 'primary_akan';
      where += ` AND ${searchCol} LIKE ?`;
      params.push(`%${q}%`);
    }

    if (dialect && dialect !== 'all') {
      where += ` AND id IN (
        SELECT term_id FROM dialect_variations WHERE dialect = ?
      )`;
      params.push(dialect);
    }

    if (partOfSpeech && partOfSpeech !== 'all') {
      where += ` AND part_of_speech = ?`;
      params.push(partOfSpeech);
    }

    const orderBy = sort === 'relevance' && q ? '' : ' ORDER BY primary_akan COLLATE NOCASE ASC';

    const db = getDb();
    db.get(`SELECT COUNT(*) as total FROM dictionary_terms ${where}`, params, (err, countRow) => {
      if (err) return res.status(500).json({ error: err.message });
      const total = countRow.total;

      db.all(`SELECT * FROM dictionary_terms ${where}${orderBy} LIMIT ? OFFSET ?`, [...params, limitNum, offset], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        const enriched = rows.map(row => {
          const dialectRows = [];
          const audioRows = [];
          return new Promise((resolve) => {
            db.all('SELECT * FROM dialect_variations WHERE term_id = ?', [row.id], (err, dv) => {
              if (!err) dialectRows.push(...dv);
              db.all('SELECT * FROM audio_pronunciations WHERE term_id = ?', [row.id], (err, ap) => {
                if (!err) audioRows.push(...ap);
                resolve({
                  ...row,
                  dialect: dialectRows.map(d => d.dialect).join(', ') || 'Twi',
                  variations: dialectRows,
                  audio: audioRows.length > 0 ? audioRows[0].audio_url : null,
                  pronunciations: audioRows,
                  examples: []
                });
              });
            });
          });
        });

        Promise.all(enriched).then(results => {
          res.json({ total, page: pageNum, limit: limitNum, results });
        });
      });
    });
  });

  app.get('/api/dictionary/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM dictionary_terms WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });

      db.all('SELECT * FROM dialect_variations WHERE term_id = ?', [row.id], (err, variations) => {
        if (err) variations = [];
        db.all('SELECT * FROM audio_pronunciations WHERE term_id = ?', [row.id], (err, pronunciations) => {
          if (err) pronunciations = [];
          res.json({
            ...row,
            variations,
            pronunciations,
            dialect: variations.map(v => v.dialect).join(', ') || 'Twi',
            examples: variations.flatMap(v => {
              if (!v.example_sentence_akan) return [];
              return [{ akan: v.example_sentence_akan, english: v.example_sentence_english || '', audio: null }];
            })
          });
        });
      });
    });
  });

  app.post('/api/dictionary', (req, res) => {
    const { primary_akan, english_translation, part_of_speech, etymology, is_published, variations, pronunciations } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO dictionary_terms (primary_akan, english_translation, part_of_speech, etymology, is_published) VALUES (?, ?, ?, ?, ?)',
      [primary_akan, english_translation, part_of_speech, etymology || '', is_published ? 1 : 0],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        const termId = this.lastID;

        if (variations && Array.isArray(variations)) {
          const stmt = db.prepare('INSERT INTO dialect_variations (term_id, dialect, spelling, phonetic_script, example_sentence_akan, example_sentence_english) VALUES (?, ?, ?, ?, ?, ?)');
          variations.forEach(v => {
            stmt.run([termId, v.dialect, v.spelling, v.phonetic_script || '', v.example_sentence_akan || '', v.example_sentence_english || '']);
          });
          stmt.finalize();
        }

        if (pronunciations && Array.isArray(pronunciations)) {
          const stmt = db.prepare('INSERT INTO audio_pronunciations (term_id, dialect, audio_url, speaker_gender, is_verified) VALUES (?, ?, ?, ?, ?)');
          pronunciations.forEach(p => {
            stmt.run([termId, p.dialect, p.audio_url, p.speaker_gender || '', p.is_verified ? 1 : 0]);
          });
          stmt.finalize();
        }

        res.status(201).json({ id: termId, ...req.body });
      }
    );
  });

  app.put('/api/dictionary/:id', (req, res) => {
    const { primary_akan, english_translation, part_of_speech, etymology, is_published } = req.body;
    const db = getDb();
    db.run(
      'UPDATE dictionary_terms SET primary_akan = ?, english_translation = ?, part_of_speech = ?, etymology = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [primary_akan, english_translation, part_of_speech, etymology || '', is_published ? 1 : 0, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, ...req.body });
      }
    );
  });

  app.delete('/api/dictionary/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM dictionary_terms WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  app.get('/api/favorites', (req, res) => {
    const raw = req.headers.authorization;
    res.json({ favorites: [] });
  });

  app.put('/api/favorites', (req, res) => {
    res.json({ favorites: req.body.favorites || [] });
  });

  app.post('/api/uploads', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const db = getDb();
    const mediaType = req.file.mimetype.startsWith('video') ? 'video' : req.file.mimetype.startsWith('audio') ? 'audio' : req.file.mimetype.startsWith('image') ? 'image' : 'document';
    const url = `/uploads/${mediaType}/${req.file.filename}`;
    db.run(
      'INSERT INTO media_library (filename, original_name, url, mime_type, media_type, size, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.file.filename, req.file.originalname, url, req.file.mimetype, mediaType, req.file.size, 'admin'],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
          id: this.lastID,
          url,
          mediaType,
          mimeType: req.file.mimetype,
          size: req.file.size,
          filename: req.file.originalname,
        });
      }
    );
  });

  app.post('/api/uploads/bulk', upload.array('files', 20), (req, res) => {
    if (!req.files || !req.files.length) return res.status(400).json({ error: 'No files uploaded' });
    const db = getDb();
    const results = [];
    let pending = req.files.length;
    req.files.forEach((file) => {
      const mediaType = file.mimetype.startsWith('video') ? 'video' : file.mimetype.startsWith('audio') ? 'audio' : file.mimetype.startsWith('image') ? 'image' : 'document';
      const url = `/uploads/${mediaType}/${file.filename}`;
      db.run(
        'INSERT INTO media_library (filename, original_name, url, mime_type, media_type, size, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [file.filename, file.originalname, url, file.mimetype, mediaType, file.size, 'admin'],
        function (err) {
          if (err) {
            results.push({ filename: file.originalname, success: false, error: err.message });
          } else {
            results.push({ id: this.lastID, url, mediaType, mimeType: file.mimetype, size: file.size, filename: file.originalname, success: true });
          }
          pending -= 1;
          if (pending === 0) res.json({ results });
        }
      );
    });
  });

  app.get('/api/media', (req, res) => {
    const db = getDb();
    const type = req.query.type;
    const search = (req.query.search || '').trim();
    const limit = Math.max(1, parseInt(req.query.limit) || 48);
    const offset = Math.max(0, parseInt(req.query.offset) || 0);
    let sql = 'SELECT * FROM media_library WHERE 1=1';
    let countSql = 'SELECT COUNT(*) as total FROM media_library WHERE 1=1';
    const params = [];
    const countParams = [];
    if (type && type !== 'all') {
      sql += ' AND media_type = ?';
      countSql += ' AND media_type = ?';
      params.push(type);
      countParams.push(type);
    }
    if (search) {
      const clause = ' AND (original_name LIKE ? OR alt_text LIKE ?)';
      sql += clause;
      countSql += clause;
      params.push(`%${search}%`, `%${search}%`);
      countParams.push(`%${search}%`, `%${search}%`);
    }
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    db.all(sql, params, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      db.get(countSql, countParams, (_e, countRow) => {
        res.json({ results: rows, total: countRow ? countRow.total : rows.length });
      });
    });
  });

  app.get('/api/media/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM media_library WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.put('/api/media/:id', (req, res) => {
    const db = getDb();
    const { alt_text } = req.body;
    db.run('UPDATE media_library SET alt_text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [alt_text || '', req.params.id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ id: Number(req.params.id), alt_text });
    });
  });

  app.delete('/api/media/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM media_library WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      db.run('DELETE FROM media_library WHERE id = ?', [req.params.id], function (dErr) {
        if (dErr) return res.status(500).json({ error: dErr.message });
        try { unlinkSync(join(uploadDir, row.url.replace('/uploads/', ''))); } catch {}
        res.json({ success: true, id: Number(req.params.id) });
      });
    });
  });

  app.get('/api/admin/dashboard/extended', (req, res) => {
    const db = getDb();
    db.get('SELECT COUNT(*) as total_terms FROM dictionary_terms', (err, terms) => {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT COUNT(*) as total_audio FROM audio_pronunciations', (err, audio) => {
        if (err) return res.status(500).json({ error: err.message });
        db.get('SELECT COUNT(*) as total_users FROM users', (err, users) => {
          if (err) return res.status(500).json({ error: err.message });
          db.get('SELECT COUNT(*) as pending_suggestions FROM dictionary_suggestions WHERE status = ?', ['pending'], (err, suggestions) => {
            if (err) return res.status(500).json({ error: err.message });
            db.get('SELECT COUNT(*) as pending_forum FROM forum_posts WHERE status = ?', ['pending'], (err, forum) => {
              if (err) return res.status(500).json({ error: err.message });
              res.json({
                totalTerms: terms.total_terms,
                totalAudio: audio.total_audio,
                totalUsers: users.total_users,
                pendingSuggestions: suggestions.pending_suggestions,
                pendingForum: forum.pending_forum,
                recentEntries: []
              });
            });
          });
        });
      });
    });
  });

  app.get('/api/admin/dashboard', (req, res) => {
    const db = getDb();
    db.get('SELECT COUNT(*) as total_terms FROM dictionary_terms', (err, terms) => {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT COUNT(*) as total_audio FROM audio_pronunciations', (err, audio) => {
        if (err) return res.status(500).json({ error: err.message });
        db.get('SELECT COUNT(*) as total_users FROM admin_users', (err, users) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({
            totalTerms: terms.total_terms,
            totalAudio: audio.total_audio,
            totalUsers: users.total_users,
            recentEntries: []
          });
        });
      });
    });
  });

  app.get('/api/admin/dictionary', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM dictionary_terms ORDER BY updated_at DESC LIMIT 50', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/dictionary/suggestions', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM dictionary_suggestions ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.put('/api/admin/dictionary/suggestions/:id', (req, res) => {
    const { status, admin_notes } = req.body;
    const db = getDb();
    db.run('UPDATE dictionary_suggestions SET status = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, admin_notes || '', req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: Number(req.params.id), status });
    });
  });

  app.post('/api/admin/dictionary/suggestions/:id/approve', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM dictionary_suggestions WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      db.run(
        'INSERT INTO dictionary_terms (primary_akan, english_translation, part_of_speech, etymology, is_published) VALUES (?, ?, ?, ?, 1)',
        [row.primary_akan, row.english_translation, row.part_of_speech, row.etymology || ''],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          db.run('UPDATE dictionary_suggestions SET status = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['approved', 'Added to dictionary', req.params.id], function(err2) {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ success: true });
          });
        }
      );
    });
  });

  app.get('/api/admin/dictionary/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM dictionary_terms WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.put('/api/admin/dictionary/:id', (req, res) => {
    const { primary_akan, english_translation, part_of_speech, etymology, is_published } = req.body;
    const db = getDb();
    db.run(
      'UPDATE dictionary_terms SET primary_akan = ?, english_translation = ?, part_of_speech = ?, etymology = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [primary_akan, english_translation, part_of_speech || 'noun', etymology || '', is_published ? 1 : 0, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: Number(req.params.id), primary_akan, english_translation, part_of_speech, etymology, is_published });
      }
    );
  });

  app.delete('/api/admin/dictionary/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM dictionary_terms WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  app.get('/api/progress', (req, res) => {
    const raw = req.headers.authorization;
    res.json({
      userId: 'local-user',
      bookmarks: [],
      completedLessons: [],
      vocabularyMastery: {},
      quizScores: {},
      streak: 0,
      lastStudyDate: null,
      totalStudyTime: 0,
      savedWords: []
    });
  });

  app.put('/api/progress', (req, res) => {
    res.json({ success: true, progress: req.body });
  });

  app.post('/api/progress/study-time', (req, res) => {
    res.json({ success: true });
  });

  app.get('/api/culture', (req, res) => {
    const { category, q, page, limit } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 20);
    const offset = (pageNum - 1) * limitNum;
    const db = getDb();

    let where = 'WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now"))';
    const params = [];

    if (category && category !== 'all') {
      where += ' AND category = ?';
      params.push(category);
    }

    if (q) {
      where += ' AND (title LIKE ? OR description LIKE ? OR content LIKE ?)';
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    db.get(`SELECT COUNT(*) as total FROM culture_articles ${where}`, params, (err, countRow) => {
      if (err) return res.status(500).json({ error: err.message });
      db.all(`SELECT * FROM culture_articles ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, limitNum, offset], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const parsed = rows.map(row => ({
          ...row,
          tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
          examples: row.examples ? row.examples.split(',').map(ex => ({ symbol: ex.trim(), meaning: '', description: '' })) : [],
          instruments: row.instruments ? row.instruments.split(',').map(inst => inst.trim()).filter(Boolean) : []
        }));
        res.json({ total: countRow.total, page: pageNum, limit: limitNum, results: parsed });
      });
    });
  });

  app.get('/api/culture/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM culture_articles WHERE id = ? AND is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now"))', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const parsed = {
        ...row,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        examples: row.examples ? row.examples.split(',').map(ex => ({ symbol: ex.trim(), meaning: '', description: '' })) : [],
        instruments: row.instruments ? row.instruments.split(',').map(inst => inst.trim()).filter(Boolean) : []
      };
      res.json(parsed);
    });
  });

  app.post('/api/culture', requireAuth, (req, res) => {
    const { title, description, content, category, region, timeline, significance, examples, instruments, tags, author_name, author_email } = req.body;
    const db = getDb();
    db.run(
      `INSERT INTO culture_articles (title, description, content, category, region, timeline, significance, examples, instruments, tags, author_name, author_email, status, is_published, author_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0, ?)`,
      [
        title,
        description || '',
        content,
        category,
        region || '',
        timeline || '',
        significance || '',
        examples ? (Array.isArray(examples) ? examples.map(ex => ex.symbol || ex).join(',') : String(examples)) : '',
        instruments ? (Array.isArray(instruments) ? instruments.join(',') : String(instruments)) : '',
        tags ? (Array.isArray(tags) ? tags.join(',') : String(tags)) : '',
        author_name || req.user.name || '',
        author_email || req.user.email || '',
        req.user.id
      ],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, status: 'pending', is_published: false });
      }
    );
  });

  app.get('/api/admin/moderation', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM culture_articles WHERE status = ? ORDER BY created_at DESC', ['pending'], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const parsed = rows.map(row => ({
        ...row,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        examples: row.examples ? row.examples.split(',').map(ex => ({ symbol: ex.trim(), meaning: '', description: '' })) : [],
        instruments: row.instruments ? row.instruments.split(',').map(inst => inst.trim()).filter(Boolean) : []
      }));
      res.json(parsed);
    });
  });

  app.put('/api/admin/moderation/:id', (req, res) => {
    const { action } = req.body;
    const db = getDb();
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    const published = action === 'approve' ? 1 : 0;
    db.run(
      'UPDATE culture_articles SET status = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newStatus, published, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, status: newStatus, is_published: published });
      }
    );
  });

  app.get('/api/documents', (req, res) => {
    const { category, level, q, page, limit } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 20);
    const offset = (pageNum - 1) * limitNum;
    const db = getDb();

    let where = 'WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now"))';
    const params = [];

    if (category && category !== 'all') {
      where += ' AND category = ?';
      params.push(category);
    }

    if (level && level !== 'all') {
      where += ' AND level = ?';
      params.push(level);
    }

    if (q) {
      where += ' AND (title LIKE ? OR description LIKE ? OR author LIKE ? OR tags LIKE ?)';
      params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    }

    db.get(`SELECT COUNT(*) as total FROM documents ${where}`, params, (err, countRow) => {
      if (err) return res.status(500).json({ error: err.message });
      db.all(`SELECT * FROM documents ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, limitNum, offset], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const parsed = rows.map(row => ({
          ...row,
          tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : []
        }));
        res.json({ total: countRow.total, page: pageNum, limit: limitNum, results: parsed });
      });
    });
  });

  app.get('/api/documents/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM documents WHERE id = ? AND is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now"))', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const parsed = {
        ...row,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      };
      res.json(parsed);
    });
  });

  app.get('/api/forum/posts', (req, res) => {
    const { category, q, page, limit } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 20);
    const offset = (pageNum - 1) * limitNum;
    const db = getDb();

    let where = 'WHERE status = ?';
    const params = ['approved'];

    if (category && category !== 'all') {
      where += ' AND category = ?';
      params.push(category);
    }

    if (q) {
      where += ' AND (title LIKE ? OR content LIKE ?)';
      params.push(`%${q}%`, `%${q}%`);
    }

    db.get(`SELECT COUNT(*) as total FROM forum_posts ${where}`, params, (err, countRow) => {
      if (err) return res.status(500).json({ error: err.message });
      db.all(`SELECT * FROM forum_posts ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, limitNum, offset], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ total: countRow.total, page: pageNum, limit: limitNum, results: rows });
      });
    });
  });

  app.get('/api/forum/posts/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM forum_posts WHERE id = ? AND status = ?', [req.params.id, 'approved'], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      db.run('UPDATE forum_posts SET views = views + 1 WHERE id = ?', [req.params.id]);
      res.json(row);
    });
  });

  app.get('/api/forum/posts/:id/comments', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM forum_comments WHERE post_id = ? AND status = ? ORDER BY created_at ASC', [req.params.id, 'approved'], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.post('/api/forum/posts', requireAuth, (req, res) => {
    const { title, content, category, author_name, author_email } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO forum_posts (title, content, category, author_name, author_email, status, author_user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, content, category, author_name || req.user.name || '', author_email || req.user.email || '', 'pending', req.user.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, content, category, author_name, author_email, status: 'pending' });
      }
    );
  });

  app.post('/api/forum/posts/:id/comments', requireAuth, (req, res) => {
    const { content, author_name, author_email } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO forum_comments (post_id, content, author_name, author_email, status, author_user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [req.params.id, content, author_name || req.user.name || '', author_email || req.user.email || '', 'pending', req.user.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, post_id: req.params.id, content, author_name, author_email, status: 'pending' });
      }
    );
  });

  app.get('/api/events', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM events WHERE status = ? AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now")) ORDER BY event_date ASC', ['upcoming'], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.post('/api/events', requireAuth, (req, res) => {
    const { title, description, event_date, event_time, location, event_type, max_participants } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO events (title, description, event_date, event_time, location, event_type, max_participants, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', event_date, event_time || '', location || '', event_type || 'online', max_participants || null, 'upcoming', req.user.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, event_date, event_time, location, event_type, max_participants, status: 'upcoming' });
      }
    );
  });

  app.post('/api/events/:id/register', requireAuth, (req, res) => {
    const { name, email, tickets } = req.body;
    const db = getDb();
    db.get('SELECT * FROM events WHERE id = ?', [req.params.id], (err, event) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.status(201).json({ id: Date.now(), event_id: req.params.id, name, email, tickets: tickets || 1, registeredAt: new Date().toISOString() });
    });
  });

  app.get('/api/lessons', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM lessons WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now")) ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const parsed = rows.map(row => ({
        ...row,
        objectives: row.objectives ? JSON.parse(row.objectives) : [],
        sections: row.content ? JSON.parse(row.content) : [],
        quiz: row.quiz ? JSON.parse(row.quiz) : []
      }));
      res.json(parsed);
    });
  });

  app.get('/api/lessons/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM lessons WHERE id = ? AND is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now"))', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const parsed = {
        ...row,
        objectives: row.objectives ? JSON.parse(row.objectives) : [],
        sections: row.content ? JSON.parse(row.content) : [],
        quiz: row.quiz ? JSON.parse(row.quiz) : []
      };
      res.json(parsed);
    });
  });

  app.get('/api/vocabulary/modules', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM vocabulary_modules WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now")) ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const parsed = rows.map(row => ({
        ...row,
        words: row.words ? JSON.parse(row.words) : []
      }));
      res.json(parsed);
    });
  });

  app.get('/api/vocabulary/modules/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM vocabulary_modules WHERE id = ? AND is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now"))', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const parsed = {
        ...row,
        words: row.words ? JSON.parse(row.words) : []
      };
      res.json(parsed);
    });
  });

  app.get('/api/greetings', (req, res) => {
    const { time_of_day } = req.query;
    const db = getDb();
    let where = 'WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now"))';
    const params = [];
    if (time_of_day && time_of_day !== 'all') {
      where += ' AND time_of_day = ?';
      params.push(time_of_day);
    }
    db.all(`SELECT * FROM greetings ${where} ORDER BY created_at ASC`, params, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/legal/:slug', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM legal_pages WHERE slug = ?', [req.params.slug], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.get('/api/profiles', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM user_profiles WHERE is_published = 1 ORDER BY contributions DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const parsed = rows.map(row => ({
        ...row,
        specialties: row.specialties ? row.specialties.split(',').map(s => s.trim()).filter(Boolean) : []
      }));
      res.json(parsed);
    });
  });

  app.post('/api/proposals', requireAuth, (req, res) => {
    const { title, description, proposer_name, proposer_email } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO project_proposals (title, description, proposer_name, proposer_email, status, proposer_user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description || '', proposer_name || req.user.name || '', proposer_email || req.user.email || '', 'pending', req.user.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, proposer_name, proposer_email, status: 'pending' });
      }
    );
  });

  app.get('/api/homepage', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM homepage_content WHERE is_active = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now")) ORDER BY sort_order ASC, created_at ASC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.post('/api/homepage', (req, res) => {
    const { section, title, subtitle, body, image_url, link_url, link_text, sort_order } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO homepage_content (section, title, subtitle, body, image_url, link_url, link_text, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [section, title || '', subtitle || '', body || '', image_url || '', link_url || '', link_text || '', sort_order || 0],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, section, title, subtitle, body, image_url, link_url, link_text, sort_order });
      }
    );
  });

  // Admin CRUD for lessons
  app.get('/api/admin/lessons', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM lessons ORDER BY updated_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const parsed = rows.map(row => ({
        ...row,
        objectives: row.objectives ? JSON.parse(row.objectives) : [],
        sections: row.content ? JSON.parse(row.content) : [],
        quiz: row.quiz ? JSON.parse(row.quiz) : []
      }));
      res.json(parsed);
    });
  });

  app.get('/api/admin/lessons/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM lessons WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const parsed = {
        ...row,
        objectives: row.objectives ? JSON.parse(row.objectives) : [],
        sections: row.content ? JSON.parse(row.content) : [],
        quiz: row.quiz ? JSON.parse(row.quiz) : []
      };
      res.json(parsed);
    });
  });

  app.post('/api/admin/lessons', (req, res) => {
    const { title, description, level, duration, overview, objectives, content, quiz, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO lessons (title, description, level, duration, overview, objectives, content, quiz, is_published, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', level || 'beginner', duration || '', overview || '', JSON.stringify(objectives || []), JSON.stringify(content || []), JSON.stringify(quiz || []), is_published ? 1 : 0, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, level, duration, overview, objectives, content, quiz, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/lessons/:id', (req, res) => {
    const { title, description, level, duration, overview, objectives, content, quiz, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE lessons SET title = ?, description = ?, level = ?, duration = ?, overview = ?, objectives = ?, content = ?, quiz = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || '', level || 'beginner', duration || '', overview || '', JSON.stringify(objectives || []), JSON.stringify(content || []), JSON.stringify(quiz || []), is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, title, description, level, duration, overview, objectives, content, quiz, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/lessons/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM lessons WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // Admin CRUD for vocabulary modules
  app.get('/api/admin/vocabulary', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM vocabulary_modules ORDER BY updated_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const parsed = rows.map(row => ({
        ...row,
        words: row.words ? JSON.parse(row.words) : []
      }));
      res.json(parsed);
    });
  });

  app.get('/api/admin/vocabulary/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM vocabulary_modules WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json({ ...row, words: row.words ? JSON.parse(row.words) : [] });
    });
  });

  app.post('/api/admin/vocabulary', (req, res) => {
    const { title, description, words, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO vocabulary_modules (title, description, words, is_published, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description || '', JSON.stringify(words || []), is_published ? 1 : 0, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, words, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/vocabulary/:id', (req, res) => {
    const { title, description, words, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE vocabulary_modules SET title = ?, description = ?, words = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || '', JSON.stringify(words || []), is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, title, description, words, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/vocabulary/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM vocabulary_modules WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // Admin CRUD for greetings
  app.get('/api/admin/greetings', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM greetings ORDER BY updated_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/greetings/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM greetings WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.post('/api/admin/greetings', (req, res) => {
    const { akan, english, pronunciation, context, audio_url, time_of_day, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO greetings (akan, english, pronunciation, context, audio_url, time_of_day, is_published, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [akan, english, pronunciation || '', context || '', audio_url || '', time_of_day || 'general', is_published ? 1 : 0, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, akan, english, pronunciation, context, audio_url, time_of_day, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/greetings/:id', (req, res) => {
    const { akan, english, pronunciation, context, audio_url, time_of_day, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE greetings SET akan = ?, english = ?, pronunciation = ?, context = ?, audio_url = ?, time_of_day = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [akan, english, pronunciation || '', context || '', audio_url || '', time_of_day || 'general', is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, akan, english, pronunciation, context, audio_url, time_of_day, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/greetings/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM greetings WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // Admin CRUD for articles
  app.get('/api/admin/articles', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM culture_articles ORDER BY updated_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const parsed = rows.map(row => ({
        ...row,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        examples: row.examples ? row.examples.split(',').map(ex => ({ symbol: ex.trim(), meaning: '', description: '' })) : [],
        instruments: row.instruments ? row.instruments.split(',').map(inst => inst.trim()).filter(Boolean) : []
      }));
      res.json(parsed);
    });
  });

  app.get('/api/admin/articles/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM culture_articles WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const parsed = {
        ...row,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        examples: row.examples ? row.examples.split(',').map(ex => ({ symbol: ex.trim(), meaning: '', description: '' })) : [],
        instruments: row.instruments ? row.instruments.split(',').map(inst => inst.trim()).filter(Boolean) : []
      };
      res.json(parsed);
    });
  });

  app.post('/api/admin/articles', (req, res) => {
    const { title, description, content, category, region, timeline, significance, examples, instruments, tags, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      `INSERT INTO culture_articles (title, description, content, category, region, timeline, significance, examples, instruments, tags, is_published, publish_at, unpublish_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, description || '', content || '', category || 'general', region || '', timeline || '', significance || '',
        examples ? (Array.isArray(examples) ? examples.map(ex => ex.symbol || ex).join(',') : String(examples)) : '',
        instruments ? (Array.isArray(instruments) ? instruments.join(',') : String(instruments)) : '',
        tags ? (Array.isArray(tags) ? tags.join(',') : String(tags)) : '',
        is_published ? 1 : 0, publish_at || null, unpublish_at || null, 'approved'
      ],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, content, category, region, timeline, significance, examples, instruments, tags, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/articles/:id', (req, res) => {
    const { title, description, content, category, region, timeline, significance, examples, instruments, tags, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      `UPDATE culture_articles SET title = ?, description = ?, content = ?, category = ?, region = ?, timeline = ?, significance = ?, examples = ?, instruments = ?, tags = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [
        title, description || '', content || '', category || 'general', region || '', timeline || '', significance || '',
        examples ? (Array.isArray(examples) ? examples.map(ex => ex.symbol || ex).join(',') : String(examples)) : '',
        instruments ? (Array.isArray(instruments) ? instruments.join(',') : String(instruments)) : '',
        tags ? (Array.isArray(tags) ? tags.join(',') : String(tags)) : '',
        is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id
      ],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, title, description, content, category, region, timeline, significance, examples, instruments, tags, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/articles/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM culture_articles WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // Admin CRUD for documents
  app.get('/api/admin/documents', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM documents ORDER BY updated_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const parsed = rows.map(row => ({
        ...row,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      }));
      res.json(parsed);
    });
  });

  app.get('/api/admin/documents/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM documents WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json({ ...row, tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : [] });
    });
  });

  app.post('/api/admin/documents', (req, res) => {
    const { title, description, file_url, file_type, category, level, author, tags, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO documents (title, description, file_url, file_type, category, level, author, tags, is_published, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', file_url || '', file_type || 'pdf', category || 'general', level || 'beginner', author || '', tags ? (Array.isArray(tags) ? tags.join(',') : String(tags)) : '', is_published ? 1 : 0, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, file_url, file_type, category, level, author, tags, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/documents/:id', (req, res) => {
    const { title, description, file_url, file_type, category, level, author, tags, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE documents SET title = ?, description = ?, file_url = ?, file_type = ?, category = ?, level = ?, author = ?, tags = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || '', file_url || '', file_type || 'pdf', category || 'general', level || 'beginner', author || '', tags ? (Array.isArray(tags) ? tags.join(',') : String(tags)) : '', is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, title, description, file_url, file_type, category, level, author, tags, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/documents/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM documents WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  app.get('/api/documents/:id/download', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM documents WHERE id = ? AND is_published = 1', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const relativePath = row.file_url.replace(/^\//, '');
      const absolutePath = join(uploadDir, relativePath);
      res.download(absolutePath, row.title ? `${row.title}${getExtension(row.file_type)}` : undefined, (dlErr) => {
        if (dlErr) {
          console.error('Download error:', dlErr);
        }
      });
    });
  });

  const getExtension = (fileType) => {
    const map = { pdf: '.pdf', doc: '.doc', 'docx': '.docx', txt: '.txt', video: '.mp4', audio: '.mp3', image: '' };
    return map[fileType] || '';
  };

  app.get('/api/vocabulary/:id/export', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM vocabulary_modules WHERE id = ? AND is_published = 1', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const format = (req.query.format || 'json').toLowerCase();
      const words = row.words ? JSON.parse(row.words) : [];
      const filename = `${row.title || 'vocabulary'}_export.${format}`;
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      if (format === 'csv') {
        res.setHeader('Content-Type', 'text/csv');
        const header = 'Akan,English,Pronunciation\n';
        const body = words.map(w => `${w.akan || ''},${w.english || ''},${w.pronunciation || ''}`).join('\n');
        res.send(header + body);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.json({ module: row.title, exportedAt: new Date().toISOString(), words });
      }
    });
  });

  // Admin CRUD for events
  app.get('/api/admin/events', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM events ORDER BY event_date DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/events/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM events WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.post('/api/admin/events', (req, res) => {
    const { title, description, event_date, event_time, location, event_type, max_participants, status, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO events (title, description, event_date, event_time, location, event_type, max_participants, status, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', event_date, event_time || '', location || '', event_type || 'online', max_participants || null, status || 'upcoming', publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, event_date, event_time, location, event_type, max_participants, status, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/events/:id', (req, res) => {
    const { title, description, event_date, event_time, location, event_type, max_participants, status, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE events SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?, event_type = ?, max_participants = ?, status = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || '', event_date, event_time || '', location || '', event_type || 'online', max_participants || null, status || 'upcoming', publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, title, description, event_date, event_time, location, event_type, max_participants, status, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/events/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM events WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // Admin CRUD for legal pages
  app.get('/api/admin/legal', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM legal_pages ORDER BY updated_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/legal/:slug', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM legal_pages WHERE slug = ?', [req.params.slug], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.post('/api/admin/legal', (req, res) => {
    const { slug, title, content } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO legal_pages (slug, title, content) VALUES (?, ?, ?)',
      [slug, title, content || ''],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, slug, title, content });
      }
    );
  });

  app.put('/api/admin/legal/:slug', (req, res) => {
    const { title, content } = req.body;
    const db = getDb();
    db.run(
      'UPDATE legal_pages SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?',
      [title, content || '', req.params.slug],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ slug: req.params.slug, title, content });
      }
    );
  });

  app.delete('/api/admin/legal/:slug', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM legal_pages WHERE slug = ?', [req.params.slug], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // Admin CRUD for homepage content
  app.get('/api/admin/homepage', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM homepage_content ORDER BY sort_order ASC, created_at ASC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/homepage/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM homepage_content WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.post('/api/admin/homepage', (req, res) => {
    const { section, title, subtitle, body, image_url, link_url, link_text, sort_order, is_active, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO homepage_content (section, title, subtitle, body, image_url, link_url, link_text, sort_order, is_active, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [section, title || '', subtitle || '', body || '', image_url || '', link_url || '', link_text || '', sort_order || 0, is_active ? 1 : 1, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, section, title, subtitle, body, image_url, link_url, link_text, sort_order, is_active, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/homepage/:id', (req, res) => {
    const { section, title, subtitle, body, image_url, link_url, link_text, sort_order, is_active, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE homepage_content SET section = ?, title = ?, subtitle = ?, body = ?, image_url = ?, link_url = ?, link_text = ?, sort_order = ?, is_active = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [section, title || '', subtitle || '', body || '', image_url || '', link_url || '', link_text || '', sort_order || 0, is_active ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, section, title, subtitle, body, image_url, link_url, link_text, sort_order, is_active, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/homepage/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM homepage_content WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  app.get('/api/admin/alphabets', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM alphabets ORDER BY letter ASC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/alphabets/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM alphabets WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.post('/api/admin/alphabets', (req, res) => {
    const { letter, pronunciation, example, audio_url, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO alphabets (letter, pronunciation, example, audio_url, is_published, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [letter, pronunciation || '', example || '', audio_url || '', is_published ? 1 : 0, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, letter, pronunciation, example, audio_url, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/alphabets/:id', (req, res) => {
    const { letter, pronunciation, example, audio_url, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE alphabets SET letter = ?, pronunciation = ?, example = ?, audio_url = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [letter, pronunciation || '', example || '', audio_url || '', is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, letter, pronunciation, example, audio_url, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/alphabets/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM alphabets WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  app.get('/api/alphabet', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM alphabets WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime("now")) AND (unpublish_at IS NULL OR unpublish_at > datetime("now")) ORDER BY letter ASC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const data = rows.map(row => ({
        ...row,
        audio: row.audio_url || ''
      }));
      res.json(data);
    });
  });

  app.get('/api/festivals', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM festivals WHERE is_published = 1 ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const parsed = rows.map(row => ({
        ...row,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      }));
      res.json(parsed);
    });
  });

  app.get('/api/festivals/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM festivals WHERE id = ? AND is_published = 1', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      const parsed = {
        ...row,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      };
      res.json(parsed);
    });
  });

  app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const db = getDb();
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (row) return res.status(409).json({ error: 'Email already registered' });
      const hash = await bcrypt.hash(password, 10);
      db.run(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [name, email, hash, 'user'],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ id: this.lastID, name, email, role: 'user' });
        }
      );
    });
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const db = getDb();
    db.get('SELECT * FROM users WHERE email = ? AND is_active = 1', [email], async (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
      const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  });

  app.get('/api/auth/me', (req, res) => {
    const raw = req.headers.authorization;
    if (!raw) return res.status(401).json({ error: 'Not authenticated' });
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    const userId = decoded.split(':')[0];
    const db = getDb();
    db.get('SELECT id, name, email, role FROM users WHERE id = ?', [userId], (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: 'Not authenticated' });
      res.json(user);
    });
  });

  app.put('/api/users/me', (req, res) => {
    const raw = req.headers.authorization;
    if (!raw) return res.status(401).json({ error: 'Not authenticated' });
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    const userId = decoded.split(':')[0];
    const { name, email } = req.body;
    const db = getDb();
    db.run('UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, email, userId], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: Number(userId), name, email });
    });
  });

  app.put('/api/users/me/password', async (req, res) => {
    const raw = req.headers.authorization;
    if (!raw) return res.status(401).json({ error: 'Not authenticated' });
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    const userId = decoded.split(':')[0];
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }
    const db = getDb();
    db.get('SELECT * FROM users WHERE id = ?', [userId], async (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(404).json({ error: 'User not found' });
      const valid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });
      const hash = await bcrypt.hash(newPassword, 10);
      db.run('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [hash, userId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
      });
    });
  });

  app.post('/api/users/me/progress', (req, res) => {
    const raw = req.headers.authorization;
    if (!raw) return res.status(401).json({ error: 'Not authenticated' });
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    const userId = decoded.split(':')[0];
    const progress = req.body || {};
    const db = getDb();
    db.run('UPDATE users SET progress = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [JSON.stringify(progress), userId], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, progress });
    });
  });

  app.get('/api/users/me/progress', (req, res) => {
    const raw = req.headers.authorization;
    if (!raw) return res.status(401).json({ error: 'Not authenticated' });
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    const userId = decoded.split(':')[0];
    const db = getDb();
    db.get('SELECT progress FROM users WHERE id = ?', [userId], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ progress: row?.progress ? JSON.parse(row.progress) : {} });
    });
  });

  app.get('/api/admin/users', (req, res) => {
    const db = getDb();
    db.all('SELECT id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.put('/api/admin/users/:id/role', (req, res) => {
    const { role } = req.body;
    const db = getDb();
    db.run('UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [role, req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: Number(req.params.id), role });
    });
  });

  app.put('/api/admin/users/:id/status', (req, res) => {
    const { is_active } = req.body;
    const db = getDb();
    db.run('UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [is_active ? 1 : 0, req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: Number(req.params.id), is_active: is_active ? 1 : 0 });
    });
  });

  app.get('/api/admin/forum', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM forum_posts ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.put('/api/admin/forum/:id/status', (req, res) => {
    const { status } = req.body;
    const db = getDb();
    db.run('UPDATE forum_posts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: Number(req.params.id), status });
    });
  });

  app.get('/api/admin/forum/:id/comments', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM forum_comments WHERE post_id = ? ORDER BY created_at ASC', [req.params.id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.put('/api/admin/forum/comments/:id/status', (req, res) => {
    const { status } = req.body;
    const db = getDb();
    db.run('UPDATE forum_comments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: Number(req.params.id), status });
    });
  });

  app.post('/api/dictionary/suggest', requireAuth, (req, res) => {
    const { primary_akan, english_translation, part_of_speech, etymology, notes, author_name, author_email } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO dictionary_suggestions (primary_akan, english_translation, part_of_speech, etymology, notes, author_name, author_email, status, author_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [primary_akan, english_translation, part_of_speech || '', etymology || '', notes || '', author_name || req.user.name || '', author_email || req.user.email || '', 'pending', req.user.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, status: 'pending' });
      }
    );
  });

  app.get('/api/admin/versions', (req, res) => {
    const db = getDb();
    const table = req.query.table;
    const id = req.query.id;
    if (!table || !id) return res.status(400).json({ error: 'table and id are required' });
    db.all('SELECT id, table_name, record_id, data, changed_by, created_at FROM content_versions WHERE table_name = ? AND record_id = ? ORDER BY created_at DESC', [table, id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const versions = (rows || []).map(row => ({
        id: row.id,
        table: row.table_name,
        recordId: row.record_id,
        data: JSON.parse(row.data || '{}'),
        changed_by: row.changed_by,
        created_at: row.created_at
      }));
      res.json(versions);
    });
  });

   app.post('/api/admin/versions', (req, res) => {
     const { table, record_id, data, changed_by } = req.body;
     const db = getDb();
     db.run(
       'INSERT INTO content_versions (table_name, record_id, data, changed_by) VALUES (?, ?, ?, ?)',
       [table, record_id, JSON.stringify(data || {}), changed_by || 'admin'],
       function(err) {
         if (err) return res.status(500).json({ error: err.message });
         res.status(201).json({ id: this.lastID });
       }
     );
   });

   // --- Collaborative documents (shared with the real-time editor) ---
   app.get('/api/editor-documents', (req, res) => {
     const db = getDb();
     const limit = Math.max(1, parseInt(req.query.limit) || 50);
     const offset = Math.max(0, parseInt(req.query.offset) || 0);
     db.all('SELECT id, title, category, region, tags, author, version, updated_at FROM editor_documents ORDER BY updated_at DESC LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
       if (err) return res.status(500).json({ error: err.message });
       res.json({ total: rows.length, results: rows });
     });
   });

   app.get('/api/editor-documents/:id', (req, res) => {
     const db = getDb();
     db.get('SELECT id, title, content, category, region, tags, author, version, updated_at FROM editor_documents WHERE id = ?', [req.params.id], (err, row) => {
       if (err) return res.status(500).json({ error: err.message });
       if (!row) return res.status(404).json({ error: 'Not found' });
       res.json(row);
     });
   });

    app.post('/api/editor-documents', requireAuth, (req, res) => {
      const { id, title, content, category, region, tags, author } = req.body;
      const docId = id || `d_${Date.now().toString(36)}${Math.round(Math.random() * 1e9).toString(36)}`;
      const db = getDb();
      db.run(
        'INSERT INTO editor_documents (id, title, content, category, region, tags, author, author_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [docId, title || '', content || '', category || 'general', region || '', tags || '', author || req.user.name || '', req.user.id],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ id: docId });
        }
      );
    });

    app.put('/api/editor-documents/:id', requireAuth, (req, res) => {
      const { title, content, category, region, tags, author } = req.body;
      const db = getDb();
      db.run(
        'UPDATE editor_documents SET title = ?, content = ?, category = ?, region = ?, tags = ?, author = ?, version = COALESCE(version, 0) + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title || '', content || '', category || 'general', region || '', tags || '', author || req.user.name || '', req.params.id],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
          res.json({ id: req.params.id });
        }
      );
    });

  // ==================== FOLK STORIES ====================
  app.get('/api/folk-stories', (req, res) => {
    const db = getDb();
    db.all("SELECT * FROM folk_stories WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime('now')) AND (unpublish_at IS NULL OR unpublish_at > datetime('now')) ORDER BY created_at DESC", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/folk-stories/:id', (req, res) => {
    const db = getDb();
    db.get("SELECT * FROM folk_stories WHERE id = ? AND is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime('now')) AND (unpublish_at IS NULL OR unpublish_at > datetime('now'))", [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.get('/api/admin/folk-stories', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM folk_stories ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/folk-stories/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM folk_stories WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.post('/api/admin/folk-stories', (req, res) => {
    const { title, description, thumbnail, category, language, duration, type, audio_url, video_url, transcript, narrator, region, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO folk_stories (title, description, thumbnail, category, language, duration, type, audio_url, video_url, transcript, narrator, region, is_published, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', thumbnail || '', category || '', language || 'Twi', duration || '', type || 'audio', audio_url || '', video_url || '', transcript || '', narrator || '', region || '', is_published ? 1 : 0, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, thumbnail, category, language, duration, type, audio_url, video_url, transcript, narrator, region, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/folk-stories/:id', (req, res) => {
    const { title, description, thumbnail, category, language, duration, type, audio_url, video_url, transcript, narrator, region, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE folk_stories SET title = ?, description = ?, thumbnail = ?, category = ?, language = ?, duration = ?, type = ?, audio_url = ?, video_url = ?, transcript = ?, narrator = ?, region = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || '', thumbnail || '', category || '', language || 'Twi', duration || '', type || 'audio', audio_url || '', video_url || '', transcript || '', narrator || '', region || '', is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, title, description, thumbnail, category, language, duration, type, audio_url, video_url, transcript, narrator, region, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/folk-stories/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM folk_stories WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // ==================== DRUMMING ====================
  app.get('/api/drumming', (req, res) => {
    const db = getDb();
    db.all("SELECT * FROM drumming WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime('now')) AND (unpublish_at IS NULL OR unpublish_at > datetime('now')) ORDER BY created_at DESC", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/drumming/:id', (req, res) => {
    const db = getDb();
    db.get("SELECT * FROM drumming WHERE id = ? AND is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime('now')) AND (unpublish_at IS NULL OR unpublish_at > datetime('now'))", [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.get('/api/admin/drumming', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM drumming ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/drumming/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM drumming WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.post('/api/admin/drumming', (req, res) => {
    const { title, description, thumbnail, instrument, difficulty, bpm, type, video_url, audio_url, pattern_notation, transcript, instructor, duration, region, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO drumming (title, description, thumbnail, instrument, difficulty, bpm, type, video_url, audio_url, pattern_notation, transcript, instructor, duration, region, is_published, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', thumbnail || '', instrument || '', difficulty || 'Beginner', bpm || null, type || 'video', video_url || '', audio_url || '', pattern_notation || '', transcript || '', instructor || '', duration || '', region || '', is_published ? 1 : 0, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, thumbnail, instrument, difficulty, bpm, type, video_url, audio_url, pattern_notation, transcript, instructor, duration, region, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/drumming/:id', (req, res) => {
    const { title, description, thumbnail, instrument, difficulty, bpm, type, video_url, audio_url, pattern_notation, transcript, instructor, duration, region, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE drumming SET title = ?, description = ?, thumbnail = ?, instrument = ?, difficulty = ?, bpm = ?, type = ?, video_url = ?, audio_url = ?, pattern_notation = ?, transcript = ?, instructor = ?, duration = ?, region = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || '', thumbnail || '', instrument || '', difficulty || 'Beginner', bpm || null, type || 'video', video_url || '', audio_url || '', pattern_notation || '', transcript || '', instructor || '', duration || '', region || '', is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, title, description, thumbnail, instrument, difficulty, bpm, type, video_url, audio_url, pattern_notation, transcript, instructor, duration, region, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/drumming/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM drumming WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // ==================== FESTIVAL PHOTOS ====================
  app.get('/api/festival-photos', (req, res) => {
    const db = getDb();
    db.all("SELECT * FROM festival_photos WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime('now')) AND (unpublish_at IS NULL OR unpublish_at > datetime('now')) ORDER BY created_at DESC", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/festival-photos/:id', (req, res) => {
    const db = getDb();
    db.get("SELECT * FROM festival_photos WHERE id = ? AND is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime('now')) AND (unpublish_at IS NULL OR unpublish_at > datetime('now'))", [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.get('/api/admin/festival-photos', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM festival_photos ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/festival-photos/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM festival_photos WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.post('/api/admin/festival-photos', (req, res) => {
    const { title, description, image_url, category, location, event_date, photographer, tags, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO festival_photos (title, description, image_url, category, location, event_date, photographer, tags, is_published, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', image_url || '', category || 'festival', location || '', event_date || '', photographer || '', tags ? (Array.isArray(tags) ? tags.join(',') : String(tags)) : '', is_published ? 1 : 0, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, image_url, category, location, event_date, photographer, tags, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/festival-photos/:id', (req, res) => {
    const { title, description, image_url, category, location, event_date, photographer, tags, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE festival_photos SET title = ?, description = ?, image_url = ?, category = ?, location = ?, event_date = ?, photographer = ?, tags = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || '', image_url || '', category || 'festival', location || '', event_date || '', photographer || '', tags ? (Array.isArray(tags) ? tags.join(',') : String(tags)) : '', is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, title, description, image_url, category, location, event_date, photographer, tags, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/festival-photos/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM festival_photos WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // ==================== RESEARCH PAPERS ====================
  app.get('/api/research-papers', (req, res) => {
    const db = getDb();
    db.all("SELECT * FROM research_papers WHERE is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime('now')) AND (unpublish_at IS NULL OR unpublish_at > datetime('now')) ORDER BY created_at DESC", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/research-papers/:id', (req, res) => {
    const db = getDb();
    db.get("SELECT * FROM research_papers WHERE id = ? AND is_published = 1 AND (publish_at IS NULL OR publish_at <= datetime('now')) AND (unpublish_at IS NULL OR unpublish_at > datetime('now'))", [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.get('/api/admin/research-papers', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM research_papers ORDER BY created_at DESC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/admin/research-papers/:id', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM research_papers WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    });
  });

  app.post('/api/admin/research-papers', (req, res) => {
    const { title, description, thumbnail, author, institution, category, language, type, pdf_url, audio_url, video_url, abstract, publication_date, pages, keywords, doi, citation, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO research_papers (title, description, thumbnail, author, institution, category, language, type, pdf_url, audio_url, video_url, abstract, publication_date, pages, keywords, doi, citation, is_published, publish_at, unpublish_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', thumbnail || '', author || '', institution || '', category || '', language || 'English', type || 'pdf', pdf_url || '', audio_url || '', video_url || '', abstract || '', publication_date || '', pages || null, keywords ? (Array.isArray(keywords) ? keywords.join(',') : String(keywords)) : '', doi || '', citation || '', is_published ? 1 : 0, publish_at || null, unpublish_at || null],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description, thumbnail, author, institution, category, language, type, pdf_url, audio_url, video_url, abstract, publication_date, pages, keywords, doi, citation, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.put('/api/admin/research-papers/:id', (req, res) => {
    const { title, description, thumbnail, author, institution, category, language, type, pdf_url, audio_url, video_url, abstract, publication_date, pages, keywords, doi, citation, is_published, publish_at, unpublish_at } = req.body;
    const db = getDb();
    db.run(
      'UPDATE research_papers SET title = ?, description = ?, thumbnail = ?, author = ?, institution = ?, category = ?, language = ?, type = ?, pdf_url = ?, audio_url = ?, video_url = ?, abstract = ?, publication_date = ?, pages = ?, keywords = ?, doi = ?, citation = ?, is_published = ?, publish_at = ?, unpublish_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || '', thumbnail || '', author || '', institution || '', category || '', language || 'English', type || 'pdf', pdf_url || '', audio_url || '', video_url || '', abstract || '', publication_date || '', pages || null, keywords ? (Array.isArray(keywords) ? keywords.join(',') : String(keywords)) : '', doi || '', citation || '', is_published ? 1 : 0, publish_at || null, unpublish_at || null, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ id: req.params.id, title, description, thumbnail, author, institution, category, language, type, pdf_url, audio_url, video_url, abstract, publication_date, pages, keywords, doi, citation, is_published, publish_at, unpublish_at });
      }
    );
  });

  app.delete('/api/admin/research-papers/:id', (req, res) => {
    const db = getDb();
    db.run('DELETE FROM research_papers WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.status(204).send();
    });
  });

  // ==================== CONTRIBUTIONS ====================
  app.get('/api/admin/contributions/:type', (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM contributions WHERE content_type = ? AND status = ? ORDER BY created_at DESC', [req.params.type, 'pending'], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.get('/api/contributions/my', requireAuth, (req, res) => {
    const db = getDb();
    db.all('SELECT * FROM contributions WHERE author_user_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ contributions: rows });
    });
  });

  app.post('/api/contributions/:type', requireAuth, (req, res) => {
    const { title, description, content, category, region, tags, media_url, audio_url, video_url, thumbnail, author_name, author_email } = req.body;
    const db = getDb();
    db.run(
      'INSERT INTO contributions (content_type, title, description, content, category, region, tags, media_url, audio_url, video_url, thumbnail, author_name, author_email, status, author_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.params.type, title, description || '', content || '', category || '', region || '', tags ? (Array.isArray(tags) ? tags.join(',') : String(tags)) : '', media_url || '', audio_url || '', video_url || '', thumbnail || '', author_name || req.user.name || '', author_email || req.user.email || '', 'pending', req.user.id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, content_type: req.params.type, title, description, content, category, region, tags, media_url, audio_url, video_url, thumbnail, author_name, author_email, status: 'pending', author_user_id: req.user.id });
      }
    );
  });

  app.post('/api/admin/contributions/:type/:id/approve', (req, res) => {
    const db = getDb();
    db.get('SELECT * FROM contributions WHERE id = ? AND content_type = ?', [req.params.id, req.params.type], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Not found' });

      // Move to appropriate table based on type
      const tableMap = {
        'folk-stories': 'folk_stories',
        'drumming': 'drumming',
        'festival-photos': 'festival_photos',
        'research-papers': 'research_papers',
      };
      const targetTable = tableMap[req.params.type];
      if (!targetTable) return res.status(400).json({ error: 'Invalid content type' });

      const insertData = {
        title: row.title,
        description: row.description,
        category: row.category,
        region: row.region,
        tags: row.tags,
        is_published: 1,
        status: 'approved',
      };

      // Add type-specific fields
      if (req.params.type === 'folk-stories') {
        Object.assign(insertData, { thumbnail: row.thumbnail, audio_url: row.audio_url, video_url: row.video_url, transcript: row.content, narrator: row.author_name });
      } else if (req.params.type === 'drumming') {
        Object.assign(insertData, { thumbnail: row.thumbnail, video_url: row.video_url, audio_url: row.audio_url, transcript: row.content, instructor: row.author_name });
      } else if (req.params.type === 'festival-photos') {
        Object.assign(insertData, { image_url: row.media_url, photographer: row.author_name });
      } else if (req.params.type === 'research-papers') {
        Object.assign(insertData, { pdf_url: row.media_url, abstract: row.description, author: row.author_name });
      }

      const columns = Object.keys(insertData).join(', ');
      const placeholders = Object.keys(insertData).map(() => '?').join(', ');
      const values = Object.values(insertData);

      db.run(`INSERT INTO ${targetTable} (${columns}) VALUES (${placeholders})`, values, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        // Update contribution status
        db.run('UPDATE contributions SET status = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?', ['approved', req.params.id], (err) => {
          if (err) console.error(err);
        });
        res.json({ id: this.lastID, message: 'Approved and published' });
      });
    });
  });

  app.post('/api/admin/contributions/:type/:id/reject', (req, res) => {
    const db = getDb();
    const { admin_notes } = req.body;
    db.run('UPDATE contributions SET status = ?, admin_notes = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ? AND content_type = ?', ['rejected', admin_notes || '', req.params.id, req.params.type], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Rejected' });
    });
  });

  const server = app.listen(PORT, () => {
    console.log(`AkanKasa backend running on http://localhost:${PORT}`);
  });

  let wss = null;
  try {
    wss = setupCollab(server, getDb());
    server.on('upgrade', (request, socket, head) => {
      const host = request.headers.host || '';
      const parsed = new URL(request.url || '/', `http://${host}`);
      const doc = parsed.searchParams.get('doc') || '';
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, doc);
      });
    });
    console.log('Real-time collaboration server attached');
  } catch (e) {
    console.warn('Collaboration server unavailable:', e.message);
  }
};

init().catch(console.error);

export default app;
