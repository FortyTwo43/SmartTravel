/**
 * DTOs for DetalleItinerario entity
 */

export interface CreateDetalleItinerarioDto {
  id_itinerario: string;
  id_servicio_reservable: string;
  fecha: Date;
  hora: string;
  prioridad: string;
  estado: string;
}

export interface UpdateDetalleItinerarioDto {
  id_itinerario?: string;
  id_servicio_reservable?: string;
  fecha?: Date;
  hora?: string;
  prioridad?: string;
  estado?: string;
}
