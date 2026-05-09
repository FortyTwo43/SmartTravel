import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Destino } from '../../../domain/entities/Destino';
import { DestinoRepository } from '../../../domain/repositories/DestinoRepository';
import { buildSupabaseError } from './supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDestinoRepository implements DestinoRepository {
  private readonly tableName = 'destino';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Destino, 'id'>): Promise<Destino> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item)
      .select()
      .single();

    if (error) throw buildSupabaseError('create', this.tableName, error);
    return data;
  }

  async getAll(): Promise<Destino[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw buildSupabaseError('getAll', this.tableName, error);
    return data as Destino[];
  }

  async getById(id: string): Promise<Destino | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw buildSupabaseError('getById', this.tableName, error);
    return data as Destino | null;
  }

  async update(id: string, item: Partial<Destino>): Promise<Destino> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item)
      .eq('id', id)
      .select()
      .single();

    if (error) throw buildSupabaseError('update', this.tableName, error);
    return data;
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw buildSupabaseError('delete', this.tableName, error);
    return (count ?? 0) > 0;
  }
}
