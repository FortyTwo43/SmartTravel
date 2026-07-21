import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  private readonly STORAGE_PREFIX = 'smart-travel-animations-';

  // State signals
  readonly tooltipsMenus = signal<boolean>(this.getInitialState('tooltips', false));
  readonly pauseMotion = signal<boolean>(this.getInitialState('pause-motion', false));
  readonly disableFlashing = signal<boolean>(this.getInitialState('disable-flashing', false));
  /**
   * WCAG 2.5.4 — Actuación por movimiento.
   * Permite al usuario agitar el dispositivo para actualizar destinos.
   * Desactivado por defecto para no sorprender al usuario.
   */
  readonly shakeToRefresh = signal<boolean>(this.getInitialState('shake-to-refresh', false));

  // Toggles for real-time preview
  toggleTooltipsMenus(): void {
    this.tooltipsMenus.update(v => !v);
  }
  togglePauseMotion(): void {
    this.pauseMotion.update(v => !v);
  }
  toggleDisableFlashing(): void {
    this.disableFlashing.update(v => !v);
  }
  toggleShakeToRefresh(): void {
    this.shakeToRefresh.update(v => !v);
  }

  // Setters for previewing specific values
  setPreferences(prefs: {
    tooltipsMenus: boolean;
    pauseMotion: boolean;
    disableFlashing: boolean;
    shakeToRefresh: boolean;
  }): void {
    this.tooltipsMenus.set(prefs.tooltipsMenus);
    this.pauseMotion.set(prefs.pauseMotion);
    this.disableFlashing.set(prefs.disableFlashing);
    this.shakeToRefresh.set(prefs.shakeToRefresh);
  }

  // Commit logic
  commitPreferences(prefs: {
    tooltipsMenus: boolean;
    pauseMotion: boolean;
    disableFlashing: boolean;
    shakeToRefresh: boolean;
  }): void {
    this.setPreferences(prefs);
    localStorage.setItem(`${this.STORAGE_PREFIX}tooltips`, prefs.tooltipsMenus.toString());
    localStorage.setItem(`${this.STORAGE_PREFIX}pause-motion`, prefs.pauseMotion.toString());
    localStorage.setItem(`${this.STORAGE_PREFIX}disable-flashing`, prefs.disableFlashing.toString());
    localStorage.setItem(`${this.STORAGE_PREFIX}shake-to-refresh`, prefs.shakeToRefresh.toString());
  }

  private getInitialState(key: string, defaultValue: boolean): boolean {
    const saved = localStorage.getItem(`${this.STORAGE_PREFIX}${key}`);
    if (saved !== null) {
      return saved === 'true';
    }
    return defaultValue;
  }
}
