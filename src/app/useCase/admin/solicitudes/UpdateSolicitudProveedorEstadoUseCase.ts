import { Injectable, inject } from '@angular/core';
import { SolicitudProveedor } from '../../../domain/entities/SolicitudProveedor';
import { SolicitudProveedorEstado } from '../../../domain/ui/admin/solicitudes/AdminSolicitudProveedorView';
import { SupabaseSolicitudProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseSolicitudProveedorRepository';

@Injectable({
  providedIn: 'root'
})
export class UpdateSolicitudProveedorEstadoUseCase {
  private readonly solicitudRepository = inject(SupabaseSolicitudProveedorRepository);

  async execute(id: string, estado: SolicitudProveedorEstado): Promise<SolicitudProveedor> {
    return this.solicitudRepository.update(id, { estado });
  }
}
