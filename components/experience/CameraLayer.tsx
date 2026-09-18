'use client';

import React, { forwardRef } from 'react';

interface CameraLayerProps {
  stream: MediaStream | null;
  videoRef?: React.Ref<HTMLVideoElement>;
}

export const CameraLayer = forwardRef<HTMLVideoElement, CameraLayerProps>(({ stream }, ref) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-950">
      {/* Real camera stream */}
      <video
        ref={ref}
        autoPlay
        playsInline
        muted
        className={`camera-layer transition-opacity duration-500 ${
          stream ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Simulated Café Environment Fallback (when camera stream is null or disabled) */}
      {!stream && (
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#c8852a]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-[#1a3a5c]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2 opacity-60">
            <p className="text-xs font-mono uppercase tracking-widest text-[#c8852a]">
              Simulated Café Environment
            </p>
            <p className="text-xs text-white/40">
              Camera feed inactive • AR Companion rendering in virtual studio mode
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

CameraLayer.displayName = 'CameraLayer';
