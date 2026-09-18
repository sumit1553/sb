'use client';

import React from 'react';

interface SubtitleOverlayProps {
  lines: string[];
  activeLineIndex: number;
  currentWord?: string;
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({
  lines,
  activeLineIndex,
}) => {
  if (!lines || lines.length === 0) return null;

  return (
    <div className="absolute bottom-24 inset-x-0 z-20 pointer-events-none flex flex-col items-center justify-end px-6">
      <div className="subtitle-strip glass-heavy rounded-2xl animate-slide-up shadow-2xl">
        {lines.map((line, idx) => {
          const isActive = idx === activeLineIndex || (activeLineIndex === -1 && idx === 0);
          return (
            <p
              key={idx}
              className={`subtitle-line transition-all duration-300 ${
                isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
              }`}
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
};
