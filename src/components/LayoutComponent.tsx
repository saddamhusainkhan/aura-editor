import React, { useState, useRef, useEffect } from 'react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

interface LayoutComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    width?: number;
    height?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
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

const LayoutComponent: React.FC<LayoutComponentProps> = ({
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
  const [isDraggingItem, setIsDraggingItem] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

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
    width: customProps.width || 800,
    height: customProps.height || 600,
    padding: customProps.padding || 20,
    backgroundColor: customProps.backgroundColor || '#ffffff',
    borderColor: customProps.borderColor || '#e2e8f0',
    borderWidth: customProps.borderWidth || 1,
    borderRadius: customProps.borderRadius || 8,
  };

  const layoutStyles = {
    width: '100%',
    height: '100%',
    padding: `${inlineStyles.padding}px`,
    backgroundColor: inlineStyles.backgroundColor,
    border: `${inlineStyles.borderWidth}px solid ${inlineStyles.borderColor}`,
    borderRadius: `${inlineStyles.borderRadius}px`,
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    overflow: 'hidden',
  };

  return (
    <div
      className={`${baseClasses} ${cursorClass}`}
      style={inlineStyles}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div style={layoutStyles}>
        {/* Layout Header */}
        <div className='flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-600'>
          <div className='flex items-center gap-2'>
            <GripVertical className='w-4 h-4 text-slate-500 dark:text-slate-400' />
            <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
              Website Layout
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <button
              className='p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'
              title='Add section'
            >
              <Plus className='w-4 h-4' />
            </button>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className='p-1 rounded hover:bg-red-100 dark:hover:bg-red-700 text-red-500 dark:text-red-400'
                title='Delete layout'
              >
                <Trash2 className='w-4 h-4' />
              </button>
            )}
          </div>
        </div>

        {/* Layout Content Area */}
        <div className='flex-1 bg-slate-50 dark:bg-slate-700/20 rounded border border-dashed border-slate-300 dark:border-slate-600 flex flex-col gap-4 p-4'>
          <div className='text-center text-slate-500 dark:text-slate-400'>
            <GripVertical className='w-8 h-8 mx-auto mb-2 opacity-50' />
            <p className='text-sm'>Drop components here to build your layout</p>
            <p className='text-xs mt-1'>Components will stack vertically and can be reordered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent; 