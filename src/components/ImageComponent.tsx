import React from 'react';

interface ImageComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: {
    src?: string;
    alt?: string;
    objectFit?: string;
    borderRadius?: number;
    height?: number;
    width?: number;
    opacity: number;
  };
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
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

  const imageStyles = {
    width: customProps.width || 120,
    height: customProps.height || 120,
    borderRadius: customProps.borderRadius || 0,
    objectFit:
      (customProps.objectFit as
        | 'cover'
        | 'contain'
        | 'fill'
        | 'none'
        | 'scale-down') || 'cover',
  };

  return (
    <div
      className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
      style={inlineStyles}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {customProps.src ? (
        <img
          src={customProps.src}
          alt={customProps.alt || 'Image'}
          style={imageStyles}
          className='border border-slate-200 dark:border-slate-600'
        />
      ) : (
        <div
          className='bg-slate-100 dark:bg-slate-600 border border-slate-200 dark:border-slate-500 flex items-center justify-center'
          style={imageStyles}
        >
          <span className='text-2xl'>🖼️</span>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
