'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionState } from '@/lib/types';
import {
  requestRearCamera,
  requestFrontCamera,
  requestMicrophone,
  releaseStream,
  attachStreamToVideo,
} from '@/services/cameraService';

export interface CameraState {
  rearStream: MediaStream | null;
  frontStream: MediaStream | null;
  micStream: MediaStream | null;
  rearPermission: PermissionState;
  frontPermission: PermissionState;
  micPermission: PermissionState;
  hasFrontCamera: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useCamera() {
  const [state, setState] = useState<CameraState>({
    rearStream: null,
    frontStream: null,
    micStream: null,
    rearPermission: 'unknown',
    frontPermission: 'unknown',
    micPermission: 'unknown',
    hasFrontCamera: false,
    isLoading: false,
    error: null,
  });

  const rearVideoRef = useRef<HTMLVideoElement | null>(null);
  const frontVideoRef = useRef<HTMLVideoElement | null>(null);

  const startRearCamera = useCallback(async () => {
    setState(s => ({ ...s, isLoading: true, rearPermission: 'requesting', error: null }));
    try {
      const stream = await requestRearCamera();
      setState(s => ({ ...s, rearStream: stream, rearPermission: 'granted', isLoading: false }));
      if (rearVideoRef.current) attachStreamToVideo(stream, rearVideoRef.current);
      return stream;
    } catch (err: unknown) {
      const msg = (err as { userMessage?: string })?.userMessage ?? 'Camera unavailable';
      setState(s => ({ ...s, rearPermission: 'denied', isLoading: false, error: msg }));
      return null;
    }
  }, []);

  const startFrontCamera = useCallback(async () => {
    setState(s => ({ ...s, frontPermission: 'requesting' }));
    
    // First try to get an actual front camera stream
    let stream = await requestFrontCamera();
    
    // If that fails (e.g. single camera device, hardware lock), clone the rear stream as a fallback
    if (!stream && state.rearStream) {
      console.log('[useCamera] Front camera unavailable, falling back to cloned rear stream');
      stream = state.rearStream.clone();
    }

    setState(s => ({
      ...s,
      frontStream: stream,
      frontPermission: stream ? 'granted' : 'unavailable',
      hasFrontCamera: !!stream,
    }));
    
    if (stream && frontVideoRef.current) attachStreamToVideo(stream, frontVideoRef.current);
    
    return stream;
  }, [state.rearStream]);

  const startMicrophone = useCallback(async () => {
    setState(s => ({ ...s, micPermission: 'requesting' }));
    const stream = await requestMicrophone();
    setState(s => ({
      ...s,
      micStream: stream,
      micPermission: stream ? 'granted' : 'denied',
    }));
    return stream;
  }, []);

  const stopAll = useCallback(() => {
    setState(s => {
      releaseStream(s.rearStream);
      releaseStream(s.frontStream);
      releaseStream(s.micStream);
      return {
        ...s,
        rearStream: null,
        frontStream: null,
        micStream: null,
        rearPermission: 'unknown',
        frontPermission: 'unknown',
        micPermission: 'unknown',
      };
    });
  }, []);

  // Auto-attach when refs change
  const attachRearTo = useCallback(
    (el: HTMLVideoElement | null) => {
      rearVideoRef.current = el;
      if (el && state.rearStream) attachStreamToVideo(state.rearStream, el);
    },
    [state.rearStream]
  );

  const attachFrontTo = useCallback(
    (el: HTMLVideoElement | null) => {
      frontVideoRef.current = el;
      if (el && state.frontStream) attachStreamToVideo(state.frontStream, el);
    },
    [state.frontStream]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      releaseStream(state.rearStream);
      releaseStream(state.frontStream);
      releaseStream(state.micStream);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    startRearCamera,
    startFrontCamera,
    startMicrophone,
    stopAll,
    attachRearTo,
    attachFrontTo,
  };
}
