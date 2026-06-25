import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContrastService {
  private readonly HIGH_CONTRAST_KEY = 'smart-travel-high-contrast';
  private readonly BORDER_CONTRAST_KEY = 'smart-travel-border-contrast';

  highContrast = signal<boolean>(this.getInitialState(this.HIGH_CONTRAST_KEY));
  borderContrast = signal<boolean>(this.getInitialState(this.BORDER_CONTRAST_KEY));

  constructor() {
    // Automatically apply theme changes to document element
    effect(() => {
      if (this.highContrast()) {
        document.documentElement.dataset['highContrast'] = 'true';
      } else {
        delete document.documentElement.dataset['highContrast'];
      }
    });

    effect(() => {
      if (this.borderContrast()) {
        document.documentElement.dataset['borderContrast'] = 'true';
      } else {
        delete document.documentElement.dataset['borderContrast'];
      }
    });
  }

  toggleHighContrast() {
    this.highContrast.update(v => {
      const newVal = !v;
      localStorage.setItem(this.HIGH_CONTRAST_KEY, String(newVal));
      return newVal;
    });
  }

  toggleBorderContrast() {
    this.borderContrast.update(v => {
      const newVal = !v;
      localStorage.setItem(this.BORDER_CONTRAST_KEY, String(newVal));
      return newVal;
    });
  }

  private getInitialState(key: string): boolean {
    return localStorage.getItem(key) === 'true';
  }
}
