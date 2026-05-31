export type LanguageCode = 'es' | 'en';

export interface LanguageConfig {
  code: LanguageCode;
  label: string;      // Para i18n (ej: ACCESSIBILITY.SPANISH_CASTILIAN)
  name: string;       // Para UI normal (ej: Español)
}

export const LANGUAGE_OPTIONS: LanguageConfig[] = [
  { code: 'es', label: 'ACCESSIBILITY.SPANISH_CASTILIAN', name: 'Español' },
  { code: 'en', label: 'ACCESSIBILITY.ENGLISH', name: 'English' }
];
