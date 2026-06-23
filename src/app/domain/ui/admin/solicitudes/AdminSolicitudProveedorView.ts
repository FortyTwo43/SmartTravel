import { SolicitudProveedor } from '../../../entities/SolicitudProveedor';
import { Perfil } from '../../../entities/Perfil';

export type SolicitudProveedorEstado = SolicitudProveedor['estado'];

export type SolicitudProveedorDocumentoTipo = 'image' | 'pdf' | 'unknown';

export interface SolicitudProveedorDocumento {
  path: string;
  signedUrl: string;
  mimeType: 'application/pdf' | 'image/png' | 'image/jpeg' | 'unknown';
  tipo: SolicitudProveedorDocumentoTipo;
  fileName: string;
}

export interface AdminSolicitudProveedorView {
  solicitud: SolicitudProveedor;
  perfil: Perfil | null;
  documento: SolicitudProveedorDocumento;
}
