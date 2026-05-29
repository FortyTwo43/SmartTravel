import { DashboardKpis } from '../dashboard/DashboardKpis';
import { DashboardActividadReciente } from '../dashboard/DashboardActividadReciente';
import { DashboardServicioMasDemandado } from '../dashboard/DashboardServicioMasDemandado';

export interface DashboardProveedorRepository {
  getKpis(providerId: string): Promise<DashboardKpis>;
  getActividadReciente(providerId: string): Promise<DashboardActividadReciente[]>;
  getServiciosMasDemandados(providerId: string): Promise<DashboardServicioMasDemandado[]>;
}
