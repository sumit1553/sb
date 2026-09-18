'use client';

import { useCallback, useRef, useState } from 'react';
import { voiceService, WordCallback } from '@/services/audioService';

export interface SpeechLine {
  text: string;
  active: boolean;
}

export interface UseSpeechReturn {
  isSpeaking: boolean;
  currentWord: string;
  currentLineIndex: number;
  speak: (lines: string[]) => Promise<void>;
  stop: () => void;
}

export function useSpeech(): UseSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const abortRef = useRef(false);

  const speak = useCallback(async (lines: string[]) => {
    abortRef.current = false;
    setIsSpeaking(true);
    setCurrentLineIndex(-1);
    setCurrentWord('');

    // Speak each line sequentially so we can track which subtitle line is active
    for (let i = 0; i < lines.length; i++) {
      if (abortRef.current) break;

      setCurrentLineIndex(i);
      setCurrentWord('');

      const onWord: WordCallback = (word) => {
        setCurrentWord(word);
      };

      try {
        await voiceService.speak(lines[i], onWord);
      } catch {
        // Continue even if a line fails
      }

      // Small pause between lines
      if (!abortRef.current && i < lines.length - 1) {
        await new Promise(r => setTimeout(r, 300));
      }
    }

    if (!abortRef.current) {
      setIsSpeaking(false);
      setCurrentLineIndex(-1);
      setCurrentWord('');
    }
  }, []);

  const stop = useCallback(() => {
    abortRef.current = true;
    voiceService.stop();
    setIsSpeaking(false);
    setCurrentLineIndex(-1);
    setCurrentWord('');
  }, []);

  return { isSpeaking, currentWord, currentLineIndex, speak, stop };
}
