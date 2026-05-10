/**
 * DTOs for PerfilViajero entity
 */

export interface CreatePerfilViajeroDto {
  id: string;
  intereses: string;
  presupuesto: number;
  idioma: string;
}

export interface UpdatePerfilViajeroDto {
  intereses?: string;
  presupuesto?: number;
  idioma?: string;
}
