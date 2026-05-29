import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { DashboardProveedorRepository } from '../../../domain/repositories/DashboardProveedorRepository';
import { DashboardKpis } from '../../../domain/dashboard/DashboardKpis';
import { DashboardActividadReciente } from '../../../domain/dashboard/DashboardActividadReciente';
import { DashboardServicioMasDemandado } from '../../../domain/dashboard/DashboardServicioMasDemandado';
import { buildSupabaseError } from './supabaseUtils/supabase-error';
import { DashboardTipoViaje } from '../../../domain/dashboard/DashboardTipoViaje';
import { DashboardGraph } from '../../../domain/dashboard/DashboardGraph';

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

  async getServiciosMasDemandados(providerId: string): Promise<DashboardServicioMasDemandado[]> {
    const { data, error } = await this.supabase
      .from('vw_servicios_mas_demandados')
      .select(`
        servicio_id,
        nombre_servicio,
        descripcion_servicio,
        disponibilidad,
        total_reservas_aceptadas
      `)
      .eq('id_proveedor', providerId)
      .order('total_reservas_aceptadas', { ascending: false })
      .limit(4);

    if (error) {
      throw buildSupabaseError('getServiciosMasDemandados', 'vw_servicios_mas_demandados', error);
    }

    return (data ?? []) as DashboardServicioMasDemandado[];
  }

  async getTipoViaje(providerId: string): Promise<DashboardTipoViaje> {
    const { data, error } = await this.supabase.rpc('get_dashboard_tipo_viaje', {
      p_provider_id: providerId
    });

    if (error) {
      throw buildSupabaseError('getTipoViaje', 'rpc:get_dashboard_tipo_viaje', error);
    }

    return data as DashboardTipoViaje;
  }

  async getGraphValues(providerId: string): Promise<DashboardGraph[]> {
    const { data, error } = await this.supabase
      .from('vw_reservas_diarias')
      .select('*')
      .eq('id_proveedor', providerId)
      .order('fecha')

    if (error) {
      throw buildSupabaseError('getGraphValues', 'vw_reservas_diarias', error);
    }

    return (data ?? []) as DashboardGraph[];
  }
}