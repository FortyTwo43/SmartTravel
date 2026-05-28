import { DashboardKpis } from '../dashboard/DashboardKpis';
import { DashboardActividadReciente } from '../dashboard/DashboardActividadReciente';

export interface DashboardProveedorRepository {
  getKpis(providerId: string): Promise<DashboardKpis>;
  getActividadReciente(providerId: string): Promise<DashboardActividadReciente[]>;
}
