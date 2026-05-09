import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Perfil } from '../../../domain/entities/Perfil';
import { PerfilRepository } from '../../../domain/repositories/PerfilRepository';
import { CreatePerfilDto, UpdatePerfilDto } from '../../../domain/entities/dtos';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { mapDateToIso, mapDateFromDb } from './supabaseUtils/mapper-helpers';

@Injectable({
  providedIn: 'root'
})
export class SupabasePerfilRepository extends SupabaseCrudRepository<Perfil, CreatePerfilDto, UpdatePerfilDto> implements PerfilRepository {
  protected readonly tableName = 'perfil';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  protected override mapToRow(item: CreatePerfilDto | UpdatePerfilDto): Record<string, unknown> {
    const mapped: Record<string, unknown> = { ...item };

    if ('fecha_registro' in item && item.fecha_registro) {
      mapped['fecha_registro'] = mapDateToIso(item.fecha_registro as Date);
    }

    return mapped;
  }

  protected override mapFromRow(row: Perfil): Perfil {
    return {
      ...row,
      fecha_registro: mapDateFromDb(row.fecha_registro)
    };
  }
}
