import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = ({
  open,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[5vh] overflow-y-auto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative bg-white rounded-xl shadow-2xl w-full ${sizes[size]} overflow-hidden animate-in mb-[5vh]`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 id="modal-title" className="text-lg font-display font-semibold text-[#564c38]">{title}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
      <style>{`
        .animate-in { animation: modalIn 0.15s ease-out; }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
};

export default Modal;
