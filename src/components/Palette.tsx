import React from 'react';
import {
  Type,
  FileText,
  Image,
  Square,
  Container,
  Rows,
  Columns,
} from 'lucide-react';

interface PaletteProps {
  onComponentSelect?: (componentType: string) => void;
}

const Palette: React.FC<PaletteProps> = ({ onComponentSelect }) => {
  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleComponentClick = (componentType: string) => {
    if (onComponentSelect) {
      onComponentSelect(componentType);
    }
  };

  const components = [
    {
      type: 'text',
      name: 'Text',
      icon: Type,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      type: 'textarea',
      name: 'TextArea',
      icon: FileText,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      type: 'image',
      name: 'Image',
      icon: Image,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      type: 'button',
      name: 'Button',
      icon: Square,
      color: 'text-orange-600 dark:text-orange-400',
    },
    {
      type: 'container',
      name: 'Container',
      icon: Container,
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      type: 'row',
      name: 'Row',
      icon: Rows,
      color: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      type: 'column',
      name: 'Column',
      icon: Columns,
      color: 'text-pink-600 dark:text-pink-400',
    },
  ];

  return (
    <div className='w-full h-full bg-white dark:bg-slate-800 flex flex-col'>
      <div className='p-4 border-b border-slate-200 dark:border-slate-700'>
        <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
          Component Palette
        </h2>
        <p className='text-sm text-slate-600 dark:text-slate-400 mt-1'>
          Drag components to canvas
        </p>
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-3'>
        {components.map((component) => (
          <div key={component.type} className='group relative'>
            <div
              draggable={true}
              onDragStart={(e) => handleDragStart(e, component.type)}
              onClick={() => handleComponentClick(component.type)}
              className='p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-grab active:cursor-grabbing transition-all hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700'
            >
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md ${
                    component.type === 'text'
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                      : component.type === 'textarea'
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30'
                      : component.type === 'image'
                      ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                      : component.type === 'button'
                      ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                      : component.type === 'container'
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                      : component.type === 'row'
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-900/30'
                      : 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-700 hover:bg-pink-100 dark:hover:bg-pink-900/30'
                  }`}
                >
                  {React.createElement(component.icon, {
                    className: `w-5 h-5 ${component.color}`,
                  })}
                </div>
                <div className='flex-1'>
                  <div className='font-medium text-slate-900 dark:text-slate-100'>
                    {component.name}
                  </div>
                  <div className='text-xs text-slate-500 dark:text-slate-400'>
                    {component.type}
                  </div>
                </div>
                <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
                  <div className='w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full'></div>
                </div>
              </div>
            </div>

            {/* Drag indicator */}
            <div className='absolute inset-0 pointer-events-none'>
              <div className='absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'></div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className='p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50'>
        <div className='text-xs text-slate-600 dark:text-slate-400 text-center'>
          <div className='flex items-center justify-center space-x-2 mb-2'>
            <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
            <span>Drag to canvas</span>
          </div>
          <div className='text-slate-500 dark:text-slate-500'>
            Click to select properties
          </div>
        </div>
      </div>
    </div>
  );
};

export default Palette;
