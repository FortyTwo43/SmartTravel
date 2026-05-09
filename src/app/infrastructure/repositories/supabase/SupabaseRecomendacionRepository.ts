import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Recomendacion } from '../../../domain/entities/Recomendacion';
import { RecomendacionRepository } from '../../../domain/repositories/RecomendacionRepository';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';

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
      mapped['fecha_generada'] = item.fecha_generada instanceof Date
        ? item.fecha_generada.toISOString()
        : item.fecha_generada;
    }

    return mapped;
  }

  protected override mapFromRow(row: Recomendacion): Recomendacion {
    return {
      ...row,
      fecha_generada: row.fecha_generada instanceof Date
        ? row.fecha_generada
        : new Date(row.fecha_generada)
    };
  }
}
