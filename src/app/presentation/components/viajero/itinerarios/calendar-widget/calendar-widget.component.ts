import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ChevronLeft, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronLeft, ChevronRight })
    }
  ],
  templateUrl: './calendar-widget.component.html',
  styleUrl: './calendar-widget.component.css'
})
export class CalendarWidgetComponent {
  month = input<string>('');
  activeDay = input<number>(1);
}
