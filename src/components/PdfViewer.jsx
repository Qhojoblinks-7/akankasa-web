import React from 'react';

const PdfViewer = ({ url, title }) => {
  if (!url) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title || 'Document Viewer'}</h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Open in new tab
        </a>
      </div>
      <div className="w-full" style={{ height: '600px' }}>
        <iframe
          src={url}
          title={title || 'PDF Document'}
          className="w-full h-full border-0"
          aria-label={`PDF viewer for ${title || 'document'}`}
        >
          <p className="p-4 text-gray-600">
            Your browser does not support PDF viewing. You can{' '}
            <a href={url} className="text-blue-600 underline">download the PDF</a> instead.
          </p>
        </iframe>
      </div>
    </div>
  );
};

export default PdfViewer;
