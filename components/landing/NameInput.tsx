'use client';

import React, { useState } from 'react';
import { useExperienceContext } from '@/context/ExperienceContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { CinematicButton } from '@/components/ui/CinematicButton';
import { User } from 'lucide-react';

export const NameInput: React.FC = () => {
  const { setPhase, setUserName } = useExperienceContext();
  const [inputVal, setInputVal] = useState('');

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputVal.trim()) {
      setUserName(inputVal.trim());
    }
    setPhase('permission');
  };

  const handleSkip = () => {
    setUserName('');
    setPhase('permission');
  };

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white grain">
      <GlassCard className="max-w-sm w-full space-y-6 animate-scale-in">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c8852a]">
            <User className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl text-white">What should we call you?</h2>
          <p className="text-xs text-white/50">Optional — so your companion can greet you by name.</p>
        </div>

        <form onSubmit={handleContinue} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            maxLength={20}
            className="input-cinematic text-center"
            autoFocus
          />

          <div className="flex flex-col gap-2 pt-2">
            <CinematicButton type="submit" variant="primary" fullWidth>
              Continue
            </CinematicButton>

            <CinematicButton type="button" variant="ghost" fullWidth onClick={handleSkip}>
              Skip
            </CinematicButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
