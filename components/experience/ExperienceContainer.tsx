'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useExperienceContext } from '@/context/ExperienceContext';
import { PermissionGate } from './PermissionGate';
import { CameraLayer } from './CameraLayer';
import { ARScene } from './ARScene';
import { SelfieCamera } from './SelfieCamera';
import { SubtitleOverlay } from './SubtitleOverlay';
import { BrandOverlay } from './BrandOverlay';
import { ExperienceControls } from './ExperienceControls';
import { LandingScreen } from '@/components/landing/LandingScreen';
import { NameInput } from '@/components/landing/NameInput';
import { VideoPreview } from '@/components/preview/VideoPreview';
import { useSpeech } from '@/hooks/useSpeech';
import { useExperienceRecorder } from '@/hooks/useExperienceRecorder';
import { useCamera } from '@/hooks/useCamera';
import { AnimationState } from '@/lib/types';

type CameraControls = ReturnType<typeof useCamera>;

export const ExperienceContainerInner: React.FC = () => {
  const {
    phase,
    setPhase,
    brand,
    table,
    campaign,
    character,
    quote,
    setRecordingBlob,
    recordingBlob,
  } = useExperienceContext();

  const [animState, setAnimState] = useState<AnimationState>('idle');
  const compositingCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const speech = useSpeech();

  if (phase === 'landing') {
    return <LandingScreen />;
  }

  if (phase === 'name-input') {
    return <NameInput />;
  }

  if (phase === 'preview') {
    return (
      <VideoPreview
        blob={recordingBlob}
        onReplay={() => {
          setPhase('experience');
        }}
      />
    );
  }

  return (
    <PermissionGate>
      {(camera) => {
        return (
          <ExperienceView
            camera={camera}
            animState={animState}
            setAnimState={setAnimState}
            speech={speech}
            compositingCanvasRef={compositingCanvasRef}
          />
        );
      }}
    </PermissionGate>
  );
};

interface ExperienceViewProps {
  camera: CameraControls;
  animState: AnimationState;
  setAnimState: (s: AnimationState) => void;
  speech: ReturnType<typeof useSpeech>;
  compositingCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const ExperienceView: React.FC<ExperienceViewProps> = ({
  camera,
  animState,
  setAnimState,
  speech,
  compositingCanvasRef,
}) => {
  const { brand, table, campaign, character, quote, setPhase, setRecordingBlob } = useExperienceContext();

  const recorder = useExperienceRecorder({
    compositingCanvasRef,
    audioStream: camera.micStream,
  });

  // Entry sequence: 0.5s idle -> 1.0s walkIn -> 2.5s wave -> 3.5s talk & speak
  useEffect(() => {
    let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout;

    t1 = setTimeout(() => setAnimState('walkIn'), 500);
    t2 = setTimeout(() => setAnimState('wave'), 2000);
    t3 = setTimeout(() => {
      setAnimState('talk');
      if (quote?.lines) {
        speech.speak(quote.lines).then(() => {
          setAnimState('smile');
        });
      }
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      speech.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote]);

  const handleStartRecord = async () => {
    await recorder.startRecording();
  };

  const handleStopRecord = async () => {
    await recorder.stopRecording();
    const blob = await recorder.getRecordingBlob();
    setRecordingBlob(blob);
    setPhase('preview');
  };

  return (
    <div className="experience-stack">
      {/* 1. Rear Camera Background */}
      <CameraLayer ref={camera.attachRearTo} stream={camera.rearStream} />

      {/* 2. Three.js 3D Character AR Overlay — the R3F Canvas ref populates
          compositingCanvasRef so that ExperienceRecorder can captureStream() it. */}
      <ARScene
        character={character}
        animationState={animState}
        canvasRef={compositingCanvasRef as React.Ref<HTMLCanvasElement>}
      />

      {/* 3. Top Brand Overlay */}
      <BrandOverlay brand={brand} table={table} campaign={campaign} />

      {/* 4. Subtitle Overlay */}
      <SubtitleOverlay
        lines={quote?.lines || []}
        activeLineIndex={speech.currentLineIndex}
      />

      {/* 5. Selfie PIP Window */}
      <SelfieCamera
        videoRef={camera.attachFrontTo}
        stream={camera.frontStream}
      />

      {/* 6. Floating Recording Controls */}
      <ExperienceControls
        isRecording={recorder.status === 'recording'}
        recordingDuration={recorder.duration}
        onStartRecord={handleStartRecord}
        onStopRecord={handleStopRecord}
      />
    </div>
  );
};
