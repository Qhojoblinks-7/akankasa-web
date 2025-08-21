import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, FileText, Headphones, Video } from 'lucide-react';

const StoryPlayer = ({ story, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const mediaElement = story.type === 'video' ? videoRef.current : audioRef.current;
    
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
  }, [story.type]);

  const togglePlay = () => {
    const mediaElement = story.type === 'video' ? videoRef.current : audioRef.current;
    if (isPlaying) {
      mediaElement.pause();
    } else {
      mediaElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const mediaElement = story.type === 'video' ? videoRef.current : audioRef.current;
    mediaElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e) => {
    const mediaElement = story.type === 'video' ? videoRef.current : audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    mediaElement.currentTime = pos * duration;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        ref={playerRef}
        className="bg-white rounded-lg w-full max-w-4xl max-h-full overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">{story.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Media Player */}
        <div className="relative bg-black aspect-video">
          {story.type === 'video' ? (
            <video
              ref={videoRef}
              src={story.videoUrl}
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-900 to-amber-700">
              <div className="text-center text-white">
                <Headphones className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                <p className="text-amber-200">Audio Story</p>
              </div>
            </div>
          )}
          
          {story.type === 'audio' && (
            <audio
              ref={audioRef}
              src={story.audioUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          )}
          
          {/* Play/Pause Overlay */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity"
          >
            {isPlaying ? (
              <Pause className="w-16 h-16 text-white" />
            ) : (
              <Play className="w-16 h-16 text-white" />
            )}
          </button>
        </div>
        
        {/* Controls */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay}
                className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button 
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center text-sm text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span>{formatTime(duration) || '0:00'}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowTranscript(!showTranscript)}
                className={`p-2 rounded-full ${showTranscript ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'}`}
              >
                <FileText className="w-5 h-5" />
              </button>
              
              {story.type === 'video' && (
                <button 
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div 
            className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {showTranscript ? (
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Transcript</h3>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-700">{story.transcript}</p>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Description</h3>
                  <p className="text-gray-700">{story.description}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Details</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li><span className="font-medium">Category:</span> {story.category}</li>
                    <li><span className="font-medium">Language:</span> {story.language}</li>
                    <li><span className="font-medium">Duration:</span> {story.duration}</li>
                    <li><span className="font-medium">Region:</span> {story.region}</li>
                    <li><span className="font-medium">Narrator:</span> {story.narrator}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryPlayer;