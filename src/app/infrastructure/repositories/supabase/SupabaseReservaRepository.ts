import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Reserva } from '../../../domain/entities/Reserva';
import { ReservaRepository } from '../../../domain/repositories/ReservaRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseReservaRepository implements ReservaRepository {
  private readonly tableName = 'reserva';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Reserva, 'id'>): Promise<Reserva> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Reserva;
  }

  async getAll(): Promise<Reserva[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new Error(error.message);
    return data as Reserva[];
  }

  async getById(id: string): Promise<Reserva | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Reserva | null;
  }

  async update(id: string, item: Partial<Reserva>): Promise<Reserva> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Reserva;
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
