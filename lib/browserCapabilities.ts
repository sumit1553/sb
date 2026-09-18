// ─────────────────────────────────────────────
// BROWSER CAPABILITY DETECTION
// ─────────────────────────────────────────────

import { DeviceCapabilities, DeviceTier } from './types';

export function isSecureContext(): boolean {
  if (typeof window === 'undefined') return false;
  return window.isSecureContext || location.protocol === 'https:' || location.hostname === 'localhost';
}

export function hasMediaDevices(): boolean {
  if (typeof navigator === 'undefined') return false;
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

export function canUseSpeechSynthesis(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

export function canUseMediaRecorder(): boolean {
  if (typeof window === 'undefined') return false;
  return 'MediaRecorder' in window;
}

export function canCaptureStream(canvas?: HTMLCanvasElement): boolean {
  if (typeof window === 'undefined') return false;
  const testCanvas = canvas ?? document.createElement('canvas');
  return typeof testCanvas.captureStream === 'function';
}

export function canUseWebShare(): boolean {
  if (typeof navigator === 'undefined') return false;
  return 'share' in navigator;
}

export function canShareFiles(): boolean {
  if (typeof navigator === 'undefined') return false;
  return 'share' in navigator && 'canShare' in navigator;
}

export function getSupportedMimeType(): string | null {
  if (!canUseMediaRecorder()) return null;

  const types = [
    'video/mp4;codecs=avc1',
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/webm',
  ];

  for (const type of types) {
    try {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    } catch {
      // Some browsers throw on isTypeSupported
      continue;
    }
  }
  return null;
}

export function detectBrowser(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'safari';
  if (/Chrome/i.test(ua)) return 'chrome';
  if (/Firefox/i.test(ua)) return 'firefox';
  if (/Edge/i.test(ua)) return 'edge';
  if (/SamsungBrowser/i.test(ua)) return 'samsung';
  return 'unknown';
}

export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
}

export function isAndroid(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
}

export function isMobile(): boolean {
  return isIOS() || isAndroid() || /Mobi/i.test(navigator?.userAgent ?? '');
}

export function detectDeviceTier(): DeviceTier {
  if (typeof navigator === 'undefined') return 'mid';

  // Hardware concurrency as a rough proxy
  const cores = navigator.hardwareConcurrency ?? 4;
  // Memory (Chrome only)
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  if (cores >= 8 && memory >= 8) return 'high';
  if (cores >= 4 && memory >= 4) return 'mid';
  return 'low';
}

/**
 * iOS Safari cannot simultaneously use front and rear cameras.
 * This is a hardware/OS-level limitation, not a bug.
 */
export function canSimultaneousCameras(): boolean {
  // iOS Safari: always false
  if (isIOS()) return false;
  // On Android, most devices support it but some older ones don't
  // We'll attempt it and fall back gracefully
  return !isIOS();
}

export async function detectFullCapabilities(): Promise<DeviceCapabilities> {
  let hasCamera = false;
  let hasMicrophone = false;

  if (hasMediaDevices()) {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      hasCamera = devices.some(d => d.kind === 'videoinput');
      hasMicrophone = devices.some(d => d.kind === 'audioinput');
    } catch {
      // enumerateDevices requires permission on some browsers
      hasCamera = hasMediaDevices();
      hasMicrophone = hasMediaDevices();
    }
  }

  return {
    isSecureContext: isSecureContext(),
    hasCamera,
    hasMicrophone,
    canSimultaneousCameras: canSimultaneousCameras(),
    supportedMimeType: getSupportedMimeType(),
    canRecordCanvas: canCaptureStream() && canUseMediaRecorder(),
    canShare: canUseWebShare(),
    canSpeech: canUseSpeechSynthesis(),
    deviceTier: detectDeviceTier(),
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    isMobile: isMobile(),
    browser: detectBrowser(),
  };
}
