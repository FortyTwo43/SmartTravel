/**
 * DTOs for EstablecimientoTuristico entity
 */

export interface CreateEstablecimientoTuristicoDto {
  id_proveedor: string;
  id_destino: string;
  nombre: string;
  tipo: 'restaurante' | 'hotel' | 'tour';
  descripcion: string;
  estado: 'activo' | 'inactivo';
}

export interface UpdateEstablecimientoTuristicoDto {
  id_proveedor?: string;
  id_destino?: string;
  nombre?: string;
  tipo?: 'restaurante' | 'hotel' | 'tour';
  descripcion?: string;
  estado?: 'activo' | 'inactivo';
}
