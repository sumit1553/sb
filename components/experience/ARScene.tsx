'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Character } from './Character';
import { Character as CharacterType, AnimationState } from '@/lib/types';

interface ARSceneProps {
  character: CharacterType | null;
  animationState: AnimationState;
  canvasRef?: React.Ref<HTMLCanvasElement>;
}

export const ARScene: React.FC<ARSceneProps> = ({
  character,
  animationState,
  canvasRef,
}) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        ref={canvasRef}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 4, 3]} intensity={1.2} />
        <pointLight position={[-2, -1, 2]} intensity={0.5} color={character?.colorSecondary || '#ffffff'} />

        <Character character={character} animationState={animationState} />
      </Canvas>
    </div>
  );
};
