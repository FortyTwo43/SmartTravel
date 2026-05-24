export interface SolicitudProveedor {
  id: string;
  id_perfil: string;
  nombre_negocio: string;
  tipo_negocio: 'restaurante' | 'hotel' | 'tour';
  descripcion: string;
  telefono: string;
  ubicacion: string;
  documento_url: string;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
  fecha_solicitud: Date;
}
