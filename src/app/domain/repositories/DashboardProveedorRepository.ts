import { DashboardKpis } from '../dashboard/DashboardKpis';
import { DashboardActividadReciente } from '../dashboard/DashboardActividadReciente';
import { DashboardServicioMasDemandado } from '../dashboard/DashboardServicioMasDemandado';
import { DashboardTipoViaje } from '../dashboard/DashboardTipoViaje';
import { DashboardGraph } from '../dashboard/DashboardGraph';

export interface DashboardProveedorRepository {
  getKpis(providerId: string): Promise<DashboardKpis>;
  getActividadReciente(providerId: string): Promise<DashboardActividadReciente[]>;
  getServiciosMasDemandados(providerId: string): Promise<DashboardServicioMasDemandado[]>;
  getTipoViaje(providerId: string): Promise<DashboardTipoViaje>;
  getGraphValues(providerId: string): Promise<DashboardGraph[]>;
}
