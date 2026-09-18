'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RecordingStatus } from '@/lib/types';
import { ExperienceRecorder } from '@/services/recordingService';

export interface UseExperienceRecorderOptions {
  compositingCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  audioStream?: MediaStream | null;
}

export interface UseExperienceRecorder {
  status: RecordingStatus;
  duration: number;
  blob: Blob | null;
  mimeType: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  getRecordingBlob: () => Promise<Blob>;
  getRecordingDuration: () => number;
  resetRecording: () => void;
}

export function useExperienceRecorder({
  compositingCanvasRef,
  audioStream,
}: UseExperienceRecorderOptions): UseExperienceRecorder {
  const recorderRef = useRef<ExperienceRecorder | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [duration, setDuration] = useState(0);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startRecording = useCallback(async () => {
    const canvas = compositingCanvasRef.current;
    if (!canvas) return;

    const recorder = new ExperienceRecorder();
    recorderRef.current = recorder;

    try {
      await recorder.initialize({
        compositingCanvas: canvas,
        audioStream: audioStream ?? undefined,
        onEvent: (event) => {
          if (event === 'error') {
            setStatus('error');
            clearTimer();
          }
        },
      });

      recorder.start();
      setStatus('recording');
      setDuration(0);
      setBlob(null);

      // Duration counter
      timerRef.current = setInterval(() => {
        setDuration(recorder.getDuration());
      }, 1000);
    } catch {
      setStatus('error');
    }
  }, [compositingCanvasRef, audioStream]);

  const stopRecording = useCallback(async () => {
    clearTimer();
    const recorder = recorderRef.current;
    if (!recorder) return;

    recorder.stop();
    setStatus('stopped');

    const resultBlob = await recorder.getBlob();
    setBlob(resultBlob);
    setMimeType(recorder.getMimeType());
    setDuration(recorder.getDuration());
  }, []);

  const pauseRecording = useCallback(() => {
    recorderRef.current?.pause();
    setStatus('paused');
    clearTimer();
  }, []);

  const resumeRecording = useCallback(() => {
    recorderRef.current?.resume();
    setStatus('recording');
    timerRef.current = setInterval(() => {
      setDuration(recorderRef.current?.getDuration() ?? 0);
    }, 1000);
  }, []);

  const getRecordingBlob = useCallback(async (): Promise<Blob> => {
    if (blob) return blob;
    return recorderRef.current?.getBlob() ?? new Blob([], { type: 'video/webm' });
  }, [blob]);

  const getRecordingDuration = useCallback((): number => {
    return recorderRef.current?.getDuration() ?? duration;
  }, [duration]);

  const resetRecording = useCallback(() => {
    clearTimer();
    recorderRef.current?.destroy();
    recorderRef.current = null;
    setStatus('idle');
    setDuration(0);
    setBlob(null);
    setMimeType(null);
  }, []);

  useEffect(() => {
    return () => {
      clearTimer();
      recorderRef.current?.destroy();
    };
  }, []);

  return {
    status,
    duration,
    blob,
    mimeType,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    getRecordingBlob,
    getRecordingDuration,
    resetRecording,
  };
}
