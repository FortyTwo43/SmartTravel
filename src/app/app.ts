import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from './presentation/service/theme/theme.service';
import { FontSizeService } from './presentation/service/font-size/font-size.service';

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

  constructor() {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|es/) ? browserLang : 'es');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
