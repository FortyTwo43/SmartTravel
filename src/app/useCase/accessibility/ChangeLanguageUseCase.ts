import { Injectable, inject } from '@angular/core';
import { LanguageService, LanguageCode } from '../../presentation/service/language/language.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeLanguageUseCase {
  private languageService = inject(LanguageService);

  /**
   * Execute the use case to change the language
   * @param language The language code to apply
   */
  execute(language: LanguageCode): void {
    this.languageService.applyLanguage(language);
  }
}
