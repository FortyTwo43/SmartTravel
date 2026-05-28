import { Injectable, inject } from '@angular/core';
import { DashboardKpis } from '../../../domain/dashboard/DashboardKpis';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';

@Injectable({
  providedIn: 'root'
})
export class LoadDashboardKpisUseCase {
  private readonly dashboardRepository = inject(SupabaseDashboardProveedorRepository);

  async execute(providerId: string): Promise<DashboardKpis> {
    return this.dashboardRepository.getKpis(providerId);
  }
}
