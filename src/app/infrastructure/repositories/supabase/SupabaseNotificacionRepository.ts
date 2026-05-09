import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Notificacion } from '../../../domain/entities/Notificacion';
import { NotificacionRepository } from '../../../domain/repositories/NotificacionRepository';
import { CreateNotificacionDto, UpdateNotificacionDto } from '../../../domain/entities/dtos';
import { buildSupabaseError } from './supabase-error';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { mapDateToIso, mapDateFromDb } from './mapper-helpers';

@Injectable({
  providedIn: 'root'
})
export class SupabaseNotificacionRepository extends SupabaseCrudRepository<Notificacion, CreateNotificacionDto, UpdateNotificacionDto> implements NotificacionRepository {
  protected readonly tableName = 'notificacion';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
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
    return (data ?? []).map((row) => this.mapFromRow(row));
  }

  async markAsRead(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .update({ leida: true })
      .eq('id', id);

    if (error) throw buildSupabaseError('markAsRead', this.tableName, error);
  }

  protected override mapToRow(item: CreateNotificacionDto | UpdateNotificacionDto): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };
    return mapped;
  }

  protected override mapFromRow(row: Notificacion): Notificacion {
    return {
      ...row,
      fecha_envio: mapDateFromDb(row.fecha_envio)
    };
  }
}
