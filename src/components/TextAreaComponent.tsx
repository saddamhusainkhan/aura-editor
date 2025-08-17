import React, { useState, useRef, useEffect } from 'react';

interface TextAreaComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    text?: string;
    color: string;
    opacity: number;
    fontSize?: number;
    textAlign?: string;
    [key: string]: string | number | undefined;
  };
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
  onTextChange?: (componentId: string, newText: string) => void;
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  id,
  position,
  customProps,
  isSelected,
  isDragging,
  onSelect,
  onMouseDown,
  onTextChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(customProps.text || '');
  const [showToolbar, setShowToolbar] = useState(false);
  const textareaRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Update edit text when customProps.text changes
  useEffect(() => {
    setEditText(customProps.text || '');
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
        textareaRef.current?.focus();
        if (textareaRef.current) {
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(textareaRef.current);
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
    if (e.key === 'Escape') {
      setEditText(customProps.text || '');
      textareaRef.current?.blur();
    }
  };

  const execFormatCommand = (command: string, value?: string) => {
    if (textareaRef.current) {
      textareaRef.current.focus();
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

  const textareaStyles: React.CSSProperties = {
    color: customProps.color,
    fontSize: customProps.fontSize || 14,
    textAlign: (customProps.textAlign as 'left' | 'center' | 'right') || 'left',
    minHeight: '60px',
    minWidth: '120px',
    resize: 'both' as const,
    overflow: 'auto',
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
          ref={textareaRef}
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          className='outline-none border border-slate-200 dark:border-slate-600 rounded p-2 bg-white dark:bg-slate-900'
          style={textareaStyles}
          onInput={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        >
          {isEditing ? editText : customProps.text || ''}
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
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M12.6 11.8c1.1-1.1 1.8-2.6 1.8-4.2 0-3.3-2.7-6-6-6H4v16h6.4c1.8 0 3.4-.7 4.6-1.8 1.2-1.1 1.9-2.6 1.9-4.2 0-1.6-.7-3.1-1.8-4.2h-2.5zM6 4h4.4c1.1 0 2 .9 2 2s-.9 2-2 2H6V4zm6.4 12H6v-4h6.4c1.1 0 2 .9 2 2s-.9 2-2 2z' />
            </svg>
          </button>
          <button
            onClick={() => handleFormatClick('italic')}
            className='p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors'
            title='Italic (Ctrl+I)'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M8 3a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 00-1 1v8a1 1 0 001 1h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 01-1-1V6a1 1 0 011-1h1V3z' />
            </svg>
          </button>
          <button
            onClick={() => handleFormatClick('underline')}
            className='p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors'
            title='Underline (Ctrl+U)'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M3 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 00-1-1H4a1 1 0 01-1-1V4z' />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default TextAreaComponent;
