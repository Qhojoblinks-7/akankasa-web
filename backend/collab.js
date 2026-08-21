import { WebSocketServer } from 'ws';

const docs = new Map();

function persist(db, docId, html, rev) {
  db.run(
    `INSERT INTO editor_documents (id, content, version, title, category, region, tags, author)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET content=excluded.content, version=excluded.version, updated_at=CURRENT_TIMESTAMP`,
    [docId, html, rev, '', '', '', '', ''],
    (err) => { if (err) console.error('[collab] persist error:', err.message); }
  );
}

export function setupCollab(httpServer, db) {
  const wss = new WebSocketServer({ noServer: true });
  const sessions = new Map();
  const rooms = new Map();

  wss.on('connection', (ws) => {
    let currentDoc = null;

    const joinRoom = (doc, user) => {
      currentDoc = doc;
      ws.doc = doc;
      let room = rooms.get(doc);
      if (!room) { room = new Set(); rooms.set(doc, room); }
      room.add(ws);
      sessions.set(ws, { docId: doc, user });

      const existing = docs.get(doc) || { html: '', rev: 0 };
      docs.set(doc, existing);

      db.get('SELECT content, version FROM editor_documents WHERE id = ?', [doc], (err, row) => {
        const html = row ? row.content : existing.html;
        const rev = row ? (row.version || 0) : existing.rev;
        docs.set(doc, { html, rev });
        ws.send(JSON.stringify({ type: 'init', html, rev }));
        room.forEach((s) => {
          if (s !== ws && s.readyState === s.OPEN) {
            s.send(JSON.stringify({ type: 'enter', user }));
          }
        });
      });
    };

    const broadcast = (payload) => {
      const room = rooms.get(currentDoc);
      if (!room) return;
      room.forEach((s) => {
        if (s !== ws && s.readyState === s.OPEN) {
          s.send(JSON.stringify(payload));
        }
      });
    };

    ws.on('message', (data) => {
      let msg;
      try { msg = JSON.parse(data.toString()); } catch { return; }

      if (msg.type === 'join') {
        if (currentDoc) return;
        joinRoom(msg.doc, msg.user);
      } else if (msg.type === 'change') {
        if (!currentDoc) return;
        const doc = docs.get(currentDoc) || { html: '', rev: 0 };
        doc.html = msg.html;
        doc.rev += 1;
        docs.set(currentDoc, doc);
        persist(db, currentDoc, doc.html, doc.rev);
        broadcast({ type: 'change', html: msg.html, rev: doc.rev });
      } else if (msg.type === 'cursor') {
        broadcast({ type: 'cursor', user: msg.user, offset: msg.offset, offsetEnd: msg.offsetEnd });
      } else if (msg.type === 'leave') {
        // handled in close
      }
    });

    ws.on('close', () => {
      const session = sessions.get(ws);
      if (session) {
        const room = rooms.get(session.docId);
        if (room) {
          room.delete(ws);
          room.forEach((s) => {
            if (s.readyState === s.OPEN) {
              s.send(JSON.stringify({ type: 'leave', user: session.user }));
            }
          });
          if (room.size === 0) rooms.delete(session.docId);
        }
      }
      sessions.delete(ws);
      ws.doc = null;
    });
  });

  return wss;
}
