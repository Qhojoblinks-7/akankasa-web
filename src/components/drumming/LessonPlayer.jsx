import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Play, Pause, Volume2, VolumeX, 
  Maximize, Minimize, FileText, Headphones, Music 
} from 'lucide-react';

const LessonPlayer = ({ lesson = {}, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showNotation, setShowNotation] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const contentRef = useRef(null);

  const {
    title = "Untitled Lesson",
    type = "audio",
    videoUrl = "",
    audioUrl = "",
    transcript = "No transcript available.",
    patternNotation = "",
    description = "No description available.",
    instrument = "Unknown",
    difficulty = "N/A",
    duration: lessonDuration = "N/A",
    bpm = "--",
    region = "Unspecified",
    instructor = "Anonymous",
  } = lesson;

  // Attach listeners to update time & duration
  useEffect(() => {
    const mediaElement = type === 'video' ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    const updateTime = () => setCurrentTime(mediaElement.currentTime);
    const updateDuration = () => setDuration(mediaElement.duration || 0);

    mediaElement.addEventListener('timeupdate', updateTime);
    mediaElement.addEventListener('loadedmetadata', updateDuration);

    return () => {
      mediaElement.removeEventListener('timeupdate', updateTime);
      mediaElement.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [type]);

  const togglePlay = () => {
    const mediaElement = type === 'video' ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    if (isPlaying) {
      mediaElement.pause();
    } else {
      mediaElement.play().catch(() => {
        console.warn("Play blocked by browser policy");
      });
    }
  };

  const toggleMute = () => {
    const mediaElement = type === 'video' ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    mediaElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time = 0) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e) => {
    const mediaElement = type === 'video' ? videoRef.current : audioRef.current;
    if (!mediaElement || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    mediaElement.currentTime = pos * duration;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const switchContent = (section) => {
    setShowTranscript(section === "transcript");
    setShowNotation(section === "notation");
    contentRef.current?.scrollTo(0, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        ref={playerRef}
        className="bg-white rounded-lg w-full max-w-4xl max-h-full overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            aria-label="Close player"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Media */}
        <div className="relative bg-black aspect-video">
          {type === 'video' ? (
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
              <div className="text-center text-white">
                <Headphones className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-blue-200">Drumming Lesson</p>
              </div>
            </div>
          )}

          {type === 'audio' && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          )}

          {/* Overlay play button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
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
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button 
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center text-sm text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => switchContent("transcript")}
                aria-label="Toggle transcript"
                className={`p-2 rounded-full ${showTranscript ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
              >
                <FileText className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => switchContent("notation")}
                aria-label="Toggle notation"
                className={`p-2 rounded-full ${showNotation ? 'bg-purple-100 text-purple-800' : 'hover:bg-gray-100'}`}
              >
                <Music className="w-5 h-5" />
              </button>
              
              {type === 'video' && (
                <button 
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
          
          {/* Progress */}
          <div 
            className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleSeek}
            role="progressbar"
            aria-valuenow={currentTime}
            aria-valuemin={0}
            aria-valuemax={duration}
          >
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
        
        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto max-h-96">
          {showTranscript ? (
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Transcript</h3>
              <p className="whitespace-pre-line text-gray-700">{transcript}</p>
            </div>
          ) : showNotation ? (
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Pattern Notation</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-2xl font-mono text-center py-4">{patternNotation || "No notation available."}</p>
              </div>
              <div className="mt-4">
                <h4 className="font-bold text-gray-900 mb-2">Notation Guide</h4>
                <ul className="text-gray-700 space-y-1">
                  <li><span className="font-medium">Bass:</span> Center strike</li>
                  <li><span className="font-medium">Tone:</span> Edge strike</li>
                  <li><span className="font-medium">Slap:</span> Sharp finger strike</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Description</h3>
                <p className="text-gray-700">{description}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Details</h3>
                <ul className="text-gray-700 space-y-1">
                  <li><span className="font-medium">Instrument:</span> {instrument}</li>
                  <li><span className="font-medium">Difficulty:</span> {difficulty}</li>
                  <li><span className="font-medium">Duration:</span> {lessonDuration}</li>
                  <li><span className="font-medium">BPM:</span> {bpm}</li>
                  <li><span className="font-medium">Region:</span> {region}</li>
                  <li><span className="font-medium">Instructor:</span> {instructor}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
