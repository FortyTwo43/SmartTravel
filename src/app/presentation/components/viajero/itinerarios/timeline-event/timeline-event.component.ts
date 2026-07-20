import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineEvent } from '../../../../../useCase/viajero/itinerarios/GetItinerariosUseCase';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Plane, Hotel, Zap, UtensilsCrossed, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-timeline-event',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Plane, Hotel, Zap, UtensilsCrossed, MapPin })
    }
  ],
  templateUrl: './timeline-event.component.html',
  styleUrl: './timeline-event.component.css'
})
export class TimelineEventComponent {
  event = input<TimelineEvent | null>(null);
  isLast = input<boolean>(false);
  imageError = signal(false);

  onImageError() {
    this.imageError.set(true);
  }

  getStatusClass(): string {
    const status = this.event()?.status;
    if (status === 'Confirmed' || status === 'Booking Active') return 'status--confirmed';
    if (status === 'Reserved') return 'status--reserved';
    return 'status--active';
  }
}
