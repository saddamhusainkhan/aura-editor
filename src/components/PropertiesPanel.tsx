import React from 'react';
import { HexColorPicker } from 'react-colorful';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    width?: number;
    height?: number;
    objectFit?: string;
    url?: string;
    padding?: number;
    borderRadius?: number;
    [key: string]: any;
  };
}

interface PropertiesPanelProps {
  selectedComponent: CanvasComponent | null;
  canvasComponents: CanvasComponent[];
  onComponentUpdate: (
    componentId: string,
    updates: Partial<CanvasComponent['props']>
  ) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedComponent,
  canvasComponents,
  onComponentUpdate,
}) => {
  const handleTextChange = (newText: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { text: newText });
    }
  };

  const handleColorChange = (newColor: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { color: newColor });
    }
  };

  const handleOpacityChange = (value: number | number[]) => {
    if (selectedComponent) {
      const opacityValue = Array.isArray(value) ? value[0] : value;
      onComponentUpdate(selectedComponent.id, { opacity: opacityValue });
    }
  };

  const handleFontSizeChange = (value: number | number[]) => {
    if (selectedComponent) {
      const fontSizeValue = Array.isArray(value) ? value[0] : value;
      onComponentUpdate(selectedComponent.id, { fontSize: fontSizeValue });
    }
  };

  const handleFontSizeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedComponent) {
      const fontSizeValue = parseInt(e.target.value) || 16;
      onComponentUpdate(selectedComponent.id, { fontSize: fontSizeValue });
    }
  };

  const handleFontWeightChange = (newWeight: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { fontWeight: newWeight });
    }
  };

  const handleTextAlignChange = (align: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { textAlign: align });
    }
  };

  const handleImageSrcChange = (newSrc: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { src: newSrc });
    }
  };

  const handleImageAltChange = (newAlt: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { alt: newAlt });
    }
  };

  const handleImageWidthChange = (newWidth: number) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { width: newWidth });
    }
  };

  const handleImageHeightChange = (newHeight: number) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { height: newHeight });
    }
  };

  const handleImageObjectFitChange = (newFit: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { objectFit: newFit });
    }
  };

  const handleButtonTextChange = (newText: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { text: newText });
    }
  };

  const handleButtonUrlChange = (newUrl: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { url: newUrl });
    }
  };

  const handleButtonFontSizeChange = (newFontSize: number) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { fontSize: newFontSize });
    }
  };

  const handleButtonPaddingChange = (newPadding: number) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { padding: newPadding });
    }
  };

  const handleButtonBorderRadiusChange = (newBorderRadius: number) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, {
        borderRadius: newBorderRadius,
      });
    }
  };

  const handleButtonBackgroundColorChange = (newColor: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { backgroundColor: newColor });
    }
  };

  const handleButtonTextColorChange = (newColor: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { textColor: newColor });
    }
  };

  const handleImageBorderRadiusChange = (newRadius: number) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { borderRadius: newRadius });
    }
  };

  const fontWeights = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: '100', label: 'Thin (100)' },
    { value: '200', label: 'Extra Light (200)' },
    { value: '300', label: 'Light (300)' },
    { value: '400', label: 'Regular (400)' },
    { value: '500', label: 'Medium (500)' },
    { value: '600', label: 'Semi Bold (600)' },
    { value: '700', label: 'Bold (700)' },
    { value: '800', label: 'Extra Bold (800)' },
    { value: '900', label: 'Black (900)' },
  ];

  if (!selectedComponent) {
    return (
      <div className='w-full h-full bg-white dark:bg-slate-800 flex flex-col'>
        <div className='p-4 border-b border-slate-200 dark:border-slate-700'>
          <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
            Properties
          </h2>
          <p className='text-sm text-slate-600 dark:text-slate-400 mt-1'>
            No component selected
          </p>
          {canvasComponents.length > 0 && (
            <p className='text-xs text-slate-500 dark:text-slate-500 mt-1'>
              {canvasComponents.length} component
              {canvasComponents.length !== 1 ? 's' : ''} on canvas
            </p>
          )}
        </div>

        <div className='flex-1 overflow-y-auto p-4'>
          <div className='text-center py-8'>
            <div className='text-4xl text-slate-300 dark:text-slate-600 mb-4'>
              📋
            </div>
            <h3 className='text-lg font-medium text-slate-600 dark:text-slate-400 mb-2'>
              No Component Selected
            </h3>
            <p className='text-sm text-slate-500 dark:text-slate-500'>
              Select a component from the canvas to view and edit its properties
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-full bg-white dark:bg-slate-800 flex flex-col'>
      <div className='p-4 border-b border-slate-200 dark:border-slate-700'>
        <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
          Properties
        </h2>
        <p className='text-sm text-slate-600 dark:text-slate-400 mt-1'>
          {`${
            selectedComponent.type.charAt(0).toUpperCase() +
            selectedComponent.type.slice(1)
          } Component`}
        </p>
        {canvasComponents.length > 0 && (
          <p className='text-xs text-slate-500 dark:text-slate-500 mt-1'>
            {canvasComponents.length} component
            {canvasComponents.length !== 1 ? 's' : ''} on canvas
          </p>
        )}
      </div>

      <div className='flex-1 overflow-y-auto p-4'>
        <div className='space-y-6'>
          {/* Component Type Info */}
          <Card className='shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm'>Component Info</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='text-xs text-slate-600 dark:text-slate-400'>
                <span className='font-medium'>Type:</span>{' '}
                {selectedComponent.type}
              </div>
              <div className='text-xs text-slate-600 dark:text-slate-400'>
                <span className='font-medium'>Position:</span> X:{' '}
                {Math.round(selectedComponent.position.x)}, Y:{' '}
                {Math.round(selectedComponent.position.y)}
              </div>
            </CardContent>
          </Card>

          {/* Text Input for Text Components */}
          {selectedComponent.type === 'text' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Text Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={selectedComponent.props.text || ''}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder='Enter text content'
                  className='text-sm h-8'
                />
              </CardContent>
            </Card>
          )}

          {/* Font Size Control for Text Components */}
          {selectedComponent.type === 'text' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Font Size</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='space-y-2'>
                  <div className='flex justify-between text-xs'>
                    <span>
                      Font Size: {selectedComponent.props.fontSize || 16}px
                    </span>
                  </div>
                  <Slider
                    min={8}
                    max={72}
                    value={selectedComponent.props.fontSize || 16}
                    onChange={handleFontSizeChange}
                    trackStyle={{ backgroundColor: '#3b82f6', height: 4 }}
                    handleStyle={{
                      borderColor: '#3b82f6',
                      height: 16,
                      width: 16,
                      marginTop: -6,
                    }}
                    railStyle={{ backgroundColor: '#e2e8f0', height: 4 }}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='font-size-input' className='text-xs'>
                    Font Size (px)
                  </Label>
                  <Input
                    id='font-size-input'
                    type='number'
                    min={8}
                    max={72}
                    value={selectedComponent.props.fontSize || 16}
                    onChange={handleFontSizeInputChange}
                    className='font-mono text-sm h-8'
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Font Weight Control for Text Components */}
          {selectedComponent.type === 'text' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Font Weight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <Label className='text-xs'>Font Weight</Label>
                  <div className='grid grid-cols-2 gap-2'>
                    {fontWeights.map((weight) => (
                      <Button
                        key={weight.value}
                        variant={
                          selectedComponent.props.fontWeight === weight.value
                            ? 'default'
                            : 'outline'
                        }
                        size='sm'
                        className='text-xs h-8'
                        onClick={() => handleFontWeightChange(weight.value)}
                      >
                        {weight.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Font Size Control for TextArea Components */}
          {selectedComponent.type === 'textarea' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Font Size</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='space-y-2'>
                  <div className='flex justify-between text-xs'>
                    <span>
                      Font Size: {selectedComponent.props.fontSize || 14}px
                    </span>
                  </div>
                  <Slider
                    min={8}
                    max={24}
                    value={selectedComponent.props.fontSize || 14}
                    onChange={handleFontSizeChange}
                    trackStyle={{ backgroundColor: '#3b82f6', height: 4 }}
                    handleStyle={{
                      borderColor: '#3b82f6',
                      height: 16,
                      width: 16,
                      marginTop: -6,
                    }}
                    railStyle={{ backgroundColor: '#e2e8f0', height: 4 }}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='textarea-font-size-input' className='text-xs'>
                    Font Size (px)
                  </Label>
                  <Input
                    id='textarea-font-size-input'
                    type='number'
                    min={8}
                    max={24}
                    value={selectedComponent.props.fontSize || 14}
                    onChange={handleFontSizeInputChange}
                    className='font-mono text-sm h-8'
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Text Alignment Control for TextArea Components */}
          {selectedComponent.type === 'textarea' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Text Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <Label className='text-xs'>Text Alignment</Label>
                  <div className='grid grid-cols-3 gap-2'>
                    <Button
                      variant={
                        selectedComponent.props.textAlign === 'left'
                          ? 'default'
                          : 'outline'
                      }
                      size='sm'
                      className='text-xs h-8'
                      onClick={() => handleTextAlignChange('left')}
                    >
                      Left
                    </Button>
                    <Button
                      variant={
                        selectedComponent.props.textAlign === 'center'
                          ? 'default'
                          : 'outline'
                      }
                      size='sm'
                      className='text-xs h-8'
                      onClick={() => handleTextAlignChange('center')}
                    >
                      Center
                    </Button>
                    <Button
                      variant={
                        selectedComponent.props.textAlign === 'right'
                          ? 'default'
                          : 'outline'
                      }
                      size='sm'
                      className='text-xs h-8'
                      onClick={() => handleTextAlignChange('right')}
                    >
                      Right
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Image Source and Alt Text */}
          {selectedComponent.type === 'image' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Image Properties</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='space-y-2'>
                  <Label htmlFor='image-src' className='text-xs'>
                    Image URL
                  </Label>
                  <Input
                    id='image-src'
                    value={selectedComponent.props.src || ''}
                    onChange={(e) => handleImageSrcChange(e.target.value)}
                    placeholder='https://example.com/image.jpg'
                    className='text-sm h-8'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='image-alt' className='text-xs'>
                    Alt Text
                  </Label>
                  <Input
                    id='image-alt'
                    value={selectedComponent.props.alt || ''}
                    onChange={(e) => handleImageAltChange(e.target.value)}
                    placeholder='Image description'
                    className='text-sm h-8'
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Image Dimensions */}
          {selectedComponent.type === 'image' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Dimensions</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='space-y-2'>
                    <Label htmlFor='image-width' className='text-xs'>
                      Width (px)
                    </Label>
                    <Input
                      id='image-width'
                      type='number'
                      min={50}
                      max={500}
                      value={selectedComponent.props.width || 120}
                      onChange={(e) =>
                        handleImageWidthChange(parseInt(e.target.value) || 120)
                      }
                      className='text-sm h-8'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='image-height' className='text-xs'>
                      Height (px)
                    </Label>
                    <Input
                      id='image-height'
                      type='number'
                      min={50}
                      max={500}
                      value={selectedComponent.props.height || 120}
                      onChange={(e) =>
                        handleImageHeightChange(parseInt(e.target.value) || 120)
                      }
                      className='text-sm h-8'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Image Object Fit */}
          {selectedComponent.type === 'image' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Object Fit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <Label className='text-xs'>Fit Mode</Label>
                  <div className='grid grid-cols-2 gap-2'>
                    {['cover', 'contain', 'fill', 'none', 'scale-down'].map(
                      (fit) => (
                        <Button
                          key={fit}
                          variant={
                            selectedComponent.props.objectFit === fit
                              ? 'default'
                              : 'outline'
                          }
                          size='sm'
                          className='text-xs h-8'
                          onClick={() => handleImageObjectFitChange(fit)}
                        >
                          {fit.charAt(0).toUpperCase() + fit.slice(1)}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Button Text and URL */}
          {selectedComponent.type === 'button' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Button Properties</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='space-y-2'>
                  <Label htmlFor='button-text' className='text-xs'>
                    Button Text
                  </Label>
                  <Input
                    id='button-text'
                    value={selectedComponent.props.text || ''}
                    onChange={(e) => handleButtonTextChange(e.target.value)}
                    placeholder='Button text'
                    className='text-sm h-8'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='button-url' className='text-xs'>
                    URL (optional)
                  </Label>
                  <Input
                    id='button-url'
                    value={selectedComponent.props.url || ''}
                    onChange={(e) => handleButtonUrlChange(e.target.value)}
                    placeholder='https://example.com'
                    className='text-sm h-8'
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Button Styling */}
          {selectedComponent.type === 'button' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Button Styling</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='space-y-2'>
                  <Label htmlFor='button-font-size' className='text-xs'>
                    Font Size (px)
                  </Label>
                  <Input
                    id='button-font-size'
                    type='number'
                    min={8}
                    max={32}
                    value={selectedComponent.props.fontSize || 14}
                    onChange={(e) =>
                      handleButtonFontSizeChange(parseInt(e.target.value) || 14)
                    }
                    className='text-sm h-8'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='button-padding' className='text-xs'>
                    Padding (px)
                  </Label>
                  <Input
                    id='button-padding'
                    type='number'
                    min={4}
                    max={32}
                    value={selectedComponent.props.padding || 8}
                    onChange={(e) =>
                      handleButtonPaddingChange(parseInt(e.target.value) || 8)
                    }
                    className='text-sm h-8'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='button-border-radius' className='text-xs'>
                    Border Radius (px)
                  </Label>
                  <Input
                    id='button-border-radius'
                    type='number'
                    min={0}
                    max={50}
                    value={selectedComponent.props.borderRadius || 6}
                    onChange={(e) =>
                      handleButtonBorderRadiusChange(
                        parseInt(e.target.value) || 6
                      )
                    }
                    className='text-sm h-8'
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Button Colors */}
          {selectedComponent.type === 'button' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Button Colors</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='space-y-2'>
                  <Label className='text-xs'>Background Color</Label>
                  <div className='flex justify-center'>
                    <HexColorPicker
                      color={
                        selectedComponent.props.backgroundColor || '#3b82f6'
                      }
                      onChange={(color) =>
                        handleButtonBackgroundColorChange(color)
                      }
                      style={{ width: '100%', height: '80px' }}
                    />
                  </div>
                  <Input
                    value={selectedComponent.props.backgroundColor || '#3b82f6'}
                    onChange={(e) =>
                      handleButtonBackgroundColorChange(e.target.value)
                    }
                    className='font-mono text-sm h-8'
                    placeholder='#3b82f6'
                  />
                </div>
                <div className='space-y-2'>
                  <Label className='text-xs'>Text Color</Label>
                  <div className='flex justify-center'>
                    <HexColorPicker
                      color={selectedComponent.props.textColor || '#ffffff'}
                      onChange={(color) => handleButtonTextColorChange(color)}
                      style={{ width: '100%', height: '80px' }}
                    />
                  </div>
                  <Input
                    value={selectedComponent.props.textColor || '#ffffff'}
                    onChange={(e) =>
                      handleButtonTextColorChange(e.target.value)
                    }
                    className='font-mono text-sm h-8'
                    placeholder='#ffffff'
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Color Picker */}
          <Card className='shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm'>Color</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex justify-center'>
                <HexColorPicker
                  color={selectedComponent.props.color}
                  onChange={handleColorChange}
                  style={{ width: '100%', height: '120px' }}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='hex-input' className='text-xs'>
                  Hex Color
                </Label>
                <Input
                  id='hex-input'
                  value={selectedComponent.props.color}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className='font-mono text-sm h-8'
                />
              </div>
            </CardContent>
          </Card>

          {/* Opacity Control */}
          <Card className='shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm'>Opacity</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='space-y-2'>
                <div className='flex justify-between text-xs'>
                  <span>Opacity: {selectedComponent.props.opacity}%</span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  value={selectedComponent.props.opacity}
                  onChange={handleOpacityChange}
                  trackStyle={{ backgroundColor: '#3b82f6', height: 4 }}
                  handleStyle={{
                    borderColor: '#3b82f6',
                    height: 16,
                    width: 16,
                    marginTop: -6,
                  }}
                  railStyle={{ backgroundColor: '#e2e8f0', height: 4 }}
                />
              </div>

              <div className='space-y-2'>
                <Label className='text-xs'>Preview</Label>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='h-12 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center'>
                    <div
                      className='w-8 h-8 rounded'
                      style={{
                        backgroundColor: selectedComponent.props.color,
                        opacity: selectedComponent.props.opacity / 100,
                      }}
                    />
                  </div>
                  <div
                    className='h-12 rounded border border-slate-200 dark:border-slate-700'
                    style={{
                      backgroundColor: `${
                        selectedComponent.props.color
                      }${Math.round(
                        (selectedComponent.props.opacity / 100) * 255
                      )
                        .toString(16)
                        .padStart(2, '0')}`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className='space-y-2'>
            <Button
              variant='outline'
              size='sm'
              className='w-full'
              onClick={() => handleColorChange('#3b82f6')}
            >
              Reset to Blue
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='w-full'
              onClick={() => handleColorChange('#ef4444')}
            >
              Reset to Red
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='w-full'
              onClick={() => handleColorChange('#10b981')}
            >
              Reset to Green
            </Button>
          </div>

          {/* Image Border Radius */}
          {selectedComponent.type === 'image' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm'>Border Radius</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='space-y-2'>
                  <div className='flex justify-between text-xs'>
                    <span>
                      Border Radius: {selectedComponent.props.borderRadius || 0}
                      px
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={50}
                    value={selectedComponent.props.borderRadius || 0}
                    onChange={(value) => {
                      const radiusValue = Array.isArray(value)
                        ? value[0]
                        : value;
                      handleImageBorderRadiusChange(radiusValue);
                    }}
                    trackStyle={{ backgroundColor: '#3b82f6', height: 4 }}
                    handleStyle={{
                      borderColor: '#3b82f6',
                      height: 16,
                      width: 16,
                      marginTop: -6,
                    }}
                    railStyle={{ backgroundColor: '#e2e8f0', height: 4 }}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='image-border-radius' className='text-xs'>
                    Border Radius (px)
                  </Label>
                  <Input
                    id='image-border-radius'
                    type='number'
                    min={0}
                    max={50}
                    value={selectedComponent.props.borderRadius || 0}
                    onChange={(e) =>
                      handleImageBorderRadiusChange(
                        parseInt(e.target.value) || 0
                      )
                    }
                    className='text-sm h-8'
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
