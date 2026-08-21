import React from 'react';

const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#564c38] text-white px-4 py-2 rounded-lg z-50"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
