import React, { useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HistoryInfoProps {
  historySize: number;
  maxSize: number;
  canUndo: boolean;
  canRedo: boolean;
  lastAction: string | null;
}

const HistoryInfo: React.FC<HistoryInfoProps> = ({
  historySize,
  maxSize,
  canUndo,
  canRedo,
  lastAction,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
        onClick={() => setIsOpen(!isOpen)}
        title="History information"
      >
        <Info className="h-3 w-3" />
      </Button>

      {isOpen && (
        <div 
          ref={tooltipRef}
          className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3 z-10"
        >
          <div className="text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">History Stack:</span>
              <span className="font-medium">{historySize}/{maxSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Can Undo:</span>
              <span className={`font-medium ${canUndo ? 'text-green-600' : 'text-slate-400'}`}>
                {canUndo ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Can Redo:</span>
              <span className={`font-medium ${canRedo ? 'text-green-600' : 'text-slate-400'}`}>
                {canRedo ? 'Yes' : 'No'}
              </span>
            </div>
            {lastAction && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="text-slate-600 dark:text-slate-400">Last Action:</div>
                <div className="font-medium text-slate-800 dark:text-slate-200 truncate">
                  {lastAction}
                </div>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-500">
              <div>Ctrl/Cmd + Z: Undo</div>
              <div>Ctrl/Cmd + Shift + Z: Redo</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryInfo; 