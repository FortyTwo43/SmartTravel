import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { PerfilViajero } from '../../../domain/entities/PerfilViajero';
import { PerfilViajeroRepository } from '../../../domain/repositories/PerfilViajeroRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabasePerfilViajeroRepository implements PerfilViajeroRepository {
  private readonly tableName = 'perfil_viajero';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<PerfilViajero, 'id'>): Promise<PerfilViajero> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as PerfilViajero;
  }

  async getAll(): Promise<PerfilViajero[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new Error(error.message);
    return data as PerfilViajero[];
  }

  async getById(id: string): Promise<PerfilViajero | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as PerfilViajero | null;
  }

  async update(id: string, item: Partial<PerfilViajero>): Promise<PerfilViajero> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as PerfilViajero;
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
