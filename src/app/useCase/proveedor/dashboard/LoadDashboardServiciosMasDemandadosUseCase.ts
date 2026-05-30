import { Injectable, inject } from '@angular/core';
import { DashboardServicioMasDemandado } from '../../../domain/ui/proveedor/dashboard/DashboardServicioMasDemandado';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';

@Injectable({
  providedIn: 'root'
})
export class LoadDashboardServiciosMasDemandadosUseCase {
  private readonly dashboardRepository = inject(SupabaseDashboardProveedorRepository);

  async execute(providerId: string): Promise<DashboardServicioMasDemandado[]> {
    return this.dashboardRepository.getServiciosMasDemandados(providerId);
  }
}
