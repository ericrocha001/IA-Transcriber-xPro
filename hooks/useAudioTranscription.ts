import { useState, useCallback, useRef } from 'react';
import type { TranscriptionStatus } from '../types';
import { fileToBase64 } from '../utils/fileUtils';
import { getTranscription } from '../services/geminiService';

export const useAudioTranscription = () => {
  const [status, setStatus] = useState<TranscriptionStatus>('idle');
  const [transcription, setTranscription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const clearProgressInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const transcribeAudio = useCallback(async (file: File) => {
    setStatus('processing');
    setTranscription(null);
    setError(null);
    setProgress(0);
    clearProgressInterval();

    intervalRef.current = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearProgressInterval();
          return 95;
        }
        return prev + 5;
      });
    }, 500);

    try {
      const { base64, mimeType } = await fileToBase64(file);
      if (!mimeType.startsWith('audio/')) {
        throw new Error("Tipo de arquivo inválido. Por favor, selecione um arquivo de áudio.");
      }
      
      const result = await getTranscription(base64, mimeType);
      clearProgressInterval();
      setProgress(100);
      setTranscription(result);
      setStatus('success');
    } catch (err) {
      clearProgressInterval();
      setProgress(0);
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(errorMessage);
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setTranscription(null);
    setError(null);
    setProgress(0);
    clearProgressInterval();
  }, []);

  return { status, transcription, error, progress, transcribeAudio, reset };
};