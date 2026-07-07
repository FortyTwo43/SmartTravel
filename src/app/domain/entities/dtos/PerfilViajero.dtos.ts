/**
 * DTOs for PerfilViajero entity
 */

export interface CreatePerfilViajeroDto {
  intereses: string;
  presupuesto: number;
  idioma: string;
  tipo_viaje: 'solo' | 'pareja' | 'familia' | 'amigos'
}

export interface UpdatePerfilViajeroDto {
  intereses?: string;
  presupuesto?: number;
  idioma?: string;
  tipo_viaje?: 'solo' | 'pareja' | 'familia' | 'amigos';
  primera_sesion?: boolean;
}
