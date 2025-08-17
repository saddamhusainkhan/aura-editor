const STORAGE_KEY = 'aura-canvas';

export interface CanvasComponent {
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
    fontStyle?: string;
    textDecoration?: string;
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
    // Layout-specific properties
    maxWidth?: number;
    gridSpan?: number;
    gap?: number;
    justifyContent?: string;
    alignItems?: string;
    borderColor?: string;
    borderWidth?: number;
    [key: string]: string | number | undefined;
  };
}

export const storage = {
  /**
   * Save canvas components to localStorage
   */
  saveCanvas: (components: CanvasComponent[]): boolean => {
    try {
      if (components.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(components));
        return true;
      } else {
        localStorage.removeItem(STORAGE_KEY);
        return true;
      }
    } catch (error) {
      console.error('Failed to save canvas to localStorage:', error);
      return false;
    }
  },

  /**
   * Load canvas components from localStorage
   */
  loadCanvas: (): CanvasComponent[] | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;

      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('Failed to load canvas from localStorage:', error);
      return null;
    }
  },

  /**
   * Clear canvas from localStorage
   */
  clearCanvas: (): boolean => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear canvas from localStorage:', error);
      return false;
    }
  },

  /**
   * Check if canvas exists in localStorage
   */
  hasCanvas: (): boolean => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch (error) {
      console.error('Failed to check localStorage:', error);
      return false;
    }
  },

  /**
   * Get canvas size in bytes
   */
  getCanvasSize: (): number => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Blob([saved]).size : 0;
    } catch (error) {
      console.error('Failed to get canvas size:', error);
      return 0;
    }
  },

  /**
   * Export canvas data as JSON string
   */
  exportCanvas: (components: CanvasComponent[]): string => {
    try {
      return JSON.stringify(components, null, 2);
    } catch (error) {
      console.error('Failed to export canvas:', error);
      return '[]';
    }
  },

  /**
   * Import canvas data from JSON string
   */
  importCanvas: (jsonString: string): CanvasComponent[] | null => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('Failed to import canvas:', error);
      return null;
    }
  },
};
