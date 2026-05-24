export interface SolicitudProveedor {
  id: string;
  id_perfil: string;
  nombre_negocio: string;
  tipo_negocio: string;
  descripcion: string;
  telefono: string;
  ubicacion: string;
  documento_url: string;
  estado: string;
  fecha_solicitud: Date;
}
