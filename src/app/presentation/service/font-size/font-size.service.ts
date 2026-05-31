import { Injectable, signal, effect } from '@angular/core';

export type FontSizeLevel = 'small' | 'normal' | 'large' | 'extra-large';

interface FontSizeConfig {
  scale: number;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {
  private readonly FONT_SIZE_KEY = 'smart-travel-font-size';
  private readonly FONT_SIZE_MULTIPLIER = 0.125; // Increment of 12.5% per level

  private readonly fontSizeMap: Record<FontSizeLevel, FontSizeConfig> = {
    small: { scale: 0.875, label: 'Pequeño' },
    normal: { scale: 1, label: 'Normal' },
    large: { scale: 1.125, label: 'Grande' },
    'extra-large': { scale: 1.25, label: 'Extra Grande' }
  };

  // Signal to track current font size level
  currentLevel = signal<FontSizeLevel>(this.getInitialFontSize());

  constructor() {
    // Apply font size changes to document element
    effect(() => {
      const level = this.currentLevel();
      const scale = this.fontSizeMap[level].scale;
      document.documentElement.style.setProperty('--font-scale', scale.toString());
    });
  }

  /**
   * Increase font size by one level
   */
  increaseFontSize(): void {
    const levels: FontSizeLevel[] = ['small', 'normal', 'large', 'extra-large'];
    const currentIndex = levels.indexOf(this.currentLevel());
    
    if (currentIndex < levels.length - 1) {
      this.currentLevel.set(levels[currentIndex + 1]);
    }
  }

  /**
   * Decrease font size by one level
   */
  decreaseFontSize(): void {
    const levels: FontSizeLevel[] = ['small', 'normal', 'large', 'extra-large'];
    const currentIndex = levels.indexOf(this.currentLevel());
    
    if (currentIndex > 0) {
      this.currentLevel.set(levels[currentIndex - 1]);
    }
  }

  /**
   * Set font size to a specific level
   */
  setFontSize(level: FontSizeLevel): void {
    this.currentLevel.set(level);
  }

  commitFontSize(level: FontSizeLevel): void {
    this.currentLevel.set(level);
    localStorage.setItem(this.FONT_SIZE_KEY, level);
  }

  /**
   * Reset to normal font size
   */
  resetFontSize(): void {
    this.currentLevel.set('normal');
  }

  /**
   * Get the current scale factor
   */
  getCurrentScale(): number {
    return this.fontSizeMap[this.currentLevel()].scale;
  }

  /**
   * Get label for current font size
   */
  getCurrentLabel(): string {
    return this.fontSizeMap[this.currentLevel()].label;
  }

  /**
   * Get all available font size levels
   */
  getAvailableLevels(): Array<{ level: FontSizeLevel; label: string; scale: number }> {
    return Object.entries(this.fontSizeMap).map(([level, config]) => ({
      level: level as FontSizeLevel,
      label: config.label,
      scale: config.scale
    }));
  }

  /**
   * Check if can increase font size
   */
  canIncrease(): boolean {
    const levels: FontSizeLevel[] = ['small', 'normal', 'large', 'extra-large'];
    return levels.indexOf(this.currentLevel()) < levels.length - 1;
  }

  /**
   * Check if can decrease font size
   */
  canDecrease(): boolean {
    const levels: FontSizeLevel[] = ['small', 'normal', 'large', 'extra-large'];
    const currentIndex = levels.indexOf(this.currentLevel());
    return currentIndex > 0;
  }

  private getInitialFontSize(): FontSizeLevel {
    const savedFontSize = localStorage.getItem(this.FONT_SIZE_KEY) as FontSizeLevel;
    
    if (savedFontSize && this.fontSizeMap[savedFontSize]) {
      return savedFontSize;
    }
    
    return 'normal';
  }
}
