import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { DashboardProveedorRepository } from '../../../domain/repositories/DashboardProveedorRepository';
import { DashboardKpis } from '../../../domain/entities/DashboardKpis';
import { buildSupabaseError } from './supabaseUtils/supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDashboardProveedorRepository implements DashboardProveedorRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getKpis(providerId: string): Promise<DashboardKpis> {
    const { data, error } = await this.supabase.rpc('get_dashboard_kpis', {
      p_provider_id: providerId
    });

    if (error) {
      throw buildSupabaseError('getKpis', 'rpc:get_dashboard_kpis', error);
    }

    console.log(data);
    return data as DashboardKpis;
  }
}
