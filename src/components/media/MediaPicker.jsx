import React, { useState, useCallback } from 'react';
import { X, Upload, Library, Image as ImageIcon, Film, Music } from 'lucide-react';
import MediaUploader from './MediaUploader';
import MediaLibrary from './MediaLibrary';
import { mediaApi } from '../../api';

const TABS = [
  { value: 'upload', label: 'Upload', icon: Upload },
  { value: 'library', label: 'Media Library', icon: Library },
];

const MediaPicker = ({ open, onClose, onInsert, accept = 'all' }) => {
  const [tab, setTab] = useState('upload');
  const [error, setError] = useState('');
  const [done, setDone] = useState([]);

  const uploadFile = useCallback(async (file) => {
    setError('');
    try {
      const result = await mediaApi.upload(file);
      if (result?.url) {
        mediaApi.cacheLocal(result);
        setDone((prev) => [...prev, result]);
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    }
  }, []);

  const handleFilesAdded = useCallback((items) => {
    items.forEach((item) => {
      if (!item.error) uploadFile(item.file);
    });
  }, [uploadFile]);

  const handleInsert = useCallback((item) => {
    if (item && onInsert) onInsert(item);
  }, [onInsert]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-gray-800">Insert Media</h3>
          <button type="button" onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                tab === t.value ? 'text-[#564c38] border-b-2 border-[#564c38]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {tab === 'upload' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Images</span>
                <span className="flex items-center gap-1"><Music className="w-3 h-3" /> Audio</span>
                <span className="flex items-center gap-1"><Film className="w-3 h-3" /> Video</span>
              </div>
              <MediaUploader onFilesAdded={handleFilesAdded} accept={accept} />
              {error && <p className="text-sm text-red-600">{error}</p>}
              {done.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded ({done.length}) — click to insert</p>
                  <div className="grid grid-cols-4 gap-2">
                    {done.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleInsert(item)}
                        className="rounded-lg overflow-hidden border-2 border-transparent hover:border-[#ca8a04] aspect-square bg-gray-100 flex items-center justify-center"
                        title="Click to insert"
                      >
                        {item.mediaType === 'image' && item.url ? (
                          <img src={item.url} alt="" className="w-full h-full object-cover" />
                        ) : item.mediaType === 'video' && item.url ? (
                          <Film className="w-6 h-6 text-gray-400" />
                        ) : (
                          <Music className="w-6 h-6 text-gray-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <MediaLibrary open={tab === 'library'} onClose={() => {}} onSelect={handleInsert} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaPicker;
