import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Settings } from 'lucide-angular';

export interface AdjustmentState {
  highContrast: boolean;
  reduceMotion: boolean;
  screenReaderEnabled: boolean;
}

@Component({
  selector: 'app-adjustments-row',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Settings })
  }],
  templateUrl: './adjustments-row.component.html',
  styleUrl: './adjustments-row.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdjustmentsRowComponent {
  adjustments = input<AdjustmentState>({
    highContrast: false,
    reduceMotion: false,
    screenReaderEnabled: false
  });

  highContrastChanged = output<boolean>();
  reduceMotionChanged = output<boolean>();
  screenReaderChanged = output<boolean>();

  onHighContrastChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.highContrastChanged.emit(checked);
  }

  onReduceMotionChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.reduceMotionChanged.emit(checked);
  }

  onScreenReaderChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.screenReaderChanged.emit(checked);
  }
}
