import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ErrorMessageProps {
  message: string;
  type?: 'warning' | 'error';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, type = 'error' }) => {
  const bgColor = type === 'warning' ? 'bg-yellow-50' : 'bg-red-50';
  const borderColor = type === 'warning' ? 'border-yellow-400' : 'border-red-400';
  const textColor = type === 'warning' ? 'text-yellow-700' : 'text-red-700';
  const iconColor = type === 'warning' ? 'text-yellow-400' : 'text-red-400';
  
  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 mb-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <FiAlertTriangle className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="ml-3">
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
