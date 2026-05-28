import { DashboardKpis } from '../entities/DashboardKpis';

export interface DashboardProveedorRepository {
  getKpis(providerId: string): Promise<DashboardKpis>;
}
