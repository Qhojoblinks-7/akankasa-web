import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Download,
  FileText,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Calendar,
  User,
  Building,
  Tag,
} from "lucide-react";

const ResearchPlayer = ({ paper, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const mediaElement = paper.type === "video" ? videoRef.current : audioRef.current;

    if (mediaElement) {
      const updateTime = () => setCurrentTime(mediaElement.currentTime);
      const updateDuration = () => setDuration(mediaElement.duration);

      mediaElement.addEventListener("timeupdate", updateTime);
      mediaElement.addEventListener("loadedmetadata", updateDuration);

      return () => {
        mediaElement.removeEventListener("timeupdate", updateTime);
        mediaElement.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [paper.type]);

  const togglePlay = () => {
    const mediaElement = paper.type === "video" ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    if (isPlaying) {
      mediaElement.pause();
    } else {
      mediaElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const mediaElement = paper.type === "video" ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    mediaElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e) => {
    const mediaElement = paper.type === "video" ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    mediaElement.currentTime = pos * duration;
  };

  const handleDownload = () => {
    if (paper.pdfUrl) {
      window.open(paper.pdfUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">{paper.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* Media Preview */}
        <div className="p-4">
          {paper.type === "video" && (
            <video
              ref={videoRef}
              src={paper.mediaUrl}
              className="w-full rounded-md"
              controls={false}
            />
          )}
          {paper.type === "audio" && (
            <audio ref={audioRef} src={paper.mediaUrl} />
          )}
          {paper.type === "pdf" && (
            <div className="flex items-center justify-center p-6 bg-gray-100 rounded-md">
              <FileText className="text-gray-600 mr-2" />
              <span>PDF Available</span>
            </div>
          )}
        </div>

        {/* Controls */}
        {(paper.type === "video" || paper.type === "audio") && (
          <div className="p-4 flex items-center justify-between space-x-4">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>

            <div
              className="flex-1 h-2 bg-gray-300 rounded cursor-pointer mx-2"
              onClick={handleSeek}
            >
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>

            <span className="text-sm text-gray-600">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="flex items-center gap-1"><User size={14} /> {paper.author}</span>
            <span className="flex items-center gap-1"><Building size={14} /> {paper.institution}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {paper.year}</span>
            <span className="flex items-center gap-1"><Tag size={14} /> {paper.category}</span>
          </div>
          {paper.pdfUrl && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Download size={16} /> Download PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchPlayer;
