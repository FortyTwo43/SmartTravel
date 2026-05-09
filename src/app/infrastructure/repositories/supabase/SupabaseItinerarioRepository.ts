import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Itinerario } from '../../../domain/entities/Itinerario';
import { ItinerarioRepository } from '../../../domain/repositories/ItinerarioRepository';
import { CreateItinerarioDto, UpdateItinerarioDto } from '../../../domain/entities/dtos';
import { buildSupabaseError } from './supabaseUtils/supabase-error';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { mapDateToIso, mapDateFromDb } from './supabaseUtils/mapper-helpers';

@Injectable({
  providedIn: 'root'
})
export class SupabaseItinerarioRepository extends SupabaseCrudRepository<Itinerario, CreateItinerarioDto, UpdateItinerarioDto> implements ItinerarioRepository {
  protected readonly tableName = 'itinerario';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  async findByPerfilId(perfilId: string): Promise<Itinerario[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_perfil', perfilId);

    if (error) throw buildSupabaseError('findByPerfilId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }

  protected override mapToRow(item: CreateItinerarioDto | UpdateItinerarioDto): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if ('fecha_inicio' in item && item.fecha_inicio) {
      mapped['fecha_inicio'] = mapDateToIso(item.fecha_inicio);
    }

    if ('fecha_fin' in item && item.fecha_fin) {
      mapped['fecha_fin'] = mapDateToIso(item.fecha_fin);
    }

    return mapped;
  }

  protected override mapFromRow(row: Itinerario): Itinerario {
    return {
      ...row,
      fecha_inicio: mapDateFromDb(row.fecha_inicio),
      fecha_fin: mapDateFromDb(row.fecha_fin)
    };
  }
}
