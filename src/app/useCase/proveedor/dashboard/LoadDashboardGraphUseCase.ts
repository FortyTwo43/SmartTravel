import { Injectable, inject } from '@angular/core';
import { DashboardGraph } from '../../../domain/ui/proveedor/dashboard/DashboardGraph';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';

@Injectable({
  providedIn: 'root'
})
export class LoadDashboardGraphUseCase {
  private readonly dashboardRepository = inject(SupabaseDashboardProveedorRepository);

  async execute(providerId: string): Promise<DashboardGraph[]> {
    return this.dashboardRepository.getGraphValues(providerId);
  }
}