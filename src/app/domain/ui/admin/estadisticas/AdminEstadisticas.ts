export type AdminPeriodo = 'dia' | 'semana' | 'mes';

export interface AdminStatPoint {
  label: string;
  value: number;
}

export interface AdminTemporalSeries {
  name: string;
  points: AdminStatPoint[];
}

export interface AdminEstadisticasData {
  crecimientoUsuarios: Record<AdminPeriodo, AdminStatPoint[]>;
  distribucionUsuarios: AdminStatPoint[];
  destinosMasPopulares: AdminStatPoint[];
  tiposExperienciaMasReservados: AdminStatPoint[];
  reservasPorDia: AdminStatPoint[];
  reservasPorMes: AdminStatPoint[];
  reservasPorEstado: AdminStatPoint[];
  solicitudesProveedorPorEstado: AdminStatPoint[];
  solicitudesProveedorTemporal: AdminTemporalSeries[];
}
