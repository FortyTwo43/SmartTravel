import { DashboardKpis } from '../ui/proveedor/dashboard/DashboardKpis';
import { DashboardActividadReciente } from '../ui/proveedor/dashboard/DashboardActividadReciente';
import { DashboardServicioMasDemandado } from '../ui/proveedor/dashboard/DashboardServicioMasDemandado';
import { DashboardTipoViaje } from '../ui/proveedor/dashboard/DashboardTipoViaje';
import { DashboardGraph } from '../ui/proveedor/dashboard/DashboardGraph';

export interface DashboardProveedorRepository {
  getKpis(providerId: string): Promise<DashboardKpis>;
  getActividadReciente(providerId: string): Promise<DashboardActividadReciente[]>;
  getServiciosMasDemandados(providerId: string): Promise<DashboardServicioMasDemandado[]>;
  getTipoViaje(providerId: string): Promise<DashboardTipoViaje>;
  getGraphValues(providerId: string): Promise<DashboardGraph[]>;
}
