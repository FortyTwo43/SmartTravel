import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Recomendacion } from '../../../domain/entities/Recomendacion';
import { RecomendacionRepository } from '../../../domain/repositories/RecomendacionRepository';
import { CreateRecomendacionDto, UpdateRecomendacionDto } from '../../../domain/entities/dtos';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { mapDateToIso, mapDateFromDb } from './supabaseUtils/mapper-helpers';

@Injectable({
  providedIn: 'root'
})
export class SupabaseRecomendacionRepository extends SupabaseCrudRepository<Recomendacion, CreateRecomendacionDto, UpdateRecomendacionDto> implements RecomendacionRepository {
  protected readonly tableName = 'recomendacion';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  protected override mapToRow(item: CreateRecomendacionDto | UpdateRecomendacionDto): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };
    return mapped;
  }

  protected override mapFromRow(row: Recomendacion): Recomendacion {
    return {
      ...row,
      fecha_generada: mapDateFromDb(row.fecha_generada)
    };
  }
}
