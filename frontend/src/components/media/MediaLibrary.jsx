import React, { useEffect, useState, useCallback } from 'react';
import { Search, X, Film, Music, Image as ImageIcon, Check, Trash2, Loader2 } from 'lucide-react';
import { mediaApi } from '../../api';

const FILTERS = [
  { value: 'all', label: 'All', icon: null },
  { value: 'image', label: 'Images', icon: ImageIcon },
  { value: 'audio', label: 'Audio', icon: Music },
  { value: 'video', label: 'Video', icon: Film },
];

function MediaThumb({ item, selected, onSelect }) {
  const type = item.mediaType || 'image';
  const Icon = type === 'video' ? Film : type === 'audio' ? Music : ImageIcon;
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`relative group rounded-lg overflow-hidden border-2 transition-all aspect-square flex items-center justify-center bg-gray-100 ${
        selected ? 'border-[#ca8a04] ring-2 ring-[#f1d799]' : 'border-transparent hover:border-gray-300'
      }`}
    >
      {type === 'image' && item.url ? (
        <img src={item.url} alt={item.alt_text || item.original_name || 'media'} className="w-full h-full object-cover" />
      ) : type === 'video' && item.url ? (
        <video src={item.url} className="w-full h-full object-cover" muted preload="metadata" />
      ) : (
        <Icon className="w-8 h-8 text-gray-400" />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
      {selected && (
        <div className="absolute top-1 right-1 w-5 h-5 bg-[#ca8a04] rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      {type !== 'image' && (
        <span className="absolute bottom-1 left-1 text-[10px] font-medium text-white bg-black/60 rounded px-1">
          {type}
        </span>
      )}
    </button>
  );
}

const MediaLibrary = ({ open, onClose, onSelect }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await mediaApi.list({ type: filter, search });
      setItems(res.results || []);
    } catch (err) {
      setError(err.message || 'Failed to load media');
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    if (open) { load(); setSelected(null); }
  }, [open, load]);

  const confirmSelect = useCallback(() => {
    if (selected && onSelect) onSelect(selected);
  }, [selected, onSelect]);

  const handleRemove = useCallback(async (e, item) => {
    e.stopPropagation();
    if (!window.confirm('Delete this media item?')) return;
    try {
      await mediaApi.remove(item.id);
      setItems((prev) => prev.filter((p) => p.id !== item.id));
      if (selected?.id === item.id) setSelected(null);
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  }, [selected]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-gray-800">Media Library</h3>
          <button type="button" onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b space-y-3">
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.value ? 'bg-[#564c38] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.icon && <f.icon className="w-3.5 h-3.5" />}
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search media..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:border-[#564c38]"
              style={{ '--tw-ring-color': '#ca8a04' }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading...
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 text-sm">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              No media found. Upload files to see them here.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {items.map((item) => (
                <div key={item.id} className="relative group">
                  <MediaThumb
                    item={item}
                    selected={selected?.id === item.id}
                    onSelect={setSelected}
                  />
                  <button
                    type="button"
                    onClick={(e) => handleRemove(e, item)}
                    className="absolute top-1 left-1 w-5 h-5 bg-red-600 text-white rounded-full items-center justify-center hidden group-hover:flex"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className="p-3 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-700 truncate flex-1">
              <span className="font-medium">{selected.original_name || selected.filename || 'Selected'}</span>
              <span className="text-gray-400 ml-2 capitalize">{selected.mediaType}</span>
            </div>
            <button
              type="button"
              onClick={confirmSelect}
              className="px-4 py-1.5 bg-[#564c38] text-white rounded-lg text-sm font-medium hover:bg-[#695e46]"
            >
              Insert
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
