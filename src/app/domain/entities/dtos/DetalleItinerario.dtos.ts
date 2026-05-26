/**
 * DTOs for DetalleItinerario entity
 */

export interface CreateDetalleItinerarioDto {
  id_itinerario: string;
  id_servicio_reservable: string;
  fecha: Date;
  hora: string;
  prioridad: string;
  estado: 'pendiente' | 'en_progreso' | 'completado';
}

export interface UpdateDetalleItinerarioDto {
  id_itinerario?: string;
  id_servicio_reservable?: string;
  fecha?: Date;
  hora?: string;
  prioridad?: string;
  estado?: 'pendiente' | 'en_progreso' | 'completado';
}
