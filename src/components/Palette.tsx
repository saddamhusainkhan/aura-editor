import React from 'react';

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
    { type: 'text', name: 'Text', icon: 'T' },
    { type: 'textarea', name: 'TextArea', icon: 'TA' },
    { type: 'image', name: 'Image', icon: '🖼️' },
    { type: 'button', name: 'Button', icon: '🔘' },
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
                <div className='w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600'>
                  <span className='text-lg font-semibold text-slate-600 dark:text-slate-400'>
                    {component.icon}
                  </span>
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
