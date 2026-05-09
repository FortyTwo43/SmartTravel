import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { DetalleItinerario } from '../../../domain/entities/DetalleItinerario';
import { DetalleItinerarioRepository } from '../../../domain/repositories/DetalleItinerarioRepository';
import { buildSupabaseError } from './supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDetalleItinerarioRepository implements DetalleItinerarioRepository {
  private readonly tableName = 'detalle_itinerario';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<DetalleItinerario, 'id'>): Promise<DetalleItinerario> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(this.mapToRow(item))
      .select()
      .single();

    if (error) throw buildSupabaseError('create', this.tableName, error);
    return this.mapFromRow(data);
  }

  async getAll(): Promise<DetalleItinerario[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw buildSupabaseError('getAll', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row as DetalleItinerario));
  }

  async findByItinerarioId(itinerarioId: string): Promise<DetalleItinerario[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_itinerario', itinerarioId);

    if (error) throw buildSupabaseError('findByItinerarioId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row as DetalleItinerario));
  }

  async getById(id: string): Promise<DetalleItinerario | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw buildSupabaseError('getById', this.tableName, error);
    return data ? this.mapFromRow(data as DetalleItinerario) : null;
  }

  async update(id: string, item: Partial<DetalleItinerario>): Promise<DetalleItinerario> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(this.mapToRow(item))
      .eq('id', id)
      .select()
      .single();

    if (error) throw buildSupabaseError('update', this.tableName, error);
    return this.mapFromRow(data as DetalleItinerario);
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw buildSupabaseError('delete', this.tableName, error);
    return (count ?? 0) > 0;
  }

  private mapToRow(item: Partial<DetalleItinerario>): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if (item.fecha) {
      mapped['fecha'] = item.fecha instanceof Date ? item.fecha.toISOString() : item.fecha;
    }

    return mapped;
  }

  private mapFromRow(row: DetalleItinerario): DetalleItinerario {
    return {
      ...row,
      fecha: row.fecha instanceof Date ? row.fecha : new Date(row.fecha as string)
    };
  }

}
