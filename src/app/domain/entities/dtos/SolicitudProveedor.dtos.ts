/**
 * DTOs for SolicitudProveedor entity
 */

export interface CreateSolicitudProveedorDto {
  id?: string;
  id_perfil: string;
  nombre_negocio: string;
  tipo_negocio: 'restaurante' | 'hotel' | 'tour';
  descripcion: string;
  telefono: string;
  ubicacion: string;
  documento_url: string;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
}

export interface UpdateSolicitudProveedorDto {
  id_perfil?: string;
  nombre_negocio?: string;
  tipo_negocio?: 'restaurante' | 'hotel' | 'tour';
  descripcion?: string;
  telefono?: string;
  ubicacion?: string;
  documento_url?: string;
  estado?: 'pendiente' | 'aceptado' | 'rechazado';
}
