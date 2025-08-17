# Aura Editor

A modern, advanced color and design tool built with React, TypeScript, Tailwind CSS 4, and shadcn/ui. This application provides an intuitive interface for color selection, HSL controls, and opacity adjustments with real-time preview.

## Features

- 🎨 **Interactive Color Picker**: Use the hex color picker for precise color selection
- 🎛️ **HSL Controls**: Fine-tune colors using Hue, Saturation, and Lightness sliders
- 🔍 **Opacity Control**: Adjust color transparency with a dedicated opacity slider
- 👁️ **Real-time Preview**: See your color changes instantly across different contexts
- 🌙 **Dark Mode Support**: Beautiful dark and light theme support
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚀 **Modern Tech Stack**: Built with the latest React 19, TypeScript, and Tailwind CSS 4

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Color Picker**: react-colorful
- **Sliders**: rc-slider
- **Development**: ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd aura-aditor
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
aura-aditor/
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Tailwind CSS imports
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## Usage

### Color Selection

- Use the interactive color picker to select any color
- Type hex color codes directly in the input field
- Use the preset buttons to quickly switch between common colors

### HSL Controls

- **Hue**: Adjust the base color (0-360°)
- **Saturation**: Control color intensity (0-100%)
- **Lightness**: Adjust brightness (0-100%)

### Opacity Control

- Use the opacity slider to adjust color transparency (0-100%)
- See real-time preview of how opacity affects your color

## Configuration

### Tailwind CSS 4

The project uses Tailwind CSS 4 with the new `@tailwindcss/vite` plugin for optimal performance.

### shadcn/ui

Components are configured with shadcn/ui for consistent design and accessibility.

### TypeScript

Full TypeScript support with strict mode enabled for better code quality.

## Development

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

### Code Quality

```bash
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [react-colorful](https://github.com/omgovich/react-colorful) for the color picker
- [rc-slider](https://github.com/react-component/slider) for slider components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
