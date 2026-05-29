import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { GetTravelerDashboardUseCase, DashboardData } from '../../../../useCase/traveler/dashboard/GetTravelerDashboardUseCase';
import { TravelerSidebarComponent } from '../../../components/traveler/traveler-sidebar/traveler-sidebar.component';
import { TravelerHeaderComponent } from '../../../components/traveler/traveler-header/traveler-header.component';
import { TripCardComponent } from '../../../components/traveler/trip-card/trip-card.component';
import { DestinationCardComponent } from '../../../components/traveler/destination-card/destination-card.component';
import { ItineraryListComponent } from '../../../components/traveler/itinerary-list/itinerary-list.component';
import { ServiceCardComponent } from '../../../components/traveler/service-card/service-card.component';
import { LucideAngularModule, Headset, ChevronRight, LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';

@Component({
  selector: 'app-traveler-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TravelerSidebarComponent,
    TravelerHeaderComponent,
    TripCardComponent,
    DestinationCardComponent,
    ItineraryListComponent,
    ServiceCardComponent,
    LucideAngularModule
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Headset, ChevronRight })
    }
  ],
  templateUrl: './traveler-dashboard.component.html',
  styleUrl: './traveler-dashboard.component.css'
})
export class TravelerDashboardComponent implements OnInit {
  private readonly dashboardUseCase = inject(GetTravelerDashboardUseCase);

  dashboardData = signal<DashboardData | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadDashboard();
  }

  private async loadDashboard(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const data = await this.dashboardUseCase.execute();
      this.dashboardData.set(data);
    } catch (err: any) {
      console.error('Error loading dashboard:', err);
      this.error.set(err?.message || 'Error al cargar el dashboard');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Para testing y recargar datos
  reloadDashboard(): void {
    this.loadDashboard();
  }
}
