import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Settings } from 'lucide-angular';
import { LanguageCode, LANGUAGE_OPTIONS } from '../../../constants/languages.constant';

@Component({
  selector: 'app-language-preference',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Settings })
  }],
  templateUrl: './language-preference.component.html',
  styleUrl: './language-preference.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagePreferenceComponent {
  selectedLanguage = input<LanguageCode>('es');
  languageChanged = output<LanguageCode>();

  readonly languages = LANGUAGE_OPTIONS;

  onLanguageChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as LanguageCode;
    this.languageChanged.emit(value);
  }
}
