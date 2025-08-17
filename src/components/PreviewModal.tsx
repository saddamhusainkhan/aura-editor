import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    textAlign?: string;
    src?: string;
    alt?: string;
    objectFit?: string;
    borderRadius?: number;
    height?: number;
    width?: number;
    url?: string;
    padding?: number;
    backgroundColor?: string;
    textColor?: string;
    [key: string]: string | number | undefined;
  };
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasComponents: CanvasComponent[];
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  canvasComponents,
}) => {
  if (!isOpen) return null;

  const generateHTML = (): string => {
    if (canvasComponents.length === 0) {
      return '<div style="padding: 40px; text-align: center; color: #666; font-family: Arial, sans-serif;">No components to preview</div>';
    }

    const htmlParts = canvasComponents.map((component) => {
      const baseStyles = `
        position: absolute;
        left: ${component.position.x}px;
        top: ${component.position.y}px;
        opacity: ${component.props.opacity / 100};
      `;

      switch (component.type) {
        case 'text':
          return `<div style="${baseStyles} font-size: ${
            component.props.fontSize || 16
          }px; font-weight: ${component.props.fontWeight || 'normal'}; color: ${
            component.props.color
          };">
            ${component.props.text || 'Default Text'}
          </div>`;

        case 'textarea':
          return `<textarea style="${baseStyles} font-size: ${
            component.props.fontSize || 14
          }px; color: ${component.props.color}; text-align: ${
            component.props.textAlign || 'left'
          }; border: 1px solid #ccc; padding: 8px; resize: none; background: white;" readonly>
            ${component.props.text || ''}
          </textarea>`;

        case 'image':
          if (component.props.src) {
            return `<img src="${component.props.src}" alt="${
              component.props.alt || 'Image'
            }" style="${baseStyles} width: ${
              component.props.width || 120
            }px; height: ${component.props.height || 120}px; border-radius: ${
              component.props.borderRadius || 0
            }px; object-fit: ${
              component.props.objectFit || 'cover'
            }; border: 1px solid #ccc;" />`;
          } else {
            return `<div style="${baseStyles} width: ${
              component.props.width || 120
            }px; height: ${component.props.height || 120}px; border-radius: ${
              component.props.borderRadius || 0
            }px; background: #f1f5f9; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 24px;">
              🖼️
            </div>`;
          }

        case 'button':
          const buttonStyles = `
            ${baseStyles}
            font-size: ${component.props.fontSize || 14}px;
            padding: ${component.props.padding || 8}px;
            background-color: ${component.props.backgroundColor || '#3b82f6'};
            color: ${component.props.textColor || '#ffffff'};
            border-radius: ${component.props.borderRadius || 6}px;
            border: none;
            cursor: pointer;
            font-weight: 500;
            transition: opacity 0.2s;
          `;

          const buttonContent = `<button style="${buttonStyles}">${
            component.props.text || 'Button'
          }</button>`;

          if (component.props.url) {
            return `<a href="${component.props.url}" target="_blank" rel="noopener noreferrer">${buttonContent}</a>`;
          } else {
            return buttonContent;
          }

        default:
          return `<div style="${baseStyles} padding: 8px 12px; background: white; border: 1px solid #ccc; border-radius: 4px; color: #666; font-size: 14px;">
            ${component.type}
          </div>`;
      }
    });

    return `
      <div style="position: relative; width: 800px; height: 600px; margin: 0 auto; background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        ${htmlParts.join('\n        ')}
      </div>
    `;
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700'>
          <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
            Preview
          </h2>
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            className='h-8 w-8 p-0'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-auto p-4'>
          <div className='bg-slate-50 dark:bg-slate-900 rounded-lg p-4 min-h-[400px]'>
            <div className='mb-4 text-sm text-slate-600 dark:text-slate-400'>
              Preview of {canvasComponents.length} component
              {canvasComponents.length !== 1 ? 's' : ''}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: generateHTML() }}
              className='preview-content bg-white rounded-lg shadow-sm'
            />
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-3 p-4 border-t border-slate-200 dark:border-slate-700'>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
