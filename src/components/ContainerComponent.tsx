import React from 'react';
import { Container } from 'lucide-react';

interface ContainerComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    width?: number;
    height?: number;
    maxWidth?: number;
    padding?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
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

const ContainerComponent: React.FC<ContainerComponentProps> = ({
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
    width: customProps.width || 400,
    height: customProps.height || 300,
    maxWidth: customProps.maxWidth || 'none',
    padding: customProps.padding || 16,
    backgroundColor: customProps.backgroundColor || 'transparent',
    borderColor: customProps.borderColor || '#e2e8f0',
    borderWidth: customProps.borderWidth || 1,
    borderRadius: customProps.borderRadius || 8,
  };

  const containerStyles = {
    width: '100%',
    height: '100%',
    maxWidth: inlineStyles.maxWidth,
    padding: `${inlineStyles.padding}px`,
    backgroundColor: inlineStyles.backgroundColor,
    border: `${inlineStyles.borderWidth}px solid ${inlineStyles.borderColor}`,
    borderRadius: `${inlineStyles.borderRadius}px`,
    position: 'relative' as const,
    overflow: 'hidden',
  };

  return (
    <div
      className={`${baseClasses} ${cursorClass}`}
      style={inlineStyles}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div style={containerStyles}>
        {/* Container Header */}
        <div className='flex items-center justify-between mb-2 pb-2 border-b border-slate-200 dark:border-slate-600'>
          <div className='flex items-center gap-2'>
            <Container className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
            <span className='text-xs font-medium text-slate-700 dark:text-slate-300'>
              Container
            </span>
          </div>
          <div className='text-xs text-slate-500 dark:text-slate-400'>
            {inlineStyles.width} × {inlineStyles.height}
          </div>
        </div>

        {/* Container Content Area */}
        <div className='w-full h-full min-h-[200px] bg-slate-50 dark:bg-slate-700/20 rounded border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center'>
          <div className='text-center text-slate-500 dark:text-slate-400'>
            <Container className='w-8 h-8 mx-auto mb-2 opacity-50' />
            <p className='text-xs'>Drop components here</p>
          </div>
        </div>

        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className='absolute top-2 right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 hover:opacity-100'
            title='Delete container'
          >
            <span className='text-xs'>×</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ContainerComponent;
