/**
 * DTOs for Reserva entity
 */

export interface CreateReservaDto {
  id_perfil: string;
  id_servicio_reservable: string;
  fecha_reserva: Date;
  cantidad_personas: number;
  precio_total: number;
  estado: string;
}

export interface UpdateReservaDto {
  id_perfil?: string;
  id_servicio_reservable?: string;
  fecha_reserva?: Date;
  cantidad_personas?: number;
  precio_total?: number;
  estado?: string;
}
