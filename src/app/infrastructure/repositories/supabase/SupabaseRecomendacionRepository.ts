import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Recomendacion } from '../../../domain/entities/Recomendacion';
import { RecomendacionRepository } from '../../../domain/repositories/RecomendacionRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseRecomendacionRepository implements RecomendacionRepository {
  private readonly tableName = 'recomendacion';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Recomendacion, 'id'>): Promise<Recomendacion> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Recomendacion;
  }

  async getAll(): Promise<Recomendacion[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new Error(error.message);
    return data as Recomendacion[];
  }

  async getById(id: string): Promise<Recomendacion | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Recomendacion | null;
  }

  async update(id: string, item: Partial<Recomendacion>): Promise<Recomendacion> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Recomendacion;
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
