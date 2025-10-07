import React from 'react';
import { useAudioTranscription } from './hooks/useAudioTranscription';
import FileUpload from './components/FileUpload';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { MicIcon } from './components/Icons';

const App: React.FC = () => {
  const { status, transcription, error, progress, transcribeAudio, reset } = useAudioTranscription();

  const handleFileSelect = (file: File) => {
    transcribeAudio(file);
  };
  
  const handleReset = () => {
    reset();
  };

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return <Loader message="Transcrevendo seu áudio... Isso pode levar alguns minutos para arquivos longos." progress={progress} />;
      case 'success':
        return <TranscriptionDisplay transcription={transcription!} onReset={handleReset} />;
      case 'error':
        return <ErrorMessage message={error!} onReset={handleReset} />;
      case 'idle':
      default:
        return <FileUpload onFileSelect={handleFileSelect} disabled={status === 'processing'} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-gray-800 p-3 rounded-full">
              <MicIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
              Transcrição de Áudio
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Potencializado por IA para transcrever seus arquivos de áudio com precisão e rapidez.
          </p>
        </header>
        
        <main className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8 min-h-[300px] flex items-center justify-center transition-all duration-300">
          {renderContent()}
        </main>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Transcrição de Áudio com IA. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;