import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ src, playing, onPlay, onPause }) => {
  const audioRef = useRef(null);
  // no visible time/seeker in slick UI

  useEffect(() => {
    if (!src) return;
    const a = new Audio(src);
    audioRef.current = a;

    const onEnd = () => {
      onPause && onPause();
    };

    a.addEventListener('ended', onEnd);

    return () => {
      a.pause();
      a.removeEventListener('ended', onEnd);
      audioRef.current = null;
    };
  }, [src, onPause]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  if (!src) return null;

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => (playing ? onPause && onPause() : onPlay && onPlay())}
        className="px-2 py-1 bg-gray-100 rounded"
        aria-label={playing ? 'Pause audio' : 'Play audio'}
      >
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;
