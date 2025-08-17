import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: 'text-red-500',
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
          border: 'border-red-200',
        };
      case 'warning':
        return {
          icon: 'text-yellow-500',
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
          border: 'border-yellow-200',
        };
      case 'info':
        return {
          icon: 'text-blue-500',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
          border: 'border-blue-200',
        };
      default:
        return {
          icon: 'text-red-500',
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
          border: 'border-red-200',
        };
    }
  };

  const styles = getVariantStyles();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4'>
        {/* Header */}
        <div className='flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700'>
          <AlertTriangle className={`h-5 w-5 ${styles.icon}`} />
          <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
            {title}
          </h3>
        </div>

        {/* Content */}
        <div className='p-4'>
          <p className='text-slate-600 dark:text-slate-400 mb-6'>{message}</p>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-3 p-4 border-t border-slate-200 dark:border-slate-700'>
          <Button variant='outline' onClick={onClose}>
            {cancelText}
          </Button>
          <Button className={styles.confirmButton} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
