import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Reserva } from '../../../domain/entities/Reserva';
import { ReservaRepository } from '../../../domain/repositories/ReservaRepository';
import { buildSupabaseError } from './supabase-error';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseReservaRepository extends SupabaseCrudRepository<Reserva> implements ReservaRepository {
  protected readonly tableName = 'reserva';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  async findByPerfilId(perfilId: string): Promise<Reserva[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_perfil', perfilId);

    if (error) throw buildSupabaseError('findByPerfilId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }

  protected override mapToRow(item: Partial<Reserva>): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if (item.fecha_reserva) {
      mapped['fecha_reserva'] = item.fecha_reserva instanceof Date
        ? item.fecha_reserva.toISOString()
        : item.fecha_reserva;
    }

    return mapped;
  }

  protected override mapFromRow(row: Reserva): Reserva {
    return {
      ...row,
      fecha_reserva: row.fecha_reserva instanceof Date
        ? row.fecha_reserva
        : new Date(row.fecha_reserva)
    };
  }
}
