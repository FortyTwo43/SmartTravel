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
export class SaveAccessibilityPreferencesUseCase {
  private themeService = inject(ThemeService);
  private fontSizeService = inject(FontSizeService);
  private textSpacingService = inject(TextSpacingService);
  private languageService = inject(LanguageService);

  /**
   * Execute the use case to save all accessibility preferences
   * @param preferences The accessibility preferences to save
   */
  execute(preferences: AccessibilityPreferences): void {
    this.themeService.commitTheme(preferences.theme);
    this.fontSizeService.commitFontSize(preferences.fontSize);
    this.textSpacingService.commitTextSpacing(preferences.textSpacing);
    this.languageService.commitLanguage(preferences.language);
  }
}
