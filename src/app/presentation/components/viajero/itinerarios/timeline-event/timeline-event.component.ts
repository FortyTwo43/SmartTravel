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
  template: `
    <div class="event-card">
      <div class="event-card__left">
        <div class="event-type-badge">
          <span class="event-icon">
            @switch (event()?.type) {
              @case ('FLIGHT') { <lucide-icon name="plane" size="16" aria-hidden="true"></lucide-icon> }
              @case ('ACCOMMODATION') { <lucide-icon name="hotel" size="16" aria-hidden="true"></lucide-icon> }
              @case ('ACTIVITY') { <lucide-icon name="zap" size="16" aria-hidden="true"></lucide-icon> }
              @case ('DINING') { <lucide-icon name="utensils-crossed" size="16" aria-hidden="true"></lucide-icon> }
              @default { <lucide-icon name="map-pin" size="16" aria-hidden="true"></lucide-icon> }
            }
          </span>
          <span class="event-type-label">{{ event()?.type }}</span>
        </div>
        <h4 class="event-name">{{ event()?.title }}</h4>
        <p class="event-detail">{{ event()?.details }}</p>
        <p class="event-detail" *ngIf="event()?.extraInfo">{{ event()?.extraInfo }}</p>
        <span class="event-status-badge" [ngClass]="getStatusClass()">
          {{ event()?.status }}
        </span>
      </div>
      @if (event()?.imageUrl && !imageError()) {
        <img [src]="event()?.imageUrl" [alt]="event()?.title || ''" (error)="onImageError()" class="event-thumb" />
      } @else {
        <div class="card-img-placeholder event-thumb">
          @switch (event()?.type) {
            @case ('FLIGHT') { <lucide-icon name="plane" size="24" aria-hidden="true"></lucide-icon> }
            @case ('ACCOMMODATION') { <lucide-icon name="hotel" size="24" aria-hidden="true"></lucide-icon> }
            @case ('ACTIVITY') { <lucide-icon name="zap" size="24" aria-hidden="true"></lucide-icon> }
            @case ('DINING') { <lucide-icon name="utensils-crossed" size="24" aria-hidden="true"></lucide-icon> }
            @default { <lucide-icon name="map-pin" size="24" aria-hidden="true"></lucide-icon> }
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .event-card {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: #1e293b;
      border-radius: 12px;
      padding: 1rem 1.25rem;
      margin-bottom: 0.75rem;
      gap: 1rem;
    }
    .event-card__left { flex: 1; }
    .event-type-badge {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-bottom: 0.5rem;
    }
    .event-icon {
      display: inline-flex;
      align-items: center;
      color: #0ea5e9;
    }
    .event-type-label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #0ea5e9;
      text-transform: uppercase;
    }
    .event-name {
      font-size: 1rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0 0 0.3rem;
    }
    .event-detail {
      font-size: 0.82rem;
      color: #94a3b8;
      margin: 0 0 0.2rem;
    }
    .event-status-badge {
      display: inline-block;
      font-size: 0.72rem;
      padding: 2px 10px;
      border-radius: 20px;
      font-weight: 600;
      margin-top: 0.5rem;
    }
    .status--confirmed { background: #dcfce7; color: #166534; }
    .status--reserved { background: #fef3c7; color: #92400e; }
    .status--active { background: #dbeafe; color: #1e40af; }
    .event-thumb {
      width: 120px;
      min-width: 120px;
      height: 90px;
      border-radius: 8px;
      object-fit: cover;
      object-position: center;
      flex-shrink: 0;
      overflow: hidden;
    }
    lucide-icon {
      display: inline-flex !important;
      width: 16px !important;
      height: 16px !important;
    }
    .card-img-placeholder.event-thumb lucide-icon {
      width: 28px !important;
      height: 28px !important;
    }
    .card-img-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1e293b, #0f172a);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #475569;
      border-radius: 8px;
    }
  `]
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
