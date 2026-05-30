import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, MapPin, TrendingUp, Heart, Wallet } from 'lucide-angular';
import { DashboardStats } from '../../../../../useCase/viajero/dashboard/GetTravelerDashboardUseCase';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ MapPin, TrendingUp, Heart, Wallet })
    }
  ],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css'
}
)
export class StatsCardComponent {
  stats = input<DashboardStats | null>(null);

  // Expose Object for template
  Object = Object;

  getStatIcon(key: string): string {
    switch (key) {
      case 'viajes_completados':
        return 'TrendingUp';
      case 'destinos_visitados':
        return 'MapPin';
      case 'favoritos':
        return 'Heart';
      case 'presupuesto_restante':
        return 'Wallet';
      default:
        return 'MapPin';
    }
  }

  getStatLabel(key: string): string {
    return `TRAVELER_DASHBOARD.STAT_${key.toUpperCase()}`;
  }
}
