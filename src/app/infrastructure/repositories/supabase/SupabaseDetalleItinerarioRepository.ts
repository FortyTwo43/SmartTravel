import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { DetalleItinerario } from '../../../domain/entities/DetalleItinerario';
import { DetalleItinerarioRepository } from '../../../domain/repositories/DetalleItinerarioRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDetalleItinerarioRepository implements DetalleItinerarioRepository {
  private readonly tableName = 'detalle_itinerario';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<DetalleItinerario, 'id'>): Promise<DetalleItinerario> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as DetalleItinerario;
  }

  async getAll(): Promise<DetalleItinerario[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new Error(error.message);
    return data as DetalleItinerario[];
  }

  async getById(id: string): Promise<DetalleItinerario | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as DetalleItinerario | null;
  }

  async update(id: string, item: Partial<DetalleItinerario>): Promise<DetalleItinerario> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as DetalleItinerario;
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
