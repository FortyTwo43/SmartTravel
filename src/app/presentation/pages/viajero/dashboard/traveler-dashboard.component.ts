import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { GetTravelerDashboardUseCase, DashboardData } from '../../../../useCase/viajero/dashboard/GetTravelerDashboardUseCase';
import { GetImageUrlUseCase } from '../../../../useCase/upload/GetImageUrlUseCase';
import { TripCardComponent } from '../../../components/viajero/dashboard/trip-card/trip-card.component';
import { DestinationCardComponent } from '../../../components/viajero/dashboard/destination-card/destination-card.component';
import { ItineraryListComponent } from '../../../components/viajero/dashboard/itinerary-list/itinerary-list.component';
import { ServiceCardComponent } from '../../../components/viajero/dashboard/service-card/service-card.component';
import { LucideAngularModule, Headset, ChevronRight, LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import { SharedTravelerDataService } from '../../../service/shared/shared-traveler-data.service';

@Component({
  selector: 'app-traveler-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
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
  private readonly sharedTravelerData = inject(SharedTravelerDataService);
  private readonly getImageUrlUseCase = inject(GetImageUrlUseCase);

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
      
      if (data.destinosRecomendados?.length) {
        data.destinosRecomendados = await Promise.all(
          data.destinosRecomendados.map(async (destino) => ({
            ...destino,
            imagen: destino.imagen ? await this.getImageUrlUseCase.execute(destino.imagen, 'destinos-imagenes') : destino.imagen
          }))
        );
      }
      
      this.dashboardData.set(data);
      this.sharedTravelerData.setDashboardData(data);
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

