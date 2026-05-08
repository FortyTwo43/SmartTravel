import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Itinerario } from '../../../domain/entities/Itinerario';
import { ItinerarioRepository } from '../../../domain/repositories/ItinerarioRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseItinerarioRepository implements ItinerarioRepository {
  private readonly tableName = 'itinerario';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Itinerario, 'id'>): Promise<Itinerario> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Itinerario;
  }

  async getAll(): Promise<Itinerario[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new Error(error.message);
    return data as Itinerario[];
  }

  async getById(id: string): Promise<Itinerario | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Itinerario | null;
  }

  async update(id: string, item: Partial<Itinerario>): Promise<Itinerario> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Itinerario;
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
