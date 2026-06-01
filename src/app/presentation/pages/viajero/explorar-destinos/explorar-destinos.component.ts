import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TravelerSidebarComponent } from '../../../layouts/viajero/traveler-sidebar/traveler-sidebar.component';
import { TravelerHeaderComponent } from '../../../layouts/viajero/traveler-header/traveler-header.component';

import { GetExplorarDestinosUseCase, ExploreDestination } from '../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';

import { TravelerSearchHeaderComponent } from '../../../components/viajero/explorar-destinos/traveler-search-header/traveler-search-header.component';
import { TravelerFilterSidebarComponent } from '../../../components/viajero/explorar-destinos/traveler-filter-sidebar/traveler-filter-sidebar.component';
import { DestinationGridComponent } from '../../../components/viajero/explorar-destinos/destination-grid/destination-grid.component';

@Component({
  selector: 'app-explorar-destinos',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TravelerSidebarComponent,
    TravelerHeaderComponent,
    TravelerSearchHeaderComponent,
    TravelerFilterSidebarComponent,
    DestinationGridComponent
  ],
  templateUrl: './explorar-destinos.component.html',
  styleUrl: './explorar-destinos.component.css'
})
export class ExplorarDestinosComponent implements OnInit {
  private readonly useCase = inject(GetExplorarDestinosUseCase);

  destinos = signal<ReadonlyArray<ExploreDestination>>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // filtros simples como ejemplo
  filtroCategorias = signal<string[]>([]);

  async ngOnInit(): Promise<void> {
    await this.loadDestinos();
  }

  async loadDestinos(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const data = await this.useCase.execute();
      this.destinos.set(data);
    } catch (err: any) {
      console.error(err);
      this.error.set(err?.message || 'Error al cargar destinos');
    } finally {
      this.isLoading.set(false);
    }
  }

  onApplyFilters(filters: any): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.useCase.execute(filters)
      .then(res => {
        this.destinos.set(res);
        if (res.length === 0) {
          this.error.set('No se encontraron destinos con esos filtros.');
        }
      })
      .catch(err => {
        console.error(err);
        this.error.set(err?.message || 'Error al aplicar filtros');
      })
      .finally(() => this.isLoading.set(false));
  }
}
