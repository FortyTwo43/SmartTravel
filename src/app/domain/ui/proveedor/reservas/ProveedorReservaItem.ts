export interface ProveedorReservaItem {
  id: string;
  id_perfil: string;
  id_servicio_reservable: string;
  nombre_servicio: string;
  fecha_reserva: Date;
  cantidad_personas: number;
  precio_total: number;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
}
