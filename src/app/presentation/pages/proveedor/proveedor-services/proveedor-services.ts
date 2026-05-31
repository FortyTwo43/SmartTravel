import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Plus } from 'lucide-angular';
import { ProveedorServiceCardComponent } from '../../../components/proveedor/services/proveedor-service-card/proveedor-service-card';
import { ProveedorServiceItem } from '../../../../domain/ui/proveedor/services/ProveedorServiceItem';
import { LoadProveedorServicesUseCase, ToggleServicioDisponibilidadUseCase } from '../../../../useCase/proveedor/services';

@Component({
  selector: 'app-proveedor-services-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, ProveedorServiceCardComponent],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Plus })
  }],
  templateUrl: './proveedor-services.html',
  styleUrl: './proveedor-services.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProveedorServicesPageComponent implements OnInit {
  private readonly loadServiciosUseCase = inject(LoadProveedorServicesUseCase);
  private readonly toggleDisponibilidadUseCase = inject(ToggleServicioDisponibilidadUseCase);

  services = signal<ProveedorServiceItem[]>([]);
  loading = signal(true);
  loadError = signal<string | null>(null);
  actionError = signal<string | null>(null);

  totalServices = computed(() => this.services().length);

  async ngOnInit(): Promise<void> {
    await this.loadServices();
  }

  async loadServices(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    this.actionError.set(null);

    try {
      const services = await this.loadServiciosUseCase.execute();
      this.services.set(services);
    } catch (error) {
      this.loadError.set(error instanceof Error ? error.message : 'Ocurrió un error al cargar los servicios.');
    } finally {
      this.loading.set(false);
    }
  }

  onToggleAvailability(serviceId: string, availability: boolean): void {
    void this.updateAvailability(serviceId, availability);
  }

  private async updateAvailability(serviceId: string, availability: boolean): Promise<void> {
    try {
      const updatedService = await this.toggleDisponibilidadUseCase.execute(serviceId, availability);
      this.actionError.set(null);

      this.services.update((services) =>
        services.map((service) =>
          service.id === updatedService.id
            ? { ...service, disponibilidad: updatedService.disponibilidad }
            : service
        )
      );
    } catch (error) {
      this.actionError.set(error instanceof Error ? error.message : 'No se pudo actualizar la disponibilidad.');
    }
  }
}
