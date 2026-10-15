import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, X, FastForward } from 'lucide-react';
import { Article } from '../data/articles';

interface AudioPlayerBarProps {
  article: Article;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ article, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const speeds = [1, 1.25, 1.5, 2];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.5 * playbackSpeed));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  const toggleSpeed = () => {
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const skipBack = () => {
    setProgress(p => Math.max(0, p - 5));
  };

  const skipForward = () => {
    setProgress(p => Math.min(100, p + 5));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#121212] text-white border-t border-neutral-800 shadow-2xl px-4 py-2.5 sm:px-6">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center space-x-3 min-w-0 flex-1 sm:flex-initial">
          <div className="w-9 h-9 bg-neutral-800 rounded-sm flex items-center justify-center shrink-0 border border-neutral-700">
            <Volume2 className="w-4 h-4 text-neutral-300" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
              The Daily • Audio Article
            </span>
            <p className="text-xs font-serif font-medium truncate text-white max-w-[260px] sm:max-w-md">
              {article.title}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={skipBack}
              aria-label="Skip back 15 seconds"
              className="text-neutral-400 hover:text-white transition p-1"
              title="-15s"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button
              onClick={skipForward}
              aria-label="Skip forward 15 seconds"
              className="text-neutral-400 hover:text-white transition p-1"
              title="+15s"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full flex items-center space-x-2 mt-1">
            <span className="text-[10px] text-neutral-400 font-mono tabular-nums">
              {Math.floor((progress * 0.01 * 360) / 60)}:
              {String(Math.floor((progress * 0.01 * 360) % 60)).padStart(2, '0')}
            </span>
            <div
              className="flex-1 h-1 bg-neutral-700 rounded-full cursor-pointer relative overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.max(0, Math.min(100, pos * 100)));
              }}
            >
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 font-mono tabular-nums">
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Speed & Close */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={toggleSpeed}
            className="text-[11px] font-mono px-2 py-0.5 border border-neutral-700 rounded text-neutral-300 hover:border-neutral-500 hover:text-white"
          >
            {playbackSpeed}x
          </button>
          <button
            onClick={onClose}
            aria-label="Close audio player"
            className="text-neutral-400 hover:text-white transition p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
