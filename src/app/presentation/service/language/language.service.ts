import { Injectable, signal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS, LanguageCode } from '../../constants/languages.constant';

// Re-export for backward compatibility
export type { LanguageCode };

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'smart-travel-language';
  private translateService = inject(TranslateService);

  // Signal to track current language (loaded lazily via initializer)
  currentLanguage = signal<LanguageCode>(this.getInitialLanguage());

  // Public init method called by APP_INITIALIZER at app bootstrap
  init(): void {
    this.applyLanguageChange(this.currentLanguage());
  }

  /**
   * Get the initial language from localStorage or default
   */
  private getInitialLanguage(): LanguageCode {
    const saved = localStorage.getItem(this.LANGUAGE_KEY) as LanguageCode | null;
    return (saved && this.isValidLanguage(saved)) ? saved : DEFAULT_LANGUAGE;
  }

  /**
   * Check if a language code is valid
   */
  private isValidLanguage(code: string): code is LanguageCode {
    return code === 'es' || code === 'en';
  }

  /**
   * Get all available languages
   */
  getAvailableLanguages() {
    return [...LANGUAGE_OPTIONS];
  }

  /**
   * Get language label by code
   */
  getLanguageLabel(code: LanguageCode): string {
    return LANGUAGE_OPTIONS.find(lang => lang.code === code)?.label || code;
  }

  /**
   * Set the current language
   */
  setLanguage(language: LanguageCode): void {
    if (this.isValidLanguage(language)) {
      this.currentLanguage.set(language);
      this.applyLanguageChange(language);
      localStorage.setItem(this.LANGUAGE_KEY, language);
    }
  }

  /**
   * Get the current language
   */
  getCurrentLanguage(): LanguageCode {
    return this.currentLanguage();
  }

  /**
   * Apply language change to TranslateService
   */
  private applyLanguageChange(language: LanguageCode): void {
    this.translateService.use(language);
  }
}
