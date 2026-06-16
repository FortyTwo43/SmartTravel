import { Injectable, inject } from '@angular/core';
import { ThemeService } from '../../presentation/service/theme/theme.service';
import { FontSizeService, FontSizeLevel } from '../../presentation/service/font-size/font-size.service';
import { TextSpacingService, TextSpacingLevel } from '../../presentation/service/text-spacing/text-spacing.service';
import { LanguageService, LanguageCode } from '../../presentation/service/language/language.service';
import { ThemeMode } from '../../presentation/constants/themes.constant';

export interface AccessibilityPreferences {
  theme: ThemeMode;
  fontSize: FontSizeLevel;
  textSpacing: TextSpacingLevel;
  language: LanguageCode;
}

@Injectable({
  providedIn: 'root'
})
export class LoadAccessibilityPreferencesUseCase {
  private themeService = inject(ThemeService);
  private fontSizeService = inject(FontSizeService);
  private textSpacingService = inject(TextSpacingService);
  private languageService = inject(LanguageService);

  /**
   * Execute the use case to load all accessibility preferences
   * @returns The loaded accessibility preferences
   */
  execute(): AccessibilityPreferences {
    return {
      theme: (localStorage.getItem('smart-travel-theme') as ThemeMode) || 'system',
      fontSize: this.fontSizeService.currentLevel(),
      textSpacing: this.textSpacingService.currentLevel(),
      language: this.languageService.getCurrentLanguage()
    };
  }
}
