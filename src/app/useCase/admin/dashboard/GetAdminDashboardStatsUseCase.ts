import { Injectable, inject } from '@angular/core';
import { SupabaseAdminDashboardRepository } from '../../../infrastructure/repositories/supabase/SupabaseAdminDashboardRepository';
import { AdminDashboardStats } from '../../../domain/repositories/AdminDashboardRepository';
import { SolicitudProveedor } from '../../../domain/entities/SolicitudProveedor';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

export interface AdminDashboardData {
  stats: AdminDashboardStats;
  latestRequests: SolicitudProveedor[];
  latestServices: ServicioReservable[];
}

@Injectable({
  providedIn: 'root'
})
export class GetAdminDashboardStatsUseCase {
  private readonly repository = inject(SupabaseAdminDashboardRepository);

  async execute(): Promise<AdminDashboardData> {
    try {
      const [stats, latestRequests, latestServices] = await Promise.all([
        this.repository.getGlobalKPIs(),
        this.repository.getLatestPendingRequests(5),
        this.repository.getLatestServices(5)
      ]);

      return {
        stats,
        latestRequests,
        latestServices
      };
    } catch (error) {
      console.error('Error in GetAdminDashboardStatsUseCase', error);
      throw error;
    }
  }
}
