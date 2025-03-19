import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const getHeightClass = () => {
    switch (size) {
      case 'small': return 'h-32';
      case 'large': return 'h-96';
      default: return 'h-64';
    }
  };

  return (
    <div className={`flex justify-center items-center ${getHeightClass()}`}>
      <div className="animate-pulse flex space-x-2">
        <div className="h-2.5 w-2.5 bg-blue-600 rounded-full"></div>
        <div className="h-2.5 w-2.5 bg-blue-600 rounded-full"></div>
        <div className="h-2.5 w-2.5 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
