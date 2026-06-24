import { AdminEstadisticasData } from '../ui/admin/estadisticas/AdminEstadisticas';

export interface AdminEstadisticasRepository {
  getEstadisticas(): Promise<AdminEstadisticasData>;
}
