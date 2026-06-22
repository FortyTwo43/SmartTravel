import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { GetExplorarDestinosUseCase, ExploreDestination, ExploreFilter } from '../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';
import { GetImageUrlUseCase } from '../../../../useCase/upload/GetImageUrlUseCase';

import { TravelerFilterSidebarComponent } from '../../../components/viajero/explorar-destinos/traveler-filter-sidebar/traveler-filter-sidebar.component';
import { DestinationGridComponent } from '../../../components/viajero/explorar-destinos/destination-grid/destination-grid.component';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, SlidersHorizontal } from 'lucide-angular';

@Component({
  selector: 'app-explorar-destinos',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TravelerFilterSidebarComponent,
    DestinationGridComponent,
    LucideAngularModule
  ],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ SlidersHorizontal })
  }],
  templateUrl: './explorar-destinos.component.html',
  styleUrl: './explorar-destinos.component.css'
})
export class ExplorarDestinosComponent implements OnInit {
  private readonly useCase = inject(GetExplorarDestinosUseCase);
  private readonly getImageUrlUseCase = inject(GetImageUrlUseCase);

  destinos = signal<ReadonlyArray<ExploreDestination>>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // Control del Bottom Sheet en móvil
  isMobileFiltersOpen = signal(false);

  // Referencia al sidebar para leer activeFiltersCount
  // (se usa un contador local paralelo para el badge del botón)
  _activePaises = signal<string[]>([]);
  _activeIntereses = signal<string[]>([]);
  _activeRating = signal<string | null>(null);
  _activeExperiencia = signal<string | null>(null);

  activeFiltersCount = computed(() => {
    let count = 0;
    if (this._activePaises().length) count++;
    if (this._activeIntereses().length) count++;
    if (this._activeRating()) count++;
    if (this._activeExperiencia()) count++;
    return count;
  });

  filtroCategorias = signal<string[]>([]);

  async ngOnInit(): Promise<void> {
    await this.loadDestinos();
  }

  openMobileFilters() {
    this.isMobileFiltersOpen.set(true);
  }

  closeMobileFilters() {
    this.isMobileFiltersOpen.set(false);
  }

  async loadDestinos(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const data = await this.useCase.execute();
      const destinosWithImages = await Promise.all(
        data.map(async (destino) => ({
          ...destino,
          imagen: await this.getImageUrlUseCase.execute(destino.imagen, 'destinos-imagenes')
        }))
      );
      this.destinos.set(destinosWithImages);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar destinos';
      this.error.set(message);
    } finally {
      this.isLoading.set(false);
    }
  }

  onApplyFilters(filters: ExploreFilter): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.useCase.execute(filters)
      .then(async res => {
        const destinosWithImages = await Promise.all(
          res.map(async (destino) => ({
            ...destino,
            imagen: await this.getImageUrlUseCase.execute(destino.imagen, 'destinos-imagenes')
          }))
        );
        this.destinos.set(destinosWithImages);
        if (destinosWithImages.length === 0) {
          this.error.set('No se encontraron destinos con esos filtros.');
        }
      })
      .catch(err => {
        const message = err instanceof Error ? err.message : 'Error al aplicar filtros';
        this.error.set(message);
      })
      .finally(() => this.isLoading.set(false));
  }
}
