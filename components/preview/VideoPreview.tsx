'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';
import { ShareActions } from './ShareActions';
import { useExperienceContext } from '@/context/ExperienceContext';

interface VideoPreviewProps {
  blob: Blob | null;
  onReplay: () => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ blob, onReplay }) => {
  const { brand } = useExperienceContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [blob]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-between p-6 bg-black text-white grain">
      {/* Background blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c8852a]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="w-full max-w-sm pt-safe flex items-center justify-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs text-white">
          <Sparkles className="w-3.5 h-3.5 text-[#c8852a]" />
          <span>That was your moment ✨</span>
        </div>
      </div>

      {/* Vertical Video Player Frame */}
      <div className="relative w-full max-w-[280px] aspect-[9/16] my-auto rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-10 bg-neutral-900 group">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            playsInline
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-white/50">
            Processing video...
          </div>
        )}

        {/* Play / Pause toggle overlay */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="p-4 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
          </div>
        </button>
      </div>

      {/* Bottom Share / Save Actions */}
      <div className="w-full max-w-sm pb-safe z-10">
        <ShareActions blob={blob} brandName={brand?.name} onReplay={onReplay} />
      </div>
    </div>
  );
};
