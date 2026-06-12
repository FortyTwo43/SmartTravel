import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { AdminDashboardRepository, AdminDashboardStats } from '../../../domain/repositories/AdminDashboardRepository';
import { SolicitudProveedor } from '../../../domain/entities/SolicitudProveedor';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

@Injectable({
  providedIn: 'root'
})
export class SupabaseAdminDashboardRepository implements AdminDashboardRepository {

  constructor(private readonly supabase: SupabaseClient) {}

  async getGlobalKPIs(): Promise<AdminDashboardStats> {
    const stats: AdminDashboardStats = {
      viajerosCount: 0,
      proveedoresCount: 0,
      establecimientosCount: 0,
      reservasCount: 0
    };

    try {
      // Conteo de viajeros
      const { count: viajerosCount } = await this.supabase
        .from('perfil')
        .select('*', { count: 'exact', head: true })
        .eq('rol', 'viajero');
      
      if (viajerosCount !== null) stats.viajerosCount = viajerosCount;

      // Conteo de proveedores
      const { count: proveedoresCount } = await this.supabase
        .from('perfil')
        .select('*', { count: 'exact', head: true })
        .eq('rol', 'proveedor');
      
      if (proveedoresCount !== null) stats.proveedoresCount = proveedoresCount;

      // Conteo de establecimientos
      const { count: establecimientosCount } = await this.supabase
        .from('establecimiento_turistico')
        .select('*', { count: 'exact', head: true });
      
      if (establecimientosCount !== null) stats.establecimientosCount = establecimientosCount;

      // Conteo de reservas
      const { count: reservasCount } = await this.supabase
        .from('reserva')
        .select('*', { count: 'exact', head: true });
      
      if (reservasCount !== null) stats.reservasCount = reservasCount;
    } catch (error) {
      console.error('Error fetching admin KPIs:', error);
    }

    return stats;
  }

  async getLatestPendingRequests(limit: number): Promise<SolicitudProveedor[]> {
    const { data, error } = await this.supabase
      .from('solicitud_proveedor')
      .select('*')
      .eq('estado', 'pendiente')
      .order('fecha_solicitud', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching latest pending requests:', error);
      return [];
    }

    return data as SolicitudProveedor[];
  }

  async getLatestServices(limit: number): Promise<ServicioReservable[]> {
    const { data, error } = await this.supabase
      .from('servicio_reservable')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching latest services:', error);
      return [];
    }

    return data as ServicioReservable[];
  }
}
