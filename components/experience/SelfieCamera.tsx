'use client';

import React from 'react';
import { User } from 'lucide-react';
import { useExperienceContext } from '@/context/ExperienceContext';

interface SelfieCameraProps {
  stream: MediaStream | null;
  videoRef?: React.Ref<HTMLVideoElement>;
}

export const SelfieCamera: React.FC<SelfieCameraProps> = ({ stream, videoRef }) => {
  const { userName } = useExperienceContext();

  return (
    <div className="selfie-pip group">
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      ) : (
        /* Fallback when simultaneous dual camera is unavailable (e.g. iOS Safari) */
        <div className="w-full h-full bg-gradient-to-tr from-neutral-900 to-neutral-800 flex flex-col items-center justify-center p-2 text-center">
          <div className="w-8 h-8 rounded-full bg-[#c8852a]/20 border border-[#c8852a]/40 flex items-center justify-center text-[#c8852a] mb-1">
            <User className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium text-white/70 truncate max-w-full px-1">
            {userName || 'You'}
          </span>
        </div>
      )}
    </div>
  );
};
