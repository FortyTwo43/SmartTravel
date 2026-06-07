import { SolicitudProveedor } from '../entities/SolicitudProveedor';
import { ServicioReservable } from '../entities/ServicioReservable';

export interface AdminDashboardStats {
  viajerosCount: number;
  proveedoresCount: number;
  establecimientosCount: number;
  reservasCount: number;
}

export interface AdminDashboardRepository {
  /**
   * Obtiene los KPIs globales del sistema
   */
  getGlobalKPIs(): Promise<AdminDashboardStats>;

  /**
   * Obtiene las solicitudes de proveedor más recientes que están pendientes
   * @param limit cantidad máxima a retornar
   */
  getLatestPendingRequests(limit: number): Promise<SolicitudProveedor[]>;

  /**
   * Obtiene los servicios reservables más recientes
   * @param limit cantidad máxima a retornar
   */
  getLatestServices(limit: number): Promise<ServicioReservable[]>;
}
