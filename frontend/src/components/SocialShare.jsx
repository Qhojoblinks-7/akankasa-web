import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Link2, Check } from 'lucide-react';

const SocialShare = ({ url, description }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const shareText = description || 'Explore the beauty of the Akan language and culture';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={shareOnFacebook} className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors" title="Share on Facebook"><Facebook className="w-4 h-4" /></button>
      <button onClick={shareOnTwitter} className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors" title="Share on Twitter"><Twitter className="w-4 h-4" /></button>
      <button onClick={handleCopyLink} className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors" title="Copy link">{copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}</button>
    </div>
  );
};

export default SocialShare;