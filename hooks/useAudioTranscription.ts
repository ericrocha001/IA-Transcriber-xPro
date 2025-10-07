
import { useState, useCallback } from 'react';
import type { TranscriptionStatus } from '../types';
import { fileToBase64 } from '../utils/fileUtils';
import { getTranscription } from '../services/geminiService';

export const useAudioTranscription = () => {
  const [status, setStatus] = useState<TranscriptionStatus>('idle');
  const [transcription, setTranscription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const transcribeAudio = useCallback(async (file: File) => {
    setStatus('processing');
    setTranscription(null);
    setError(null);

    try {
      const { base64, mimeType } = await fileToBase64(file);
      if (!mimeType.startsWith('audio/')) {
        throw new Error("Tipo de arquivo inválido. Por favor, selecione um arquivo de áudio.");
      }
      
      const result = await getTranscription(base64, mimeType);
      setTranscription(result);
      setStatus('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
      setError(errorMessage);
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setTranscription(null);
    setError(null);
  }, []);

  return { status, transcription, error, transcribeAudio, reset };
};
