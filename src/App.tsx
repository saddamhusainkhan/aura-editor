import { useState, useEffect, useRef } from 'react';
import Palette from '@/components/Palette';
import Canvas from '@/components/Canvas';
import PropertiesPanel from '@/components/PropertiesPanel';
import PreviewModal from '@/components/PreviewModal';
import Toast from '@/components/Toast';
import ConfirmDialog from '@/components/ConfirmDialog';
import HistoryInfo from '@/components/HistoryInfo';
import { generateHTMLString, copyToClipboard } from '@/utils/htmlGenerator';
import { storage } from '@/utils/storage';
import type { CanvasComponent } from '@/utils/storage';
import { HistoryManager } from '@/utils/history';
import { Button } from '@/components/ui/button';
import { Eye, Copy, Check, RotateCcw, Undo2, Redo2 } from 'lucide-react';

function App() {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('');
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>(
    []
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const historyManager = useRef(new HistoryManager());
  const selectedComponent =
    canvasComponents.find((comp) => comp.id === selectedComponentId) || null;

  // Load canvas components from localStorage on mount
  useEffect(() => {
    const savedCanvas = storage.loadCanvas();
    if (savedCanvas) {
      setCanvasComponents(savedCanvas);
      // Initialize history with loaded state
      historyManager.current.push(savedCanvas, 'Session loaded');
      setToast({
        message: `Canvas loaded from previous session (${savedCanvas.length} components)`,
        type: 'info',
        isVisible: true,
      });
    }
  }, []);

  // Save canvas components to localStorage whenever they change
  useEffect(() => {
    const success = storage.saveCanvas(canvasComponents);
    if (!success) {
      setToast({
        message: 'Failed to save canvas to localStorage',
        type: 'error',
        isVisible: true,
      });
    }
  }, [canvasComponents]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + R for reset
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        if (canvasComponents.length > 0) {
          handleResetClick();
        }
      }

      // Ctrl/Cmd + Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }

      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y for redo
      if (
        (e.ctrlKey || e.metaKey) &&
        ((e.shiftKey && e.key === 'z') || e.key === 'y')
      ) {
        e.preventDefault();
        handleRedo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canvasComponents.length]);

  // Helper function to update canvas with history tracking
  const updateCanvasWithHistory = (
    newComponents: CanvasComponent[],
    action: string
  ) => {
    setCanvasComponents(newComponents);
    historyManager.current.push(newComponents, action);
  };

  const handlePaletteComponentSelect = (componentType: string) => {
    const newComponent: CanvasComponent = {
      id: Date.now().toString(),
      type: componentType,
      position: { x: 50, y: 50 },
      zIndex: 1,
      props: {
        text:
          componentType === 'text'
            ? 'Default Text'
            : componentType === 'button'
            ? 'Button'
            : undefined,
        color: '#3b82f6',
        opacity: 100,
        fontSize:
          componentType === 'text'
            ? 16
            : componentType === 'textarea'
            ? 14
            : componentType === 'button'
            ? 14
            : undefined,
        fontWeight: componentType === 'text' ? 'normal' : undefined,
        fontStyle:
          componentType === 'text' || componentType === 'textarea'
            ? 'normal'
            : undefined,
        textDecoration:
          componentType === 'text' || componentType === 'textarea'
            ? 'none'
            : undefined,
        textAlign: componentType === 'textarea' ? 'left' : undefined,
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
        borderRadiusTop: componentType === 'button' ? 6 : 0,
        borderRadiusRight: componentType === 'button' ? 6 : 0,
        borderRadiusBottom: componentType === 'button' ? 6 : 0,
        borderRadiusLeft: componentType === 'button' ? 6 : 0,
        url: componentType === 'button' ? undefined : undefined,
        padding: componentType === 'button' ? 8 : undefined,
        paddingTop:
          componentType === 'button'
            ? 8
            : componentType === 'text' || componentType === 'textarea'
            ? 8
            : 0,
        paddingRight:
          componentType === 'button'
            ? 8
            : componentType === 'text' || componentType === 'textarea'
            ? 12
            : 0,
        paddingBottom:
          componentType === 'button'
            ? 8
            : componentType === 'text' || componentType === 'textarea'
            ? 8
            : 0,
        paddingLeft:
          componentType === 'button'
            ? 8
            : componentType === 'text' || componentType === 'textarea'
            ? 12
            : 0,
        backgroundColor: componentType === 'button' ? '#3b82f6' : undefined,
        textColor: componentType === 'button' ? '#ffffff' : undefined,
      },
    };

    updateCanvasWithHistory(
      [...canvasComponents, newComponent],
      'Component added'
    );
    setSelectedComponentId(newComponent.id);
  };

  const handleComponentDrop = (componentType: string, x: number, y: number) => {
    const newComponent: CanvasComponent = {
      id: Date.now().toString(),
      type: componentType,
      position: { x, y },
      zIndex: 1,
      props: {
        text:
          componentType === 'text'
            ? 'Default Text'
            : componentType === 'button'
            ? 'Button'
            : undefined,
        color: '#3b82f6',
        opacity: 100,
        fontSize:
          componentType === 'text'
            ? 16
            : componentType === 'textarea'
            ? 14
            : componentType === 'button'
            ? 14
            : undefined,
        fontWeight: componentType === 'text' ? 'normal' : undefined,
        fontStyle:
          componentType === 'text' || componentType === 'textarea'
            ? 'normal'
            : undefined,
        textDecoration:
          componentType === 'text' || componentType === 'textarea'
            ? 'none'
            : undefined,
        textAlign: componentType === 'textarea' ? 'left' : undefined,
        src: componentType === 'image' ? undefined : undefined,
        alt: componentType === 'image' ? 'Image' : undefined,
        width:
          componentType === 'image'
            ? 120
            : componentType === 'container'
            ? 400
            : componentType === 'row'
            ? 600
            : componentType === 'column'
            ? 200
            : undefined,
        height:
          componentType === 'image'
            ? 120
            : componentType === 'container'
            ? 300
            : componentType === 'row'
            ? 100
            : componentType === 'column'
            ? 150
            : undefined,
        objectFit: componentType === 'image' ? 'cover' : undefined,
        borderRadius:
          componentType === 'image'
            ? 0
            : componentType === 'button'
            ? 6
            : componentType === 'container'
            ? 8
            : componentType === 'row'
            ? 6
            : componentType === 'column'
            ? 6
            : undefined,
        borderRadiusTop:
          componentType === 'button'
            ? 6
            : componentType === 'container'
            ? 8
            : componentType === 'row'
            ? 6
            : componentType === 'column'
            ? 6
            : 0,
        borderRadiusRight:
          componentType === 'button'
            ? 6
            : componentType === 'container'
            ? 8
            : componentType === 'row'
            ? 6
            : componentType === 'column'
            ? 6
            : 0,
        borderRadiusBottom:
          componentType === 'button'
            ? 6
            : componentType === 'container'
            ? 8
            : componentType === 'row'
            ? 6
            : componentType === 'column'
            ? 6
            : 0,
        borderRadiusLeft:
          componentType === 'button'
            ? 6
            : componentType === 'container'
            ? 8
            : componentType === 'row'
            ? 6
            : componentType === 'column'
            ? 6
            : 0,
        url: componentType === 'button' ? undefined : undefined,
        padding:
          componentType === 'button'
            ? 8
            : componentType === 'container'
            ? 16
            : componentType === 'row'
            ? 16
            : componentType === 'column'
            ? 16
            : undefined,
        paddingTop:
          componentType === 'button'
            ? 8
            : componentType === 'text' || componentType === 'textarea'
            ? 8
            : componentType === 'container'
            ? 16
            : componentType === 'row'
            ? 16
            : componentType === 'column'
            ? 16
            : 0,
        paddingRight:
          componentType === 'button'
            ? 8
            : componentType === 'text' || componentType === 'textarea'
            ? 12
            : componentType === 'container'
            ? 16
            : componentType === 'row'
            ? 16
            : componentType === 'column'
            ? 16
            : 0,
        paddingBottom:
          componentType === 'button'
            ? 8
            : componentType === 'text' || componentType === 'textarea'
            ? 8
            : componentType === 'container'
            ? 16
            : componentType === 'row'
            ? 16
            : componentType === 'column'
            ? 16
            : 0,
        paddingLeft:
          componentType === 'button'
            ? 8
            : componentType === 'text' || componentType === 'textarea'
            ? 12
            : componentType === 'container'
            ? 16
            : componentType === 'row'
            ? 16
            : componentType === 'column'
            ? 16
            : 0,
        backgroundColor:
          componentType === 'button'
            ? '#3b82f6'
            : componentType === 'container'
            ? '#f8fafc'
            : componentType === 'row'
            ? '#f0f9ff'
            : componentType === 'column'
            ? '#fdf2f8'
            : undefined,
        textColor: componentType === 'button' ? '#ffffff' : undefined,
        // Layout-specific properties
        maxWidth: componentType === 'container' ? 1200 : undefined,
        gridSpan: componentType === 'column' ? 6 : undefined,
        gap:
          componentType === 'row'
            ? 16
            : componentType === 'column'
            ? 16
            : undefined,
        justifyContent:
          componentType === 'row'
            ? 'flex-start'
            : componentType === 'column'
            ? 'flex-start'
            : undefined,
        alignItems:
          componentType === 'row'
            ? 'center'
            : componentType === 'column'
            ? 'flex-start'
            : undefined,
        borderColor:
          componentType === 'container'
            ? '#e2e8f0'
            : componentType === 'row'
            ? '#0ea5e9'
            : componentType === 'column'
            ? '#ec4899'
            : undefined,
        borderWidth:
          componentType === 'container'
            ? 1
            : componentType === 'row'
            ? 1
            : componentType === 'column'
            ? 1
            : undefined,
      },
    };

    updateCanvasWithHistory(
      [...canvasComponents, newComponent],
      'Component added'
    );
    setSelectedComponentId(newComponent.id);
  };

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponentId(componentId);
  };

  const handleComponentMove = (
    componentId: string,
    newPosition: { x: number; y: number }
  ) => {
    updateCanvasWithHistory(
      canvasComponents.map((comp) =>
        comp.id === componentId ? { ...comp, position: newPosition } : comp
      ),
      'Component moved'
    );
  };

  const handleComponentMoveWithoutHistory = (
    componentId: string,
    newPosition: { x: number; y: number }
  ) => {
    setCanvasComponents(
      canvasComponents.map((comp) =>
        comp.id === componentId ? { ...comp, position: newPosition } : comp
      )
    );
  };

  const handleComponentUpdate = (
    componentId: string,
    updates: Partial<CanvasComponent['props']>
  ) => {
    updateCanvasWithHistory(
      canvasComponents.map((comp) =>
        comp.id === componentId
          ? { ...comp, props: { ...comp.props, ...updates } }
          : comp
      ),
      'Component updated'
    );
  };

  const handleZIndexUpdate = (componentId: string, newZIndex: number) => {
    updateCanvasWithHistory(
      canvasComponents.map((comp) =>
        comp.id === componentId ? { ...comp, zIndex: newZIndex } : comp
      ),
      'Z-index updated'
    );
  };

  const handleComponentDelete = (componentId: string) => {
    updateCanvasWithHistory(
      canvasComponents.filter((comp) => comp.id !== componentId),
      'Component deleted'
    );

    // Clear selection if the deleted component was selected
    if (selectedComponentId === componentId) {
      setSelectedComponentId('');
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

  const handleUndo = () => {
    const previousState = historyManager.current.undo();
    if (previousState !== null) {
      setCanvasComponents(previousState);
      setToast({
        message: `Undone: ${
          historyManager.current.getLastAction() || 'Previous action'
        }`,
        type: 'info',
        isVisible: true,
      });
    }
  };

  const handleRedo = () => {
    const nextState = historyManager.current.redo();
    if (nextState !== null) {
      setCanvasComponents(nextState);
      setToast({
        message: `Redone: ${
          historyManager.current.getLastAction() || 'Next action'
        }`,
        type: 'info',
        isVisible: true,
      });
    }
  };

  const handleResetClick = () => {
    setIsResetDialogOpen(true);
  };

  const handleResetConfirm = () => {
    setCanvasComponents([]);
    setSelectedComponentId('');
    const success = storage.clearCanvas();
    historyManager.current.clear();
    if (success) {
      setToast({
        message: 'Canvas reset successfully',
        type: 'success',
        isVisible: true,
      });
    } else {
      setToast({
        message: 'Canvas reset but failed to clear localStorage',
        type: 'warning',
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
        <div className='flex items-center gap-4'>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
            Aura Editor
          </h1>
          {storage.hasCanvas() && (
            <div className='flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span>Auto-saved</span>
              <span className='text-xs'>
                ({canvasComponents.length} component
                {canvasComponents.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}
          <div className='flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400'>
            <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
            <span>History</span>
            <span className='text-xs'>
              ({historyManager.current.getHistorySize()}/
              {historyManager.current.getStats().maxSize})
            </span>
            <HistoryInfo
              historySize={historyManager.current.getHistorySize()}
              maxSize={historyManager.current.getStats().maxSize}
              canUndo={historyManager.current.canUndo()}
              canRedo={historyManager.current.canRedo()}
              lastAction={historyManager.current.getLastAction()}
            />
          </div>
        </div>
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
          <Button
            onClick={handleUndo}
            className='flex items-center gap-2'
            variant='outline'
            title='Undo (Ctrl/Cmd + Z)'
            disabled={!historyManager.current.canUndo()}
          >
            <Undo2 className='h-4 w-4' /> Undo
          </Button>
          <Button
            onClick={handleRedo}
            className='flex items-center gap-2'
            variant='outline'
            title='Redo (Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y)'
            disabled={!historyManager.current.canRedo()}
          >
            <Redo2 className='h-4 w-4' /> Redo
          </Button>
          <Button
            onClick={handleResetClick}
            className='flex items-center gap-2'
            variant='outline'
            title='Reset canvas (Ctrl/Cmd + R)'
          >
            <RotateCcw className='h-4 w-4' /> Reset
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
            onComponentUpdate={handleComponentUpdate}
            onComponentDelete={handleComponentDelete}
            onComponentMoveWithoutHistory={handleComponentMoveWithoutHistory}
            onZIndexUpdate={handleZIndexUpdate}
          />
        </div>

        {/* Right Panel - Properties (20% width) */}
        <div className='w-1/5 h-full'>
          <PropertiesPanel
            selectedComponent={selectedComponent}
            canvasComponents={canvasComponents}
            onComponentUpdate={handleComponentUpdate}
            onZIndexUpdate={handleZIndexUpdate}
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
      <ConfirmDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={handleResetConfirm}
        title='Confirm Reset'
        message='Are you sure you want to reset the canvas? This action cannot be undone.'
      />
    </div>
  );
}

export default App;
