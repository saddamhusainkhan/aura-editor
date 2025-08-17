import React, { useState, useRef, useEffect } from 'react';
import { X, Palette, Target, Move } from 'lucide-react';
import TextComponent from './TextComponent';
import TextAreaComponent from './TextAreaComponent';
import ImageComponent from './ImageComponent';
import ButtonComponent from './ButtonComponent';
import ContainerComponent from './ContainerComponent';
import RowComponent from './RowComponent';
import ColumnComponent from './ColumnComponent';

interface CanvasComponent {
  id: string;
  type: string;
  position: { x: number; y: number };
  zIndex: number;
  props: {
    text?: string;
    color: string;
    opacity: number;
    fontSize?: number;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    textAlign?: string;
    src?: string;
    alt?: string;
    objectFit?: string;
    borderRadius?: number;
    borderRadiusTop?: number;
    borderRadiusRight?: number;
    borderRadiusBottom?: number;
    borderRadiusLeft?: number;
    height?: number;
    width?: number;
    url?: string;
    padding?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    backgroundColor?: string;
    textColor?: string;
    // Layout-specific properties
    maxWidth?: number;
    gridSpan?: number;
    gap?: number;
    justifyContent?: string;
    alignItems?: string;
    borderColor?: string;
    borderWidth?: number;
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
  onComponentUpdate?: (
    componentId: string,
    updates: Partial<CanvasComponent['props']>
  ) => void;
  onComponentDelete?: (componentId: string) => void;
  onComponentMoveWithoutHistory?: (
    componentId: string,
    newPosition: { x: number; y: number }
  ) => void;
  onZIndexUpdate?: (componentId: string, newZIndex: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  selectedComponent,
  canvasComponents,
  onComponentDrop,
  onComponentSelect,
  onComponentMove,
  onComponentUpdate,
  onComponentDelete,
  onComponentMoveWithoutHistory,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle mouse down on component
  const handleMouseDown = (e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();

    // Only allow dragging if component is selected
    if (selectedComponent?.id !== componentId) {
      if (onComponentSelect) {
        onComponentSelect(componentId);
      }
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
    // Store initial position to track if component actually moved
    setInitialPosition({ x: component.position.x, y: component.position.y });

    // Prevent text selection during drag
    e.preventDefault();
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !selectedComponent || !onComponentMoveWithoutHistory)
      return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    // Constrain to canvas bounds
    const constrainedX = Math.max(0, Math.min(newX, rect.width - 100));
    const constrainedY = Math.max(0, Math.min(newY, rect.height - 100));

    // Update position without history during drag
    onComponentMoveWithoutHistory(selectedComponent.id, {
      x: constrainedX,
      y: constrainedY,
    });
  };

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    if (isDragging && selectedComponent) {
      // Only add to history if the component actually moved
      const currentComponent = canvasComponents.find(
        (comp) => comp.id === selectedComponent.id
      );
      if (
        currentComponent &&
        (currentComponent.position.x !== initialPosition.x ||
          currentComponent.position.y !== initialPosition.y)
      ) {
        // Component moved, trigger history update
        if (onComponentMove) {
          onComponentMove(selectedComponent.id, currentComponent.position);
        }
      }
    }
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

  // Handle keyboard events for delete functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedComponent && onComponentDelete) {
        e.preventDefault();
        onComponentDelete(selectedComponent.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent, onComponentDelete]);

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

    const handleComponentSelect = (componentId: string) => {
      handleComponentClick({} as React.MouseEvent, componentId);
    };

    const handleComponentMouseDown = (
      e: React.MouseEvent,
      componentId: string
    ) => {
      handleMouseDown(e, componentId);
    };

    const handleDeleteClick = (e: React.MouseEvent, componentId: string) => {
      e.stopPropagation();
      if (onComponentDelete) {
        onComponentDelete(componentId);
      }
    };

    const componentContent = (() => {
      switch (component.type) {
        case 'text':
          return (
            <TextComponent
              key={component.id}
              id={component.id}
              position={component.position}
              customProps={component.props}
              isSelected={isSelected}
              isDragging={isDragging && isSelected}
              onSelect={handleComponentSelect}
              onMouseDown={handleComponentMouseDown}
              onTextChange={(componentId, newText) => {
                if (onComponentUpdate) {
                  onComponentUpdate(componentId, { text: newText });
                }
              }}
              onStyleChange={(componentId, styles) => {
                if (onComponentUpdate) {
                  onComponentUpdate(componentId, styles);
                }
              }}
              onDelete={onComponentDelete}
              zIndex={component.zIndex}
            />
          );

        case 'textarea':
          return (
            <TextAreaComponent
              key={component.id}
              id={component.id}
              position={component.position}
              customProps={component.props}
              isSelected={isSelected}
              isDragging={isDragging && isSelected}
              onSelect={handleComponentSelect}
              onMouseDown={handleComponentMouseDown}
              onTextChange={(componentId, newText) => {
                if (onComponentUpdate) {
                  onComponentUpdate(componentId, { text: newText });
                }
              }}
              onStyleChange={(componentId, styles) => {
                if (onComponentUpdate) {
                  onComponentUpdate(componentId, styles);
                }
              }}
              onDelete={onComponentDelete}
              zIndex={component.zIndex}
            />
          );

        case 'image':
          return (
            <ImageComponent
              key={component.id}
              id={component.id}
              position={component.position}
              customProps={component.props}
              isSelected={isSelected}
              isDragging={isDragging && isSelected}
              onSelect={handleComponentSelect}
              onMouseDown={handleComponentMouseDown}
              zIndex={component.zIndex}
            />
          );

        case 'button':
          return (
            <ButtonComponent
              key={component.id}
              id={component.id}
              position={component.position}
              customProps={component.props}
              isSelected={isSelected}
              isDragging={isDragging && isSelected}
              onSelect={handleComponentSelect}
              onMouseDown={handleComponentMouseDown}
              zIndex={component.zIndex}
            />
          );

        case 'container':
          return (
            <ContainerComponent
              key={component.id}
              id={component.id}
              position={component.position}
              customProps={component.props}
              isSelected={isSelected}
              isDragging={isDragging && isSelected}
              onSelect={handleComponentSelect}
              onMouseDown={handleComponentMouseDown}
              zIndex={component.zIndex}
            />
          );

        case 'row':
          return (
            <RowComponent
              key={component.id}
              id={component.id}
              position={component.position}
              customProps={component.props}
              isSelected={isSelected}
              isDragging={isDragging && isSelected}
              onSelect={handleComponentSelect}
              onMouseDown={handleComponentMouseDown}
              zIndex={component.zIndex}
            />
          );

        case 'column':
          return (
            <ColumnComponent
              key={component.id}
              id={component.id}
              position={component.position}
              customProps={component.props}
              isSelected={isSelected}
              isDragging={isDragging && isSelected}
              onSelect={handleComponentSelect}
              onMouseDown={handleComponentMouseDown}
              zIndex={component.zIndex}
            />
          );

        default:
          return (
            <div
              key={component.id}
              className={`absolute cursor-pointer select-none transition-all ${
                isSelected
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : 'hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-600'
              } ${
                isDragging && isSelected ? 'cursor-grabbing' : 'cursor-grab'
              } px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm`}
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
    })();

    return (
      <div key={component.id} className='relative'>
        {componentContent}
        {/* Delete Button - positioned at top-right of component */}
        <button
          onClick={(e) => handleDeleteClick(e, component.id)}
          className={`absolute z-10 w-5 h-5 cursor-pointer bg-red-500 hover:bg-red-600 z-200 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
            isSelected ? 'opacity-100' : 'opacity-0 hover:opacity-100'
          }`}
          style={{
            top: component.position.y - 12,
            left: component.position.x - 10,
          }}
          title='Delete component (or press Delete key)'
        >
          <X className='w-3 h-3' />
        </button>
      </div>
    );
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
          <div className='absolute top-4 left-4 text-xs text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 z-10 flex items-center gap-2'>
            <Target className='w-3 h-3' />
            Drop Zone
          </div>

          {/* Canvas content */}
          {canvasComponents.length === 0 ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center'>
                <div className='text-6xl text-slate-300 dark:text-slate-600 mb-4'>
                  <Palette className='w-24 h-24 mx-auto' />
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
              <div className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2'>
                <Move className='w-4 h-4' />
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
