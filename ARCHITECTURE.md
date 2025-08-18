# Aura Editor - Architecture Documentation

This document outlines the architectural decisions, patterns, and technical justifications for the Aura Editor project.

## 🏗️ Architectural Pattern

### React Component-Based Architecture

Aura Editor follows a **React component-based architecture** with **centralized state management** in the main App component. This pattern provides a clean, predictable, and maintainable codebase.

#### Core Architecture Principles

- **Single Source of Truth**: All canvas state managed in `App.tsx`
- **Unidirectional Data Flow**: Props down, events up
- **Component Composition**: Reusable, composable components
- **Separation of Concerns**: UI, logic, and state clearly separated

### State Management Strategy

```
App.tsx (Global State)
├── canvasComponents: CanvasComponent[]
├── selectedComponentId: string | null
├── historyManager: HistoryManager
└── localStorage: CanvasState
```

#### Why Centralized State?

- **Simplicity**: No complex state management libraries
- **Predictability**: Single source of truth for all data
- **Performance**: Minimal re-renders with proper state updates
- **Debugging**: Easy to trace state changes
- **Scalability**: Can easily migrate to Redux/Zustand if needed

## 🎯 Design Decisions

### Why This Architecture?

#### 1. **Simplicity First**

- **No External Dependencies**: No Redux, Zustand, or complex state management
- **React Native Patterns**: Uses built-in React patterns and hooks
- **Easy to Understand**: Clear data flow and component relationships
- **Quick Development**: Faster iteration and feature development

#### 2. **Scalability Considerations**

- **Modular Components**: Easy to add new component types
- **Extensible Properties**: Simple to add new properties to components
- **Plugin Architecture**: Can easily add new features without breaking existing code
- **Performance Optimized**: Efficient re-rendering with proper state management

#### 3. **Maintainability**

- **Type Safety**: Full TypeScript implementation
- **Consistent Patterns**: Standardized component structure
- **Clear Separation**: UI, logic, and state clearly separated
- **Documentation**: Well-documented code and architecture

## 📊 System Flow Diagram

### User Interaction Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Palette   │───▶│    Drag     │───▶│   Canvas    │───▶│ Properties  │
│             │    │             │    │             │    │             │
│ • Text      │    │ • Component │    │ • Drop      │    │ • Edit      │
│ • Image     │    │ • Position  │    │ • Render    │    │ • Update    │
│ • Button    │    │ • Type      │    │ • Select    │    │ • Style     │
│ • Layout    │    │             │    │ • Move      │    │ • Save      │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Component   │    │ Event       │    │ State       │    │ localStorage│
│ Library     │    │ Handling    │    │ Update      │    │ Persistence │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Data Flow Architecture

```
User Action → Event Handler → State Update → Component Re-render → UI Update
     │              │              │              │              │
     ▼              ▼              ▼              ▼              ▼
┌─────────┐   ┌──────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  Drag   │   │ handle   │   │ setState│   │ React   │   │ Visual  │
│  Drop   │   │ Component│   │ Update  │   │ Re-render│   │ Update  │
│  Click  │   │ Drop     │   │ History │   │ Props   │   │ Canvas  │
│  Edit   │   │ Select   │   │ Save    │   │ Down    │   │ Panel   │
└─────────┘   └──────────┘   └─────────┘   └─────────┘   └─────────┘
```

### Component Hierarchy

```
App.tsx (Root)
├── Top Toolbar
│   ├── Preview Button
│   ├── Copy HTML Button
│   ├── Undo/Redo Buttons
│   └── Reset Button
├── Main Layout
│   ├── Palette.tsx (Left Panel)
│   │   └── Component Library
│   ├── Canvas.tsx (Center Panel)
│   │   ├── TextComponent
│   │   ├── ImageComponent
│   │   ├── ButtonComponent
│   │   └── Layout Components
│   └── PropertiesPanel.tsx (Right Panel)
│       ├── Typography Controls
│       ├── Color Pickers
│       ├── Dimension Controls
│       └── Advanced Styling
└── Modals
    ├── PreviewModal.tsx
    └── ConfirmDialog.tsx
```

## 🛠️ Technical Justifications

### Technology Stack Decisions

#### 1. **React 18 + TypeScript**

**Why React?**

- **Component Reusability**: Easy to create reusable UI components
- **Virtual DOM**: Efficient updates and rendering
- **Ecosystem**: Rich ecosystem of libraries and tools
- **Developer Experience**: Excellent tooling and debugging

**Why TypeScript?**

- **Type Safety**: Prevents runtime errors and improves code quality
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Documentation**: Types serve as living documentation
- **Maintainability**: Easier to maintain and refactor code

#### 2. **Native HTML5 Drag and Drop**

**Why Native Events?**

- **No External Dependencies**: Meets constraint of no drag-and-drop libraries
- **Performance**: Native browser implementation is highly optimized
- **Accessibility**: Built-in accessibility features
- **Customization**: Full control over drag behavior and visual feedback

**Implementation:**

```typescript
// Drag start
onDragStart={(e) => {
  e.dataTransfer.setData('componentType', componentType);
  e.dataTransfer.effectAllowed = 'copy';
}}

// Drop handling
onDrop={(e) => {
  e.preventDefault();
  const componentType = e.dataTransfer.getData('componentType');
  handleComponentDrop(componentType, x, y);
}}
```

#### 3. **rc-slider for Number Controls**

**Why rc-slider?**

- **Rich Features**: Range sliders, custom styling, keyboard support
- **Accessibility**: Built-in ARIA support
- **Customization**: Highly customizable appearance and behavior
- **Performance**: Efficient rendering and updates

**Usage:**

```typescript
<Slider
  value={fontSize}
  min={8}
  max={72}
  onChange={handleFontSizeChange}
  trackStyle={{ backgroundColor: '#3b82f6' }}
  handleStyle={{ borderColor: '#3b82f6' }}
/>
```

#### 4. **react-colorful for Color Pickers**

**Why react-colorful?**

- **Modern UI**: Beautiful, modern color picker interface
- **Lightweight**: Small bundle size
- **Accessibility**: Full keyboard navigation support
- **Customization**: Multiple color picker types (Hex, RGB, HSL)

**Usage:**

```typescript
<HexColorPicker
  color={backgroundColor}
  onChange={handleColorChange}
  className='w-full h-32'
/>
```

#### 5. **Tailwind CSS for Styling**

**Why Tailwind?**

- **Utility-First**: Rapid UI development
- **Consistency**: Design system built-in
- **Performance**: Only includes used styles in production
- **Dark Mode**: Built-in dark mode support

### State Management Approach

#### Why useState Instead of Redux/Zustand?

1. **Simplicity**

   - No additional dependencies
   - No boilerplate code
   - Easier to understand and debug

2. **Performance**

   - React's built-in optimizations
   - Minimal re-renders with proper state structure
   - No external state management overhead

3. **Scalability**
   - Can easily migrate to Redux/Zustand if needed
   - Clear separation of concerns
   - Modular state updates

#### State Structure

```typescript
interface AppState {
  // Canvas components
  canvasComponents: CanvasComponent[];

  // Selection state
  selectedComponentId: string | null;

  // UI state
  isPreviewOpen: boolean;
  isResetDialogOpen: boolean;

  // History state
  historyManager: HistoryManager;

  // Toast notifications
  toast: ToastState;
}
```

## 🔄 Undo/Redo Implementation

### History Management Approach

#### Why Array-Based History?

1. **Simplicity**

   - Simple push/pop operations
   - Easy to understand and debug
   - No complex state management

2. **Performance**

   - Fast array operations
   - Minimal memory overhead
   - Efficient state restoration

3. **Reliability**
   - No external dependencies
   - Predictable behavior
   - Easy to test and validate

#### Implementation Details

```typescript
class HistoryManager {
  private history: CanvasComponent[][] = [];
  private future: CanvasComponent[][] = [];
  private maxSize: number = 50;

  push(state: CanvasComponent[], action: string) {
    // Add current state to history
    this.history.push(JSON.parse(JSON.stringify(state)));

    // Clear future states when new action is performed
    this.future = [];

    // Maintain history size limit
    if (this.history.length > this.maxSize) {
      this.history.shift();
    }
  }

  undo(): CanvasComponent[] | null {
    if (this.history.length === 0) return null;

    const currentState = this.history.pop()!;
    this.future.push(currentState);

    return this.history[this.history.length - 1] || [];
  }

  redo(): CanvasComponent[] | null {
    if (this.future.length === 0) return null;

    const futureState = this.future.pop()!;
    this.history.push(futureState);

    return futureState;
  }
}
```

### History Triggers

#### When History is Updated

1. **Component Addition**: New component dropped on canvas
2. **Component Deletion**: Component removed from canvas
3. **Component Movement**: Component position changed (final position only)
4. **Property Changes**: Component properties modified
5. **Canvas Reset**: All components cleared

#### When History is NOT Updated

1. **Intermediate Drag**: During component dragging (only final position saved)
2. **Selection Changes**: Component selection/deselection
3. **UI State Changes**: Modal opens/closes, toast notifications

## 🎨 Component Architecture

### Component Design Patterns

#### 1. **Functional Components with Hooks**

```typescript
const TextComponent: React.FC<TextComponentProps> = ({
  id,
  position,
  customProps,
  isSelected,
  onSelect,
  onMouseDown,
}) => {
  const [editText, setEditText] = useState(customProps.text || 'Default Text');
  const [isEditing, setIsEditing] = useState(false);

  // Component logic and event handlers

  return (
    <div className='text-component' style={componentStyles}>
      {/* Component content */}
    </div>
  );
};
```

#### 2. **Props Interface Pattern**

```typescript
interface ComponentProps {
  id: string;
  position: { x: number; y: number };
  customProps: ComponentCustomProps;
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (componentId: string) => void;
  onMouseDown: (e: React.MouseEvent, componentId: string) => void;
  zIndex: number;
}
```

#### 3. **Event Handler Pattern**

```typescript
const handleClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  onSelect(id);
};

const handleMouseDown = (e: React.MouseEvent) => {
  onMouseDown(e, id);
};
```

## 🔧 Performance Optimizations

### 1. **Efficient Re-rendering**

- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoizes event handlers
- **useMemo**: Memoizes expensive calculations

### 2. **State Updates**

- **Batch Updates**: Multiple state updates in single render cycle
- **Immutable Updates**: Proper state immutability patterns
- **Selective Updates**: Only update changed components

### 3. **Memory Management**

- **History Limits**: Maximum 50 history states
- **Cleanup**: Proper cleanup of event listeners
- **Garbage Collection**: Efficient object creation and disposal

## 🚀 Scalability Considerations

### Future Enhancements

#### 1. **State Management Migration**

- Easy migration to Redux/Zustand if needed
- Clear separation of concerns
- Modular state structure

#### 2. **Component System**

- Plugin architecture for new components
- Extensible property system
- Component composition patterns

#### 3. **Performance Scaling**

- Virtual scrolling for large canvases
- Component lazy loading
- Web Workers for heavy computations

### Architecture Benefits

1. **Maintainability**: Clear structure and patterns
2. **Testability**: Easy to unit test components
3. **Extensibility**: Simple to add new features
4. **Performance**: Optimized for current use cases
5. **Developer Experience**: Excellent tooling support

This architecture provides a solid foundation for the Aura Editor while maintaining simplicity, performance, and scalability for future development.
