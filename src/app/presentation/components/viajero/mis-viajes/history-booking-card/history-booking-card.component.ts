import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Calendar, MapPin, Hotel, Map, Compass } from 'lucide-angular';
import { Booking } from '../../../../../useCase/viajero/mis-viajes/GetMisViajesUseCase';

@Component({
  selector: 'app-history-booking-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Calendar, MapPin, Hotel, Map, Compass })
    }
  ],
  templateUrl: './history-booking-card.component.html',
  styleUrl: './history-booking-card.component.css'
})
export class HistoryBookingCardComponent {
  booking = input<Booking | null>(null);
  imageError = signal(false);

  onImageError() {
    this.imageError.set(true);
  }

  getBadgeClass(): string {
    if (this.booking()?.status === 'Completado') return 'badge--completed';
    if (this.booking()?.status === 'Cancelado')  return 'badge--cancelled';
    if (this.booking()?.status === 'Pendiente')  return 'badge--pending';
    return '';
  }
}
