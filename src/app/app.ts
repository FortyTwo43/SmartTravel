import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AVAILABLE_LANGUAGE_CODES, DEFAULT_LANGUAGE, LanguageCode } from './presentation/constants/languages.constant';
import { ThemeService } from './presentation/service/theme/theme.service';
import { FontSizeService } from './presentation/service/font-size/font-size.service';
import { TextSpacingService } from './presentation/service/text-spacing/text-spacing.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    TranslateModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SmartTravel');
  private readonly translate = inject(TranslateService);
  protected readonly themeService = inject(ThemeService);
  protected readonly fontSizeService = inject(FontSizeService);
  protected readonly textSpacingService = inject(TextSpacingService);

  constructor() {
    this.translate.addLangs(AVAILABLE_LANGUAGE_CODES);
    this.translate.setFallbackLang(DEFAULT_LANGUAGE);
  }

  changeLanguage(lang: LanguageCode) {
    this.translate.use(lang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
