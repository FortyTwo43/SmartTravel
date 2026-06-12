import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SupabaseAuthRepository } from '../../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { LoadDashboardEstablecimientoUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardEstablecimiento';
import { UpdateEstablecimientoUseCase } from '../../../../useCase/proveedor/dashboard/UpdateEstablecimientoUseCase';
import { LoadProveedorServicesUseCase } from '../../../../useCase/proveedor/services/LoadProveedorServicesUseCase';
import { SupabaseDestinoRepository } from '../../../../infrastructure/repositories/supabase/SupabaseDestinoRepository';
import { EstablecimientoTuristico } from '../../../../domain/entities/EstablecimientoTuristico';
import { ProveedorServiceItem } from '../../../../domain/ui/proveedor/services/ProveedorServiceItem';
import { UpdateEstablecimientoTuristicoDto } from '../../../../domain/entities/dtos/EstablecimientoTuristico.dtos';
import { EstablecimientoDetailsComponent } from '../../../components/proveedor/establecimiento/establecimiento-details/establecimiento-details';
import { EstablecimientoGalleryComponent } from '../../../components/proveedor/establecimiento/establecimiento-gallery/establecimiento-gallery';

@Component({
  selector: 'app-proveedor-establecimiento',
  standalone: true,
  imports: [CommonModule, TranslateModule, EstablecimientoDetailsComponent, EstablecimientoGalleryComponent],
  templateUrl: './proveedor-establecimiento.html',
  styleUrl: './proveedor-establecimiento.css'
})
export class ProveedorEstablecimientoComponent implements OnInit {
  private readonly authRepository = inject(SupabaseAuthRepository);
  private readonly loadEstablecimientoUseCase = inject(LoadDashboardEstablecimientoUseCase);
  private readonly updateEstablecimientoUseCase = inject(UpdateEstablecimientoUseCase);
  private readonly loadServicesUseCase = inject(LoadProveedorServicesUseCase);
  private readonly destinoRepository = inject(SupabaseDestinoRepository);

  establecimiento = signal<EstablecimientoTuristico | null>(null);
  services = signal<ProveedorServiceItem[]>([]);
  images = signal<string[]>([]);
  isLoading = signal<boolean>(true);
  destinoLabel = signal<string>('');
  isUpdating = signal<boolean>(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.isLoading.set(true);
    try {
      const { data } = await this.authRepository.getCurrentUser();
      const providerId = data.user?.id;

      if (!providerId) throw new Error('Usuario no autenticado');

      const [est, srvs] = await Promise.all([
        this.loadEstablecimientoUseCase.execute(providerId),
        this.loadServicesUseCase.execute()
      ]);

      this.establecimiento.set(est);
      this.services.set(srvs);

      // Extract images from services that have them
      const imgs = srvs.filter(s => s.imagen).map(s => s.imagen as string);
      this.images.set(imgs);

      // Load destino label (ciudad, pais)
      if (est.id_destino) {
        try {
          const destino = await this.destinoRepository.getById(est.id_destino);
          if (destino) {
            this.destinoLabel.set(`${destino.ciudad}, ${destino.pais}`);
          }
        } catch {
          this.destinoLabel.set(est.id_destino);
        }
      }
    } catch (error) {
      console.error('Error cargando los datos del establecimiento:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleUpdate(dto: UpdateEstablecimientoTuristicoDto) {
    const current = this.establecimiento();
    if (!current) return;

    this.isUpdating.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    try {
      const updated = await this.updateEstablecimientoUseCase.execute(current.id, dto);
      if (updated) {
        this.establecimiento.set(updated);
        this.successMessage.set('Establecimiento actualizado correctamente');
        setTimeout(() => this.successMessage.set(null), 3000);
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      this.errorMessage.set('Error al actualizar el establecimiento');
      setTimeout(() => this.errorMessage.set(null), 3000);
    } finally {
      this.isUpdating.set(false);
    }
  }
}
