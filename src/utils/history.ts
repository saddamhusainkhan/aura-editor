export interface CanvasComponent {
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

export interface HistoryState {
  components: CanvasComponent[];
  timestamp: number;
  action: string;
}

export class HistoryManager {
  private past: HistoryState[] = [];
  private future: HistoryState[] = [];
  private maxSize: number = 50;
  private isUndoRedoAction: boolean = false;

  /**
   * Push a new state to the history
   */
  push(components: CanvasComponent[], action: string): void {
    if (this.isUndoRedoAction) {
      this.isUndoRedoAction = false;
      return;
    }

    const newState: HistoryState = {
      components: this.deepClone(components),
      timestamp: Date.now(),
      action,
    };

    this.past.push(newState);
    
    // Clear future when new action is performed
    this.future = [];
    
    // Maintain max size
    if (this.past.length > this.maxSize) {
      this.past.shift();
    }
  }

  /**
   * Undo the last action
   */
  undo(): CanvasComponent[] | null {
    if (this.past.length === 0) return null;

    const currentState = this.past.pop()!;
    this.future.unshift(currentState);
    
    this.isUndoRedoAction = true;
    
    return this.past.length > 0 
      ? this.deepClone(this.past[this.past.length - 1].components)
      : [];
  }

  /**
   * Redo the next action
   */
  redo(): CanvasComponent[] | null {
    if (this.future.length === 0) return null;

    const nextState = this.future.shift()!;
    this.past.push(nextState);
    
    this.isUndoRedoAction = true;
    
    return this.deepClone(nextState.components);
  }

  /**
   * Check if undo is available
   */
  canUndo(): boolean {
    return this.past.length > 0;
  }

  /**
   * Check if redo is available
   */
  canRedo(): boolean {
    return this.future.length > 0;
  }

  /**
   * Get the current history size
   */
  getHistorySize(): number {
    return this.past.length;
  }

  /**
   * Get the current future size
   */
  getFutureSize(): number {
    return this.future.length;
  }

  /**
   * Get the last action performed
   */
  getLastAction(): string | null {
    return this.past.length > 0 ? this.past[this.past.length - 1].action : null;
  }

  /**
   * Clear all history
   */
  clear(): void {
    this.past = [];
    this.future = [];
    this.isUndoRedoAction = false;
  }

  /**
   * Deep clone an array of components
   */
  private deepClone(components: CanvasComponent[]): CanvasComponent[] {
    return components.map(component => ({
      ...component,
      position: { ...component.position },
      props: { ...component.props },
    }));
  }

  /**
   * Get history statistics
   */
  getStats() {
    return {
      pastSize: this.past.length,
      futureSize: this.future.length,
      totalSize: this.past.length + this.future.length,
      maxSize: this.maxSize,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
      lastAction: this.getLastAction(),
    };
  }
} 