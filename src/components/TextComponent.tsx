import React from 'react';

interface TextComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    text?: string;
    color: string;
    opacity: number;
    fontSize?: number;
    fontWeight?: string;
  };
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
}

const TextComponent: React.FC<TextComponentProps> = ({
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
    color: customProps.color,
    opacity: customProps.opacity / 100,
    fontSize: customProps.fontSize || 16,
    fontWeight: customProps.fontWeight || 'normal',
  };

  return (
    <div
      className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
      style={inlineStyles}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <span className="text-sm font-medium">
        {customProps.text || 'Default Text'}
      </span>
    </div>
  );
};

export default TextComponent; 