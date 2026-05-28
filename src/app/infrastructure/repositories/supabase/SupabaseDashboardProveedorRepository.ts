import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { DashboardProveedorRepository } from '../../../domain/repositories/DashboardProveedorRepository';
import { DashboardKpis } from '../../../domain/dashboard/DashboardKpis';
import { DashboardActividadReciente } from '../../../domain/dashboard/DashboardActividadReciente';
import { buildSupabaseError } from './supabaseUtils/supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDashboardProveedorRepository implements DashboardProveedorRepository {
  constructor(private readonly supabase: SupabaseClient) { }

  async getKpis(providerId: string): Promise<DashboardKpis> {
    const { data, error } = await this.supabase.rpc('get_dashboard_kpis', {
      p_provider_id: providerId
    });

    if (error) {
      throw buildSupabaseError('getKpis', 'rpc:get_dashboard_kpis', error);
    }

    return data as DashboardKpis;
  }

  async getActividadReciente(providerId: string): Promise<DashboardActividadReciente[]> {
    const { data, error } = await this.supabase
      .from('vw_actividad_reciente')
      .select('*')
      .eq('id_proveedor', providerId)
      .order('fecha_reserva', { ascending: false })
      .limit(4);

    if (error) {
      throw buildSupabaseError('getActividadReciente', 'vw_actividad_reciente', error);
    }

    return (data ?? []) as DashboardActividadReciente[];
  }
}
