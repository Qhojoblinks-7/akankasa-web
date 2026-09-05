import React from 'react';

export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
