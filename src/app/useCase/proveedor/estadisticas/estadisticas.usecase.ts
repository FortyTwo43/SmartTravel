import { Injectable, inject } from '@angular/core';
import { EstadisticasProveedorRepository } from '../../../domain/repositories/EstadisticasProveedorRepository';
import { SupabaseEstadisticasProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstadisticasProveedorRepository';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasProveedorUseCase {
  private repository: EstadisticasProveedorRepository = inject(SupabaseEstadisticasProveedorRepository);

  getIngresosPorPeriodo(idEstablecimiento: string, periodo: 'dia' | 'semana' | 'mes') {
    return this.repository.getIngresosPorPeriodo(idEstablecimiento, periodo);
  }

  getReservasRealizadas(idEstablecimiento: string, periodo: 'dia' | 'semana' | 'mes') {
    return this.repository.getReservasRealizadas(idEstablecimiento, periodo);
  }

  getTopServicios(idEstablecimiento: string) {
    return this.repository.getTopServicios(idEstablecimiento);
  }

  getDistribucionIngresos(idEstablecimiento: string) {
    return this.repository.getDistribucionIngresos(idEstablecimiento);
  }

  getReservasPorEstado(idEstablecimiento: string) {
    return this.repository.getReservasPorEstado(idEstablecimiento);
  }
}
