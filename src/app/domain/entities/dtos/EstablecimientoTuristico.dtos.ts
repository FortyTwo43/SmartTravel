/**
 * DTOs for EstablecimientoTuristico entity
 */

export interface CreateEstablecimientoTuristicoDto {
  id_proveedor: string;
  id_destino: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  estado: string;
}

export interface UpdateEstablecimientoTuristicoDto {
  id_proveedor?: string;
  id_destino?: string;
  nombre?: string;
  tipo?: string;
  descripcion?: string;
  estado?: string;
}
