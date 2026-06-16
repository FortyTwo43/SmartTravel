import { Injectable, signal, effect } from '@angular/core';

export type TextSpacingLevel = 'small' | 'normal' | 'large' | 'extra-large';

interface TextSpacingConfig {
  lineHeight: number;
  letterSpacing: string;
  wordSpacing: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class TextSpacingService {
  private readonly TEXT_SPACING_KEY = 'smart-travel-text-spacing';

  private readonly textSpacingMap: Record<TextSpacingLevel, TextSpacingConfig> = {
    small: { lineHeight: 1.3, letterSpacing: '-0.01em', wordSpacing: '0em', label: 'Compacto' },
    normal: { lineHeight: 1.5, letterSpacing: '0em', wordSpacing: '0em', label: 'Normal' },
    large: { lineHeight: 1.75, letterSpacing: '0.05em', wordSpacing: '0.1em', label: 'Amplio' },
    'extra-large': { lineHeight: 2, letterSpacing: '0.12em', wordSpacing: '0.16em', label: 'Extra amplio' }
  };

  currentLevel = signal<TextSpacingLevel>(this.getInitialTextSpacing());

  constructor() {
    effect(() => {
      this.applySpacing(this.currentLevel());
    });
  }

  setTextSpacing(level: TextSpacingLevel): void {
    this.currentLevel.set(level);
  }

  commitTextSpacing(level: TextSpacingLevel): void {
    this.currentLevel.set(level);
    localStorage.setItem(this.TEXT_SPACING_KEY, level);
  }

  resetTextSpacing(): void {
    this.currentLevel.set('normal');
  }

  getAvailableLevels(): Array<{ level: TextSpacingLevel; label: string }> {
    return Object.entries(this.textSpacingMap).map(([level, config]) => ({
      level: level as TextSpacingLevel,
      label: config.label
    }));
  }

  private applySpacing(level: TextSpacingLevel): void {
    const config = this.textSpacingMap[level];
    document.documentElement.style.setProperty('--text-line-height', config.lineHeight.toString());
    document.documentElement.style.setProperty('--text-letter-spacing', config.letterSpacing);
    document.documentElement.style.setProperty('--text-word-spacing', config.wordSpacing);
  }

  private getInitialTextSpacing(): TextSpacingLevel {
    const saved = localStorage.getItem(this.TEXT_SPACING_KEY) as TextSpacingLevel;

    if (saved && this.textSpacingMap[saved]) {
      return saved;
    }

    return 'normal';
  }
}
