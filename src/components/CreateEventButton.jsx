import React from 'react';
import { Plus } from 'lucide-react';

const CreateEventButton = ({ onClick, children = 'Create Event', className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 ${className}`}
      style={{
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-background)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.85)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
    >
      <Plus className="w-4 h-4" />
      <span>{children}</span>
    </button>
  );
};

export default CreateEventButton;
