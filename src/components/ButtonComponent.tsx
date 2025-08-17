import React from 'react';

interface ButtonComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    text?: string;
    url?: string;
    fontSize?: number;
    padding?: number;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    opacity: number;
  };
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  id,
  position,
  customProps,
  isSelected,
  isDragging,
  onSelect,
  onMouseDown,
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
  };

  const buttonStyles = {
    fontSize: customProps.fontSize || 14,
    padding: customProps.padding || 8,
    backgroundColor: customProps.backgroundColor || '#3b82f6',
    color: customProps.textColor || '#ffffff',
    borderRadius: customProps.borderRadius || 6,
  };

  const buttonContent = (
    <button
      className='px-4 py-2 rounded text-sm font-medium transition-colors hover:opacity-80'
      style={buttonStyles}
    >
      {customProps.text || 'Button'}
    </button>
  );

  return (
    <div
      className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
      style={inlineStyles}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {customProps.url ? (
        <a href={customProps.url} target='_blank' rel='noopener noreferrer'>
          {buttonContent}
        </a>
      ) : (
        buttonContent
      )}
    </div>
  );
};

export default ButtonComponent;
