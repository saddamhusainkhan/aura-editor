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

export const generateHTMLString = (
  canvasComponents: CanvasComponent[]
): string => {
  if (canvasComponents.length === 0) {
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
            width: 800px;
            height: 600px;
            margin: 0 auto;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
        }
        .no-components {
            padding: 40px;
            text-align: center;
            color: #666;
        }
        @media (max-width: 1024px) {
            body {
                padding: 15px;
            }
            .canvas-container {
                width: 100%;
                max-width: 768px;
                height: 550px;
            }
        }
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            .canvas-container {
                width: 100%;
                max-width: 375px;
                height: 500px;
            }
        }
        @media (max-width: 480px) {
            .canvas-container {
                height: 400px;
            }
        }
    </style>
</head>
<body>
    <div class="canvas-container">
        <div class="no-components">No components to display</div>
    </div>
</body>
</html>`;
  }

  const generateComponentHTML = (component: CanvasComponent): string => {
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
        return `<textarea style="${baseStyles} font-size: ${
          component.props.fontSize || 14
        }px; font-weight: ${
          component.props.fontWeight || 'normal'
        }; font-style: ${
          component.props.fontStyle || 'normal'
        }; text-decoration: ${
          component.props.textDecoration || 'none'
        }; color: ${component.props.color}; text-align: ${
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
          }px; background: #f1f5f9; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #64748b;">
            IMG
        </div>`;
        }

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
            Column ({gridSpan}/12 = ${gridWidth.toFixed(1)}%)
          </div>
        </div>`;

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
  };

  const componentsHTML = canvasComponents
    .map(generateComponentHTML)
    .join('\n        ');

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
            width: 800px;
            height: 600px;
            margin: 0 auto;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
        }
        @media (max-width: 1024px) {
            body {
                padding: 15px;
            }
            .canvas-container {
                width: 100%;
                max-width: 768px;
                height: 550px;
            }
        }
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            .canvas-container {
                width: 100%;
                max-width: 375px;
                height: 500px;
            }
        }
        @media (max-width: 480px) {
            .canvas-container {
                height: 400px;
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

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};
