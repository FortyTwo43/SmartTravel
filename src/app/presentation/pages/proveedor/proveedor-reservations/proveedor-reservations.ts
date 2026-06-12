import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReservasFilter } from '../../../components/proveedor/reservas-filter/reservas-filter';
import { ReservasList } from '../../../components/proveedor/reservas-list/reservas-list';
import { LoadEstablecimientosUseCase } from '../../../../useCase/proveedor/services/LoadEstablecimientosUseCase';
import { LoadReservasByEstablecimientoUseCase } from '../../../../useCase/proveedor/reservas/LoadReservasByEstablecimientoUseCase';
import { EstablecimientoTuristico } from '../../../../domain/entities/EstablecimientoTuristico';
import { ProveedorReservaItem } from '../../../../domain/ui/proveedor/reservas/ProveedorReservaItem';

@Component({
  selector: 'app-proveedor-reservations',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReservasFilter, ReservasList],
  templateUrl: './proveedor-reservations.html',
  styleUrl: './proveedor-reservations.css'
})
export class ProveedorReservationsComponent implements OnInit {
  private loadEstablecimientosUseCase = inject(LoadEstablecimientosUseCase);
  private loadReservasUseCase = inject(LoadReservasByEstablecimientoUseCase);

  establecimientos = signal<EstablecimientoTuristico[]>([]);
  selectedEstablecimientoId = signal<string | null>(null);
  
  reservas = signal<ProveedorReservaItem[]>([]);
  loading = signal<boolean>(true);

  // Filters state
  filtros = signal<{ servicioNombre?: string, estado?: string, fecha?: string }>({});

  // Computed unique service names for the filter dropdown based on current reservations
  serviciosNombres = computed(() => {
    const nombres = this.reservas().map(r => r.nombre_servicio);
    return [...new Set(nombres)];
  });

  // Computed filtered reservations
  reservasFiltradas = computed(() => {
    let result = this.reservas();
    const f = this.filtros();

    if (f.servicioNombre) {
      result = result.filter(r => r.nombre_servicio === f.servicioNombre);
    }
    if (f.estado) {
      result = result.filter(r => r.estado === f.estado);
    }
    if (f.fecha) {
      result = result.filter(r => {
        // Simple date comparison YYYY-MM-DD
        const reservaDate = new Date(r.fecha_reserva).toISOString().split('T')[0];
        return reservaDate === f.fecha;
      });
    }

    // Sort by date descending (newest first)
    return result.sort((a, b) => new Date(b.fecha_reserva).getTime() - new Date(a.fecha_reserva).getTime());
  });

  async ngOnInit() {
    await this.loadInitialData();
  }

  private async loadInitialData() {
    this.loading.set(true);
    try {
      const establecimientosData = await this.loadEstablecimientosUseCase.execute();
      this.establecimientos.set(establecimientosData);

      if (establecimientosData.length > 0) {
        // Select first establishment by default
        const firstId = establecimientosData[0].id;
        this.selectedEstablecimientoId.set(firstId);
        await this.loadReservas(firstId);
      }
    } catch (error) {
      console.error('Error loading data', error);
    } finally {
      this.loading.set(false);
    }
  }

  async onEstablecimientoChange(id: string) {
    this.selectedEstablecimientoId.set(id);
    this.filtros.set({}); // Reset filters on establishment change
    await this.loadReservas(id);
  }

  onFiltersChange(newFilters: { servicioNombre?: string, estado?: string, fecha?: string }) {
    this.filtros.set(newFilters);
  }

  private async loadReservas(establecimientoId: string) {
    this.loading.set(true);
    try {
      const data = await this.loadReservasUseCase.execute(establecimientoId);
      this.reservas.set(data);
    } catch (error) {
      console.error('Error loading reservations', error);
      this.reservas.set([]);
    } finally {
      this.loading.set(false);
    }
  }
}
