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
import PreviewModal from '@/components/PreviewModal';
import Toast from '@/components/Toast';
import { generateHTMLString, copyToClipboard } from '@/utils/htmlGenerator';
import { Eye, Copy, Check } from 'lucide-react';

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

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
        text:
          componentType === 'text'
            ? 'Default Text'
            : componentType === 'button'
            ? 'Button'
            : undefined,
        color: color,
        opacity: opacity,
        fontSize:
          componentType === 'text'
            ? 16
            : componentType === 'textarea'
            ? 14
            : componentType === 'button'
            ? 14
            : undefined,
        fontWeight: componentType === 'text' ? 'normal' : undefined,
        textAlign: componentType === 'textarea' ? 'left' : undefined,
        // Image properties
        src: componentType === 'image' ? undefined : undefined,
        alt: componentType === 'image' ? 'Image' : undefined,
        width: componentType === 'image' ? 120 : undefined,
        height: componentType === 'image' ? 120 : undefined,
        objectFit: componentType === 'image' ? 'cover' : undefined,
        borderRadius:
          componentType === 'image'
            ? 0
            : componentType === 'button'
            ? 6
            : undefined,
        // Button properties
        url: componentType === 'button' ? undefined : undefined,
        padding: componentType === 'button' ? 8 : undefined,
        backgroundColor: componentType === 'button' ? '#3b82f6' : undefined,
        textColor: componentType === 'button' ? '#ffffff' : undefined,
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
        text:
          componentType === 'text'
            ? 'Default Text'
            : componentType === 'button'
            ? 'Button'
            : undefined,
        color: color,
        opacity: opacity,
        fontSize:
          componentType === 'text'
            ? 16
            : componentType === 'textarea'
            ? 14
            : componentType === 'button'
            ? 14
            : undefined,
        fontWeight: componentType === 'text' ? 'normal' : undefined,
        textAlign: componentType === 'textarea' ? 'left' : undefined,
        // Image properties
        src: componentType === 'image' ? undefined : undefined,
        alt: componentType === 'image' ? 'Image' : undefined,
        width: componentType === 'image' ? 120 : undefined,
        height: componentType === 'image' ? 120 : undefined,
        objectFit: componentType === 'image' ? 'cover' : undefined,
        borderRadius:
          componentType === 'image'
            ? 0
            : componentType === 'button'
            ? 6
            : undefined,
        // Button properties
        url: componentType === 'button' ? undefined : undefined,
        padding: componentType === 'button' ? 8 : undefined,
        backgroundColor: componentType === 'button' ? '#3b82f6' : undefined,
        textColor: componentType === 'button' ? '#ffffff' : undefined,
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

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleCopyHTML = async () => {
    const htmlString = generateHTMLString(canvasComponents);
    const success = await copyToClipboard(htmlString);

    if (success) {
      setToast({
        message: 'HTML copied to clipboard successfully!',
        type: 'success',
        isVisible: true,
      });
    } else {
      setToast({
        message: 'Failed to copy HTML to clipboard',
        type: 'error',
        isVisible: true,
      });
    }
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className='flex flex-col h-screen bg-slate-50 dark:bg-slate-900'>
      {/* Top Toolbar */}
      <div className='flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'>
        <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
          Aura Editor
        </h1>
        <div className='flex items-center gap-2'>
          <Button onClick={handlePreview} className='flex items-center gap-2'>
            <Eye className='h-4 w-4' /> Preview
          </Button>
          <Button onClick={handleCopyHTML} className='flex items-center gap-2'>
            {toast.isVisible && toast.type === 'success' ? (
              <Check className='h-4 w-4 text-green-500' />
            ) : (
              <Copy className='h-4 w-4' />
            )}
            Copy HTML
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Left Panel - Component Palette (20% width) */}
        <div className='w-1/5 h-full border-r border-slate-200 dark:border-slate-700'>
          <Palette onComponentSelect={handlePaletteComponentSelect} />
        </div>

        {/* Middle Panel - Canvas (60% width) */}
        <div className='w-3/5 h-full border-r border-slate-200 dark:border-slate-700'>
          <Canvas
            selectedComponent={selectedComponent}
            canvasComponents={canvasComponents}
            onComponentDrop={handleComponentDrop}
            onComponentSelect={handleComponentSelect}
            onComponentMove={handleComponentMove}
          />
        </div>

        {/* Right Panel - Properties (20% width) */}
        <div className='w-1/5 h-full'>
          <PropertiesPanel
            selectedComponent={selectedComponent}
            canvasComponents={canvasComponents}
            onComponentUpdate={handleComponentUpdate}
          />
        </div>
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        canvasComponents={canvasComponents}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
}

export default App;
