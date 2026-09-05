import React, {
  useState, useRef, useEffect, useLayoutEffect, useCallback, useImperativeHandle, forwardRef,
} from 'react';
import EditorToolbar from './EditorToolbar';
import useCollaboration from '../../hooks/useCollaboration';
import { getBookmark, restoreBookmark, textNodeAtOffset, getSelectionTextOffset } from '../../lib/caretBookmark';
import { Sun, Moon, WifiOff } from 'lucide-react';
import MediaPicker from '../media/MediaPicker';
import { mediaApi } from '../../api';

function insertMediaAtSelection(editorRef, item) {
  if (!editorRef.current || !item) return;
  editorRef.current.focus();
  const type = item.mediaType || (item.mimeType ? (item.mimeType.startsWith('video') ? 'video' : item.mimeType.startsWith('audio') ? 'audio' : 'image') : 'image');
  const url = item.url;
  if (type === 'image') {
    document.execCommand('insertImage', false, url);
  } else if (type === 'video') {
    const html = `<video controls src="${url.replace(/"/g, '&quot;')}" style="max-width:100%;border-radius:8px;"></video><p><br></p>`;
    document.execCommand('insertHTML', false, html);
  } else if (type === 'audio') {
    const html = `<audio controls src="${url.replace(/"/g, '&quot;')}" style="width:100%;"></audio><p><br></p>`;
    document.execCommand('insertHTML', false, html);
  }
}

function htmlToText(html) {
  const div = document.createElement('div');
  div.innerHTML = html || '';
  return div.textContent || '';
}

function computeStats(html) {
  const text = htmlToText(html);
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const chars = text.trim().length;
  const reading = Math.max(1, Math.ceil(words.length / 180));
  return { words: words.length, chars, reading };
}

const RemoteCarets = ({ editorRef, users, meId }) => {
  const [carets, setCarets] = useState([]);

  const measure = useCallback(() => {
    const editor = editorRef?.current;
    if (!editor) { setCarets([]); return; }
    const editorRect = editor.getBoundingClientRect();
    const list = [];
    const seen = new Set();

    Object.entries(users).forEach(([id, user]) => {
      if (id === meId || user.offset == null) return;
      const offset = user.offset;
      const offsetEnd = user.offsetEnd != null ? user.offsetEnd : offset;
      const start = textNodeAtOffset(editor, offset);
      if (!start.node) return;

      const range = document.createRange();
      try {
        range.setStart(start.node, start.offset);
        if (offsetEnd > offset) {
          const end = textNodeAtOffset(editor, offsetEnd);
          if (end.node) range.setEnd(end.node, end.offset);
          else range.collapse(true);
        } else {
          range.collapse(true);
        }
      } catch { return; }

      const rects = range.getClientRects ? range.getClientRects() : [];
      if (!rects.length) return;

      if (offsetEnd === offset) {
        const r = rects[rects.length - 1];
        const key = `caret-${id}`;
        if (seen.has(key)) return;
        seen.add(key);
        list.push({
          id: key, color: user.color, name: user.name, isCaret: true,
          x: r.left - editorRect.left, y: r.top - editorRect.top,
          h: Math.max(16, r.height || 16),
        });
      } else {
        rects.forEach((rect, i) => {
          const key = `sel-${id}-${i}-${rect.left}-${rect.top}`;
          if (seen.has(key)) return;
          seen.add(key);
          list.push({
            id: key, color: user.color, name: user.name, isCaret: false,
            x: rect.left - editorRect.left, y: rect.top - editorRect.top,
            w: rect.width, h: rect.height,
          });
        });
      }
    });
    setCarets(list);
  }, [editorRef, users, meId]);

  useEffect(() => {
    measure();
    let raf = 0;
    const loop = () => {
      if (Object.keys(users).length > 0) { measure(); raf = requestAnimationFrame(loop); }
    };
    if (Object.keys(users).length > 0) raf = requestAnimationFrame(loop);
    const el = editorRef?.current;
    const onScroll = () => measure();
    if (el) el.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onScroll);
      el?.removeEventListener('scroll', onScroll);
    };
  }, [measure, users, editorRef]);

  if (!carets.length) return null;
  return (
    <>
      {carets
        .filter((c) => c.isCaret)
        .map((c) => (
          <div key={c.id} className="absolute z-[5] pointer-events-none" style={{ left: c.x, top: c.y - 2, height: c.h }}>
            <div className="absolute w-0.5 rounded-[1px]" style={{ backgroundColor: c.color, animation: 'blink 1s step-end infinite' }} />
            <div className="absolute -top-5 rounded text-[10px] font-medium px-1 py-0.5 whitespace-nowrap" style={{ backgroundColor: c.color, color: '#fff' }}>
              {c.name}
            </div>
          </div>
        ))}
      {carets
        .filter((c) => !c.isCaret)
        .map((c) => (
          <div
            key={c.id}
            className="absolute z-[4] pointer-events-none rounded"
            style={{
              left: c.x, top: c.y, width: c.w, height: c.h,
              backgroundColor: c.color, opacity: 0.25, borderRadius: 2,
            }}
          />
        ))}
    </>
  );
};

const CollaborativeEditor = forwardRef((props, ref) => {
  const {
    docId,
    defaultValue = '',
    placeholder = 'Start writing your story about Akan culture...',
    showStats = true,
    height = '100%',
    userName,
    dark: defaultDark = false,
    onChange,
  } = props;

  const editorRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const [dark, setDark] = useState(defaultDark);
  const [stats, setStats] = useState({ words: 0, chars: 0, reading: 0 });
  const [empty, setEmpty] = useState(true);
  const [picker, setPicker] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const onRemote = useCallback((remoteHtml) => {
    const editor = editorRef.current;
    if (!editor || editor.innerHTML === remoteHtml) return;
    const bookmark = getBookmark(editor);
    editor.innerHTML = remoteHtml || '';
    restoreBookmark(editor, bookmark);
    const text = editor.innerText || '';
    setStats(computeStats(editor.innerHTML));
    setEmpty(!text || text.trim().length === 0);
    onChangeRef.current?.(editor.innerHTML);
  }, []);

  const { isOnline, users, identity, sendChange, sendCursor } = useCollaboration(
    docId, userName,
    { onRemoteChange: onRemote }
  );

  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current?.innerHTML || '',
    setContent: (newHtml, { preserveCaret = false } = {}) => {
      if (!editorRef.current) return;
      if (preserveCaret) {
        const bookmark = getBookmark(editorRef.current);
        editorRef.current.innerHTML = newHtml || '';
        restoreBookmark(editorRef.current, bookmark);
      } else {
        editorRef.current.innerHTML = newHtml || '';
      }
      const text = editorRef.current.innerText || '';
      setStats(computeStats(newHtml || ''));
      setEmpty(!text || text.trim().length === 0);
      onChangeRef.current?.(newHtml || '');
    },
    focus: () => editorRef.current?.focus(),
    exec: (cmd, val = null) => document.execCommand(cmd, false, val),
    getEditor: () => editorRef.current,
  }), []);

  useLayoutEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (defaultValue && !editor.innerHTML) {
      editor.innerHTML = defaultValue;
    }

    const handleInput = () => {
      const content = editor.innerHTML;
      const text = editor.innerText || '';
      setStats(computeStats(content));
      setEmpty(!text || text.trim().length === 0);
      onChangeRef.current?.(content);
      sendChange(content);
    };

    const handleCursor = () => {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      const offset = getSelectionTextOffset(editor, sel);
      const endOffset = sel.isCollapsed ? offset : (() => {
        const range = sel.getRangeAt(0);
        const pre = range.cloneRange();
        try { pre.selectNodeContents(editor); pre.setEnd(range.endContainer, range.endOffset); } catch { return offset; }
        const t = pre.toString();
        const m = t.match(/\S/);
        return m ? m.index : t.length;
      })();
      sendCursor(offset, endOffset);
    };

    const handleKeydown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        const map = { b: 'bold', i: 'italic', u: 'underline' };
        const cmd = map[e.key.toLowerCase()];
        if (cmd) { e.preventDefault(); document.execCommand(cmd, false, null); }
      }
    };

    editor.addEventListener('input', handleInput);
    editor.addEventListener('keyup', handleInput);
    editor.addEventListener('keyup', handleCursor);
    editor.addEventListener('mouseup', handleCursor);
    editor.addEventListener('click', handleCursor);
    editor.addEventListener('keydown', handleKeydown);

    const text = editor.innerText || '';
    setStats(computeStats(editor.innerHTML));
    setEmpty(!text || text.trim().length === 0);

    return () => {
      editor.removeEventListener('input', handleInput);
      editor.removeEventListener('keyup', handleInput);
      editor.removeEventListener('keyup', handleCursor);
      editor.removeEventListener('mouseup', handleCursor);
      editor.removeEventListener('click', handleCursor);
      editor.removeEventListener('keydown', handleKeydown);
    };
  }, [defaultValue, sendChange, sendCursor]);

  const insertLink = () => {
    const url = prompt('Enter a link URL:', 'https://');
    if (url) { document.execCommand('createLink', false, url); editorRef.current?.focus(); }
  };
  const insertEmoji = () => {
    const emoji = prompt('Enter an emoji (e.g. 🌟)');
    if (emoji) { document.execCommand('insertText', false, emoji); editorRef.current?.focus(); }
  };

  const handlePickerInsert = useCallback((item) => {
    setPicker(null);
    if (item) insertMediaAtSelection(editorRef, item);
  }, []);

  const handleFileUpload = useCallback(async (file) => {
    try {
      const result = await mediaApi.upload(file);
      if (result?.url) { mediaApi.cacheLocal(result); insertMediaAtSelection(editorRef, result); }
    } catch { /* user can retry via picker */ }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const files = Array.from(e.dataTransfer?.files || []);
    const mediaFiles = files.filter((f) => f.type.startsWith('image') || f.type.startsWith('audio') || f.type.startsWith('video'));
    if (mediaFiles.length) { mediaFiles.forEach((f) => handleFileUpload(f)); return; }
    const html = e.dataTransfer?.getData('text/html');
    if (html) { document.execCommand('insertHTML', false, html); }
  }, [handleFileUpload]);

  const handlePaste = useCallback((e) => {
    const items = Array.from(e.clipboardData?.items || []);
    const mediaItem = items.find((it) => it.kind === 'file' && (it.type.startsWith('image') || it.type.startsWith('audio') || it.type.startsWith('video')));
    if (mediaItem) {
      e.preventDefault();
      const file = mediaItem.getAsFile();
      if (file) handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  return (
      <div
        className={`relative flex flex-col border rounded-lg overflow-hidden shadow-sm ${
          dark ? 'bg-[#1c1c1c] text-gray-100' : 'bg-white text-gray-800'
        } ${dragOver ? 'ring-2 ring-[#ca8a04]' : ''}`}
        style={{ height }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
      <div
        className="flex items-center justify-between px-3 py-1 border-b"
        style={{
          ...(dark ? { backgroundColor: 'rgb(42 42 42)', borderColor: 'rgb(85 85 85)' } : { backgroundColor: 'rgb(249 250 251)', borderColor: 'rgb(229 231 233)' }),
        }}
      >
        <div className="flex items-center gap-2 text-xs">
          {isOnline ? (
            <span className="flex items-center gap-1 text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              <span>Collaborative</span>
              {Object.keys(users).length > 1 && (
                <span className="mx-1 opacity-50">· {Object.keys(users).length - 1} editing</span>
              )}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-gray-500">
              <WifiOff className="w-3 h-3" />
              <span>Offline — drafts saved locally</span>
            </span>
          )}
          {identity && (
            <span className="flex items-center gap-1" style={{ color: identity.color }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: identity.color }} />
              <span>{identity.name}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {Object.keys(users).length > 1 && (
            <div className="flex -space-x-1 mr-1">
              {Object.values(users)
                .filter((u) => u.id !== identity?.id)
                .slice(0, 5)
                .map((u) => (
                  <span key={u.id} title={u.name} className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: u.color, color: '#fff' }}>
                    {u.name?.slice(0, 1)}
                  </span>
                ))}
            </div>
          )}
          <button type="button" onClick={() => setDark((d) => !d)} title={dark ? 'Light mode' : 'Dark mode'} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <EditorToolbar
        onInsertLink={insertLink}
        onInsertImage={() => setPicker('image')}
        onInsertVideo={() => setPicker('video')}
        onEmoji={insertEmoji}
      />

      <div className="relative flex-1 overflow-auto">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className={`outline-none px-6 py-5 ${dark ? 'prose-invert' : 'prose'} max-w-none`}
          style={{
            minHeight: '260px',
            lineHeight: '1.8',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
          data-placeholder={placeholder}
          role="textbox"
          aria-label="Document editor"
          onPaste={handlePaste}
        />
        <RemoteCarets editorRef={editorRef} users={users} meId={identity?.id} />
      </div>

      {showStats && (
        <div
          className="flex items-center justify-between px-4 py-2 text-xs border-t"
          style={{
            ...(dark ? { backgroundColor: 'rgb(42 42 42)', borderColor: 'rgb(85 85 85)', color: 'rgb(156 163 175)' } : { backgroundColor: 'rgb(249 250 251)', borderColor: 'rgb(229 231 233)', color: 'rgb(107 114 122)' }),
          }}
        >
          <div className="flex items-center gap-4">
            <span>{stats.words} words</span>
            <span>{stats.chars} characters</span>
            <span>{stats.reading} min read</span>
          </div>
          <span className="italic opacity-60">{empty ? 'Empty document' : 'Draft auto-saved'}</span>
        </div>
      )}

      <style>{`
        [data-placeholder]:empty:before,
        [data-placeholder]:empty:focus:before {
          content: attr(data-placeholder);
          color: ${dark ? '#9ca3af' : '#9ca3af'};
          pointer-events: none;
        }
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
      `}</style>

      <MediaPicker open={!!picker} onClose={() => setPicker(null)} onInsert={handlePickerInsert} accept={picker || 'all'} />
    </div>
  );
});

CollaborativeEditor.displayName = 'CollaborativeEditor';

export default CollaborativeEditor;
