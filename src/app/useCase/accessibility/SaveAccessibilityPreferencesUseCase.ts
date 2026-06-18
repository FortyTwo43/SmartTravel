import { Injectable, inject } from '@angular/core';
import { ThemeService } from '../../presentation/service/theme/theme.service';
import { FontSizeService, FontSizeLevel } from '../../presentation/service/font-size/font-size.service';
import { TextSpacingService, TextSpacingLevel } from '../../presentation/service/text-spacing/text-spacing.service';
import { LanguageService, LanguageCode } from '../../presentation/service/language/language.service';
import { ThemeMode } from '../../presentation/constants/themes.constant';
import { MultimediaService } from '../../presentation/service/multimedia/multimedia';
import { AnimationsService } from '../../presentation/service/animations/animations.service';

export interface AccessibilityPreferences {
  theme: ThemeMode;
  fontSize: FontSizeLevel;
  textSpacing: TextSpacingLevel;
  language: LanguageCode;
  multimedia: {
    pauseAutoAudio: boolean;
    textTranscripts: boolean;
    syncCaptions: boolean;
    audioDescription: boolean;
    realtimeCaptions: boolean;
  };
  animations: {
    tooltipsMenus: boolean;
    pauseMotion: boolean;
    disableFlashing: boolean;
  };
}
@Injectable({
  providedIn: 'root'
})
export class SaveAccessibilityPreferencesUseCase {
  private themeService = inject(ThemeService);
  private fontSizeService = inject(FontSizeService);
  private textSpacingService = inject(TextSpacingService);
  private languageService = inject(LanguageService);
  private multimediaService = inject(MultimediaService);
  private animationsService = inject(AnimationsService);

  /**
   * Execute the use case to save all accessibility preferences
   * @param preferences The accessibility preferences to save
   */
  execute(preferences: AccessibilityPreferences): void {
    this.themeService.commitTheme(preferences.theme);
    this.fontSizeService.commitFontSize(preferences.fontSize);
    this.textSpacingService.commitTextSpacing(preferences.textSpacing);
    this.languageService.commitLanguage(preferences.language);
    
    this.multimediaService.commitPreferences(preferences.multimedia);
    this.animationsService.commitPreferences(preferences.animations);
  }
}
