import {
  RECORDING_FRAMERATE,
  RECORDING_VIDEO_BITRATE,
  RECORDING_AUDIO_BITRATE,
  MAX_RECORDING_DURATION_MS,
} from '@/lib/constants';

export type RecorderEventHandler = (event: 'started' | 'stopped' | 'error', data?: unknown) => void;

export interface RecordingOptions {
  compositingCanvas: HTMLCanvasElement;
  audioStream?: MediaStream | null;
  mimeType?: string;
  onEvent?: RecorderEventHandler;
}

export class ExperienceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: BlobPart[] = [];
  private mimeType: string = 'video/webm';
  private startTime: number = 0;
  private stopTimer: ReturnType<typeof setTimeout> | null = null;
  private onEvent?: RecorderEventHandler;

  async initialize(options: RecordingOptions): Promise<void> {
    const { compositingCanvas, audioStream, mimeType, onEvent } = options;
    this.onEvent = onEvent;
    this.chunks = [];

    // 1. Capture the canvas as a video stream
    const videoStream = compositingCanvas.captureStream(RECORDING_FRAMERATE);

    // 2. Merge audio if available
    let combinedStream: MediaStream;
    if (audioStream) {
      const audioCtx = new AudioContext();
      const dest = audioCtx.createMediaStreamDestination();
      const src = audioCtx.createMediaStreamSource(audioStream);
      src.connect(dest);
      combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...dest.stream.getAudioTracks(),
      ]);
    } else {
      combinedStream = videoStream;
    }

    // 3. Detect best supported MIME type
    this.mimeType = mimeType ?? this.detectMimeType();

    // 4. Create MediaRecorder
    const recorderOptions: MediaRecorderOptions = {
      mimeType: this.mimeType,
      videoBitsPerSecond: RECORDING_VIDEO_BITRATE,
      audioBitsPerSecond: RECORDING_AUDIO_BITRATE,
    };

    try {
      this.mediaRecorder = new MediaRecorder(combinedStream, recorderOptions);
    } catch {
      // Try without options if browser rejects them
      this.mediaRecorder = new MediaRecorder(combinedStream);
      this.mimeType = this.mediaRecorder.mimeType;
    }

    this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };

    this.mediaRecorder.onerror = () => {
      this.onEvent?.('error');
    };
  }

  start(): void {
    if (!this.mediaRecorder || this.mediaRecorder.state !== 'inactive') return;
    this.chunks = [];
    this.startTime = Date.now();
    this.mediaRecorder.start(100); // collect data every 100ms
    this.onEvent?.('started');

    // Auto-stop at max duration
    this.stopTimer = setTimeout(() => this.stop(), MAX_RECORDING_DURATION_MS);
  }

  stop(): void {
    if (this.stopTimer) clearTimeout(this.stopTimer);
    if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') return;
    this.mediaRecorder.stop();
    this.onEvent?.('stopped');
  }

  pause(): void {
    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.pause();
    }
  }

  resume(): void {
    if (this.mediaRecorder?.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }

  getBlob(): Promise<Blob> {
    return new Promise(resolve => {
      if (!this.mediaRecorder) {
        resolve(new Blob([], { type: this.mimeType }));
        return;
      }
      const finish = () => {
        const blob = new Blob(this.chunks, { type: this.mimeType });
        resolve(blob);
      };
      if (this.mediaRecorder.state === 'inactive') {
        finish();
      } else {
        this.mediaRecorder.addEventListener('stop', finish, { once: true });
        this.stop();
      }
    });
  }

  getDuration(): number {
    if (!this.startTime) return 0;
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  getMimeType(): string {
    return this.mimeType;
  }

  getState(): string {
    return this.mediaRecorder?.state ?? 'inactive';
  }

  destroy(): void {
    this.stop();
    this.mediaRecorder = null;
    this.chunks = [];
    if (this.stopTimer) clearTimeout(this.stopTimer);
  }

  private detectMimeType(): string {
    const types = [
      'video/mp4;codecs=avc1',
      'video/mp4',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
    ];
    for (const type of types) {
      try {
        if (MediaRecorder.isTypeSupported(type)) return type;
      } catch {
        continue;
      }
    }
    return 'video/webm';
  }
}

/**
 * Singleton instance for convenience.
 * Components can use this directly or instantiate their own.
 */
export const globalRecorder = new ExperienceRecorder();
