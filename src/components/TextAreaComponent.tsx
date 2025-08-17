import React from 'react';

interface TextAreaComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    text?: string;
    color: string;
    opacity: number;
    fontSize?: number;
    textAlign?: string;
  };
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
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

  const textareaStyles = {
    color: customProps.color,
    fontSize: customProps.fontSize || 14,
    textAlign: (customProps.textAlign as 'left' | 'center' | 'right') || 'left',
  };

  return (
    <div
      className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
      style={inlineStyles}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <textarea
        className="w-32 h-20 bg-slate-50 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 resize-none outline-none p-2"
        style={textareaStyles}
        value={customProps.text || ''}
        readOnly
        contentEditable={false}
        placeholder="TextArea content"
      />
    </div>
  );
};

export default TextAreaComponent; 