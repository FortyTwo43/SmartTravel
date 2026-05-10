import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { ThemeService } from './presentation/theme/theme.service';

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
