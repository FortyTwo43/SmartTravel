/**
 * DTOs for Destino entity
 */

export interface CreateDestinoDto {
  nombre: string;
  ciudad: string;
  pais: string;
  descripcion: string;
  tipo_experiencia: 'aventura' | 'cultura' | 'naturaleza' | 'playa'
  imagen: string;
}

export interface UpdateDestinoDto {
  nombre?: string;
  ciudad?: string;
  pais?: string;
  descripcion?: string;
  tipo_experiencia?: 'aventura' | 'cultura' | 'naturaleza' | 'playa'
  imagen?: string;
}
