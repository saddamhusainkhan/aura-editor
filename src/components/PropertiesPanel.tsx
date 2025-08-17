import React from 'react';
import { HexColorPicker } from 'react-colorful';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronRight,
  Type,
  Eye,
  Layers,
  Move,
  Image,
  Square,
  Settings,
  ClipboardList,
  Container,
  Rows,
  Columns,
} from 'lucide-react';

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
    borderColor?: string;
    borderWidth?: number;
    maxWidth?: number;
    gap?: number;
    justifyContent?: string;
    alignItems?: string;
    gridSpan?: number;
    [key: string]: string | number | undefined;
  };
}

interface PropertiesPanelProps {
  selectedComponent: CanvasComponent | null;
  canvasComponents: CanvasComponent[];
  onComponentUpdate: (
    componentId: string,
    updates: Partial<CanvasComponent['props']>
  ) => void;
  onZIndexUpdate?: (componentId: string, newZIndex: number) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedComponent,
  canvasComponents,
  onComponentUpdate,
  onZIndexUpdate,
}) => {
  const [expandedSections, setExpandedSections] = React.useState<{
    [key: string]: boolean;
  }>({
    padding: true,
    borderradius: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderSlider = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onChange: (value: number) => void
  ) => (
    <div className='space-y-3'>
      <div className='flex justify-between items-center'>
        <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
          {label}
        </Label>
        <span className='text-sm font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded'>
          {value}
        </span>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(sliderValue) => {
          const numValue = Array.isArray(sliderValue)
            ? sliderValue[0]
            : sliderValue;
          onChange(numValue);
        }}
        className='w-full'
        trackStyle={{
          backgroundColor: '#3b82f6',
          height: 6,
          borderRadius: 3,
        }}
        handleStyle={{
          borderColor: '#3b82f6',
          backgroundColor: '#ffffff',
          borderWidth: 3,
          width: 20,
          height: 20,
          marginTop: -7,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          cursor: 'grab',
        }}
        railStyle={{
          backgroundColor: '#e2e8f0',
          height: 6,
          borderRadius: 3,
        }}
        activeDotStyle={{
          backgroundColor: '#1d4ed8',
          borderColor: '#ffffff',
          borderWidth: 2,
        }}
      />
      <div className='flex justify-between text-xs text-slate-500 dark:text-slate-400'>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );

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

  const handleImageObjectFitChange = (newFit: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { objectFit: newFit });
    }
  };

  const handleButtonBackgroundColorChange = (newColor: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { backgroundColor: newColor });
    }
  };

  const handleButtonUrlChange = (newUrl: string) => {
    if (selectedComponent) {
      onComponentUpdate(selectedComponent.id, { url: newUrl });
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
          <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
            <Settings className='w-5 h-5' />
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
              <ClipboardList className='w-20 h-20 mx-auto' />
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
        <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
          <Settings className='w-5 h-5' />
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
              {/* Position Display */}
              <Card className='shadow-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-sm flex items-center gap-2'>
                    <Move className='w-4 h-4' />
                    Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-xs text-slate-600 dark:text-slate-400'>
                    <span className='font-medium'>Position:</span> X:{' '}
                    {Math.round(selectedComponent.position.x)}, Y:{' '}
                    {Math.round(selectedComponent.position.y)}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Text Input for Text Components */}
          {selectedComponent.type === 'text' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Type className='w-4 h-4' />
                  Text Content
                </CardTitle>
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

          {/* Font Size Control */}
          <Card className='shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Type className='w-4 h-4' />
                Font Size
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {renderSlider(
                'Font Size',
                selectedComponent.props.fontSize || 16,
                8,
                72,
                1,
                (value) =>
                  onComponentUpdate(selectedComponent.id, { fontSize: value })
              )}
            </CardContent>
          </Card>

          {/* Opacity Control */}
          <Card className='shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Eye className='w-4 h-4' />
                Opacity
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {renderSlider(
                'Opacity',
                selectedComponent.props.opacity || 100,
                0,
                100,
                1,
                (value) =>
                  onComponentUpdate(selectedComponent.id, { opacity: value })
              )}
            </CardContent>
          </Card>

          {/* Z-Index Control */}
          <Card className='shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Layers className='w-4 h-4' />
                Z-Index
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {renderSlider(
                'Z-Index',
                selectedComponent.zIndex,
                0,
                100,
                1,
                (value) => {
                  if (onZIndexUpdate) {
                    onZIndexUpdate(selectedComponent.id, value);
                  }
                }
              )}
            </CardContent>
          </Card>

          {/* Combined Padding Control */}
          <Card className='shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Move className='w-4 h-4' />
                Padding
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Overall Padding Slider */}
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                    Overall Padding
                  </Label>
                  <span className='text-sm font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded'>
                    {Math.max(
                      selectedComponent.props.paddingTop || 0,
                      selectedComponent.props.paddingRight || 0,
                      selectedComponent.props.paddingBottom || 0,
                      selectedComponent.props.paddingLeft || 0
                    )}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={200}
                  step={1}
                  value={Math.max(
                    selectedComponent.props.paddingTop || 0,
                    selectedComponent.props.paddingRight || 0,
                    selectedComponent.props.paddingBottom || 0,
                    selectedComponent.props.paddingLeft || 0
                  )}
                  onChange={(value) => {
                    const paddingValue = Array.isArray(value)
                      ? value[0]
                      : value;
                    onComponentUpdate(selectedComponent.id, {
                      paddingTop: paddingValue,
                      paddingRight: paddingValue,
                      paddingBottom: paddingValue,
                      paddingLeft: paddingValue,
                    });
                  }}
                  className='w-full'
                  trackStyle={{
                    backgroundColor: '#3b82f6',
                    height: 6,
                    borderRadius: 3,
                  }}
                  handleStyle={{
                    borderColor: '#3b82f6',
                    backgroundColor: '#ffffff',
                    borderWidth: 3,
                    width: 20,
                    height: 20,
                    marginTop: -7,
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    cursor: 'grab',
                  }}
                  railStyle={{
                    backgroundColor: '#e2e8f0',
                    height: 6,
                    borderRadius: 3,
                  }}
                />
                <div className='flex justify-between text-xs text-slate-500 dark:text-slate-400'>
                  <span>0</span>
                  <span>200</span>
                </div>
              </div>

              {/* Individual Side Controls */}
              <div className='border-t border-slate-200 dark:border-slate-700 pt-4'>
                <div className='mb-3'>
                  <div
                    className='flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg p-2 -m-2 transition-colors'
                    onClick={() => toggleSection('padding')}
                  >
                    <div className='flex items-center gap-2'>
                      <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                        Individual Sides
                      </Label>
                      <span className='text-xs text-slate-500 dark:text-slate-400'>
                        Click to toggle
                      </span>
                    </div>
                    {expandedSections['padding'] ? (
                      <ChevronDown className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                    ) : (
                      <ChevronRight className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                    )}
                  </div>
                </div>

                {expandedSections['padding'] && (
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label className='text-xs font-medium text-slate-600 dark:text-slate-400'>
                        Top
                      </Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.paddingTop || 0}
                        min={0}
                        max={200}
                        step={1}
                        onChange={(e) => {
                          onComponentUpdate(selectedComponent.id, {
                            paddingTop: Number(e.target.value),
                          });
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className='h-9 text-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-xs font-medium text-slate-600 dark:text-slate-400'>
                        Right
                      </Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.paddingRight || 0}
                        min={0}
                        max={200}
                        step={1}
                        onChange={(e) => {
                          onComponentUpdate(selectedComponent.id, {
                            paddingRight: Number(e.target.value),
                          });
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className='h-9 text-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-xs font-medium text-slate-600 dark:text-slate-400'>
                        Bottom
                      </Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.paddingBottom || 0}
                        min={0}
                        max={200}
                        step={1}
                        onChange={(e) => {
                          onComponentUpdate(selectedComponent.id, {
                            paddingBottom: Number(e.target.value),
                          });
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className='h-9 text-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-xs font-medium text-slate-600 dark:text-slate-400'>
                        Left
                      </Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.paddingLeft || 0}
                        min={0}
                        max={200}
                        step={1}
                        onChange={(e) => {
                          onComponentUpdate(selectedComponent.id, {
                            paddingLeft: Number(e.target.value),
                          });
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className='h-9 text-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Combined Border Radius Control - Only for non-text components */}
          {selectedComponent.type !== 'text' &&
            selectedComponent.type !== 'textarea' && (
              <Card className='shadow-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-sm flex items-center gap-2'>
                    <Image className='w-4 h-4' />
                    Border Radius
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/* Overall Border Radius Slider */}
                  <div className='space-y-3'>
                    <div className='flex justify-between items-center'>
                      <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                        Overall Border Radius
                      </Label>
                      <span className='text-sm font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded'>
                        {Math.max(
                          selectedComponent.props.borderRadiusTop || 0,
                          selectedComponent.props.borderRadiusRight || 0,
                          selectedComponent.props.borderRadiusBottom || 0,
                          selectedComponent.props.borderRadiusLeft || 0
                        )}
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={200}
                      step={1}
                      value={Math.max(
                        selectedComponent.props.borderRadiusTop || 0,
                        selectedComponent.props.borderRadiusRight || 0,
                        selectedComponent.props.borderRadiusBottom || 0,
                        selectedComponent.props.borderRadiusLeft || 0
                      )}
                      onChange={(value) => {
                        const borderRadiusValue = Array.isArray(value)
                          ? value[0]
                          : value;
                        onComponentUpdate(selectedComponent.id, {
                          borderRadiusTop: borderRadiusValue,
                          borderRadiusRight: borderRadiusValue,
                          borderRadiusBottom: borderRadiusValue,
                          borderRadiusLeft: borderRadiusValue,
                        });
                      }}
                      className='w-full'
                      trackStyle={{
                        backgroundColor: '#3b82f6',
                        height: 6,
                        borderRadius: 3,
                      }}
                      handleStyle={{
                        borderColor: '#3b82f6',
                        backgroundColor: '#ffffff',
                        borderWidth: 3,
                        width: 20,
                        height: 20,
                        marginTop: -7,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'grab',
                      }}
                      railStyle={{
                        backgroundColor: '#e2e8f0',
                        height: 6,
                        borderRadius: 3,
                      }}
                    />
                    <div className='flex justify-between text-xs text-slate-500 dark:text-slate-400'>
                      <span>0</span>
                      <span>200</span>
                    </div>
                  </div>

                  {/* Individual Side Controls */}
                  <div className='border-t border-slate-200 dark:border-slate-700 pt-4'>
                    <div className='mb-3'>
                      <div
                        className='flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg p-2 -m-2 transition-colors'
                        onClick={() => toggleSection('borderradius')}
                      >
                        <div className='flex items-center gap-2'>
                          <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                            Individual Sides
                          </Label>
                          <span className='text-xs text-slate-500 dark:text-slate-400'>
                            Click to toggle
                          </span>
                        </div>
                        {expandedSections['borderradius'] ? (
                          <ChevronDown className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                        ) : (
                          <ChevronRight className='h-4 w-4 text-slate-500 dark:text-slate-400' />
                        )}
                      </div>
                    </div>

                    {expandedSections['borderradius'] && (
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label className='text-xs font-medium text-slate-600 dark:text-slate-400'>
                            Top
                          </Label>
                          <Input
                            type='number'
                            value={selectedComponent.props.borderRadiusTop || 0}
                            min={0}
                            max={200}
                            step={1}
                            onChange={(e) => {
                              onComponentUpdate(selectedComponent.id, {
                                borderRadiusTop: Number(e.target.value),
                              });
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className='h-9 text-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-xs font-medium text-slate-600 dark:text-slate-400'>
                            Right
                          </Label>
                          <Input
                            type='number'
                            value={
                              selectedComponent.props.borderRadiusRight || 0
                            }
                            min={0}
                            max={200}
                            step={1}
                            onChange={(e) =>
                              onComponentUpdate(selectedComponent.id, {
                                borderRadiusRight: Number(e.target.value),
                              })
                            }
                            onClick={(e) => e.stopPropagation()}
                            className='h-9 text-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-xs font-medium text-slate-600 dark:text-slate-400'>
                            Bottom
                          </Label>
                          <Input
                            type='number'
                            value={
                              selectedComponent.props.borderRadiusBottom || 0
                            }
                            min={0}
                            max={200}
                            step={1}
                            onChange={(e) =>
                              onComponentUpdate(selectedComponent.id, {
                                borderRadiusBottom: Number(e.target.value),
                              })
                            }
                            onClick={(e) => e.stopPropagation()}
                            className='h-9 text-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-xs font-medium text-slate-600 dark:text-slate-400'>
                            Left
                          </Label>
                          <Input
                            type='number'
                            value={
                              selectedComponent.props.borderRadiusLeft || 0
                            }
                            min={0}
                            max={200}
                            step={1}
                            onChange={(e) =>
                              onComponentUpdate(selectedComponent.id, {
                                borderRadiusLeft: Number(e.target.value),
                              })
                            }
                            onClick={(e) => e.stopPropagation()}
                            className='h-9 text-sm border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Font Weight Control for Text Components */}
          {selectedComponent.type === 'text' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Type className='w-4 h-4' />
                  Font Weight
                </CardTitle>
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
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Type className='w-4 h-4' />
                  Font Size
                </CardTitle>
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
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Type className='w-4 h-4' />
                  Text Alignment
                </CardTitle>
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
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Image className='w-4 h-4' />
                  Image Properties
                </CardTitle>
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
                {renderSlider(
                  'Width',
                  selectedComponent.props.width || 120,
                  50,
                  500,
                  1,
                  (value) =>
                    onComponentUpdate(selectedComponent.id, { width: value })
                )}
                {renderSlider(
                  'Height',
                  selectedComponent.props.height || 120,
                  50,
                  500,
                  1,
                  (value) =>
                    onComponentUpdate(selectedComponent.id, { height: value })
                )}
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
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Square className='w-4 h-4' />
                  Button Properties
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='button-text' className='text-xs'>
                    Button Text
                  </Label>
                  <Input
                    id='button-text'
                    value={selectedComponent.props.text || ''}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder='Button text'
                    className='text-sm h-8'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='button-url' className='text-xs'>
                    Button URL
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
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Square className='w-4 h-4' />
                  Button Styling
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {renderSlider(
                  'Font Size',
                  selectedComponent.props.fontSize || 14,
                  8,
                  32,
                  1,
                  (value) =>
                    onComponentUpdate(selectedComponent.id, { fontSize: value })
                )}
              </CardContent>
            </Card>
          )}

          {/* Button Colors */}
          {selectedComponent.type === 'button' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm flex items-center gap-2'>
                  <div
                    className='w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600'
                    style={{
                      backgroundColor:
                        selectedComponent.props.backgroundColor || '#3b82f6',
                    }}
                  ></div>
                  Button Colors
                </CardTitle>
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

          {/* Color Control */}
          <Card className='shadow-sm'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <div
                  className='w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600'
                  style={{ backgroundColor: selectedComponent.props.color }}
                ></div>
                Color
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HexColorPicker
                color={selectedComponent.props.color}
                onChange={handleColorChange}
                className='w-full'
              />
              <Input
                value={selectedComponent.props.color}
                onChange={(e) => handleColorChange(e.target.value)}
                className='mt-3 text-sm h-8 font-mono'
                placeholder='#000000'
              />
            </CardContent>
          </Card>

          {/* Image Border Radius */}
          {selectedComponent.type === 'image' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Image className='w-4 h-4' />
                  Border Radius
                </CardTitle>
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

          {/* Container Properties */}
          {selectedComponent.type === 'container' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Container className='w-4 h-4' />
                  Container Properties
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Container Dimensions */}
                <div className='space-y-3'>
                  <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                    Dimensions
                  </Label>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='space-y-2'>
                      <Label className='text-xs'>Width (px)</Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.width || 400}
                        min={100}
                        max={2000}
                        step={10}
                        onChange={(e) =>
                          onComponentUpdate(selectedComponent.id, {
                            width: Number(e.target.value),
                          })
                        }
                        className='h-8 text-sm'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-xs'>Height (px)</Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.height || 300}
                        min={100}
                        max={2000}
                        step={10}
                        onChange={(e) =>
                          onComponentUpdate(selectedComponent.id, {
                            height: Number(e.target.value),
                          })
                        }
                        className='h-8 text-sm'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Max Width (px)</Label>
                    <Input
                      type='number'
                      value={selectedComponent.props.maxWidth || 1200}
                      min={200}
                      max={3000}
                      step={50}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          maxWidth: Number(e.target.value),
                        })
                      }
                      className='h-8 text-sm'
                    />
                  </div>
                </div>

                {/* Container Styling */}
                <div className='space-y-3'>
                  <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                    Container Styling
                  </Label>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Background Color</Label>
                    <HexColorPicker
                      color={
                        selectedComponent.props.backgroundColor || '#f8fafc'
                      }
                      onChange={(color) =>
                        onComponentUpdate(selectedComponent.id, {
                          backgroundColor: color,
                        })
                      }
                      className='w-full h-32'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Border Color</Label>
                    <HexColorPicker
                      color={selectedComponent.props.borderColor || '#e2e8f0'}
                      onChange={(color) =>
                        onComponentUpdate(selectedComponent.id, {
                          borderColor: color,
                        })
                      }
                      className='w-full h-32'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Border Width (px)</Label>
                    <Input
                      type='number'
                      value={selectedComponent.props.borderWidth || 1}
                      min={0}
                      max={10}
                      step={1}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          borderWidth: Number(e.target.value),
                        })
                      }
                      className='h-8 text-sm'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Row Properties */}
          {selectedComponent.type === 'row' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Rows className='w-4 h-4' />
                  Row Properties
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Row Dimensions */}
                <div className='space-y-3'>
                  <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                    Dimensions
                  </Label>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='space-y-2'>
                      <Label className='text-xs'>Width (px)</Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.width || 600}
                        min={200}
                        max={2000}
                        step={10}
                        onChange={(e) =>
                          onComponentUpdate(selectedComponent.id, {
                            width: Number(e.target.value),
                          })
                        }
                        className='h-8 text-sm'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-xs'>Height (px)</Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.height || 100}
                        min={50}
                        max={500}
                        step={10}
                        onChange={(e) =>
                          onComponentUpdate(selectedComponent.id, {
                            height: Number(e.target.value),
                          })
                        }
                        className='h-8 text-sm'
                      />
                    </div>
                  </div>
                </div>

                {/* Row Layout */}
                <div className='space-y-3'>
                  <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                    Layout
                  </Label>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Gap (px)</Label>
                    <Input
                      type='number'
                      value={selectedComponent.props.gap || 16}
                      min={0}
                      max={100}
                      step={2}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          gap: Number(e.target.value),
                        })
                      }
                      className='h-8 text-sm'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Justify Content</Label>
                    <select
                      value={
                        selectedComponent.props.justifyContent || 'flex-start'
                      }
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          justifyContent: e.target.value,
                        })
                      }
                      className='w-full h-8 text-sm border border-slate-200 dark:border-slate-600 rounded px-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                    >
                      <option value='flex-start'>Start</option>
                      <option value='center'>Center</option>
                      <option value='flex-end'>End</option>
                      <option value='space-between'>Space Between</option>
                      <option value='space-around'>Space Around</option>
                      <option value='space-evenly'>Space Evenly</option>
                    </select>
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Align Items</Label>
                    <select
                      value={selectedComponent.props.alignItems || 'center'}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          alignItems: e.target.value,
                        })
                      }
                      className='w-full h-8 text-sm border border-slate-200 dark:border-slate-600 rounded px-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                    >
                      <option value='flex-start'>Start</option>
                      <option value='center'>Center</option>
                      <option value='flex-end'>End</option>
                      <option value='stretch'>Stretch</option>
                      <option value='baseline'>Baseline</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Column Properties */}
          {selectedComponent.type === 'column' && (
            <Card className='shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm flex items-center gap-2'>
                  <Columns className='w-4 h-4' />
                  Column Properties
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Column Dimensions */}
                <div className='space-y-3'>
                  <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                    Dimensions
                  </Label>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='space-y-2'>
                      <Label className='text-xs'>Width (px)</Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.width || 200}
                        min={100}
                        max={1000}
                        step={10}
                        onChange={(e) =>
                          onComponentUpdate(selectedComponent.id, {
                            width: Number(e.target.value),
                          })
                        }
                        className='h-8 text-sm'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-xs'>Height (px)</Label>
                      <Input
                        type='number'
                        value={selectedComponent.props.height || 150}
                        min={50}
                        max={1000}
                        step={10}
                        onChange={(e) =>
                          onComponentUpdate(selectedComponent.id, {
                            height: Number(e.target.value),
                          })
                        }
                        className='h-8 text-sm'
                      />
                    </div>
                  </div>
                </div>

                {/* 12-Grid System */}
                <div className='space-y-3'>
                  <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                    12-Grid System
                  </Label>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Grid Span (1-12)</Label>
                    <div className='flex items-center gap-2'>
                      <Input
                        type='number'
                        value={selectedComponent.props.gridSpan || 6}
                        min={1}
                        max={12}
                        step={1}
                        onChange={(e) =>
                          onComponentUpdate(selectedComponent.id, {
                            gridSpan: Number(e.target.value),
                          })
                        }
                        className='h-8 text-sm flex-1'
                      />
                      <span className='text-xs text-slate-500 dark:text-slate-400 font-mono'>
                        ={' '}
                        {(
                          ((selectedComponent.props.gridSpan || 6) / 12) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 gap-1'>
                    {Array.from({ length: 12 }, (_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          onComponentUpdate(selectedComponent.id, {
                            gridSpan: i + 1,
                          })
                        }
                        className={`h-6 text-xs rounded transition-colors ${
                          (selectedComponent.props.gridSpan || 6) === i + 1
                            ? 'bg-pink-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                        title={`${i + 1}/12 columns`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column Layout */}
                <div className='space-y-3'>
                  <Label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                    Layout
                  </Label>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Gap (px)</Label>
                    <Input
                      type='number'
                      value={selectedComponent.props.gap || 16}
                      min={0}
                      max={100}
                      step={2}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          gap: Number(e.target.value),
                        })
                      }
                      className='h-8 text-sm'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Justify Content</Label>
                    <select
                      value={
                        selectedComponent.props.justifyContent || 'flex-start'
                      }
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          justifyContent: e.target.value,
                        })
                      }
                      className='w-full h-8 text-sm border border-slate-200 dark:border-slate-600 rounded px-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                    >
                      <option value='flex-start'>Start</option>
                      <option value='center'>Center</option>
                      <option value='flex-end'>End</option>
                      <option value='space-between'>Space Between</option>
                      <option value='space-around'>Space Around</option>
                      <option value='space-evenly'>Space Evenly</option>
                    </select>
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-xs'>Align Items</Label>
                    <select
                      value={selectedComponent.props.alignItems || 'flex-start'}
                      onChange={(e) =>
                        onComponentUpdate(selectedComponent.id, {
                          alignItems: e.target.value,
                        })
                      }
                      className='w-full h-8 text-sm border border-slate-200 dark:border-slate-600 rounded px-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                    >
                      <option value='flex-start'>Start</option>
                      <option value='center'>Center</option>
                      <option value='flex-end'>End</option>
                      <option value='stretch'>Stretch</option>
                      <option value='baseline'>Baseline</option>
                    </select>
                  </div>
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
