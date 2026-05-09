import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { DetalleItinerario } from '../../../domain/entities/DetalleItinerario';
import { DetalleItinerarioRepository } from '../../../domain/repositories/DetalleItinerarioRepository';
import { CreateDetalleItinerarioDto, UpdateDetalleItinerarioDto } from '../../../domain/entities/dtos';
import { buildSupabaseError } from './supabaseUtils/supabase-error';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { mapDateToIso, mapDateFromDb } from './supabaseUtils/mapper-helpers';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDetalleItinerarioRepository extends SupabaseCrudRepository<DetalleItinerario, CreateDetalleItinerarioDto, UpdateDetalleItinerarioDto> implements DetalleItinerarioRepository {
  protected readonly tableName = 'detalle_itinerario';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  async findByItinerarioId(itinerarioId: string): Promise<DetalleItinerario[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_itinerario', itinerarioId);

    if (error) throw buildSupabaseError('findByItinerarioId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row as DetalleItinerario));
  }

  protected override mapToRow(item: CreateDetalleItinerarioDto | UpdateDetalleItinerarioDto): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if ('fecha' in item && item.fecha) {
      mapped['fecha'] = mapDateToIso(item.fecha);
    }

    return mapped;
  }

  protected override mapFromRow(row: DetalleItinerario): DetalleItinerario {
    return {
      ...row,
      fecha: mapDateFromDb(row.fecha)
    };
  }
}
