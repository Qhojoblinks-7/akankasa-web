import React, { useState, useRef, useCallback } from 'react';
import { Upload, Film, Image as ImageIcon, Music, X, AlertCircle } from 'lucide-react';
import { fileCategory, formatSize } from '../../lib/mediaUtils';

const ACCEPTED = {
  image: { ext: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'], mime: 'image/', label: 'Images (JPG, PNG, GIF, WEBP, SVG)' },
  audio: { ext: ['.mp3', '.ogg', '.wav', '.m4a', '.webm'], mime: 'audio/', label: 'Audio (MP3, OGG, WAV, M4A)' },
  video: { ext: ['.mp4', '.webm', '.ogg', '.mov'], mime: 'video/', label: 'Video (MP4, WEBM, OGG, MOV)' },
};
const ALL_EXT = Object.values(ACCEPTED).flatMap((a) => a.ext);

const FileRow = ({ item, onRemove }) => {
  const cat = item.mediaType || fileCategory(item.file || {});
  const Icon = cat === 'video' ? Film : cat === 'audio' ? Music : ImageIcon;
  return (
    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 rounded bg-white flex items-center justify-center overflow-hidden border border-gray-200 shrink-0">
        {cat === 'image' && item.preview ? (
          <img src={item.preview} alt="" className="w-full h-full object-cover" />
        ) : (
          <Icon className="w-5 h-5 text-[#564c38]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 truncate">{item.file.name}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500">{formatSize(item.file.size)}</p>
          {item.progress != null && item.progress < 100 && (
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden max-w-[120px]">
              <div className="h-full bg-[#ca8a04] transition-all" style={{ width: `${item.progress}%` }} />
            </div>
          )}
          {item.error && (
            <p className="text-xs text-red-600 truncate flex items-center gap-1"><AlertCircle className="w-3 h-3" />{item.error}</p>
          )}
        </div>
      </div>
      {!item.uploading && (
        <button type="button" onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-600 p-1">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const MediaUploader = ({ onFilesAdded, accept = 'all', maxSize = 50 }) => {
  const [items, setItems] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const idRef = useRef(0);

  const addFiles = useCallback((fileList) => {
    const files = Array.from(fileList);
    const newItems = files.map((file) => {
      const id = ++idRef.current;
      const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
      const invalidType = !ALL_EXT.includes(ext) && !Object.values(ACCEPTED).some((a) => file.type.startsWith(a.mime));
      const invalidSize = file.size > maxSize * 1024 * 1024;
      const item = { id, file, progress: 0, error: null, preview: null, mediaType: fileCategory(file), uploading: false };
      if (invalidType) item.error = 'Unsupported file type';
      else if (invalidSize) item.error = `File exceeds ${maxSize} MB`;
      else if (file.type.startsWith('image')) {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            setItems((prev) => prev.map((p) => (p.id === id ? { ...p, preview: reader.result } : p)));
          };
          reader.readAsDataURL(file);
        } catch { /* preview unavailable */ }
      }
      return item;
    });
    setItems((prev) => [...prev, ...newItems]);
    if (onFilesAdded) onFilesAdded(newItems);
  }, [maxSize, onFilesAdded]);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const inputAccept = accept === 'all' ? ALL_EXT.join(',') : ACCEPTED[accept] ? ACCEPTED[accept].ext.join(',') : '*/*';

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver ? 'border-[#ca8a04] bg-[#f1d799]/20' : 'border-gray-300 hover:border-[#564c38] hover:bg-gray-50'
        }`}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm font-medium text-gray-700">Drag & drop files here, or click to browse</p>
        <p className="text-xs text-gray-500 mt-1">Images, audio, and video up to {maxSize} MB</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={inputAccept}
          className="hidden"
          onChange={(e) => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = ''; }}
        />
      </div>

      {items.length > 0 && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <FileRow key={item.id} item={item} onRemove={removeItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
