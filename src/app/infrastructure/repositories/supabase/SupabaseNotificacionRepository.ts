import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Notificacion } from '../../../domain/entities/Notificacion';
import { NotificacionRepository } from '../../../domain/repositories/NotificacionRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseNotificacionRepository implements NotificacionRepository {
  private readonly tableName = 'notificacion';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Notificacion, 'id'>): Promise<Notificacion> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Notificacion;
  }

  async getAll(): Promise<Notificacion[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new Error(error.message);
    return data as Notificacion[];
  }

  async getById(id: string): Promise<Notificacion | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Notificacion | null;
  }

  async update(id: string, item: Partial<Notificacion>): Promise<Notificacion> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Notificacion;
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
