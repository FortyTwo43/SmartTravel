/**
 * DTOs for Destino entity
 */

export interface CreateDestinoDto {
  nombre: string;
  ciudad: string;
  pais: string;
  descripcion: string;
  tipo_experiencia: string;
  imagen: string;
}

export interface UpdateDestinoDto {
  nombre?: string;
  ciudad?: string;
  pais?: string;
  descripcion?: string;
  tipo_experiencia?: string;
  imagen?: string;
}
