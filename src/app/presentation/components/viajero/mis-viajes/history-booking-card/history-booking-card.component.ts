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
  template: `
    <div class="history-row">
      @if (booking()?.imageUrl && !imageError()) {
        <img [src]="booking()?.imageUrl" [alt]="booking()?.name" (error)="onImageError()" class="history-thumb" />
      } @else {
        <div class="history-thumb history-thumb--placeholder">
          @switch (booking()?.type) {
            @case ('HOTEL') { <lucide-icon name="hotel" size="28" aria-hidden="true"></lucide-icon> }
            @case ('TOUR')  { <lucide-icon name="map" size="28" aria-hidden="true"></lucide-icon> }
            @default        { <lucide-icon name="compass" size="28" aria-hidden="true"></lucide-icon> }
          }
        </div>
      }

      <div class="history-info">
        <p class="history-name">{{ booking()?.name }}</p>
        <p class="history-meta">
          <lucide-icon name="calendar" class="meta-icon" aria-hidden="true"></lucide-icon>
          {{ booking()?.dates }}
        </p>
        <p class="history-meta">
          <lucide-icon name="map-pin" class="meta-icon meta-icon--pin" aria-hidden="true"></lucide-icon>
          {{ booking()?.location }}
        </p>
      </div>

      <span class="history-badge" [ngClass]="getBadgeClass()">
        {{ booking()?.status }}
      </span>
      <button
        class="history-action"
        [class.history-action--disabled]="booking()?.status === 'Cancelado'"
        [disabled]="booking()?.status === 'Cancelado'">
        {{ booking()?.actionLabel }}
      </button>
    </div>
  `,
  styles: [`
    lucide-icon.meta-icon {
      display: inline-flex !important;
      width: 13px !important; height: 13px !important;
      min-width: 13px !important; min-height: 13px !important;
      flex-shrink: 0 !important;
      opacity: 0.7; vertical-align: middle;
    }
    lucide-icon.meta-icon--pin { color: #f87171; }

    .history-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #0f172a;
    }
    .history-thumb {
      width: 64px; height: 64px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .history-thumb--placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0f172a;
      color: #475569;
      border-radius: 8px;
      flex-shrink: 0;
    }
    .history-thumb--placeholder lucide-icon {
      display: inline-flex !important;
      width: 28px !important; height: 28px !important;
    }
    .history-info { flex: 1; }
    .history-name {
      font-size: 0.95rem; font-weight: 600;
      color: #f1f5f9; margin: 0 0 0.25rem;
    }
    .history-meta {
      font-size: 0.8rem; color: #64748b;
      margin: 0; display: flex; align-items: center;
      gap: 0.4rem; line-height: 1.6;
    }
    .history-meta + .history-meta { margin-top: 0.1rem; }
    .history-badge {
      font-size: 0.72rem; padding: 3px 10px;
      border-radius: 20px; font-weight: 600;
      white-space: nowrap;
    }
    .badge--completed { background: #e2e8f0; color: #334155; }
    .badge--cancelled { background: #fee2e2; color: #991b1b; }
    .badge--pending   { background: #fef9c3; color: #854d0e; }
    .history-action {
      background: none; border: none;
      color: #0ea5e9; cursor: pointer;
      font-size: 0.85rem; font-weight: 600;
      white-space: nowrap; padding: 0.3rem 0.5rem;
      border-radius: 6px; transition: background 0.2s;
    }
    .history-action:hover:not(:disabled) { background: rgba(14,165,233,0.1); }
    .history-action--disabled { color: #475569 !important; cursor: default; }
  `]
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
