import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Recomendacion } from '../../../domain/entities/Recomendacion';
import { RecomendacionRepository } from '../../../domain/repositories/RecomendacionRepository';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { mapDateToIso, mapDateFromDb } from './mapper-helpers';

@Injectable({
  providedIn: 'root'
})
export class SupabaseRecomendacionRepository extends SupabaseCrudRepository<Recomendacion> implements RecomendacionRepository {
  protected readonly tableName = 'recomendacion';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  protected override mapToRow(item: Partial<Recomendacion>): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if (item.fecha_generada) {
      mapped['fecha_generada'] = mapDateToIso(item.fecha_generada);
    }

    return mapped;
  }

  protected override mapFromRow(row: Recomendacion): Recomendacion {
    return {
      ...row,
      fecha_generada: mapDateFromDb(row.fecha_generada)
    };
  }
}
