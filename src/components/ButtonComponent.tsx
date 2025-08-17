import React from 'react';

interface ButtonComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    text?: string;
    url?: string;
    opacity: number;
    fontSize?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    backgroundColor?: string;
    textColor?: string;
    borderRadiusTop?: number;
    borderRadiusRight?: number;
    borderRadiusBottom?: number;
    borderRadiusLeft?: number;
    [key: string]: string | number | undefined;
  };
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
  zIndex: number;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  id,
  position,
  customProps,
  isSelected,
  isDragging,
  onSelect,
  onMouseDown,
  zIndex,
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
  };

  const buttonStyles = {
    fontSize: customProps.fontSize || 14,
    padding: `${customProps.paddingTop || 8}px ${
      customProps.paddingRight || 8
    }px ${customProps.paddingBottom || 8}px ${customProps.paddingLeft || 8}px`,
    backgroundColor: customProps.backgroundColor || '#3b82f6',
    color: customProps.textColor || '#ffffff',
    borderRadius: `${customProps.borderRadiusTop || 6}px ${
      customProps.borderRadiusRight || 6
    }px ${customProps.borderRadiusBottom || 6}px ${
      customProps.borderRadiusLeft || 6
    }px`,
  };

  const buttonContent = (
    <button
      className='text-sm font-medium transition-colors hover:opacity-80'
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
