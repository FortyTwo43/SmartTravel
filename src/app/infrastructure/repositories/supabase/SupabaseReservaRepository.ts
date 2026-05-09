import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Reserva } from '../../../domain/entities/Reserva';
import { ReservaRepository } from '../../../domain/repositories/ReservaRepository';
import { CreateReservaDto, UpdateReservaDto } from '../../../domain/entities/dtos';
import { buildSupabaseError } from './supabaseUtils/supabase-error';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { mapDateToIso, mapDateFromDb } from './supabaseUtils/mapper-helpers';

@Injectable({
  providedIn: 'root'
})
export class SupabaseReservaRepository extends SupabaseCrudRepository<Reserva, CreateReservaDto, UpdateReservaDto> implements ReservaRepository {
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

  protected override mapToRow(item: CreateReservaDto | UpdateReservaDto): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if ('fecha_reserva' in item && item.fecha_reserva) {
      mapped['fecha_reserva'] = mapDateToIso(item.fecha_reserva);
    }

    return mapped;
  }

  protected override mapFromRow(row: Reserva): Reserva {
    return {
      ...row,
      fecha_reserva: mapDateFromDb(row.fecha_reserva)
    };
  }
}
