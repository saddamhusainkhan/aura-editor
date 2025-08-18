# Aura Editor

A powerful no-code visual editor for creating website layouts with drag-and-drop functionality, built with React, TypeScript, and Tailwind CSS.

## Overview

Aura Editor is a modern, feature-rich no-code editor that allows you to create professional website layouts without writing any code. Built with the latest web technologies, it provides an intuitive drag-and-drop interface for building responsive websites.

### Key Features

- **🎨 Visual Drag-and-Drop Editor**: Intuitive interface for building layouts
- **📱 Responsive Components**: Text, TextArea, Image, Button, and Layout components
- **🎯 Real-time Properties Panel**: Live editing of component properties
- **🔄 Undo/Redo System**: Full history management with up to 50 states
- **💾 Auto-save**: Automatic localStorage persistence
- **👁️ Live Preview**: Real-time preview with Desktop, Tablet, and Mobile views
- **📋 HTML Export**: Copy generated HTML to clipboard
- **🎨 Advanced Styling**: Color pickers, sliders, and typography controls
- **📐 Layout Components**: Container, Row, Column with 12-grid system
- **🖼️ Image Positioning**: Left, center, right alignment controls

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aura-editor
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Getting Started

1. **Launch the Editor**

   - Open `http://localhost:3000` in your browser
   - You'll see the three-panel layout: Palette (left), Canvas (center), Properties (right)

2. **Add Components**

   - Drag components from the left palette to the center canvas
   - Available components: Text, TextArea, Image, Button, Container, Row, Column

3. **Edit Properties**
   - Select any component on the canvas
   - Use the right properties panel to modify:
     - **Typography**: Font size, weight, style, alignment
     - **Colors**: Text color, background color, border color
     - **Dimensions**: Width, height, padding, border radius
     - **Positioning**: Z-index, alignment (for images)
     - **Advanced**: Opacity, individual side adjustments

### Component Types

#### Text Component

- **Features**: Inline editing, typography controls, color picker
- **Properties**: Font size, weight, style, color, alignment
- **Usage**: Double-click to edit text content

#### TextArea Component

- **Features**: Multi-line text, typography controls
- **Properties**: Font size, weight, style, color, alignment
- **Usage**: Double-click to edit content

#### Image Component

- **Features**: URL input, percentage-based width, positioning
- **Properties**: Source URL, alt text, width (%), height, alignment
- **Positioning**: Left, center, right alignment

#### Button Component

- **Features**: Text editing, URL linking, styling controls
- **Properties**: Text, URL, colors, padding, border radius
- **Usage**: Click to edit button text and properties

#### Layout Components

- **Container**: Full-width layout container with styling
- **Row**: Horizontal flexbox layout for columns
- **Column**: Vertical layout with 12-grid system support

### Advanced Features

#### Undo/Redo System

- **History Management**: Up to 50 states saved
- **Keyboard Shortcuts**:
  - `Ctrl+Z` (or `Cmd+Z`) for Undo
  - `Ctrl+Y` (or `Cmd+Y`) for Redo
- **Visual Indicators**: History size displayed in toolbar

#### Preview & Export

- **Live Preview**: Click "Preview" button to see generated HTML
- **Responsive Views**: Toggle between Desktop, Tablet, and Mobile
- **HTML Export**: Click "Copy HTML" to copy generated code
- **Reset Canvas**: Clear all components and start fresh

#### Component Management

- **Selection**: Click to select components
- **Movement**: Drag selected components around the canvas
- **Deletion**: Use delete button on component or press Delete key
- **Z-Index**: Control component layering with z-index slider

### Keyboard Shortcuts

- **Delete**: Remove selected component
- **Ctrl+Z / Cmd+Z**: Undo last action
- **Ctrl+Y / Cmd+Y**: Redo last action
- **Escape**: Deselect component

## Notes

### LocalStorage Persistence

- **Auto-save**: All changes are automatically saved to browser localStorage
- **Session Recovery**: Canvas state is restored when you reload the page
- **Storage Key**: Uses `'aura-canvas'` key for data persistence
- **No Server Required**: All data is stored locally in your browser

### No API Dependencies

- **Client-side Only**: No backend server required
- **Local Processing**: All operations happen in the browser
- **Offline Capable**: Works without internet connection
- **Privacy Focused**: No data sent to external servers

### Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **ES6+ Features**: Requires modern JavaScript support
- **CSS Grid/Flexbox**: Uses modern CSS layout features

## Step-by-Step Run Instructions

### Quick Start

1. **Open Terminal/Command Prompt**

   ```bash
   # Navigate to your desired directory
   cd /path/to/your/projects
   ```

2. **Clone the Project**

   ```bash
   git clone <repository-url>
   cd aura-editor
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start Development Server**

   ```bash
   npm start
   ```

5. **Access the Editor**
   - Open your web browser
   - Go to `http://localhost:3000`
   - The Aura Editor will load automatically

### First Time Setup

1. **Verify Installation**

   - Check that all dependencies installed successfully
   - No error messages in terminal
   - Browser opens to the editor interface

2. **Test Basic Functionality**

   - Drag a "Text" component from palette to canvas
   - Select the component and edit properties
   - Try the preview and copy HTML features

3. **Explore Components**
   - Test all component types: Text, TextArea, Image, Button
   - Try layout components: Container, Row, Column
   - Experiment with different properties and settings

### Troubleshooting

#### Common Issues

1. **Port 3000 Already in Use**

   ```bash
   # Kill existing process or use different port
   npm start -- --port 3001
   ```

2. **Dependencies Not Installing**

   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Browser Compatibility**
   - Ensure you're using a modern browser
   - Update to latest version if needed
   - Check browser console for errors

#### Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests (if available)
npm test

# Lint code
npm run lint
```

## Project Structure

```
aura-editor/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Canvas.tsx      # Main canvas component
│   │   ├── Palette.tsx     # Component palette
│   │   ├── PropertiesPanel.tsx # Properties editor
│   │   └── ...             # Other components
│   ├── utils/              # Utility functions
│   │   ├── storage.ts      # localStorage management
│   │   ├── history.ts      # Undo/redo system
│   │   └── htmlGenerator.ts # HTML export
│   ├── App.tsx             # Main application
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Aura Editor** - Build beautiful websites without code! 🎨✨
