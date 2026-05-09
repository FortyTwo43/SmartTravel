import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Perfil } from '../../../domain/entities/Perfil';
import { PerfilRepository } from '../../../domain/repositories/PerfilRepository';
import { buildSupabaseError } from './supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabasePerfilRepository implements PerfilRepository {
  private readonly tableName = 'perfil';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Perfil, 'id'>): Promise<Perfil> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(this.mapToRow(item))
      .select()
      .single();

    if (error) throw buildSupabaseError('create', this.tableName, error);
    return this.mapFromRow(data as Perfil);
  }

  async getAll(): Promise<Perfil[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw buildSupabaseError('getAll', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row as Perfil));
  }

  async getById(id: string): Promise<Perfil | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw buildSupabaseError('getById', this.tableName, error);
    return data ? this.mapFromRow(data as Perfil) : null;
  }

  async update(id: string, item: Partial<Perfil>): Promise<Perfil> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(this.mapToRow(item))
      .eq('id', id)
      .select()
      .single();

    if (error) throw buildSupabaseError('update', this.tableName, error);
    return this.mapFromRow(data as Perfil);
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw buildSupabaseError('delete', this.tableName, error);
    return (count ?? 0) > 0;
  }

  private mapToRow(item: Partial<Perfil>): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if (item.fecha_registro) {
      mapped['fecha_registro'] = item.fecha_registro instanceof Date
        ? item.fecha_registro.toISOString()
        : item.fecha_registro;
    }

    return mapped;
  }

  private mapFromRow(row: Perfil): Perfil {
    return {
      ...row,
      fecha_registro: row.fecha_registro instanceof Date
        ? row.fecha_registro
        : new Date(row.fecha_registro as string)
    };
  }
}
