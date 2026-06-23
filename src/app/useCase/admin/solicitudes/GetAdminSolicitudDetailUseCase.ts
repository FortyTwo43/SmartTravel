import { Injectable, inject } from '@angular/core';
import {
  AdminSolicitudProveedorView,
  SolicitudProveedorDocumento
} from '../../../domain/ui/admin/solicitudes/AdminSolicitudProveedorView';
import { SupabasePerfilRepository } from '../../../infrastructure/repositories/supabase/SupabasePerfilRepository';
import { SupabaseSolicitudProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseSolicitudProveedorRepository';
import { SupabaseStorageRepository } from '../../../infrastructure/repositories/supabase/SupabaseStorageRepository';

const DOCUMENTOS_PROVEEDOR_BUCKET = 'documentos_proveedor';

@Injectable({
  providedIn: 'root'
})
export class GetAdminSolicitudDetailUseCase {
  private readonly solicitudRepository = inject(SupabaseSolicitudProveedorRepository);
  private readonly perfilRepository = inject(SupabasePerfilRepository);
  private readonly storageRepository = inject(SupabaseStorageRepository);

  async execute(id: string): Promise<AdminSolicitudProveedorView | null> {
    const solicitud = await this.solicitudRepository.getById(id);

    if (!solicitud) {
      return null;
    }

    const [perfil, signedUrl] = await Promise.all([
      this.perfilRepository.getById(solicitud.id_perfil),
      this.resolveDocumentUrl(solicitud.documento_url)
    ]);

    return {
      solicitud,
      perfil,
      documento: this.buildDocumento(solicitud.documento_url, signedUrl)
    };
  }

  private async resolveDocumentUrl(path: string): Promise<string> {
    if (!path) {
      return '';
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    return this.storageRepository.getSignedUrl(DOCUMENTOS_PROVEEDOR_BUCKET, path);
  }

  private buildDocumento(path: string, signedUrl: string): SolicitudProveedorDocumento {
    const mimeType = this.detectMimeType(path);

    return {
      path,
      signedUrl,
      mimeType,
      tipo: mimeType === 'application/pdf' ? 'pdf' : mimeType.startsWith('image/') ? 'image' : 'unknown',
      fileName: this.getFileName(path)
    };
  }

  private detectMimeType(path: string): SolicitudProveedorDocumento['mimeType'] {
    const normalizedPath = path.toLowerCase().split('?')[0];

    if (normalizedPath.endsWith('.pdf') || normalizedPath.includes('application/pdf')) {
      return 'application/pdf';
    }

    if (normalizedPath.endsWith('.png') || normalizedPath.includes('image/png')) {
      return 'image/png';
    }

    if (
      normalizedPath.endsWith('.jpg') ||
      normalizedPath.endsWith('.jpeg') ||
      normalizedPath.includes('image/jpeg')
    ) {
      return 'image/jpeg';
    }

    return 'unknown';
  }

  private getFileName(path: string): string {
    const cleanPath = path.split('?')[0];
    const segments = cleanPath.split('/');

    return segments.at(-1) || 'documento-proveedor';
  }
}
