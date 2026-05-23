/**
 * DTOs for SolicitudProveedor entity
 */

export interface CreateSolicitudProveedorDto {
  id_perfil: string;
  nombre_negocio: string;
  descripcion: string;
  telefono: string;
  documento_url: string;
  estado: string;
}

export interface UpdateSolicitudProveedorDto {
  id_perfil?: string;
  nombre_negocio?: string;
  descripcion?: string;
  telefono?: string;
  documento_url?: string;
  estado?: string;
}
