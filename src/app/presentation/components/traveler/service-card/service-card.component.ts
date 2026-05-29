import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Hotel, UtensilsCrossed, Compass, Navigation } from 'lucide-angular';
import { ServiceCard } from '../../../../useCase/traveler/dashboard/GetTravelerDashboardUseCase';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Hotel, UtensilsCrossed, Compass, Navigation })
    }
  ],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  service = input<ServiceCard | null>(null);

  getIconName(): string {
    switch (this.service()?.type) {
      case 'hotel':
        return 'Hotel';
      case 'restaurant':
        return 'UtensilsCrossed';
      case 'tour':
        return 'Compass';
      case 'transport':
        return 'Navigation';
      default:
        return 'Hotel';
    }
  }

  getTypeLabel(): string {
    return `TRAVELER_DASHBOARD.SERVICE_${this.service()?.type.toUpperCase()}`;
  }
}
