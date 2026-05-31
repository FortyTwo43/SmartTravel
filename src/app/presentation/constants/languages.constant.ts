export interface Language {
  code: 'es' | 'en';
  label: string;
}

export const LANGUAGE_OPTIONS: Language[] = [
  { code: 'es', label: 'ACCESSIBILITY.SPANISH_CASTILIAN' },
  { code: 'en', label: 'ACCESSIBILITY.ENGLISH' }
];
