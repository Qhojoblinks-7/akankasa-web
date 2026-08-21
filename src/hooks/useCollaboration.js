import { useEffect, useRef, useState, useCallback } from 'react';

function getWsUrl() {
  const base = import.meta.env.VITE_WS_BASE_URL;
  if (base) return base;
  const { protocol, hostname, port } = window.location;
  const wsProto = protocol === 'https:' ? 'wss:' : 'ws:';
  if (hostname === 'localhost' || hostname === '127.0.0.1' || port === '5173') {
    return `${wsProto}//${hostname}:4000/collab`;
  }
  return `${wsProto}//${hostname}/collab`;
}

function useIdentity() {
  const [identity] = useState(() => {
    let stored = localStorage.getItem('akankasa:editor_identity');
    if (stored) {
      try { stored = JSON.parse(stored); } catch { stored = null; }
    }
    if (!stored) {
      const id = Math.random().toString(36).slice(2, 8);
      stored = {
        id,
        name: `Writer ${parseInt(id, 36) % 1000}`,
        color: `hsl(${Math.floor(Math.random() * 360)}, 65%, 40%)`,
      };
      localStorage.setItem('akankasa:editor_identity', JSON.stringify(stored));
    }
    return stored;
  });
  return identity;
}

const REVZERO = 0;

export default function useCollaboration(docId, userName, options = {}) {
  const { onRemoteChange } = options;
  const wsRef = useRef(null);
  const reconnectRef = useRef(null);
  const identity = useIdentity();
  const [isOnline, setIsOnline] = useState(false);
  const [users, setUsers] = useState({});

  const sendRef = useRef(null);
  const cursorSendRef = useRef(null);
  const latestHtmlRef = useRef(null);
  const lastAckRevRef = useRef(REVZERO);

  const connect = useCallback(() => {
    if (!identity) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;
    let url = getWsUrl();
    url += (url.includes('?') ? '&' : '?') + `doc=${encodeURIComponent(docId || 'default')}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsOnline(true);
      ws.send(JSON.stringify({ type: 'join', docId, user: identity }));
    };

    ws.onmessage = (ev) => {
      let msg;
      try { msg = JSON.parse(ev.data); } catch { return; }

      if (msg.type === 'init') {
        lastAckRevRef.current = msg.rev || REVZERO;
        if (msg.html !== undefined && onRemoteChange) onRemoteChange(msg.html);
        if (Array.isArray(msg.users)) {
          const map = {};
          msg.users.forEach((u) => { if (u && u.id) map[u.id] = u; });
          setUsers(map);
        }
      } else if (msg.type === 'change') {
        if (msg.rev && msg.rev <= lastAckRevRef.current) return;
        lastAckRevRef.current = msg.rev || (lastAckRevRef.current + 1);
        if (msg.html !== undefined && onRemoteChange) onRemoteChange(msg.html);
      } else if (msg.type === 'enter') {
        setUsers((prev) => ({ ...prev, [msg.user.id]: { ...msg.user, offset: msg.user.offset || 0 } }));
      } else if (msg.type === 'cursor') {
        setUsers((prev) => {
          if (!prev[msg.user]) return prev;
          prev[msg.user].offset = msg.offset;
          prev[msg.user].offsetEnd = msg.offsetEnd;
          return { ...prev };
        });
      } else if (msg.type === 'leave') {
        setUsers((prev) => {
          const next = { ...prev };
          delete next[msg.user];
          return next;
        });
      }
    };

    ws.onerror = () => {};
    ws.onclose = () => {
      setIsOnline(false);
      if (reconnectRef.current) return;
      reconnectRef.current = setTimeout(connect, 2000);
    };
  }, [docId, identity, onRemoteChange]);

  useEffect(() => {
    if (!docId || !identity) return;
    connect();
    return () => {
      if (wsRef.current) {
        try {
          wsRef.current.send(JSON.stringify({ type: 'leave', docId, user: identity }));
          wsRef.current.close();
        } catch { /* socket closing */ }
      }
      if (reconnectRef.current) {
        clearTimeout(reconnectRef.current);
        reconnectRef.current = null;
      }
    };
  }, [docId, identity, connect]);

  const sendChange = useCallback((html) => {
    latestHtmlRef.current = html;
    if (!sendRef.current) {
      sendRef.current = setTimeout(() => {
        const latest = latestHtmlRef.current;
        sendRef.current = null;
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'change',
            docId,
            html: latest,
            baseRev: lastAckRevRef.current,
          }));
        }
      }, 300);
    }
  }, [docId]);

  const sendCursor = useCallback((offset, offsetEnd) => {
    if (!cursorSendRef.current) {
      cursorSendRef.current = setTimeout(() => {
        cursorSendRef.current = null;
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'cursor',
            docId,
            user: identity,
            offset,
            offsetEnd,
          }));
        }
      }, 250);
    }
  }, [docId, identity]);

  useEffect(() => {
    return () => {
      if (sendRef.current) clearTimeout(sendRef.current);
      if (cursorSendRef.current) clearTimeout(cursorSendRef.current);
    };
  }, []);

  return { isOnline, users, identity, sendChange, sendCursor };
}
