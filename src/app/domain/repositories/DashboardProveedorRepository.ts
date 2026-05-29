import { DashboardKpis } from '../dashboard/DashboardKpis';
import { DashboardActividadReciente } from '../dashboard/DashboardActividadReciente';
import { DashboardServicioMasDemandado } from '../dashboard/DashboardServicioMasDemandado';
import { DashboardTipoViaje } from '../dashboard/DashboardTipoViaje';

export interface DashboardProveedorRepository {
  getKpis(providerId: string): Promise<DashboardKpis>;
  getActividadReciente(providerId: string): Promise<DashboardActividadReciente[]>;
  getServiciosMasDemandados(providerId: string): Promise<DashboardServicioMasDemandado[]>;
  getTipoViaje(providerId: string): Promise<DashboardTipoViaje>;
}
