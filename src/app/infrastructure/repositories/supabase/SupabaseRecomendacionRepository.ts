import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Recomendacion } from '../../../domain/entities/Recomendacion';
import { RecomendacionRepository } from '../../../domain/repositories/RecomendacionRepository';
import { buildSupabaseError } from './supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseRecomendacionRepository implements RecomendacionRepository {
  private readonly tableName = 'recomendacion';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Recomendacion, 'id'>): Promise<Recomendacion> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(this.mapToRow(item))
      .select()
      .single();

    if (error) throw buildSupabaseError('create', this.tableName, error);
    return this.mapFromRow(data);
  }

  async getAll(): Promise<Recomendacion[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw buildSupabaseError('getAll', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }

  async getById(id: string): Promise<Recomendacion | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw buildSupabaseError('getById', this.tableName, error);
    return data ? this.mapFromRow(data) : null;
  }

  async update(id: string, item: Partial<Recomendacion>): Promise<Recomendacion> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(this.mapToRow(item))
      .eq('id', id)
      .select()
      .single();

    if (error) throw buildSupabaseError('update', this.tableName, error);
    return this.mapFromRow(data);
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw buildSupabaseError('delete', this.tableName, error);
    return (count ?? 0) > 0;
  }

  private mapToRow(item: Partial<Recomendacion>): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if (item.fecha_generada) {
      mapped['fecha_generada'] = item.fecha_generada instanceof Date
        ? item.fecha_generada.toISOString()
        : item.fecha_generada;
    }

    return mapped;
  }

  private mapFromRow(row: Recomendacion): Recomendacion {
    return {
      ...row,
      fecha_generada: row.fecha_generada instanceof Date
        ? row.fecha_generada
        : new Date(row.fecha_generada)
    };
  }
}
