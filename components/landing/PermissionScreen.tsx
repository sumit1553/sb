'use client';

import React from 'react';
import { Camera, Mic, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CinematicButton } from '@/components/ui/CinematicButton';

interface PermissionScreenProps {
  onGrant: () => void;
  isLoading?: boolean;
}

export const PermissionScreen: React.FC<PermissionScreenProps> = ({
  onGrant,
  isLoading = false,
}) => {
  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white grain">
      <GlassCard className="max-w-sm w-full space-y-6 text-center animate-scale-in">
        <div className="mx-auto w-14 h-14 rounded-full bg-[#c8852a]/10 border border-[#c8852a]/20 flex items-center justify-center text-[#c8852a]">
          <Camera className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl text-white">Camera & Audio Access</h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Your camera permission is needed to bring the 3D character into your café table.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 text-left">
          <div className="flex items-center gap-3 text-xs text-white/70">
            <Camera className="w-4 h-4 text-[#c8852a] shrink-0" />
            <span>Rear camera streams the café environment</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/70">
            <Mic className="w-4 h-4 text-[#c8852a] shrink-0" />
            <span>Microphone records ambient sound for your clip</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/70">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Processed locally. Stays on your device unless shared.</span>
          </div>
        </div>

        <CinematicButton
          variant="primary"
          fullWidth
          onClick={onGrant}
          disabled={isLoading}
        >
          {isLoading ? 'Requesting Permissions...' : 'Enable Camera & Mic'}
        </CinematicButton>
      </GlassCard>
    </div>
  );
};
