import React from 'react';

export const BrandButton = ({ variant = 'primary', className = '', style = {}, children, ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center';
  const variants = {
    primary: {
      style: { backgroundColor: '#C19A6B', color: '#1C1C1C' },
      hoverBg: '#A98253',
    },
    secondary: {
      style: { backgroundColor: 'transparent', color: '#1C1C1C', border: '2px solid #1C1C1C' },
      hoverBg: '#1C1C1C',
      hoverText: '#FDF6EC',
    },
    danger: {
      style: { backgroundColor: '#8B0000', color: '#FDF6EC' },
      hoverBg: '#6e0000',
    },
  };

  const selected = variants[variant] || variants.primary;

  return (
    <button
      className={`${baseClasses} ${className}`}
      style={{ ...selected.style, ...style }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = selected.hoverBg;
        if (selected.hoverText) {
          e.currentTarget.style.color = selected.hoverText;
        }
      }}
      onMouseLeave={(e) => {
        Object.entries(selected.style).forEach(([key, val]) => {
          e.currentTarget.style[key] = val;
        });
      }}
      {...props}
    >
      {children}
    </button>
  );
};

