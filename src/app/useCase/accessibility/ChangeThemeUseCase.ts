import { Injectable, inject } from '@angular/core';
import { ThemeService } from '../../presentation/service/theme/theme.service';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeUseCase {
  private themeService = inject(ThemeService);

  /**
   * Execute the use case to change the theme
   * @param theme The theme to apply ('light' or 'dark')
   */
  execute(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }
}
