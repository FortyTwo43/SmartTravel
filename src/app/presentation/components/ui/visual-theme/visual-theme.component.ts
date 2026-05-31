import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Settings } from 'lucide-angular';
import { ThemeMode, THEME_OPTIONS } from '../../../constants/themes.constant';

@Component({
  selector: 'app-visual-theme',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Settings })
  }],
  templateUrl: './visual-theme.component.html',
  styleUrl: './visual-theme.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualThemeComponent {
  selectedTheme = input<ThemeMode>('system');
  themeChanged = output<ThemeMode>();

  readonly themes = THEME_OPTIONS;

  onThemeChange(theme: ThemeMode): void {
    this.themeChanged.emit(theme);
  }
}

