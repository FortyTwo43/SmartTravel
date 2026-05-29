import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'smart-travel-theme';
  
  // Use a signal for reactive theme management
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Automatically apply theme changes to document element
    effect(() => {
      const currentTheme = this.theme();
      document.documentElement.dataset['theme'] = currentTheme;
      localStorage.setItem(this.THEME_KEY, currentTheme);
    });
  }

  toggleTheme() {
    this.theme.update(prev => prev === 'light' ? 'dark' : 'light');
  }

  setTheme(newTheme: Theme) {
    this.theme.set(newTheme);
  }

  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme) return savedTheme;
    
    // Default to light theme for the new UI redesign
    return 'light';
  }
}
