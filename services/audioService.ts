import { VoiceConfig } from '@/lib/types';
import { SPEECH_RATE, SPEECH_PITCH, SPEECH_VOLUME } from '@/lib/constants';

export type WordCallback = (word: string, charIndex: number, elapsed: number) => void;

/**
 * VoiceService — abstraction layer for TTS providers.
 * MVP uses Web Speech API (SpeechSynthesis).
 * Future: swap speak() for ElevenLabs / Google TTS / Azure TTS.
 */
export class VoiceService {
  private config: VoiceConfig;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor(config: VoiceConfig = { provider: 'browser' }) {
    this.config = config;
  }

  /**
   * Speak text. Returns a promise that resolves when speech ends.
   * onWord fires with each spoken word boundary (best-effort — not all browsers support this).
   */
  speak(text: string, onWord?: WordCallback): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        // Fallback: resolve after estimated duration
        const estimatedMs = text.split(' ').length * 400;
        setTimeout(resolve, estimatedMs);
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.rate = this.config.rate ?? SPEECH_RATE;
      this.utterance.pitch = this.config.pitch ?? SPEECH_PITCH;
      this.utterance.volume = this.config.volume ?? SPEECH_VOLUME;
      this.utterance.lang = this.config.lang ?? 'en-US';

      // Pick the best available voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v =>
        v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Samantha'))
      ) ?? voices.find(v => v.lang.startsWith('en')) ?? voices[0];
      if (preferred) this.utterance.voice = preferred;

      const startTime = Date.now();

      this.utterance.onboundary = (e: SpeechSynthesisEvent) => {
        if (e.name === 'word' && onWord) {
          const word = text.substring(e.charIndex, e.charIndex + (e.charLength ?? 1));
          onWord(word, e.charIndex, Date.now() - startTime);
        }
      };

      this.utterance.onend = () => resolve();
      this.utterance.onerror = (e) => {
        // Interrupted errors are expected when navigating away
        if (e.error === 'interrupted' || e.error === 'canceled') {
          resolve();
        } else {
          reject(e);
        }
      };

      // iOS Safari requires voices to be loaded first
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.speak(this.utterance!);
        };
      } else {
        window.speechSynthesis.speak(this.utterance);
      }
    });
  }

  stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Estimate speech duration in ms (before synthesis starts).
   * Useful for pre-calculating subtitle timing.
   */
  estimateDuration(text: string): number {
    const wordsPerMinute = 130 * (this.config.rate ?? SPEECH_RATE);
    const words = text.split(/\s+/).length;
    return (words / wordsPerMinute) * 60_000;
  }
}

export const voiceService = new VoiceService({ provider: 'browser' });
