import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, X } from 'lucide-react';

interface TextComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    text?: string;
    color: string;
    opacity: number;
    fontSize?: number;
    fontWeight?: string;
    [key: string]: string | number | undefined;
  };
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
  onTextChange?: (componentId: string, newText: string) => void;
  onDelete?: (componentId: string) => void;
}

const TextComponent: React.FC<TextComponentProps> = ({
  id,
  position,
  customProps,
  isSelected,
  isDragging,
  onSelect,
  onMouseDown,
  onTextChange,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(customProps.text || 'Default Text');
  const [showToolbar, setShowToolbar] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Update edit text when customProps.text changes
  useEffect(() => {
    setEditText(customProps.text || 'Default Text');
  }, [customProps.text]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    onMouseDown(e, id);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected && onTextChange) {
      setIsEditing(true);
      setShowToolbar(true);
      setTimeout(() => {
        textRef.current?.focus();
        if (textRef.current) {
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(textRef.current);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 0);
    }
  };

  const handleTextChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.textContent || '';
    setEditText(newText);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setShowToolbar(false);
    if (onTextChange && editText !== customProps.text) {
      onTextChange(id, editText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      textRef.current?.blur();
    } else if (e.key === 'Escape') {
      setEditText(customProps.text || 'Default Text');
      textRef.current?.blur();
    }
  };

  const execFormatCommand = (command: string, value?: string) => {
    if (textRef.current) {
      textRef.current.focus();
      document.execCommand(command, false, value);
    }
  };

  const handleFormatClick = (format: string) => {
    switch (format) {
      case 'bold':
        execFormatCommand('bold');
        break;
      case 'italic':
        execFormatCommand('italic');
        break;
      case 'underline':
        execFormatCommand('underline');
        break;
    }
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

  const textStyles = {
    color: customProps.color,
    fontSize: customProps.fontSize || 16,
    fontWeight: customProps.fontWeight || 'normal',
  };

  return (
    <>
      <div
        className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
        style={inlineStyles}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <div
          ref={textRef}
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          className='outline-none min-w-[100px]'
          style={textStyles}
          onInput={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        >
          {isEditing ? editText : customProps.text || 'Default Text'}
        </div>
      </div>

      {/* Inline Toolbar */}
      {showToolbar && isEditing && (
        <div
          ref={toolbarRef}
          className='absolute z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-2 flex gap-1'
          style={{
            left: position.x + 3,
            top: position.y - 40,
          }}
        >
          <button
            onClick={() => handleFormatClick('bold')}
            className='p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors'
            title='Bold (Ctrl+B)'
          >
            <Bold className='h-4 w-4' />
          </button>
          <button
            onClick={() => handleFormatClick('italic')}
            className='p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors'
            title='Italic (Ctrl+I)'
          >
            <Italic className='h-4 w-4' />
          </button>
          <button
            onClick={() => handleFormatClick('underline')}
            className='p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors'
            title='Underline (Ctrl+U)'
          >
            <Underline className='h-4 w-4' />
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className='p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-700 text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100 transition-colors'
              title='Delete'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default TextComponent;
