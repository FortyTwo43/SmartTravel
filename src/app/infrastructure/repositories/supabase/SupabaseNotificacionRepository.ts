import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Notificacion } from '../../../domain/entities/Notificacion';
import { NotificacionRepository } from '../../../domain/repositories/NotificacionRepository';
import { buildSupabaseError } from './supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseNotificacionRepository implements NotificacionRepository {
  private readonly tableName = 'notificacion';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Notificacion, 'id'>): Promise<Notificacion> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(this.mapToRow(item))
      .select()
      .single();

    if (error) throw buildSupabaseError('create', this.tableName, error);
    return this.mapFromRow(data as Notificacion);
  }

  async getAll(): Promise<Notificacion[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw buildSupabaseError('getAll', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row as Notificacion));
  }

  async getById(id: string): Promise<Notificacion | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw buildSupabaseError('getById', this.tableName, error);
    return data ? this.mapFromRow(data as Notificacion) : null;
  }

  async update(id: string, item: Partial<Notificacion>): Promise<Notificacion> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(this.mapToRow(item))
      .eq('id', id)
      .select()
      .single();

    if (error) throw buildSupabaseError('update', this.tableName, error);
    return this.mapFromRow(data as Notificacion);
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw buildSupabaseError('delete', this.tableName, error);
    return (count ?? 0) > 0;
  }

    async findByPerfilId(perfilId: string): Promise<Notificacion[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_perfil', perfilId);

    if (error) throw buildSupabaseError('findByPerfilId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row as Notificacion));
  }

  async findUnreadByPerfilId(perfilId: string): Promise<Notificacion[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_perfil', perfilId)
      .eq('leida', false);

    if (error) throw buildSupabaseError('findUnreadByPerfilId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row as Notificacion));
  }

  async markAsRead(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .update({ leida: true } as Record<string, unknown>)
      .eq('id', id);

    if (error) throw buildSupabaseError('markAsRead', this.tableName, error);
  }

    private mapToRow(item: Partial<Notificacion>): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if (item.fecha_envio) {
      mapped['fecha_envio'] = item.fecha_envio instanceof Date
        ? item.fecha_envio.toISOString()
        : item.fecha_envio;
    }

    return mapped;
  }

  private mapFromRow(row: Notificacion): Notificacion {
    return {
      ...row,
      fecha_envio: row.fecha_envio instanceof Date
        ? row.fecha_envio
        : new Date(row.fecha_envio as unknown as string)
    };
  }
}
