import React, { useEffect, useRef, useState, useCallback } from 'react';

const AccessibleAudioPlayer = ({ src, playing, onPlay, onPause, label }) => {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');
  const liveRegionRef = useRef(null);

  useEffect(() => {
    if (!src) return;
    const a = new Audio(src);
    audioRef.current = a;

    const onLoaded = () => setDuration(a.duration || 0);
    const onTime = () => setCurrentTime(a.currentTime || 0);
    const onEnd = () => {
      setIsPlaying(false);
      setLiveMessage('Audio playback ended');
      onPause && onPause();
    };
    const onError = () => {
      setLiveMessage('Unable to load audio');
      setIsPlaying(false);
      onPause && onPause();
    };

    a.addEventListener('loadedmetadata', onLoaded);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    a.addEventListener('error', onError);

    return () => {
      a.pause();
      a.removeEventListener('loadedmetadata', onLoaded);
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, [src, onPause]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [playing]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setLiveMessage('Audio paused');
      onPause && onPause();
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setLiveMessage('Audio playing');
        onPlay && onPlay();
      }).catch(() => {
        setLiveMessage('Unable to play audio');
      });
    }
  }, [isPlaying, onPlay, onPause]);

  const seek = useCallback((delta) => {
    if (!audioRef.current || !duration) return;
    const next = Math.max(0, Math.min(duration, currentTime + delta));
    audioRef.current.currentTime = next;
    setCurrentTime(next);
    setLiveMessage(`Seeked to ${Math.round(next)} seconds`);
  }, [currentTime, duration]);

  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    switch (e.key) {
      case ' ':
      case 'Space':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowRight':
        e.preventDefault();
        seek(5);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        seek(-5);
        break;
      default:
        break;
    }
  }, [togglePlay, seek]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!src) return null;

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={togglePlay}
        className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#564c38]"
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        type="button"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="text-xs text-gray-600 tabular-nums" aria-hidden="true">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </div>
    </div>
  );
};

export default AccessibleAudioPlayer;
