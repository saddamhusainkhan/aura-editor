import { useState } from 'react';
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
import Palette from '@/components/Palette';
import Canvas from '@/components/Canvas';

interface CanvasComponent {
  id: string;
  type: string;
  position: { x: number; y: number };
  props: {
    text?: string;
    color: string;
    opacity: number;
    [key: string]: any;
  };
}

function App() {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('');
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>([]);
  const [color, setColor] = useState('#3b82f6');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [opacity, setOpacity] = useState(100);

  // Get the currently selected component
  const selectedComponent = canvasComponents.find(comp => comp.id === selectedComponentId) || null;

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (selectedComponentId) {
      // Update the selected component's color on canvas
      setCanvasComponents(prev => 
        prev.map(comp => 
          comp.id === selectedComponentId 
            ? { ...comp, props: { ...comp.props, color: newColor } }
            : comp
        )
      );
    }
  };

  const handleHueChange = (value: number | number[]) => {
    const hueValue = Array.isArray(value) ? value[0] : value;
    setHue(hueValue);
  };

  const handleSaturationChange = (value: number | number[]) => {
    const satValue = Array.isArray(value) ? value[0] : value;
    setSaturation(satValue);
  };

  const handleLightnessChange = (value: number | number[]) => {
    const lightValue = Array.isArray(value) ? value[0] : value;
    setLightness(lightValue);
  };

  const handleOpacityChange = (value: number | number[]) => {
    const opacityValue = Array.isArray(value) ? value[0] : value;
    setOpacity(opacityValue);
    if (selectedComponentId) {
      // Update the selected component's opacity on canvas
      setCanvasComponents(prev => 
        prev.map(comp => 
          comp.id === selectedComponentId 
            ? { ...comp, props: { ...comp.props, opacity: opacityValue } }
            : comp
        )
      );
    }
  };

  const handlePaletteComponentSelect = (componentType: string) => {
    // Create a new component instance when selected from palette
    const newComponent: CanvasComponent = {
      id: Date.now().toString(),
      type: componentType,
      position: { x: 50, y: 50 }, // Default position
      props: {
        text: componentType === 'text' ? 'Default Text' : undefined,
        color: color,
        opacity: opacity,
      },
    };
    
    setCanvasComponents(prev => [...prev, newComponent]);
    setSelectedComponentId(newComponent.id);
  };

  const handleComponentDrop = (componentType: string, x: number, y: number) => {
    const newComponent: CanvasComponent = {
      id: Date.now().toString(),
      type: componentType,
      position: { x, y },
      props: {
        text: componentType === 'text' ? 'Default Text' : undefined,
        color: color,
        opacity: opacity,
      },
    };
    
    setCanvasComponents(prev => [...prev, newComponent]);
    setSelectedComponentId(newComponent.id);
  };

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponentId(componentId);
    
    if (componentId && componentId !== '') {
      const component = canvasComponents.find(comp => comp.id === componentId);
      if (component) {
        setColor(component.props.color);
        setOpacity(component.props.opacity);
      }
    }
  };

  const handleTextChange = (newText: string) => {
    if (selectedComponentId) {
      setCanvasComponents(prev => 
        prev.map(comp => 
          comp.id === selectedComponentId 
            ? { ...comp, props: { ...comp.props, text: newText } }
            : comp
        )
      );
    }
  };

  return (
    <div className='flex h-screen bg-slate-50 dark:bg-slate-900'>
      {/* Left Panel - Component Palette (20% width) */}
      <div className='w-1/5 h-screen border-r border-slate-200 dark:border-slate-700'>
        <Palette onComponentSelect={handlePaletteComponentSelect} />
      </div>

      {/* Middle Panel - Canvas (60% width) */}
      <div className='w-3/5 h-screen border-r border-slate-200 dark:border-slate-700'>
        <Canvas
          selectedComponent={selectedComponent}
          canvasComponents={canvasComponents}
          onComponentDrop={handleComponentDrop}
          onComponentSelect={handleComponentSelect}
        />
      </div>

      {/* Right Panel - Properties Panel (20% width) */}
      <div className='w-1/5 h-screen bg-white dark:bg-slate-800 flex flex-col'>
        <div className='p-4 border-b border-slate-200 dark:border-slate-700'>
          <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
            Properties
          </h2>
          <p className='text-sm text-slate-600 dark:text-slate-400 mt-1'>
            {selectedComponent
              ? `${selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)} Component`
              : 'No component selected'}
          </p>
          {canvasComponents.length > 0 && (
            <p className='text-xs text-slate-500 dark:text-slate-500 mt-1'>
              {canvasComponents.length} component
              {canvasComponents.length !== 1 ? 's' : ''} on canvas
            </p>
          )}
        </div>

        <div className='flex-1 overflow-y-auto p-4'>
          {selectedComponent ? (
            <div className='space-y-6'>
              {/* Component Type Info */}
              <Card className='shadow-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-sm'>Component Info</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='text-xs text-slate-600 dark:text-slate-400'>
                    <span className='font-medium'>Type:</span> {selectedComponent.type}
                  </div>
                  <div className='text-xs text-slate-600 dark:text-slate-400'>
                    <span className='font-medium'>Position:</span> X: {Math.round(selectedComponent.position.x)}, Y: {Math.round(selectedComponent.position.y)}
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
                      placeholder="Enter text content"
                      className='text-sm h-8'
                    />
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
                      color={color}
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
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className='font-mono text-sm h-8'
                    />
                  </div>
                </CardContent>
              </Card>

              {/* HSL Controls */}
              <Card className='shadow-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-sm'>HSL Controls</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-xs'>
                      <span>Hue: {hue}°</span>
                    </div>
                    <Slider
                      min={0}
                      max={360}
                      value={hue}
                      onChange={handleHueChange}
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
                    <div className='flex justify-between text-xs'>
                      <span>Saturation: {saturation}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      value={saturation}
                      onChange={handleSaturationChange}
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
                    <div className='flex justify-between text-xs'>
                      <span>Lightness: {lightness}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      value={lightness}
                      onChange={handleLightnessChange}
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
                      <span>Opacity: {opacity}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      value={opacity}
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
                            backgroundColor: color,
                            opacity: opacity / 100,
                          }}
                        />
                      </div>
                      <div
                        className='h-12 rounded border border-slate-200 dark:border-slate-700'
                        style={{
                          backgroundColor: `${color}${Math.round(
                            (opacity / 100) * 255
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
                  onClick={() => setColor('#3b82f6')}
                >
                  Reset to Blue
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full'
                  onClick={() => setColor('#ef4444')}
                >
                  Reset to Red
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full'
                  onClick={() => setColor('#10b981')}
                >
                  Reset to Green
                </Button>
              </div>
            </div>
          ) : (
            <div className='text-center py-8'>
              <div className='text-4xl text-slate-300 dark:text-slate-600 mb-4'>
                📋
              </div>
              <h3 className='text-lg font-medium text-slate-600 dark:text-slate-400 mb-2'>
                No Component Selected
              </h3>
              <p className='text-sm text-slate-500 dark:text-slate-500'>
                Select a component from the canvas to view and edit its
                properties
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
