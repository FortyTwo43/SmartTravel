import { IngresoPeriodo } from '../ui/proveedor/estadisticas/IngresoPeriodo';
import { ReservaPeriodo } from '../ui/proveedor/estadisticas/ReservaPeriodo';
import { ServicioMasReservado } from '../ui/proveedor/estadisticas/ServicioMasReservado';
import { IngresoPorServicio } from '../ui/proveedor/estadisticas/IngresoPorServicio';
import { ReservaPorEstado } from '../ui/proveedor/estadisticas/ReservaPorEstado';

export interface EstadisticasProveedorRepository {
  getIngresosPorPeriodo(idEstablecimiento: string, periodo: 'dia' | 'semana' | 'mes'): Promise<IngresoPeriodo[]>;
  getReservasRealizadas(idEstablecimiento: string, periodo: 'dia' | 'semana' | 'mes'): Promise<ReservaPeriodo[]>;
  getTopServicios(idEstablecimiento: string): Promise<ServicioMasReservado[]>;
  getDistribucionIngresos(idEstablecimiento: string): Promise<IngresoPorServicio[]>;
  getReservasPorEstado(idEstablecimiento: string): Promise<ReservaPorEstado[]>;
}
