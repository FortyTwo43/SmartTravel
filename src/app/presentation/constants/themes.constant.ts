export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  code: ThemeMode;
  label: string; // Para i18n (ej: ACCESSIBILITY.LIGHT_MODE)
}

export const THEME_OPTIONS: ThemeConfig[] = [
  { code: 'light', label: 'ACCESSIBILITY.LIGHT_MODE' },
  { code: 'dark', label: 'ACCESSIBILITY.DARK_MODE' },
  { code: 'system', label: 'ACCESSIBILITY.SYSTEM_MODE' }
];

/**
 * Resuelve el tema del sistema a 'light' o 'dark' basado en la preferencia del navegador
 */
export function resolveSystemTheme(): 'light' | 'dark' {
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

