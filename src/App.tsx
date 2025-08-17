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

function App() {
  const [color, setColor] = useState('#3b82f6');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [opacity, setOpacity] = useState(100);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
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
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2'>
            Aura Editor
          </h1>
          <p className='text-slate-600 dark:text-slate-400'>
            Advanced color and design tool with real-time preview
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Color Picker Section */}
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle>Color Picker</CardTitle>
              <CardDescription>
                Select colors using the interactive color picker
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-center'>
                <HexColorPicker color={color} onChange={handleColorChange} />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='hex-input'>Hex Color</Label>
                <Input
                  id='hex-input'
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className='font-mono'
                />
              </div>
            </CardContent>
          </Card>

          {/* Color Preview Section */}
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle>Color Preview</CardTitle>
              <CardDescription>
                See your selected color in different contexts
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <div
                    className='w-12 h-12 rounded-lg border-2 border-slate-200 dark:border-slate-700'
                    style={{ backgroundColor: color }}
                  />
                  <span className='text-sm text-slate-600 dark:text-slate-400'>
                    Selected Color
                  </span>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div
                    className='h-16 rounded-lg border border-slate-200 dark:border-slate-700'
                    style={{ backgroundColor: color }}
                  />
                  <div
                    className='h-16 rounded-lg border border-slate-200 dark:border-slate-700'
                    style={{ backgroundColor: `${color}80` }}
                  />
                  <div
                    className='h-16 rounded-lg border border-slate-200 dark:border-slate-700'
                    style={{ backgroundColor: `${color}40` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* HSL Controls Section */}
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle>HSL Controls</CardTitle>
              <CardDescription>
                Fine-tune colors using HSL sliders
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <Label>Hue: {hue}°</Label>
                  <span className='text-sm text-slate-500'>{hue}°</span>
                </div>
                <Slider
                  min={0}
                  max={360}
                  value={hue}
                  onChange={handleHueChange}
                  trackStyle={{ backgroundColor: '#3b82f6', height: 6 }}
                  handleStyle={{
                    borderColor: '#3b82f6',
                    height: 20,
                    width: 20,
                    marginTop: -7,
                  }}
                  railStyle={{ backgroundColor: '#e2e8f0', height: 6 }}
                />
              </div>

              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <Label>Saturation: {saturation}%</Label>
                  <span className='text-sm text-slate-500'>{saturation}%</span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  value={saturation}
                  onChange={handleSaturationChange}
                  trackStyle={{ backgroundColor: '#3b82f6', height: 6 }}
                  handleStyle={{
                    borderColor: '#3b82f6',
                    height: 20,
                    width: 20,
                    marginTop: -7,
                  }}
                  railStyle={{ backgroundColor: '#e2e8f0', height: 6 }}
                />
              </div>

              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <Label>Lightness: {lightness}%</Label>
                  <span className='text-sm text-slate-500'>{lightness}%</span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  value={lightness}
                  onChange={handleLightnessChange}
                  trackStyle={{ backgroundColor: '#3b82f6', height: 6 }}
                  handleStyle={{
                    borderColor: '#3b82f6',
                    height: 20,
                    width: 20,
                    marginTop: -7,
                  }}
                  railStyle={{ backgroundColor: '#e2e8f0', height: 6 }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Opacity Control Section */}
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle>Opacity Control</CardTitle>
              <CardDescription>
                Adjust the transparency of your color
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <Label>Opacity: {opacity}%</Label>
                  <span className='text-sm text-slate-500'>{opacity}%</span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  value={opacity}
                  onChange={handleOpacityChange}
                  trackStyle={{ backgroundColor: '#3b82f6', height: 6 }}
                  handleStyle={{
                    borderColor: '#3b82f6',
                    height: 20,
                    width: 20,
                    marginTop: -7,
                  }}
                  railStyle={{ backgroundColor: '#e2e8f0', height: 6 }}
                />
              </div>

              <div className='space-y-2'>
                <Label>Preview with Opacity</Label>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='h-16 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center'>
                    <div
                      className='w-12 h-12 rounded-lg'
                      style={{
                        backgroundColor: color,
                        opacity: opacity / 100,
                      }}
                    />
                  </div>
                  <div
                    className='h-16 rounded-lg border border-slate-200 dark:border-slate-700'
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
        </div>

        {/* Action Buttons */}
        <div className='mt-8 flex justify-center space-x-4'>
          <Button variant='outline' onClick={() => setColor('#3b82f6')}>
            Reset to Blue
          </Button>
          <Button variant='outline' onClick={() => setColor('#ef4444')}>
            Reset to Red
          </Button>
          <Button variant='outline' onClick={() => setColor('#10b981')}>
            Reset to Green
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
