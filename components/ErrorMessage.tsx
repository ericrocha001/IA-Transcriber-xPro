import React from 'react';
import { AlertTriangleIcon, RedoIcon } from './Icons';

interface ErrorMessageProps {
  message: string;
  onReset: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onReset }) => {
  return (
    <div className="w-full flex flex-col items-center text-center bg-red-100 border border-red-300 rounded-lg p-6">
      <AlertTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-red-800 mb-2">Ocorreu um Erro</h3>
      <p className="text-red-700 mb-6">{message}</p>
      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        <RedoIcon className="h-5 w-5" />
        Tentar Novamente
      </button>
    </div>
  );
};

export default ErrorMessage;