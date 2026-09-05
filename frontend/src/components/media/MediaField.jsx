import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Music, Film, FileText, ExternalLink } from 'lucide-react';
import { mediaApi } from '../../api';

function Preview({ value, accept }) {
  if (!value) return null;
  const lower = value.toLowerCase();
  const isImage = lower.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/) || accept === 'image/*';
  const isAudio = lower.match(/\.(mp3|ogg|wav|m4a)(\?|$)/) || accept === 'audio/*';
  if (isImage) {
    return <img src={value} alt="" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />;
  }
  if (isAudio) {
    return <audio src={value} controls className="max-w-full" preload="none" />;
  }
  return (
    <a href={value} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-[#564c38] underline">
      <ExternalLink className="w-4 h-4" /> View file
    </a>
  );
}

const TYPE_META = {
  'image/*': { Icon: ImageIcon, label: 'Upload image', accept: '.jpg,.jpeg,.png,.gif,.webp,.svg' },
  'audio/*': { Icon: Music, label: 'Upload audio', accept: '.mp3,.ogg,.wav,.m4a' },
  'video/*': { Icon: Film, label: 'Upload video', accept: '.mp4,.webm,.ogg,.mov' },
  '.pdf,.doc,.docx,.txt': { Icon: FileText, label: 'Upload document', accept: '.pdf,.doc,.docx,.txt' },
};

const MediaField = ({ label, value, onChange, accept = 'image/*', hint, className = '' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const meta = TYPE_META[accept] || TYPE_META['image/*'];
  const { Icon } = meta;

  const uploadFile = async (file) => {
    setError('');
    if (!file) return;
    setUploading(true);
    try {
      const result = await mediaApi.upload(file);
      if (result?.url) {
        mediaApi.cacheLocal(result);
        onChange(result.url);
      } else {
        setError('Upload failed');
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleChange = (e) => uploadFile(e.target.files?.[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };
  const clear = (e) => { e.preventDefault(); onChange(''); setError(''); };

  const showPreview = value && (accept === 'image/*' || accept === 'audio/*');

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="space-y-2">
        {showPreview && value && (
          <div className="flex items-center gap-3">
            <Preview value={value} accept={accept} />
            <button type="button" onClick={clear} className="text-gray-400 hover:text-red-600 p-1" title="Remove">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex items-center gap-3 p-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            dragOver ? 'border-[#ca8a04] bg-[#f1d799]/20' : 'border-gray-200 hover:border-[#564c38] hover:bg-gray-50'
          }`}
        >
          {value && !showPreview ? (
            <Preview value={value} accept={accept} />
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <Icon className="w-5 h-5" />
              <span className="text-sm">{uploading ? 'Uploading…' : value ? `Replace ${meta.label.replace('Upload ', '').toLowerCase()}` : meta.label}</span>
            </div>
          )}
          <input ref={inputRef} type="file" accept={meta.accept} onChange={handleChange} className="hidden" />
        </div>

        {!showPreview && value && (
          <div className="flex items-center gap-2">
            <Preview value={value} accept={accept} />
            <button type="button" onClick={clear} className="text-gray-400 hover:text-red-600"><X className="w-4 h-4" /></button>
          </div>
        )}

        {hint && <p className="text-xs text-gray-500">{hint}</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default MediaField;
