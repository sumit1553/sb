'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useExperienceContext } from '@/context/ExperienceContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { CinematicButton } from '@/components/ui/CinematicButton';

export const LandingScreen: React.FC = () => {
  const { setPhase, brand, table } = useExperienceContext();

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-between p-6 overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white grain">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#c8852a]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="w-full max-w-sm pt-safe flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#c8852a] animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
            {brand?.name || 'Café'} • Table {table?.tableNumber || '12'}
          </span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="w-full max-w-sm my-auto text-center space-y-6 z-10 stagger">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#c8852a]" />
          <span>Augmented Reality Experience</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
          There's something waiting at your table.
        </h1>

        <p className="text-base text-white/60 font-light leading-relaxed max-w-xs mx-auto">
          Meet your table companion and discover a quick magical moment.
        </p>

        <div className="pt-4">
          <CinematicButton
            variant="primary"
            fullWidth
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => setPhase('name-input')}
          >
            START EXPERIENCE
          </CinematicButton>
        </div>
      </div>

      {/* Footer / Privacy note */}
      <div className="w-full max-w-sm pb-safe text-center z-10">
        <p className="text-xs text-white/40 leading-normal">
          Camera access is used only to create your experience on your device.
        </p>
      </div>
    </div>
  );
};
