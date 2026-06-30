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
  template: `
    <div class="booking-card" [class.no-image]="!booking()?.imageUrl">
      @if (booking()?.imageUrl && !imageError()) {
        <img [src]="booking()?.imageUrl" [alt]="booking()?.name" (error)="onImageError()" class="booking-card__img" />
      } @else {
        <div class="card-img-placeholder booking-card__img">
          @switch (booking()?.type) {
            @case ('HOTEL') { <lucide-icon name="hotel" size="32" aria-hidden="true"></lucide-icon> }
            @case ('TOUR')  { <lucide-icon name="map" size="32" aria-hidden="true"></lucide-icon> }
            @default        { <lucide-icon name="map-pin" size="32" aria-hidden="true"></lucide-icon> }
          }
        </div>
      }

      <div class="booking-card__content">
        <div class="booking-card__header">
          <span class="booking-type">{{ booking()?.type }}</span>
          <span class="booking-badge" [ngClass]="getBadgeClass()">
            {{ booking()?.status }}
          </span>
        </div>

        <h3 class="booking-card__name">{{ booking()?.name }}</h3>

        <p class="booking-card__meta">
          <lucide-icon name="calendar" class="meta-icon" aria-hidden="true"></lucide-icon>
          {{ booking()?.dates }}
        </p>
        <p class="booking-card__meta">
          <lucide-icon name="map-pin" class="meta-icon meta-icon--pin" aria-hidden="true"></lucide-icon>
          {{ booking()?.location }}
        </p>

        <div class="booking-card__footer">
          <span class="booking-price">€{{ booking()?.price | number:'1.2-2' }}</span>
          <button class="btn-action">{{ booking()?.actionLabel }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Íconos meta — tamaño estricto */
    lucide-icon.meta-icon {
      display: inline-flex !important;
      width: 13px !important;
      height: 13px !important;
      min-width: 13px !important;
      min-height: 13px !important;
      max-width: 13px !important;
      max-height: 13px !important;
      flex-shrink: 0 !important;
      opacity: 0.7;
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
    lucide-icon.meta-icon--pin {
      color: #f87171;
    }

    .booking-card {
      display: flex;
      flex-direction: row;
      background: #1e293b;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 1rem;
      min-height: 160px;
    }
    .booking-card__img {
      width: 200px;
      min-width: 200px;
      height: 160px;
      object-fit: cover;
    }
    .card-img-placeholder {
      background: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #475569;
    }
    .booking-card__content {
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
    }
    .booking-card__header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .booking-type {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #94a3b8;
      text-transform: uppercase;
    }
    .booking-badge {
      font-size: 0.75rem;
      padding: 2px 10px;
      border-radius: 20px;
      font-weight: 600;
    }
    .badge--confirmed { background: #dcfce7; color: #166534; }
    .badge--pending   { background: #fef9c3; color: #854d0e; }
    .booking-card__name {
      font-size: 1.2rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0.1rem 0 0.15rem;
    }
    .booking-card__meta {
      font-size: 0.85rem;
      color: #94a3b8;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      line-height: 1.5;
    }
    .booking-card__meta + .booking-card__meta {
      margin-top: 0.2rem;
    }
    .booking-card__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 0.5rem;
    }
    .booking-price {
      font-size: 1.1rem;
      font-weight: 700;
      color: #0ea5e9;
    }
    .btn-action {
      background: #0ea5e9;
      color: white;
      border: none;
      padding: 0.4rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn-action:hover { background: #0284c7; }
  `]
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
