import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Reserva } from '../../../domain/entities/Reserva';
import { ReservaRepository } from '../../../domain/repositories/ReservaRepository';
import { buildSupabaseError } from './supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseReservaRepository implements ReservaRepository {
  private readonly tableName = 'reserva';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Reserva, 'id'>): Promise<Reserva> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(this.mapToRow(item))
      .select()
      .single();

    if (error) throw buildSupabaseError('create', this.tableName, error);
    return this.mapFromRow(data as Reserva);
  }

  async getAll(): Promise<Reserva[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw buildSupabaseError('getAll', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row as Reserva));
  }

  async findByPerfilId(perfilId: string): Promise<Reserva[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_perfil', perfilId);

    if (error) throw buildSupabaseError('findByPerfilId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row as Reserva));
  }

  async getById(id: string): Promise<Reserva | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw buildSupabaseError('getById', this.tableName, error);
    return data ? this.mapFromRow(data as Reserva) : null;
  }

  async update(id: string, item: Partial<Reserva>): Promise<Reserva> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(this.mapToRow(item))
      .eq('id', id)
      .select()
      .single();

    if (error) throw buildSupabaseError('update', this.tableName, error);
    return this.mapFromRow(data as Reserva);
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw buildSupabaseError('delete', this.tableName, error);
    return (count ?? 0) > 0;
  }
  
  private mapToRow(item: Partial<Reserva>): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if (item.fecha_reserva) {
      mapped['fecha_reserva'] = item.fecha_reserva instanceof Date
        ? item.fecha_reserva.toISOString()
        : item.fecha_reserva;
    }

    return mapped;
  }

  private mapFromRow(row: Reserva): Reserva {
    return {
      ...row,
      fecha_reserva: row.fecha_reserva instanceof Date
        ? row.fecha_reserva
        : new Date(row.fecha_reserva as unknown as string)
    };
  }
}
