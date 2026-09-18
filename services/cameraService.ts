import { ExperienceError, ErrorCode } from '@/lib/types';
import { FRIENDLY_ERROR_MESSAGES } from '@/lib/constants';
import { isMobile } from '@/lib/browserCapabilities';

function makeError(code: ErrorCode, canContinueWithout = false): ExperienceError {
  const msg = FRIENDLY_ERROR_MESSAGES[code] ?? FRIENDLY_ERROR_MESSAGES.UNKNOWN;
  return {
    code,
    userMessage: msg.title,
    userDetail: msg.detail,
    canRetry: code !== 'BROWSER_UNSUPPORTED' && code !== 'INSECURE_CONTEXT',
    canContinueWithout,
  };
}

function domErrorToCode(err: unknown): ErrorCode {
  if (!(err instanceof Error)) return 'UNKNOWN';
  const name = (err as DOMException).name ?? err.message;
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') return 'CAMERA_DENIED';
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') return 'CAMERA_UNAVAILABLE';
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') return 'CAMERA_IN_USE';
  if (name === 'OverconstrainedError') return 'CAMERA_UNAVAILABLE';
  if (name === 'SecurityError') return 'INSECURE_CONTEXT';
  return 'UNKNOWN';
}

export interface CameraStreams {
  rear: MediaStream | null;
  front: MediaStream | null;
}

export async function getCameraCount(): Promise<number> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) return 1;
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(d => d.kind === 'videoinput').length;
  } catch {
    return 1;
  }
}

/**
 * Request the main camera.
 * Returns the stream or throws an ExperienceError.
 */
export async function requestRearCamera(): Promise<MediaStream> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
    throw makeError('BROWSER_UNSUPPORTED');
  }

  // Stage 1: Try environment (rear) camera
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    });
    return stream;
  } catch (err1) {
    console.warn('[CameraService] Rear camera request failed, trying fallback constraints:', err1);
  }

  // Stage 2: Fallback to default video device (e.g. webcam)
  try {
    const fallbackStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    return fallbackStream;
  } catch (err2) {
    console.error('[CameraService] All camera requests failed:', err2);
    throw makeError(domErrorToCode(err2));
  }
}

/**
 * Request the front (selfie) camera.
 * Only attempts if device has > 1 camera and is mobile, preventing AbortError/hardware lockups.
 */
export async function requestFrontCamera(): Promise<MediaStream | null> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices) return null;

  // Attempt to get front camera even on desktop or single-camera devices.
  // The try/catch below will handle failures gracefully.

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'user' } },
      audio: false,
    });
    return stream;
  } catch (err) {
    console.warn('[CameraService] Secondary front camera unavailable, using PIP avatar fallback:', err);
    return null; // Silent fallback
  }
}

/**
 * Request microphone access.
 */
export async function requestMicrophone(): Promise<MediaStream | null> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices) return null;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true },
      video: false,
    });
    return stream;
  } catch {
    return null;
  }
}

/**
 * Stop all tracks in a MediaStream.
 */
export function releaseStream(stream: MediaStream | null): void {
  if (!stream) return;
  try {
    stream.getTracks().forEach(t => {
      t.stop();
      stream.removeTrack(t);
    });
  } catch (e) {
    console.warn('[CameraService] Error releasing stream:', e);
  }
}

/**
 * Attach a MediaStream to a video element.
 */
export function attachStreamToVideo(
  stream: MediaStream,
  video: HTMLVideoElement,
  muted = true
): void {
  if (video.srcObject !== stream) {
    video.srcObject = stream;
  }
  video.muted = muted;
  video.playsInline = true;
  video.autoplay = true;
  video.play().catch(() => {});
}
