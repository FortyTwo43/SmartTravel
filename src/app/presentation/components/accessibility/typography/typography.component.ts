import { Component, input, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Settings } from 'lucide-angular';
import { FontSizeService, FontSizeLevel } from '../../../service/font-size/font-size.service';
import { TextSpacingLevel } from '../../../service/text-spacing/text-spacing.service';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Settings })
  }],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyComponent {
  private fontSizeService = inject(FontSizeService);

  selectedFontSize = input<FontSizeLevel>('normal');
  selectedTextSpacing = input<TextSpacingLevel>('normal');
  fontSizeChanged = output<FontSizeLevel>();
  textSpacingChanged = output<TextSpacingLevel>();

  fontSizeLevels = this.fontSizeService.getAvailableLevels();

  private readonly spacingLevels: TextSpacingLevel[] = ['small', 'normal', 'large', 'extra-large'];

  onFontSizeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const sizes: FontSizeLevel[] = ['small', 'normal', 'large', 'extra-large'];
    const index = parseInt(value, 10);
    if (index >= 0 && index < sizes.length) {
      this.fontSizeChanged.emit(sizes[index]);
    }
  }

  onTextSpacingChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const index = parseInt(value, 10);
    if (index >= 0 && index < this.spacingLevels.length) {
      this.textSpacingChanged.emit(this.spacingLevels[index]);
    }
  }
}
