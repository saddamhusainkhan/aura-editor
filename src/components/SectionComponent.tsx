import React, { useState, useRef } from 'react';
import { GripVertical, Trash2, Settings } from 'lucide-react';

interface SectionComponentProps {
  id: string;
  index: number;
  customProps: {
    height?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
    opacity: number;
    title?: string;
    [key: string]: string | number | undefined;
  };
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
  onDelete?: (componentId: string) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  children?: React.ReactNode;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  id,
  index,
  customProps,
  isSelected,
  isDragging,
  onSelect,
  onMouseDown,
  onDelete,
  onReorder,
  children,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    onMouseDown(e, id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId !== id && onReorder) {
      // Find the dragged component's index and reorder
      // This will be handled by the parent layout component
      onReorder(parseInt(draggedId), index);
    }
  };

  const baseClasses = `relative cursor-pointer select-none transition-all ${
    isSelected
      ? 'ring-2 ring-blue-500 ring-offset-2'
      : 'hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-600'
  }`;

  const sectionStyles = {
    minHeight: customProps.height || 120,
    padding: customProps.padding || 20,
    backgroundColor: customProps.backgroundColor || '#f8fafc',
    borderColor: customProps.borderColor || '#e2e8f0',
    borderWidth: customProps.borderWidth || 1,
    borderRadius: customProps.borderRadius || 6,
    opacity: customProps.opacity / 100,
  };

  return (
    <div
      ref={sectionRef}
      className={`${baseClasses} ${
        isDragOver ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600' : ''
      }`}
      style={{
        border: `${sectionStyles.borderWidth}px solid ${sectionStyles.borderColor}`,
        borderRadius: `${sectionStyles.borderRadius}px`,
        backgroundColor: sectionStyles.backgroundColor,
        padding: `${sectionStyles.padding}px`,
        minHeight: `${sectionStyles.minHeight}px`,
        opacity: sectionStyles.opacity,
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {/* Section Header */}
      <div className='flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-600'>
        <div className='flex items-center gap-2'>
          <GripVertical 
            className='w-4 h-4 text-slate-500 dark:text-slate-400 cursor-grab hover:text-slate-700 dark:hover:text-slate-300' 
          />
          <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
            {customProps.title || `Section ${index + 1}`}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <button
            className='p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'
            title='Section settings'
          >
            <Settings className='w-3 h-3' />
          </button>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className='p-1 rounded hover:bg-red-100 dark:hover:bg-red-700 text-red-500 dark:text-red-400'
              title='Delete section'
            >
              <Trash2 className='w-3 h-3' />
            </button>
          )}
        </div>
      </div>

      {/* Section Content */}
      <div className='min-h-[60px] bg-white dark:bg-slate-800 rounded border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center'>
        <div className='text-center text-slate-500 dark:text-slate-400'>
          <p className='text-sm'>Drop content here</p>
          <p className='text-xs mt-1'>Text, images, buttons, etc.</p>
        </div>
      </div>
    </div>
  );
};

export default SectionComponent; 