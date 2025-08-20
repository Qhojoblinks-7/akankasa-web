import React from 'react';

const Accessibility = () => (
  <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-akan-red mb-6">Accessibility Statement</h1>
      <p className="mb-4">We are committed to making this demo website accessible to everyone. The site is designed to be WCAG 2.1 compliant, with semantic HTML, keyboard navigation, and high-contrast options.</p>
      <h2 className="font-semibold mb-2 mt-6">Features</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Semantic HTML structure</li>
        <li>Keyboard navigation support</li>
        <li>Screen reader compatibility</li>
        <li>High contrast color options</li>
        <li>Resizable text and UI elements</li>
        <li>Alternative text for all images</li>
        <li>Focus indicators for interactive elements</li>
      </ul>
      <h2 className="font-semibold mb-2 mt-6">Contact</h2>
      <p>If you encounter any accessibility issues, please contact us at info@akankasa.org.</p>
    </div>
  </div>
);

export default Accessibility;