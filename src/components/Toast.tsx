import React, { useEffect } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className='h-4 w-4 text-green-500' />;
      case 'error':
        return <AlertCircle className='h-4 w-4 text-red-500' />;
      case 'info':
        return <AlertCircle className='h-4 w-4 text-blue-500' />;
      default:
        return null;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-900/20 dark:border-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className='fixed top-14 right-4 z-50 animate-in slide-in-from-right-2 duration-300'>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${getStyles()}`}
      >
        {getIcon()}
        <span className='text-sm font-medium'>{message}</span>
        <button
          onClick={onClose}
          className='ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};

export default Toast;
