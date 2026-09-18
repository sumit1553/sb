'use client';

import React from 'react';
import { AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { ExperienceError } from '@/lib/types';
import { GlassCard } from './GlassCard';
import { CinematicButton } from './CinematicButton';

interface ErrorScreenProps {
  error: ExperienceError;
  onRetry?: () => void;
  onContinueWithout?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  error,
  onRetry,
  onContinueWithout,
}) => {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
      <GlassCard className="max-w-sm w-full text-center space-y-6 animate-scale-in">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">{error.userMessage}</h2>
          {error.userDetail && (
            <p className="text-sm text-white/65 leading-relaxed">{error.userDetail}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          {error.canRetry && onRetry && (
            <CinematicButton
              variant="primary"
              fullWidth
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={onRetry}
            >
              Try Again
            </CinematicButton>
          )}

          {error.canContinueWithout && onContinueWithout && (
            <CinematicButton
              variant="ghost"
              fullWidth
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={onContinueWithout}
            >
              Continue without Camera
            </CinematicButton>
          )}
        </div>
      </GlassCard>
    </div>
  );
};
