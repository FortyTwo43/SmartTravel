/**
 * DTOs for SolicitudProveedor entity
 */

export interface CreateSolicitudProveedorDto {
  id?: string;
  id_perfil: string;
  nombre_negocio: string;
  tipo_negocio: string;
  descripcion: string;
  telefono: string;
  ubicacion: string;
  documento_url: string;
  estado: string;
  fecha_solicitud?: Date;
}

export interface UpdateSolicitudProveedorDto {
  id_perfil?: string;
  nombre_negocio?: string;
  tipo_negocio?: string;
  descripcion?: string;
  telefono?: string;
  ubicacion?: string;
  documento_url?: string;
  estado?: string;
}
