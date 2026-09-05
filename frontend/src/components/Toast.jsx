import React, { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const id = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(id);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 right-6 bg-[#1C1C1C] text-white px-4 py-2 rounded shadow-lg" role="status" aria-live="polite">
      {message}
    </div>
  );
};

export default Toast;
