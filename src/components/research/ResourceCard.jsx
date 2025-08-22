import React from 'react';

const ResourceCard = ({ title, type, description, link }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{type}</p>
      <p className="mt-2 text-gray-700">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View Resource →
      </a>
    </div>
  );
};

export default ResourceCard;
