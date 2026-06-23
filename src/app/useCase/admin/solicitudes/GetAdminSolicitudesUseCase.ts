import { Injectable, inject } from '@angular/core';
import { SolicitudProveedor } from '../../../domain/entities/SolicitudProveedor';
import { SolicitudProveedorEstado } from '../../../domain/ui/admin/solicitudes/AdminSolicitudProveedorView';
import { SupabaseSolicitudProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseSolicitudProveedorRepository';

export interface AdminSolicitudesData {
  solicitudes: SolicitudProveedor[];
  totals: Record<SolicitudProveedorEstado, number>;
}

@Injectable({
  providedIn: 'root'
})
export class GetAdminSolicitudesUseCase {
  private readonly solicitudRepository = inject(SupabaseSolicitudProveedorRepository);

  async execute(): Promise<AdminSolicitudesData> {
    const solicitudes = await this.solicitudRepository.getAll();
    const sortedSolicitudes = solicitudes.sort(
      (a, b) => this.getDateTime(b.fecha_solicitud) - this.getDateTime(a.fecha_solicitud)
    );

    return {
      solicitudes: sortedSolicitudes,
      totals: {
        pendiente: sortedSolicitudes.filter((solicitud) => solicitud.estado === 'pendiente').length,
        aceptado: sortedSolicitudes.filter((solicitud) => solicitud.estado === 'aceptado').length,
        rechazado: sortedSolicitudes.filter((solicitud) => solicitud.estado === 'rechazado').length
      }
    };
  }

  private getDateTime(date: Date): number {
    const dateTime = date.getTime();

    return Number.isNaN(dateTime) ? 0 : dateTime;
  }
}
