import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './Icons';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTranscribe = () => {
    if (selectedFile && !disabled) {
      onFileSelect(selectedFile);
    }
  };
  
  const handleClearFile = () => {
    setSelectedFile(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }

  const dragDropClasses = isDragging
    ? 'border-gray-900 bg-gray-900/10'
    : 'border-gray-300 hover:border-gray-500 hover:bg-gray-200/50';

  return (
    <div className="w-full text-center">
      {!selectedFile ? (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleUploadClick}
          className={`w-full p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${dragDropClasses}`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="audio/*"
            disabled={disabled}
          />
          <div className="flex flex-col items-center justify-center gap-4 text-gray-500">
            <UploadIcon className="h-12 w-12" />
            <p className="text-lg font-semibold text-gray-900">Arraste e solte seu arquivo de áudio aqui</p>
            <p>ou</p>
            <button
              type="button"
              className="font-semibold text-gray-900 hover:text-gray-700 transition-colors underline"
            >
              Selecione um arquivo
            </button>
            <p className="text-xs mt-2">Formatos suportados: MP3, WAV, M4A, etc.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
            <p className="text-lg font-medium text-gray-800">Arquivo selecionado:</p>
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-center max-w-full">
                <span className="font-mono truncate block">{selectedFile.name}</span>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={handleTranscribe}
                    disabled={disabled}
                    className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg shadow-gray-500/20"
                >
                    Transcrever Áudio
                </button>
                <button
                    onClick={handleClearFile}
                    disabled={disabled}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    Trocar arquivo
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;