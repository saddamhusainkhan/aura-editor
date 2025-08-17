import React from 'react';
import { Rows } from 'lucide-react';

interface RowComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    width?: number;
    height?: number;
    padding?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    gap?: number;
    justifyContent?: string;
    alignItems?: string;
    opacity: number;
    [key: string]: string | number | undefined;
  };
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
  onDelete?: (componentId: string) => void;
  zIndex: number;
  children?: React.ReactNode;
}

const RowComponent: React.FC<RowComponentProps> = ({
  id,
  position,
  customProps,
  isSelected,
  isDragging,
  onSelect,
  onMouseDown,
  onDelete,
  zIndex,
  children,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    onMouseDown(e, id);
  };

  const baseClasses = `absolute cursor-pointer select-none transition-all ${
    isSelected
      ? 'ring-2 ring-blue-500 ring-offset-2'
      : 'hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-600'
  }`;

  const cursorClass = isDragging ? 'cursor-grabbing' : 'cursor-grab';

  const inlineStyles = {
    left: position.x,
    top: position.y,
    opacity: customProps.opacity / 100,
    zIndex: zIndex,
    width: customProps.width || 600,
    height: customProps.height || 100,
    padding: customProps.padding || 16,
    backgroundColor: customProps.backgroundColor || 'transparent',
    borderColor: customProps.borderColor || '#e2e8f0',
    borderWidth: customProps.borderWidth || 1,
    borderRadius: customProps.borderRadius || 6,
    gap: customProps.gap || 16,
    justifyContent: customProps.justifyContent || 'flex-start',
    alignItems: customProps.alignItems || 'center',
  };

  const rowStyles = {
    width: '100%',
    height: '100%',
    padding: `${inlineStyles.padding}px`,
    backgroundColor: inlineStyles.backgroundColor,
    border: `${inlineStyles.borderWidth}px solid ${inlineStyles.borderColor}`,
    borderRadius: `${inlineStyles.borderRadius}px`,
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'row' as const,
    gap: `${inlineStyles.gap}px`,
    justifyContent: inlineStyles.justifyContent as any,
    alignItems: inlineStyles.alignItems as any,
    overflow: 'hidden',
  };

  return (
    <div
      className={`${baseClasses} ${cursorClass}`}
      style={inlineStyles}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div style={rowStyles}>
        {/* Row Header */}
        <div className='absolute top-0 left-0 right-0 flex items-center justify-between px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 border-b border-cyan-200 dark:border-cyan-700 rounded-t'>
          <div className='flex items-center gap-2'>
            <Rows className='w-3 h-3 text-cyan-600 dark:text-cyan-400' />
            <span className='text-xs font-medium text-slate-700 dark:text-slate-300'>
              Row
            </span>
          </div>
          <div className='text-xs text-slate-500 dark:text-slate-400'>
            {inlineStyles.width} × {inlineStyles.height}
          </div>
        </div>

        {/* Row Content Area */}
        <div className='w-full h-full min-h-[60px] bg-cyan-50 dark:bg-cyan-700/10 rounded border border-dashed border-cyan-300 dark:border-cyan-600 flex items-center justify-center mt-6'>
          <div className='text-center text-cyan-500 dark:text-cyan-400'>
            <Rows className='w-6 h-6 mx-auto mb-1 opacity-50' />
            <p className='text-xs'>Drop columns here</p>
          </div>
        </div>

        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className='absolute top-1 right-1 w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 hover:opacity-100'
            title='Delete row'
          >
            <span className='text-xs'>×</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default RowComponent; 