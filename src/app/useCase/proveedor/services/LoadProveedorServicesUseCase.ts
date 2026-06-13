import { Injectable, inject } from '@angular/core';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { ProveedorServiceItem } from '../../../domain/ui/proveedor/services/ProveedorServiceItem';

@Injectable({
  providedIn: 'root'
})
export class LoadProveedorServicesUseCase {
  private readonly authRepository = inject(SupabaseAuthRepository);
  private readonly establecimientoRepository = inject(SupabaseEstablecimientoTuristicoRepository);
  private readonly servicioRepository = inject(SupabaseServicioReservableRepository);

  async execute(): Promise<ProveedorServiceItem[]> {
    const { data: authData } = await this.authRepository.getCurrentUser();

    if (!authData?.user?.id) {
      return [];
    }

    const providerId = authData.user.id;
    const establecimientos = await this.establecimientoRepository.findByProveedorId(providerId);

    if (establecimientos.length === 0) {
      return [];
    }

    const servicesByEstablecimiento = await Promise.allSettled(
      establecimientos.map((establecimiento) =>
        this.servicioRepository.findByEstablecimientoId(establecimiento.id)
          .then((services) => ({ establecimiento, services }))
      )
    );

    return servicesByEstablecimiento.flatMap((result) => {
      if (result.status !== 'fulfilled') {
        return [];
      }

      const { establecimiento, services } = result.value;

      return services.map((service) => ({
        id: service.id,
        nombre: service.nombre,
        descripcion: service.descripcion,
        precio: service.precio,
        comodidadesAdicionales: service.comodidades_adicionales,
        disponibilidad: service.disponibilidad,
        establecimientoNombre: establecimiento.nombre,
        imagen: service.imagen
      }));
    });
  }
}
