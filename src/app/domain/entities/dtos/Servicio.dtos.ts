/**
 * DTOs for Servicio entity
 */

export interface CreateServicioDto {
  id_proveedor: string;
  id_destino: string;
  nombre: string;
  tipo_servicio: string;
  descripcion: string;
  precio: number;
  disponibilidad: boolean;
  estado: string;
}

export interface UpdateServicioDto {
  id_proveedor?: string;
  id_destino?: string;
  nombre?: string;
  tipo_servicio?: string;
  descripcion?: string;
  precio?: number;
  disponibilidad?: boolean;
  estado?: string;
}
