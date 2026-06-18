import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Accessibility, ArrowLeft } from 'lucide-angular';
import { AccessibilityComponent } from '../../../pages/accessibility/accessibility.component';

@Component({
  selector: 'app-accessibility-widget',
  standalone: true,
  imports: [
    AccessibilityComponent,
    LucideAngularModule,
    TranslateModule
  ],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Accessibility, ArrowLeft })
  }],
  templateUrl: './accessibility-widget.html',
  styleUrl: './accessibility-widget.css'
})
export class AccessibilityWidget {
  readonly isAccessibilityMenuOpen = signal(false);

  toggleAccessibilityMenu(): void {
    this.isAccessibilityMenuOpen.update(v => !v);
  }
}
