import { Injectable, inject } from '@angular/core';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { SupabaseReservaRepository } from '../../../infrastructure/repositories/supabase/SupabaseReservaRepository';
import { ProveedorReservaItem } from '../../../domain/ui/proveedor/reservas/ProveedorReservaItem';

@Injectable({
  providedIn: 'root'
})
export class LoadReservasByEstablecimientoUseCase {
  private readonly servicioRepository = inject(SupabaseServicioReservableRepository);
  private readonly reservaRepository = inject(SupabaseReservaRepository);

  async execute(establecimientoId: string): Promise<ProveedorReservaItem[]> {
    if (!establecimientoId) {
      return [];
    }

    // 1. Get all services for the establishment
    const servicios = await this.servicioRepository.findByEstablecimientoId(establecimientoId);
    
    if (servicios.length === 0) {
      return [];
    }

    // 2. Extract service IDs
    const serviceIds = servicios.map(s => s.id);
    
    // Create a map for quick service name lookup
    const serviceMap = new Map<string, string>();
    servicios.forEach(s => serviceMap.set(s.id, s.nombre));

    // 3. Get all reservations for these services
    const reservas = await this.reservaRepository.findByServiciosIds(serviceIds);

    // 4. Map to UI DTO
    return reservas.map(reserva => ({
      id: reserva.id,
      id_perfil: reserva.id_perfil,
      id_servicio_reservable: reserva.id_servicio_reservable,
      nombre_servicio: serviceMap.get(reserva.id_servicio_reservable) || 'Servicio Desconocido',
      fecha_reserva: reserva.fecha_reserva,
      cantidad_personas: reserva.cantidad_personas,
      precio_total: reserva.precio_total,
      estado: reserva.estado
    }));
  }
}
