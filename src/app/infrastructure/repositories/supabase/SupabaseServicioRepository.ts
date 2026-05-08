import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Servicio } from '../../../domain/entities/Servicio';
import { ServicioRepository } from '../../../domain/repositories/ServicioRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseServicioRepository implements ServicioRepository {
  private readonly tableName = 'servicio';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Servicio, 'id'>): Promise<Servicio> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Servicio;
  }

  async getAll(): Promise<Servicio[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new Error(error.message);
    return data as Servicio[];
  }

  async getById(id: string): Promise<Servicio | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Servicio | null;
  }

  async update(id: string, item: Partial<Servicio>): Promise<Servicio> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Servicio;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }
}
