import React, { useState, useRef, useEffect } from 'react';
import { X, Download, FileText, Play, Pause, Volume2, VolumeX, ExternalLink, Calendar, User, Building, Tag } from 'lucide-react';

const ResearchPlayer = ({ paper, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const mediaElement = paper.type === 'video' ? videoRef.current : audioRef.current;
    
    if (mediaElement) {
      const updateTime = () => setCurrentTime(mediaElement.currentTime);
      const updateDuration = () => setDuration(mediaElement.duration);
      
      mediaElement.addEventListener('timeupdate', updateTime);
      mediaElement.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        mediaElement.removeEventListener('timeupdate', updateTime);
        mediaElement.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [paper.type]);

  const togglePlay = () => {
    const mediaElement = paper.type === 'video' ? videoRef.current : audioRef.current;
    if (isPlaying) {
      mediaElement.pause();
    } else {
      mediaElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const mediaElement = paper.type === 'video' ? videoRef.current : audioRef.current;
    mediaElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e) => {
    const mediaElement = paper.type === 'video' ? videoRef.current : audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    mediaElement.currentTime = pos * duration;
  };

  const handleDownload = () => {
    if (paper.pdfUrl) {
      window.open(paper.pdfUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{paper.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{paper.description}</p>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{paper.category}</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{paper.pages} pages</span>
        </div>
      </div>
    </div>
  );
};

export default ResearchPlayer;
