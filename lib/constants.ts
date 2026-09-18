export const APP_NAME = 'TableCompanion';
export const APP_VERSION = '0.1.0';

export const MAX_RECORDING_DURATION_MS = 60_000; // 60 seconds
export const TARGET_RECORDING_DURATION_MS = 35_000; // 35 seconds suggested
export const CHARACTER_ENTRY_DELAY_MS = 1000;
export const CHARACTER_WAVE_DELAY_MS = 2500;
export const CHARACTER_SPEAK_DELAY_MS = 3500;
export const AMBIENT_FADE_IN_MS = 800;

export const CANVAS_WIDTH = 1080;
export const CANVAS_HEIGHT = 1920;
export const CANVAS_ASPECT = CANVAS_WIDTH / CANVAS_HEIGHT; // 9:16

export const SELFIE_PIP_WIDTH = 180;
export const SELFIE_PIP_HEIGHT = 240;
export const SELFIE_PIP_MARGIN = 20;
export const SELFIE_PIP_RADIUS = 20;

export const SUBTITLE_SAFE_BOTTOM_PX = 120;
export const BRAND_SAFE_TOP_PX = 60;

export const DEFAULT_CHARACTER_ID = 'char-coffee-companion';
export const DEFAULT_BRAND_SLUG = 'bluetokai';
export const DEFAULT_LOCATION_SLUG = 'mumbai-bkc';
export const DEFAULT_TABLE_NUMBER = 'T12';
export const DEFAULT_CAMPAIGN_SLUG = 'slowmornings';

export const ANALYTICS_KEY = 'cafe_ar_analytics';
export const SESSION_KEY = 'cafe_ar_session';

export const RECORDING_FRAMERATE = 30;
export const RECORDING_VIDEO_BITRATE = 4_000_000; // 4Mbps for 1080p
export const RECORDING_AUDIO_BITRATE = 128_000;

export const GRAIN_OPACITY = 0.04;
export const VIGNETTE_OPACITY = 0.4;

export const SPEECH_RATE = 0.85; // slightly slower than default for cinematic feel
export const SPEECH_PITCH = 1.05;
export const SPEECH_VOLUME = 1.0;

export const FRIENDLY_ERROR_MESSAGES: Record<string, { title: string; detail: string }> = {
  CAMERA_DENIED: {
    title: "We couldn't access your camera.",
    detail: "Your camera permission is needed to bring the character into your café.",
  },
  CAMERA_UNAVAILABLE: {
    title: "No camera found.",
    detail: "We couldn't detect a camera on your device.",
  },
  MICROPHONE_DENIED: {
    title: "Microphone unavailable.",
    detail: "The visual experience will still work — you just won't hear the character speak.",
  },
  BROWSER_UNSUPPORTED: {
    title: "Your browser doesn't support this experience.",
    detail: "Please try opening this link in Chrome or Safari.",
  },
  CAMERA_IN_USE: {
    title: "Your camera seems to be in use.",
    detail: "Close any other apps using the camera and try again.",
  },
  INSECURE_CONTEXT: {
    title: "Secure connection required.",
    detail: "Please open this link via HTTPS.",
  },
  RECORDING_FAILED: {
    title: "Recording ran into an issue.",
    detail: "Your device may not support video recording. Try a newer browser.",
  },
  UNKNOWN: {
    title: "Something didn't work as expected.",
    detail: "Please try again.",
  },
};
