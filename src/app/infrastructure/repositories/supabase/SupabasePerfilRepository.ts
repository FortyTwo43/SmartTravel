import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Perfil } from '../../../domain/entities/Perfil';
import { PerfilRepository } from '../../../domain/repositories/PerfilRepository';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabasePerfilRepository extends SupabaseCrudRepository<Perfil> implements PerfilRepository {
  protected readonly tableName = 'perfil';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  protected override mapToRow(item: Partial<Perfil>): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if (item.fecha_registro) {
      mapped['fecha_registro'] = item.fecha_registro instanceof Date
        ? item.fecha_registro.toISOString()
        : item.fecha_registro;
    }

    return mapped;
  }

  protected override mapFromRow(row: Perfil): Perfil {
    return {
      ...row,
      fecha_registro: row.fecha_registro instanceof Date
        ? row.fecha_registro
        : new Date(row.fecha_registro)
    };
  }
}
