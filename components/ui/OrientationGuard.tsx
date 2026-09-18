'use client';

import React, { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';

export const OrientationGuard: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window !== 'undefined') {
        setIsLandscape(window.innerWidth > window.innerHeight && window.innerWidth < 1024);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isLandscape) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-xl text-center text-white">
      <div className="animate-bounce mb-6 p-4 rounded-full bg-white/10 border border-white/20">
        <Smartphone className="w-12 h-12 text-[#c8852a] rotate-90" />
      </div>
      <h2 className="font-display text-2xl mb-2 font-semibold">Hold Vertically</h2>
      <p className="text-white/70 max-w-xs text-sm">
        For the best cinematic café AR experience, please rotate your phone to portrait mode.
      </p>
    </div>
  );
};
