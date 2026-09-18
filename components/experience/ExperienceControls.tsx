'use client';

import React from 'react';
import { Video, Square, RefreshCw } from 'lucide-react';
import { RecordingIndicator } from './RecordingIndicator';

interface ExperienceControlsProps {
  isRecording: boolean;
  recordingDuration: number;
  onStartRecord: () => void;
  onStopRecord: () => void;
  onReplay?: () => void;
}

export const ExperienceControls: React.FC<ExperienceControlsProps> = ({
  isRecording,
  recordingDuration,
  onStartRecord,
  onStopRecord,
  onReplay,
}) => {
  return (
    <div className="absolute bottom-6 inset-x-0 z-30 pointer-events-auto flex items-center justify-between px-6 pb-safe">
      {/* Left button: Replay / New Quote */}
      {onReplay && !isRecording && (
        <button
          onClick={onReplay}
          className="p-3 rounded-full glass border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all"
          title="New quote"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      )}

      {/* Center Record button */}
      <div className="mx-auto flex flex-col items-center gap-2">
        {isRecording && <RecordingIndicator duration={recordingDuration} />}

        {!isRecording ? (
          <button
            onClick={onStartRecord}
            className="group relative p-1.5 rounded-full border-2 border-white/80 bg-white/10 hover:border-white transition-all scale-100 hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center text-white transition-colors">
              <Video className="w-6 h-6" />
            </div>
          </button>
        ) : (
          <button
            onClick={onStopRecord}
            className="group relative p-1.5 rounded-full border-2 border-red-500 bg-red-500/20 transition-all scale-100 hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center text-white transition-colors">
              <Square className="w-6 h-6 fill-current" />
            </div>
          </button>
        )}
      </div>

      {/* Right placeholder for symmetry */}
      {onReplay && !isRecording && <div className="w-11 h-11" />}
    </div>
  );
};
