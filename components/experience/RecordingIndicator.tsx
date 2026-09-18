'use client';

import React from 'react';

interface RecordingIndicatorProps {
  duration: number;
}

export const RecordingIndicator: React.FC<RecordingIndicatorProps> = ({ duration }) => {
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-red-500/30 bg-black/40 text-xs font-mono text-white">
      <div className="rec-dot" />
      <span className="font-semibold text-red-400">REC</span>
      <span className="text-white/80">{formatTime(duration)}</span>
    </div>
  );
};
