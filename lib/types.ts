// ─────────────────────────────────────────────
// CORE DATA MODEL
// Designed for future Supabase / Postgres integration
// ─────────────────────────────────────────────

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  tagline?: string;
}

export interface Location {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  city: string;
  address?: string;
}

export interface Table {
  id: string;
  locationId: string;
  tableNumber: string;
  qrCode?: string;
  active: boolean;
}

export interface Campaign {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  startDate: string;
  endDate: string;
  theme: string;
  hashtag?: string;
  characterId?: string;
  active: boolean;
}

export interface Character {
  id: string;
  name: string;
  modelUrl?: string; // future GLB/GLTF path
  voiceId?: string;
  personality: string;
  animationSet: AnimationState[];
  colorPrimary: string;
  colorSecondary: string;
  description: string;
  variant: 'coffee-companion' | 'cosmic-traveller' | 'cafe-spirit';
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type DayCategory = 'weekday' | 'weekend' | 'monday' | 'friday' | 'any';

export interface Quote {
  id: string;
  text: string;
  lines: string[]; // split for subtitle rendering
  category: string;
  timeOfDay: TimeOfDay | 'any';
  dayCategory: DayCategory;
  characterId?: string;
  campaignId?: string;
  active: boolean;
}

export interface ExperienceSession {
  id: string;
  brandId: string;
  locationId: string;
  tableId: string;
  campaignId?: string;
  startedAt: Date;
  completedAt?: Date;
  recorded: boolean;
  shared: boolean;
  userNameOptional?: string;
  deviceCategory?: DeviceTier;
}

// ─────────────────────────────────────────────
// EXPERIENCE STATE MACHINE
// ─────────────────────────────────────────────

export type ExperiencePhase =
  | 'landing'
  | 'name-input'
  | 'permission'
  | 'loading'
  | 'experience'
  | 'recording'
  | 'preview'
  | 'error';

export type AnimationState =
  | 'idle'
  | 'walkIn'
  | 'wave'
  | 'lookAtCamera'
  | 'talk'
  | 'smile'
  | 'celebrate'
  | 'walkOut';

export interface ExperienceContextType {
  phase: ExperiencePhase;
  setPhase: (phase: ExperiencePhase) => void;
  userName: string;
  setUserName: (name: string) => void;
  session: Partial<ExperienceSession>;
  brand: Brand | null;
  location: Location | null;
  table: Table | null;
  campaign: Campaign | null;
  character: Character | null;
  quote: Quote | null;
  capabilities: DeviceCapabilities;
  recordingBlob: Blob | null;
  setRecordingBlob: (blob: Blob | null) => void;
  error: ExperienceError | null;
  setError: (error: ExperienceError | null) => void;
}

// ─────────────────────────────────────────────
// DEVICE & BROWSER CAPABILITIES
// ─────────────────────────────────────────────

export type DeviceTier = 'high' | 'mid' | 'low';

export interface DeviceCapabilities {
  isSecureContext: boolean;
  hasCamera: boolean;
  hasMicrophone: boolean;
  canSimultaneousCameras: boolean;
  supportedMimeType: string | null;
  canRecordCanvas: boolean;
  canShare: boolean;
  canSpeech: boolean;
  deviceTier: DeviceTier;
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  browser: string;
}

// ─────────────────────────────────────────────
// PERMISSION STATES
// ─────────────────────────────────────────────

export type PermissionState = 'unknown' | 'requesting' | 'granted' | 'denied' | 'unavailable';

export interface CameraPermissions {
  rear: PermissionState;
  front: PermissionState;
  microphone: PermissionState;
}

// ─────────────────────────────────────────────
// RECORDING
// ─────────────────────────────────────────────

export type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped' | 'error';

export interface RecordingState {
  status: RecordingStatus;
  duration: number; // seconds
  blob: Blob | null;
  mimeType: string | null;
  error: string | null;
}

// ─────────────────────────────────────────────
// ERRORS
// ─────────────────────────────────────────────

export type ErrorCode =
  | 'CAMERA_DENIED'
  | 'CAMERA_UNAVAILABLE'
  | 'MICROPHONE_DENIED'
  | 'BROWSER_UNSUPPORTED'
  | 'CAMERA_IN_USE'
  | 'INSECURE_CONTEXT'
  | 'RECORDING_FAILED'
  | 'UNKNOWN';

export interface ExperienceError {
  code: ErrorCode;
  userMessage: string;
  userDetail?: string;
  canRetry: boolean;
  canContinueWithout?: boolean;
}

// ─────────────────────────────────────────────
// ANALYTICS EVENTS
// ─────────────────────────────────────────────

export type AnalyticsEvent =
  | 'qr_scan'
  | 'experience_started'
  | 'camera_permission_accepted'
  | 'camera_permission_denied'
  | 'microphone_permission_accepted'
  | 'microphone_permission_denied'
  | 'name_entered'
  | 'name_skipped'
  | 'experience_completed'
  | 'recording_started'
  | 'recording_completed'
  | 'video_downloaded'
  | 'share_clicked'
  | 'share_completed'
  | 'replay_started'
  | 'fallback_used';

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  sessionId: string;
  brandId?: string;
  locationId?: string;
  tableId?: string;
  campaignId?: string;
  value?: number;
  meta?: Record<string, unknown>;
  timestamp: Date;
}

// ─────────────────────────────────────────────
// QR
// ─────────────────────────────────────────────

export interface QRTableConfig {
  brand: string;   // slug
  location: string; // slug
  table: string;   // table number
  campaign?: string;
  url: string;     // full QR URL
}

// ─────────────────────────────────────────────
// VOICE / SPEECH
// ─────────────────────────────────────────────

export interface VoiceConfig {
  provider: 'browser' | 'elevenlabs' | 'google' | 'azure';
  voiceId?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export interface SpeechResult {
  text: string;
  duration: number; // estimated ms
}
