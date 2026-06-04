import { Injectable, inject } from '@angular/core';
import { ThemeService } from '../../presentation/service/theme/theme.service';
import { ThemeMode } from '../../presentation/constants/themes.constant';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeUseCase {
  private themeService = inject(ThemeService);

  /**
   * Execute the use case to change the theme
   * @param theme The theme to apply ('light', 'dark', or 'system')
   */
  execute(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }
}
