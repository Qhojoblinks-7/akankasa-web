import React from "react";
import { Download, ExternalLink } from "lucide-react";

const ResearchCard = ({ resource }) => {
  // Function to handle "View Details"
  const handleViewDetails = () => {
    // For now, just open resource link in a new tab
    if (resource.link) {
      window.open(resource.link, "_blank");
    } else {
      alert("No link available for this resource.");
    }
  };

  // Function to handle "Download"
  const handleDownload = () => {
    if (resource.downloadLink) {
      const link = document.createElement("a");
      link.href = resource.downloadLink;
      link.download = resource.title; // set file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Download not available.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
          <p className="text-sm text-gray-600 mb-2">by {resource.author}</p>
          <p className="text-gray-700 mb-4">{resource.abstract}</p>
        </div>
        <div className="flex flex-col items-end space-y-2 ml-4">
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor:
                resource.level === "beginner"
                  ? "#f1d799"
                  : resource.level === "intermediate"
                  ? "#c2ae81"
                  : "#77705c",
              color: "#564c38",
            }}
          >
            {resource.level}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            Paper
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleViewDetails}
          className="font-medium text-sm flex items-center transition-colors"
          style={{ color: "#564c38" }}
          onMouseEnter={(e) => (e.target.style.color = "#695e46")}
          onMouseLeave={(e) => (e.target.style.color = "#564c38")}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </button>
        <button
          onClick={handleDownload}
          className="text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
          style={{ backgroundColor: "#564c38" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#695e46")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#564c38")}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
      </div>
    </div>
  );
};

export default ResearchCard;
