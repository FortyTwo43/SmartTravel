import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Itinerario } from '../../../domain/entities/Itinerario';
import { ItinerarioRepository } from '../../../domain/repositories/ItinerarioRepository';
import { buildSupabaseError } from './supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseItinerarioRepository implements ItinerarioRepository {
  private readonly tableName = 'itinerario';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Itinerario, 'id'>): Promise<Itinerario> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(this.mapToRow(item))
      .select()
      .single();

    if (error) throw buildSupabaseError('create', this.tableName, error);
    return this.mapFromRow(data);
  }

  async getAll(): Promise<Itinerario[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw buildSupabaseError('getAll', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }

  async findByPerfilId(perfilId: string): Promise<Itinerario[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_perfil', perfilId);

    if (error) throw buildSupabaseError('findByPerfilId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }

  async getById(id: string): Promise<Itinerario | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw buildSupabaseError('getById', this.tableName, error);
    return data ? this.mapFromRow(data as Itinerario) : null;
  }

  async update(id: string, item: Partial<Itinerario>): Promise<Itinerario> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(this.mapToRow(item))
      .eq('id', id)
      .select()
      .single();

    if (error) throw buildSupabaseError('update', this.tableName, error);
    return this.mapFromRow(data as Itinerario);
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw buildSupabaseError('delete', this.tableName, error);
    return (count ?? 0) > 0;
  }

  private mapToRow(item: Partial<Itinerario>): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if (item.fecha_inicio) {
      mapped['fecha_inicio'] = item.fecha_inicio instanceof Date
        ? item.fecha_inicio.toISOString()
        : item.fecha_inicio;
    }

    if (item.fecha_fin) {
      mapped['fecha_fin'] = item.fecha_fin instanceof Date
        ? item.fecha_fin.toISOString()
        : item.fecha_fin;
    }

    return mapped;
  }

  private mapFromRow(row: Itinerario): Itinerario {
    return {
      ...row,
      fecha_inicio: row.fecha_inicio instanceof Date
        ? row.fecha_inicio
        : new Date(row.fecha_inicio as string),
      fecha_fin: row.fecha_fin instanceof Date
        ? row.fecha_fin
        : new Date(row.fecha_fin as string)
    };
  }

}
