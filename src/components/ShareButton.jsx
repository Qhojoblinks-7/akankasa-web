import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';

const ShareButton = ({ url, title, className = '', children }) => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: title || document.title,
    url: url || window.location.href
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareData.url);
        }
      }
    } else {
      copyToClipboard(shareData.url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.title + ' ' + shareData.url)}`;

  const iconClass = 'w-5 h-5';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        onClick={handleShare}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share this content"
        title="Share"
      >
        {children || (
          <Share2 className={iconClass} />
        )}
      </button>
      {copied && (
        <span className="ml-2 text-sm text-green-600" role="status">Copied!</span>
      )}
    </div>
  );
};

export default ShareButton;
