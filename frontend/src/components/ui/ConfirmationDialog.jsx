import React, { useEffect, useRef } from 'react';
import { AlertTriangle, Info, HelpCircle, Trash2 } from 'lucide-react';

const TYPES = {
  danger: { icon: Trash2, iconBg: 'bg-red-100', iconColor: 'text-red-600', button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500' },
  warning: { icon: AlertTriangle, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500' },
  info: { icon: Info, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', button: 'bg-[#564c38] hover:bg-[#695e46] focus:ring-[#564c38]' },
  confirm: { icon: HelpCircle, iconBg: 'bg-gray-100', iconColor: 'text-gray-600', button: 'bg-[#564c38] hover:bg-[#695e46] focus:ring-[#564c38]' },
};

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'confirm',
}) => {
  const confirmRef = useRef(null);
  const meta = TYPES[type] || TYPES.confirm;
  const Icon = meta.icon;

  useEffect(() => {
    if (open) {
      confirmRef.current?.focus();
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full ${meta.iconBg} ${meta.iconColor} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 pt-0.5">
              <h3 id="confirm-title" className="text-base font-semibold text-gray-900">{title}</h3>
              <p id="confirm-message" className="text-sm text-gray-600 mt-1">{message}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {cancelText}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${meta.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
      <style>{`
        .animate-in { animation: dialogIn 0.15s ease-out; }
        @keyframes dialogIn { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
};

export default ConfirmationDialog;
