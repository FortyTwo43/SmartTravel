import { Injectable, inject } from '@angular/core';
import { ThemeService } from '../../presentation/service/theme/theme.service';
import { FontSizeService, FontSizeLevel } from '../../presentation/service/font-size/font-size.service';
import { LanguageService, LanguageCode } from '../../presentation/service/language/language.service';
import { ThemeMode } from '../../presentation/constants/themes.constant';

export interface AccessibilityPreferences {
  theme: ThemeMode;
  fontSize: FontSizeLevel;
  language: LanguageCode;
}
@Injectable({
  providedIn: 'root'
})
export class SaveAccessibilityPreferencesUseCase {
  private themeService = inject(ThemeService);
  private fontSizeService = inject(FontSizeService);
  private languageService = inject(LanguageService);

  /**
   * Execute the use case to save all accessibility preferences
   * @param preferences The accessibility preferences to save
   */
  execute(preferences: AccessibilityPreferences): void {
    this.themeService.setTheme(preferences.theme);
    this.fontSizeService.setFontSize(preferences.fontSize);
    this.languageService.setLanguage(preferences.language);
  }
}
