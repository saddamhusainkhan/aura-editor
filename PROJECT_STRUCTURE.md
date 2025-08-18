# Aura Editor - Project Structure

This document provides a detailed overview of the Aura Editor project structure, explaining the purpose of each folder and component file.

## 📁 Root Directory

```
aura-editor/
├── src/                    # Source code directory
├── public/                 # Static assets and HTML template
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
├── index.html             # Entry HTML file
├── README.md              # Project documentation
└── PROJECT_STRUCTURE.md   # This file
```

## 📁 Source Code (`src/`)

### Main Application Files

```
src/
├── main.tsx               # Application entry point
├── App.tsx                # Main application component
├── index.css              # Global styles and Tailwind imports
└── vite-env.d.ts          # Vite type definitions
```

#### `main.tsx`

- **Purpose**: Application entry point
- **Function**: Renders the root App component to the DOM
- **Key Features**: React 18 StrictMode, CSS imports

#### `App.tsx`

- **Purpose**: Main application component and state management
- **Function**: Manages global state, layout, and component interactions
- **Key Features**:
  - Canvas components state management
  - Undo/redo history system
  - localStorage persistence
  - Component drop handling
  - Keyboard shortcuts

#### `index.css`

- **Purpose**: Global styles and Tailwind CSS imports
- **Function**: Base styles, custom CSS variables, Tailwind directives

## 📁 Components (`src/components/`)

### UI Components (`src/components/ui/`)

```
src/components/ui/
├── button.tsx             # Button component (shadcn/ui)
├── card.tsx               # Card component (shadcn/ui)
├── input.tsx              # Input component (shadcn/ui)
└── label.tsx              # Label component (shadcn/ui)
```

#### `button.tsx`

- **Purpose**: Reusable button component
- **Usage**: Used throughout the application for consistent button styling
- **Features**: Variants (default, outline), sizes, disabled states

#### `card.tsx`

- **Purpose**: Card container component
- **Usage**: Wraps content sections in properties panel
- **Features**: Header, content, and footer sections

#### `input.tsx`

- **Purpose**: Form input component
- **Usage**: Text inputs in properties panel
- **Features**: Various input types, validation states

#### `label.tsx`

- **Purpose**: Form label component
- **Usage**: Labels for form controls in properties panel
- **Features**: Associated with form controls

### Core Editor Components

```
src/components/
├── Canvas.tsx             # Main canvas component
├── Palette.tsx            # Component palette (left panel)
├── PropertiesPanel.tsx    # Properties editor (right panel)
├── PreviewModal.tsx       # HTML preview modal
├── Toast.tsx              # Notification toast component
├── ConfirmDialog.tsx      # Confirmation dialog component
└── HistoryInfo.tsx        # History information component
```

#### `Canvas.tsx`

- **Purpose**: Main design canvas where components are placed
- **Function**: Handles component rendering, selection, and movement
- **Key Features**:
  - Drop zone for components
  - Component selection and movement
  - Z-index management
  - Component rendering logic

#### `Palette.tsx`

- **Purpose**: Left panel containing draggable components
- **Function**: Provides component library for drag-and-drop
- **Key Features**:
  - Component icons and labels
  - Drag source for components
  - Visual component categories

#### `PropertiesPanel.tsx`

- **Purpose**: Right panel for editing component properties
- **Function**: Provides controls for selected component properties
- **Key Features**:
  - Typography controls (font size, weight, style)
  - Color pickers (text, background, border)
  - Dimension controls (width, height, padding)
  - Advanced styling options

#### `PreviewModal.tsx`

- **Purpose**: Modal for previewing generated HTML
- **Function**: Shows live preview of the canvas as HTML
- **Key Features**:
  - Desktop, tablet, and mobile views
  - HTML generation and display
  - Responsive preview modes

#### `Toast.tsx`

- **Purpose**: Notification system for user feedback
- **Function**: Shows success, error, and info messages
- **Key Features**: Auto-dismiss, different types, positioning

#### `ConfirmDialog.tsx`

- **Purpose**: Confirmation dialogs for destructive actions
- **Function**: Confirms actions like canvas reset
- **Key Features**: Yes/no options, custom messages

#### `HistoryInfo.tsx`

- **Purpose**: Displays history information in toolbar
- **Function**: Shows undo/redo status and history size
- **Key Features**: History statistics, visual indicators

### Component Renderers

```
src/components/
├── TextComponent.tsx      # Text component renderer
├── TextAreaComponent.tsx  # TextArea component renderer
├── ImageComponent.tsx     # Image component renderer
├── ButtonComponent.tsx    # Button component renderer
├── ContainerComponent.tsx # Container component renderer
├── RowComponent.tsx       # Row component renderer
├── ColumnComponent.tsx    # Column component renderer
├── LayoutComponent.tsx    # Layout component renderer
└── SectionComponent.tsx   # Section component renderer
```

#### `TextComponent.tsx`

- **Purpose**: Renders text components on the canvas
- **Function**: Displays and manages text content
- **Key Features**:
  - Inline text editing
  - Typography controls (bold, italic, underline)
  - Real-time text updates
  - Style synchronization

#### `TextAreaComponent.tsx`

- **Purpose**: Renders textarea components on the canvas
- **Function**: Displays and manages multi-line text content
- **Key Features**:
  - Multi-line text editing
  - Typography controls
  - Font weight support
  - Style inheritance

#### `ImageComponent.tsx`

- **Purpose**: Renders image components on the canvas
- **Function**: Displays and manages image content
- **Key Features**:
  - Image URL management
  - Percentage-based width control
  - Positioning (left, center, right)
  - Object-fit controls

#### `ButtonComponent.tsx`

- **Purpose**: Renders button components on the canvas
- **Function**: Displays and manages interactive buttons
- **Key Features**:
  - Button text editing
  - URL linking
  - Styling controls
  - Hover effects

#### `ContainerComponent.tsx`

- **Purpose**: Renders container layout components
- **Function**: Provides layout containers for other components
- **Key Features**:
  - Layout container styling
  - Drop zones for content
  - Responsive design
  - Background and border controls

#### `RowComponent.tsx`

- **Purpose**: Renders horizontal row layout components
- **Function**: Creates horizontal flexbox layouts
- **Key Features**:
  - Horizontal flexbox layout
  - Column drop zones
  - Gap and alignment controls
  - Responsive behavior

#### `ColumnComponent.tsx`

- **Purpose**: Renders vertical column layout components
- **Function**: Creates vertical layouts with 12-grid system
- **Key Features**:
  - 12-grid system support
  - Grid span controls
  - Vertical layout
  - Content drop zones

#### `LayoutComponent.tsx`

- **Purpose**: Renders website layout containers
- **Function**: Provides main layout structure for websites
- **Key Features**:
  - Full-width layout containers
  - Section drop zones
  - Professional layout styling
  - Header controls

#### `SectionComponent.tsx`

- **Purpose**: Renders individual sections within layouts
- **Function**: Creates reorderable sections for layouts
- **Key Features**:
  - Drag-and-drop reordering
  - Section titles
  - Content drop zones
  - Professional styling

## 📁 Utilities (`src/utils/`)

```
src/utils/
├── storage.ts             # localStorage management
├── history.ts             # Undo/redo system
└── htmlGenerator.ts       # HTML export utilities
```

#### `storage.ts`

- **Purpose**: Manages localStorage persistence
- **Function**: Saves and loads canvas state
- **Key Features**:
  - Canvas state serialization
  - localStorage operations
  - Data validation
  - Error handling

#### `history.ts`

- **Purpose**: Manages undo/redo functionality
- **Function**: Tracks component state changes
- **Key Features**:
  - History stack management
  - State snapshots
  - Undo/redo operations
  - History size limits

#### `htmlGenerator.ts`

- **Purpose**: Generates HTML from canvas components
- **Function**: Converts component state to HTML
- **Key Features**:
  - Component-to-HTML conversion
  - Style generation
  - Clipboard operations
  - HTML formatting

## 📁 Public Assets (`public/`)

```
public/
├── favicon.ico            # Browser favicon
├── vite.svg              # Vite logo (placeholder)
└── index.html            # HTML template (if not in root)
```

## 📁 Configuration Files

### `package.json`

- **Purpose**: Project metadata and dependencies
- **Key Sections**:
  - Project information
  - Dependencies (React, TypeScript, Tailwind, etc.)
  - Development dependencies
  - Scripts (start, build, dev)

### `tsconfig.json`

- **Purpose**: TypeScript configuration
- **Key Features**:
  - Compiler options
  - Path aliases (@/)
  - Target and module settings
  - Strict type checking

### `tailwind.config.js`

- **Purpose**: Tailwind CSS configuration
- **Key Features**:
  - Content paths
  - Theme customization
  - Plugin configuration
  - Dark mode settings

### `vite.config.ts`

- **Purpose**: Vite build tool configuration
- **Key Features**:
  - Development server settings
  - Build optimization
  - Plugin configuration
  - Path resolution

## 🔄 Data Flow

### Component State Management

```
App.tsx (Global State)
├── Canvas.tsx (Rendering)
├── PropertiesPanel.tsx (Editing)
├── Palette.tsx (Adding)
└── utils/ (Persistence)
```

### File Dependencies

```
main.tsx → App.tsx → Components → Utils
                ↓
            PropertiesPanel.tsx
                ↓
            Component Renderers
```

## 🎯 Key Design Patterns

### Component Architecture

- **Functional Components**: All components use React hooks
- **Props Interface**: TypeScript interfaces for type safety
- **Event Handling**: Consistent event handling patterns
- **State Management**: Local state with prop drilling

### Styling Approach

- **Tailwind CSS**: Utility-first styling
- **Component Styling**: Inline styles for dynamic properties
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Built-in dark mode support

### State Management

- **Local State**: React useState for component state
- **Global State**: App-level state management
- **Persistence**: localStorage for data persistence
- **History**: Custom history management system

## 🚀 Development Workflow

### Adding New Components

1. Create component file in `src/components/`
2. Add to `Palette.tsx` component list
3. Add rendering logic to `Canvas.tsx`
4. Add properties to `PropertiesPanel.tsx`
5. Update HTML generation in `utils/htmlGenerator.ts`

### Modifying Existing Components

1. Update component renderer
2. Update properties panel controls
3. Update HTML generation
4. Test in preview modal
5. Update documentation

This structure provides a clean, maintainable, and scalable architecture for the Aura Editor project.
