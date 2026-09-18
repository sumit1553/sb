'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Character as CharacterType, AnimationState } from '@/lib/types';

interface CharacterProps {
  character: CharacterType | null;
  animationState: AnimationState;
}

export const Character: React.FC<CharacterProps> = ({ character, animationState }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const variant = character?.variant || 'coffee-companion';
  const primaryColor = character?.colorPrimary || '#c8852a';
  const secondaryColor = character?.colorSecondary || '#f0d080';

  // Animation logic driven frame by frame
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Floating idle animation
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.08 - 0.2;

    // Subtle breathing scale
    const scaleFactor = 1 + Math.sin(time * 2) * 0.02;
    groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Animation states
    if (animationState === 'walkIn') {
      // Entry spring lerp from bottom-far
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, delta * 3);
    } else if (animationState === 'wave') {
      // Waving tilt
      groupRef.current.rotation.z = Math.sin(time * 8) * 0.15;
    } else if (animationState === 'talk') {
      // Gentle talking bob and rotation
      groupRef.current.rotation.y = Math.sin(time * 3) * 0.1;
      if (headRef.current) {
        headRef.current.position.y = Math.sin(time * 10) * 0.03;
      }
    } else if (animationState === 'celebrate') {
      // Spin
      groupRef.current.rotation.y += delta * 3;
    } else {
      // Default idle rotation drift
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
      groupRef.current.rotation.z = 0;
    }

    // Secondary animations
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.8;
      ringRef.current.rotation.y = time * 0.5;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {variant === 'coffee-companion' && (
        /* Brew: Coffee Cup Companion with Steam Rings */
        <group>
          {/* Main sphere character body */}
          <mesh ref={headRef} position={[0, 0, 0]}>
            <sphereGeometry args={[0.65, 32, 32]} />
            <meshStandardMaterial
              color={primaryColor}
              roughness={0.2}
              metalness={0.1}
              emissive={primaryColor}
              emissiveIntensity={0.15}
            />
          </mesh>

          {/* Steam / Energy Ring */}
          <mesh ref={ringRef} position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.04, 16, 32]} />
            <meshStandardMaterial
              color={secondaryColor}
              transparent
              opacity={0.7}
              emissive={secondaryColor}
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Expressive Eyes */}
          <mesh position={[-0.2, 0.15, 0.55]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#080808" />
          </mesh>
          <mesh position={[0.2, 0.15, 0.55]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#080808" />
          </mesh>

          {/* Friendly Smile Arc */}
          <mesh position={[0, -0.1, 0.58]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
            <meshBasicMaterial color="#080808" />
          </mesh>
        </group>
      )}

      {variant === 'cosmic-traveller' && (
        /* Ori: Cosmic Traveller - Icosahedron + Floating Particles */
        <group>
          <mesh ref={headRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[0.7, 2]} />
            <meshStandardMaterial
              color={primaryColor}
              roughness={0.1}
              metalness={0.4}
              wireframe={false}
              emissive={secondaryColor}
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Outer Orbiting Ring */}
          <mesh ref={ringRef} position={[0, 0, 0]}>
            <torusGeometry args={[0.95, 0.03, 16, 64]} />
            <meshStandardMaterial
              color={secondaryColor}
              emissive={secondaryColor}
              emissiveIntensity={0.6}
            />
          </mesh>

          {/* Eyes */}
          <mesh position={[-0.22, 0.1, 0.6]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.22, 0.1, 0.6]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      )}

      {variant === 'cafe-spirit' && (
        /* Sage: Café Spirit - Translucent Torus Knot */
        <group>
          <mesh ref={headRef} position={[0, 0, 0]}>
            <torusKnotGeometry args={[0.5, 0.18, 64, 16]} />
            <meshPhysicalMaterial
              color={primaryColor}
              roughness={0.1}
              transmission={0.6}
              thickness={0.5}
              roughnessMap={null}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive={secondaryColor}
              emissiveIntensity={0.25}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};
