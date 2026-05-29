import { Injectable, inject } from '@angular/core';
import { EstablecimientoTuristico } from '../../../domain/entities/EstablecimientoTuristico';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';

@Injectable({
  providedIn: 'root'
})
export class LoadDashboardEstablecimientoUseCase {
  private readonly repository = inject(SupabaseEstablecimientoTuristicoRepository);

  async execute(proveedorId: string): Promise<EstablecimientoTuristico> {
    const list = await this.repository.findByProveedorId(proveedorId);
    if (!list || list.length === 0) {
      throw new Error('No se encontró un establecimiento turístico para el proveedor.');
    }
    return list[0];
  }
}
