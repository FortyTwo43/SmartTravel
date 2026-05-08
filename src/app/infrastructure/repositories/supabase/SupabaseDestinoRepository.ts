import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Destino } from '../../../domain/entities/Destino';
import { DestinoRepository } from '../../../domain/repositories/DestinoRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDestinoRepository implements DestinoRepository {
  private readonly tableName = 'destino';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Destino, 'id'>): Promise<Destino> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Destino;
  }

  async getAll(): Promise<Destino[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new Error(error.message);
    return data as Destino[];
  }

  async getById(id: string): Promise<Destino | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Destino | null;
  }

  async update(id: string, item: Partial<Destino>): Promise<Destino> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Destino;
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
