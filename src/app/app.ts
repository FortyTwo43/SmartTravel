import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AVAILABLE_LANGUAGE_CODES, DEFAULT_LANGUAGE, LanguageCode } from './presentation/constants/languages.constant';
import { ThemeService } from './presentation/service/theme/theme.service';
import { FontSizeService } from './presentation/service/font-size/font-size.service';
import { TextSpacingService } from './presentation/service/text-spacing/text-spacing.service';
import { SessionService } from './presentation/service/session/session.service';
import { SessionWarningModalComponent } from './presentation/components/ui/session-warning-modal/session-warning-modal';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    TranslateModule,
    SessionWarningModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SmartTravel');
  private readonly translate = inject(TranslateService);
  protected readonly themeService = inject(ThemeService);
  protected readonly fontSizeService = inject(FontSizeService);
  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionService);

  currentUrl = '';
  protected readonly textSpacingService = inject(TextSpacingService);

  constructor() {
    this.translate.addLangs(AVAILABLE_LANGUAGE_CODES);
    this.translate.setFallbackLang(DEFAULT_LANGUAGE);
    
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url.split('#')[0];
    });
  }

  changeLanguage(lang: LanguageCode) {
    this.translate.use(lang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onSkipLinkClick(event: Event) {
    event.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
    }
  }
}
