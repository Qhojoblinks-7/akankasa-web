import React from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Play, Calendar, User, Building, Tag } from 'lucide-react';

const ResearchCard = ({ paper, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(paper)}
    >
      <div className="relative h-48">
        {paper.thumbnail ? (
          <img 
            src={paper.thumbnail} 
            alt={paper.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
            <div className="text-center text-blue-800 text-center">
              <FileText className="w-12 h-12 mx-auto mb-2" />
              <span className="font-medium">Research Paper</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 truncate">{paper.title}</h3>
        <p className="text-gray-600 text-sm mb-2 truncate">{paper.description}</p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>{paper.author}</span>
          </div>
          
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            <span>{paper.institution}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(paper.publicationDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-2" />
            <span>{paper.category}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {paper.category}
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {paper.pages} pages
            </span>
          </div>
          
          <Download className="w-4 h-4 text-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
