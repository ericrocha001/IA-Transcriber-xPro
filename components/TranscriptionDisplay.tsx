import React, { useState } from 'react';
import { CopyIcon, CheckIcon, RedoIcon } from './Icons';

interface TranscriptionDisplayProps {
  transcription: string;
  onReset: () => void;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ transcription, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">Sua Transcrição está Pronta</h2>
      <div className="w-full relative bg-white border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          aria-label="Copiar texto"
        >
          {copied ? (
            <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <CopyIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed pr-10">
          {transcription}
        </p>
      </div>
      <button
        onClick={onReset}
        className="mt-6 flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg shadow-gray-500/20"
      >
        <RedoIcon className="h-5 w-5" />
        Transcrever Outro Áudio
      </button>
    </div>
  );
};

export default TranscriptionDisplay;