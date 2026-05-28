import { Injectable, inject } from '@angular/core';
import { DashboardActividadReciente } from '../../../domain/dashboard/DashboardActividadReciente';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';

@Injectable({
  providedIn: 'root'
})
export class LoadActividadRecienteUseCase {
  private readonly dashboardRepository = inject(SupabaseDashboardProveedorRepository);

  async execute(providerId: string): Promise<DashboardActividadReciente[]> {
    return this.dashboardRepository.getActividadReciente(providerId);
  }
}
