import React from 'react';

const Accessibility = () => (
  <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center overflow-x-hidden">
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 overflow-hidden">
      <h1 className="text-3xl font-bold text-akan-red mb-6 break-words">Accessibility Statement</h1>
      <p className="mb-4 break-words">We are committed to making this demo website accessible to everyone. The site is designed to be WCAG 2.1 compliant, with semantic HTML, keyboard navigation, and high-contrast options.</p>
      <h2 className="font-semibold mb-2 mt-6 break-words">Features</h2>
      <ul className="list-disc pl-6 mb-4 overflow-hidden">
        <li className="break-words">Semantic HTML structure</li>
        <li className="break-words">Keyboard navigation support</li>
        <li className="break-words">Screen reader compatibility</li>
        <li className="break-words">High contrast color options</li>
        <li className="break-words">Resizable text and UI elements</li>
        <li className="break-words">Alternative text for all images</li>
        <li className="break-words">Focus indicators for interactive elements</li>
      </ul>
      <h2 className="font-semibold mb-2 mt-6 break-words">Contact</h2>
      <p className="break-words">If you encounter any accessibility issues, please contact us at info@akankasa.org.</p>
    </div>
  </div>
);

export default Accessibility;