import { Injectable, signal, effect } from '@angular/core';
import { ThemeMode, resolveSystemTheme } from '../../constants/themes.constant';

// Re-export for backward compatibility
export type { ThemeMode };
export type Theme = ThemeMode;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'smart-travel-theme';
  
  // Use a signal for reactive theme management
  theme = signal<ThemeMode>(this.getInitialTheme());

  constructor() {
    // Automatically apply theme changes to document element
    effect(() => {
      const currentTheme = this.theme();
      const resolvedTheme = currentTheme === 'system' ? resolveSystemTheme() : currentTheme;
      document.documentElement.dataset['theme'] = resolvedTheme;
      localStorage.setItem(this.THEME_KEY, currentTheme);
    });
  }

  toggleTheme() {
    this.theme.update(prev => prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light');
  }

  setTheme(newTheme: ThemeMode) {
    this.theme.set(newTheme);
  }

  private getInitialTheme(): ThemeMode {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as ThemeMode | null;
    if (savedTheme && this.isValidTheme(savedTheme)) return savedTheme;
    
    // Default to system preference
    return 'system';
  }

  private isValidTheme(theme: string): theme is ThemeMode {
    return theme === 'light' || theme === 'dark' || theme === 'system';
  }
}
