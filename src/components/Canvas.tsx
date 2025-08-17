import React, { useState, useRef, useEffect } from 'react';

interface CanvasComponent {
  id: string;
  type: string;
  position: { x: number; y: number };
  props: {
    text?: string;
    color: string;
    opacity: number;
    fontSize?: number;
    fontWeight?: string;
    [key: string]: string | number | undefined;
  };
}

interface CanvasProps {
  selectedComponent: CanvasComponent | null;
  canvasComponents: CanvasComponent[];
  onComponentDrop?: (componentType: string, x: number, y: number) => void;
  onComponentSelect?: (componentId: string) => void;
  onComponentMove?: (
    componentId: string,
    newPosition: { x: number; y: number }
  ) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  selectedComponent,
  canvasComponents,
  onComponentDrop,
  onComponentSelect,
  onComponentMove,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle mouse down on component
  const handleMouseDown = (e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();

    // Only allow dragging if component is selected
    if (selectedComponent?.id !== componentId) {
      onComponentSelect && onComponentSelect(componentId);
      return;
    }

    const component = canvasComponents.find((comp) => comp.id === componentId);
    if (!component) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - rect.left - component.position.x,
      y: e.clientY - rect.top - component.position.y,
    });

    // Prevent text selection during drag
    e.preventDefault();
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !selectedComponent || !onComponentMove) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    // Constrain to canvas bounds
    const constrainedX = Math.max(0, Math.min(newX, rect.width - 100));
    const constrainedY = Math.max(0, Math.min(newY, rect.height - 100));

    onComponentMove(selectedComponent.id, { x: constrainedX, y: constrainedY });
  };

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Set up document-level event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, selectedComponent, dragOffset]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    if (componentType && onComponentDrop) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onComponentDrop(componentType, x, y);
    }
  };

  const handleComponentClick = (e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();
    if (onComponentSelect) {
      onComponentSelect(componentId);
    }
  };

  const renderComponent = (component: CanvasComponent) => {
    const isSelected = selectedComponent?.id === component.id;
    const baseClasses = `absolute cursor-pointer select-none transition-all ${
      isSelected
        ? 'ring-2 ring-blue-500 ring-offset-2'
        : 'hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-600'
    }`;

    // Add dragging cursor when component is being dragged
    const cursorClass =
      isDragging && isSelected ? 'cursor-grabbing' : 'cursor-grab';

    switch (component.type) {
      case 'text':
        return (
          <div
            key={component.id}
            className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
            style={{
              left: component.position.x,
              top: component.position.y,
              color: component.props.color,
              opacity: component.props.opacity / 100,
              fontSize: component.props.fontSize || 16,
              fontWeight: component.props.fontWeight || 'normal',
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            onClick={(e) => handleComponentClick(e, component.id)}
          >
            <span className='text-sm font-medium'>
              {component.props.text || 'Default Text'}
            </span>
          </div>
        );

      case 'textarea':
        return (
          <div
            key={component.id}
            className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
            style={{
              left: component.position.x,
              top: component.position.y,
              color: component.props.color,
              opacity: component.props.opacity / 100,
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            onClick={(e) => handleComponentClick(e, component.id)}
          >
            <div className='w-32 h-20 bg-slate-50 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 flex items-center justify-center'>
              <span className='text-xs text-slate-500 dark:text-slate-400'>
                TextArea
              </span>
            </div>
          </div>
        );

      case 'image':
        return (
          <div
            key={component.id}
            className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
            style={{
              left: component.position.x,
              top: component.position.y,
              opacity: component.props.opacity / 100,
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            onClick={(e) => handleComponentClick(e, component.id)}
          >
            <div className='w-24 h-24 bg-slate-100 dark:bg-slate-600 rounded border border-slate-200 dark:border-slate-500 flex items-center justify-center'>
              <span className='text-2xl'>🖼️</span>
            </div>
          </div>
        );

      case 'button':
        return (
          <div
            key={component.id}
            className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
            style={{
              left: component.position.x,
              top: component.position.y,
              opacity: component.props.opacity / 100,
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            onClick={(e) => handleComponentClick(e, component.id)}
          >
            <button
              className='px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors'
              style={{
                backgroundColor: component.props.color,
              }}
            >
              Button
            </button>
          </div>
        );

      default:
        return (
          <div
            key={component.id}
            className={`${baseClasses} ${cursorClass} px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
            style={{
              left: component.position.x,
              top: component.position.y,
              opacity: component.props.opacity / 100,
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
            onClick={(e) => handleComponentClick(e, component.id)}
          >
            <span className='text-sm text-slate-600 dark:text-slate-400'>
              {component.type}
            </span>
          </div>
        );
    }
  };

  return (
    <div className='w-full h-full bg-slate-100 dark:bg-slate-900 relative'>
      <div className='absolute inset-0 p-4'>
        <div
          ref={canvasRef}
          className='w-full h-full bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 relative overflow-hidden'
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => {
            if (onComponentSelect) {
              onComponentSelect('');
            }
          }} // Deselect when clicking canvas
        >
          {/* Drop zone indicator */}
          <div className='absolute top-4 left-4 text-xs text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 z-10'>
            Drop Zone
          </div>

          {/* Canvas content */}
          {canvasComponents.length === 0 ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center'>
                <div className='text-6xl text-slate-300 dark:text-slate-600 mb-4'>
                  🎨
                </div>
                <h3 className='text-xl font-medium text-slate-600 dark:text-slate-400 mb-2'>
                  Canvas Area
                </h3>
                <p className='text-slate-500 dark:text-slate-500'>
                  {selectedComponent
                    ? `Selected: ${selectedComponent.type}`
                    : 'Drag components from palette or select to edit properties'}
                </p>
              </div>
            </div>
          ) : (
            <div className='relative w-full h-full'>
              {canvasComponents.map(renderComponent)}
            </div>
          )}

          {/* Drag instruction overlay */}
          {isDragging && (
            <div className='absolute inset-0 pointer-events-none flex items-center justify-center'>
              <div className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg'>
                <span className='text-sm font-medium'>
                  Dragging component...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
