import { Injectable, inject } from '@angular/core';
import { DashboardTipoViaje } from '../../../domain/ui/proveedor/dashboard/DashboardTipoViaje';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';

@Injectable({
  providedIn: 'root'
})
export class LoadDashboardTipoViajeUseCase {
  private readonly dashboardRepository = inject(SupabaseDashboardProveedorRepository);

  async execute(providerId: string): Promise<DashboardTipoViaje> {
    return this.dashboardRepository.getTipoViaje(providerId);
  }
}
