/**
 * DTOs for Itinerario entity
 */

export interface CreateItinerarioDto {
  id_perfil: string;
  nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: string;
}

export interface UpdateItinerarioDto {
  id_perfil?: string;
  nombre?: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  estado?: string;
}
