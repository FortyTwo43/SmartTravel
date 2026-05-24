/**
 * DTOs for Reserva entity
 */

export interface CreateReservaDto {
  id_perfil: string;
  id_servicio_reservable: string;
  fecha_reserva: Date;
  cantidad_personas: number;
  precio_total: number;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
}

export interface UpdateReservaDto {
  id_perfil?: string;
  id_servicio_reservable?: string;
  fecha_reserva?: Date;
  cantidad_personas?: number;
  precio_total?: number;
  estado?: 'pendiente' | 'aceptado' | 'rechazado';
}
