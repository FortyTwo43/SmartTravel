/**
 * DTOs for PerfilViajero entity
 */

export interface CreatePerfilViajeroDto {
  id_perfil: string;
  intereses: string;
  presupuesto: number;
  idioma: string;
}

export interface UpdatePerfilViajeroDto {
  id_perfil?: string;
  intereses?: string;
  presupuesto?: number;
  idioma?: string;
}
