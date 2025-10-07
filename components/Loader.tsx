import React from 'react';

interface LoaderProps {
  message: string;
  progress: number;
}

const Loader: React.FC<LoaderProps> = ({ message, progress }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 p-4 w-full max-w-md">
      <svg
        className="animate-spin h-12 w-12 text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
       <p className="text-xl font-bold text-gray-900">{Math.round(progress)}%</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-gray-800 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
};

export default Loader;