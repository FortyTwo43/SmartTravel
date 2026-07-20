import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Calendar, MapPin, Hotel, Map } from 'lucide-angular';
import { Booking } from '../../../../../useCase/viajero/mis-viajes/GetMisViajesUseCase';

@Component({
  selector: 'app-upcoming-booking-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Calendar, MapPin, Hotel, Map })
    }
  ],
  templateUrl: './upcoming-booking-card.component.html',
  styleUrl: './upcoming-booking-card.component.css'
})
export class UpcomingBookingCardComponent {
  booking = input<Booking | null>(null);
  imageError = signal(false);

  onImageError() {
    this.imageError.set(true);
  }

  getBadgeClass(): string {
    if (this.booking()?.status === 'Confirmado') return 'badge--confirmed';
    if (this.booking()?.status === 'Pendiente') return 'badge--pending';
    return '';
  }
}
