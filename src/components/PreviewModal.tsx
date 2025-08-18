import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
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
    fontStyle?: string;
    textDecoration?: string;
    [key: string]: string | number | undefined;
  };
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasComponents: CanvasComponent[];
}

type PreviewMode = 'desktop' | 'tablet' | 'mobile';

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  canvasComponents,
}) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

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
        width: 100%;
      `;

      switch (component.type) {
        case 'text':
          return `<div style="${baseStyles} font-size: ${
            component.props.fontSize || 16
          }px; font-weight: ${
            component.props.fontWeight || 'normal'
          }; font-style: ${
            component.props.fontStyle || 'normal'
          }; text-decoration: ${
            component.props.textDecoration || 'none'
          }; color: ${component.props.color};">
            ${component.props.text || 'Default Text'}
          </div>`;

        case 'textarea':
          return `<div style="${baseStyles} font-size: ${
            component.props.fontSize || 14
          }px; font-weight: ${
            component.props.fontWeight || 'normal'
          }; font-style: ${
            component.props.fontStyle || 'normal'
          }; text-decoration: ${
            component.props.textDecoration || 'none'
          }; color: ${component.props.color}; text-align: ${
            component.props.textAlign || 'left'
          }; width: calc(100% - ${component.position.x}px); max-width: 100%;">
              <textarea style="width: 100%; min-height: 60px; border: none; outline: none; background: transparent; font-family: inherit; font-size: inherit; font-weight: inherit; color: inherit; text-align: inherit; resize: none; padding: 0;">
                ${component.props.text || 'Default TextArea Content'}
              </textarea>
            </div>`;

        case 'image':
          const imageJustifyContent =
            component.props.textAlign === 'center'
              ? 'center'
              : component.props.textAlign === 'right'
              ? 'flex-end'
              : 'flex-start';

          return `<div style="${baseStyles} display: flex; justify-content: ${imageJustifyContent};">
            <img src="${
              component.props.src ||
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0MEg4MFY4MEg0MFY0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
            }" alt="${component.props.alt || 'Image'}" style="width: ${
            component.props.width ? `${component.props.width}%` : '100%'
          }; height: ${component.props.height || 120}px; object-fit: ${
            component.props.objectFit || 'cover'
          }; border-radius: ${component.props.borderRadiusTop || 0}px ${
            component.props.borderRadiusRight || 0
          }px ${component.props.borderRadiusBottom || 0}px ${
            component.props.borderRadiusLeft || 0
          }px;" />
          </div>`;

        case 'container':
          return `<div style="${baseStyles} width: ${
            component.props.width || 400
          }px; height: ${component.props.height || 300}px; max-width: ${
            component.props.maxWidth || 1200
          }px; padding: ${component.props.padding || 16}px; background-color: ${
            component.props.backgroundColor || '#f8fafc'
          }; border: ${component.props.borderWidth || 1}px solid ${
            component.props.borderColor || '#e2e8f0'
          }; border-radius: ${
            component.props.borderRadius || 8
          }px; position: relative; overflow: hidden;">
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #64748b; font-size: 14px;">
              Container
            </div>
          </div>`;

        case 'row':
          return `<div style="${baseStyles} width: ${
            component.props.width || 600
          }px; height: ${component.props.height || 100}px; padding: ${
            component.props.padding || 16
          }px; background-color: ${
            component.props.backgroundColor || '#f0f9ff'
          }; border: ${component.props.borderWidth || 1}px solid ${
            component.props.borderColor || '#0ea5e9'
          }; border-radius: ${
            component.props.borderRadius || 6
          }px; display: flex; flex-direction: row; gap: ${
            component.props.gap || 16
          }px; justify-content: ${
            component.props.justifyContent || 'flex-start'
          }; align-items: ${
            component.props.alignItems || 'center'
          }; position: relative; overflow: hidden;">
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #0ea5e9; font-size: 14px;">
              Row
            </div>
          </div>`;

        case 'column':
          const gridSpan = component.props.gridSpan || 6;
          const gridWidth = (gridSpan / 12) * 100;
          return `<div style="${baseStyles} width: ${
            component.props.width || 200
          }px; height: ${component.props.height || 150}px; padding: ${
            component.props.padding || 16
          }px; background-color: ${
            component.props.backgroundColor || '#fdf2f8'
          }; border: ${component.props.borderWidth || 1}px solid ${
            component.props.borderColor || '#ec4899'
          }; border-radius: ${
            component.props.borderRadius || 6
          }px; display: flex; flex-direction: column; gap: ${
            component.props.gap || 16
          }px; justify-content: ${
            component.props.justifyContent || 'flex-start'
          }; align-items: ${
            component.props.alignItems || 'flex-start'
          }; position: relative; overflow: hidden;">
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ec4899; font-size: 14px;">
              Column ({gridSpan}/12 = {gridWidth.toFixed(1)}%)
            </div>
          </div>`;

        case 'layout':
          return `<div style="${baseStyles} width: ${
            component.props.width || 800
          }px; height: ${component.props.height || 600}px; padding: ${
            component.props.padding || 20
          }px; background-color: ${
            component.props.backgroundColor || '#ffffff'
          }; border: ${component.props.borderWidth || 1}px solid ${
            component.props.borderColor || '#e2e8f0'
          }; border-radius: ${
            component.props.borderRadius || 8
          }px; position: relative; display: flex; flex-direction: column; gap: 16px; overflow: hidden;">
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #64748b; font-size: 14px;">
              Website Layout
            </div>
          </div>`;

        case 'section':
          return `<section style="${baseStyles} min-height: ${
            component.props.height || 120
          }px; padding: ${component.props.padding || 20}px; background-color: ${
            component.props.backgroundColor || '#f8fafc'
          }; border: ${component.props.borderWidth || 1}px solid ${
            component.props.borderColor || '#e2e8f0'
          }; border-radius: ${
            component.props.borderRadius || 6
          }px; position: relative;">
            <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #374151;">
              {component.props.title || 'Section'}
            </h2>
            <div style="min-height: 60px; background: white; border: 1px dashed #cbd5e1; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 14px;">
              Section Content
            </div>
          </section>`;

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
            return `<a href="${component.props.url}" target='_blank' rel='noopener noreferrer'>${buttonContent}</a>`;
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
      <div style="position: relative; width: 100%; height: 600px; margin: 0 auto; background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        ${htmlParts.join('\n        ')}
      </div>
    `;
  };

  const generateFullHTML = (): string => {
    const componentsHTML = generateHTML();

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated HTML</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f8fafc;
        }
        .canvas-container {
            position: relative;
            width: 100%;
            height: 600px;
            margin: 0 auto;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
        }
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            .canvas-container {
                height: 500px;
            }
        }
    </style>
</head>
<body>
    <div class="canvas-container">
        ${componentsHTML}
    </div>
</body>
</html>`;
  };

  const getPreviewContainerStyles = (): React.CSSProperties => {
    switch (previewMode) {
      case 'mobile':
        return {
          width: '375px',
          height: '667px',
          margin: '0 auto',
          border: '2px solid #e2e8f0',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          position: 'relative',
        };
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          margin: '0 auto',
          border: '2px solid #e2e8f0',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
        };
      default: // desktop
        return {
          width: '100%',
          height: '600px',
          margin: '0 auto',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          overflow: 'hidden',
        };
    }
  };

  const getPreviewContentStyles = (): React.CSSProperties => {
    if (previewMode === 'mobile' || previewMode === 'tablet') {
      return {
        width: '100%',
        height: '100%',
        transform: 'scale(1)',
        transformOrigin: 'top left',
        overflow: 'auto',
      };
    }

    return {
      width: '100%',
      height: '100%',
    };
  };

  const getPreviewModeLabel = (): string => {
    switch (previewMode) {
      case 'desktop':
        return 'Desktop Preview';
      case 'tablet':
        return 'Tablet Preview (768px width)';
      case 'mobile':
        return 'Mobile Preview (375px width)';
      default:
        return 'Desktop Preview';
    }
  };

  const getPreviewModeInfo = (): string => {
    switch (previewMode) {
      case 'desktop':
        return 'Desktop view (full width)';
      case 'tablet':
        return 'Tablet view (768×1024px)';
      case 'mobile':
        return 'Mobile view (375×667px)';
      default:
        return 'Desktop view (full width)';
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700'>
          <div className='flex items-center gap-4'>
            <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
              Preview
            </h2>

            {/* Preview Mode Toggle */}
            <div className='flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1'>
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size='sm'
                onClick={() => setPreviewMode('desktop')}
                className='h-8 px-3 flex items-center gap-2'
              >
                <Monitor className='h-4 w-4' />
                Desktop
              </Button>
              <Button
                variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                size='sm'
                onClick={() => setPreviewMode('tablet')}
                className='h-8 px-3 flex items-center gap-2'
              >
                <Tablet className='h-4 w-4' />
                Tablet
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size='sm'
                onClick={() => setPreviewMode('mobile')}
                className='h-8 px-3 flex items-center gap-2'
              >
                <Smartphone className='h-4 w-4' />
                Mobile
              </Button>
            </div>
          </div>

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
              {getPreviewModeLabel()} - {canvasComponents.length} component
              {canvasComponents.length !== 1 ? 's' : ''}
            </div>

            <div
              className='preview-content bg-white rounded-lg shadow-sm'
              style={getPreviewContainerStyles()}
            >
              <div
                dangerouslySetInnerHTML={{ __html: generateHTML() }}
                style={getPreviewContentStyles()}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700'>
          <div className='text-sm text-slate-600 dark:text-slate-400'>
            {getPreviewModeInfo()}
          </div>
          <div className='flex items-center gap-3'>
            <Button variant='outline' onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
