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
import PropertiesPanel from '@/components/PropertiesPanel';

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

function App() {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('');
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>(
    []
  );
  const [color, setColor] = useState('#3b82f6');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [opacity, setOpacity] = useState(100);

  // Get the currently selected component
  const selectedComponent =
    canvasComponents.find((comp) => comp.id === selectedComponentId) || null;

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (selectedComponentId) {
      // Update the selected component's color on canvas
      setCanvasComponents((prev) =>
        prev.map((comp) =>
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
      setCanvasComponents((prev) =>
        prev.map((comp) =>
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
        fontSize: componentType === 'text' ? 16 : undefined,
        fontWeight: componentType === 'text' ? 'normal' : undefined,
      },
    };

    setCanvasComponents((prev) => [...prev, newComponent]);
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
        fontSize: componentType === 'text' ? 16 : undefined,
        fontWeight: componentType === 'text' ? 'normal' : undefined,
      },
    };

    setCanvasComponents((prev) => [...prev, newComponent]);
    setSelectedComponentId(newComponent.id);
  };

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponentId(componentId);

    if (componentId && componentId !== '') {
      const component = canvasComponents.find(
        (comp) => comp.id === componentId
      );
      if (component) {
        setColor(component.props.color);
        setOpacity(component.props.opacity);
      }
    }
  };

  const handleComponentMove = (
    componentId: string,
    newPosition: { x: number; y: number }
  ) => {
    setCanvasComponents((prev) =>
      prev.map((comp) =>
        comp.id === componentId ? { ...comp, position: newPosition } : comp
      )
    );
  };

  const handleComponentUpdate = (
    componentId: string,
    updates: Partial<CanvasComponent['props']>
  ) => {
    setCanvasComponents((prev) =>
      prev.map((comp) =>
        comp.id === componentId
          ? { ...comp, props: { ...comp.props, ...updates } }
          : comp
      )
    );

    // Update local state if it's the selected component
    if (componentId === selectedComponentId) {
      if (updates.color !== undefined) {
        setColor(updates.color);
      }
      if (updates.opacity !== undefined) {
        setOpacity(updates.opacity);
      }
    }
  };

  const handleTextChange = (newText: string) => {
    if (selectedComponentId) {
      setCanvasComponents((prev) =>
        prev.map((comp) =>
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
          onComponentMove={handleComponentMove}
        />
      </div>

      {/* Right Panel - Properties Panel (20% width) */}
      <div className='w-1/5 h-screen'>
        <PropertiesPanel
          selectedComponent={selectedComponent}
          canvasComponents={canvasComponents}
          onComponentUpdate={handleComponentUpdate}
        />
      </div>
    </div>
  );
}

export default App;
