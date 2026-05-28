export interface DashboardActividadReciente {
  nombre_cliente: string;
  nombre_servicio: string;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
  pax: number;
}
