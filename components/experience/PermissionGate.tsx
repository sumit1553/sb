'use client';

import React, { useState } from 'react';
import { useExperienceContext } from '@/context/ExperienceContext';
import { useCamera } from '@/hooks/useCamera';
import { PermissionScreen } from '@/components/landing/PermissionScreen';
import { ErrorScreen } from '@/components/ui/ErrorScreen';

interface PermissionGateProps {
  children: (camera: ReturnType<typeof useCamera>) => React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({ children }) => {
  const { setPhase, setError, error, capabilities } = useExperienceContext();
  const camera = useCamera();
  const [requested, setRequested] = useState(false);

  const handleGrant = async () => {
    setRequested(true);

    // 1. Primary main camera stream
    const rear = await camera.startRearCamera();
    if (!rear) {
      setError({
        code: 'CAMERA_DENIED',
        userMessage: "We couldn't access your camera.",
        userDetail: "Your camera permission is needed to bring the character into your café table.",
        canRetry: true,
        canContinueWithout: true,
      });
      return;
    }

    // 2. Secondary PIP camera stream (only if mobile & simultaneous supported)
    if (capabilities.isMobile && capabilities.canSimultaneousCameras) {
      await camera.startFrontCamera();
    }

    // 3. Audio stream
    await camera.startMicrophone();

    setPhase('experience');
  };

  const handleRetry = () => {
    setError(null);
    handleGrant();
  };

  const handleContinueWithout = () => {
    setError(null);
    setPhase('experience');
  };

  if (error) {
    return (
      <ErrorScreen
        error={error}
        onRetry={handleRetry}
        onContinueWithout={handleContinueWithout}
      />
    );
  }

  if (!requested || camera.rearPermission === 'unknown' || camera.rearPermission === 'requesting') {
    return (
      <PermissionScreen
        onGrant={handleGrant}
        isLoading={camera.isLoading}
      />
    );
  }

  return <>{children(camera)}</>;
};
