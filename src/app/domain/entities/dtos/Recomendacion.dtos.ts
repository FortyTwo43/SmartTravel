/**
 * DTOs for Recomendacion entity
 */

export interface CreateRecomendacionDto {
  id_perfil: string;
  id_establecimiento_turistico: string;
  motivo: string;
}

export interface UpdateRecomendacionDto {
  id_perfil?: string;
  id_establecimiento_turistico?: string;
  motivo?: string;
}
