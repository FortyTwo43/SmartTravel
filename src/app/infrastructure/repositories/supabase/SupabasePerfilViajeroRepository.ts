import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { PerfilViajero } from '../../../domain/entities/PerfilViajero';
import { PerfilViajeroRepository } from '../../../domain/repositories/PerfilViajeroRepository';
import { CreatePerfilViajeroDto, UpdatePerfilViajeroDto } from '../../../domain/entities/dtos';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabasePerfilViajeroRepository extends SupabaseCrudRepository<PerfilViajero, CreatePerfilViajeroDto, UpdatePerfilViajeroDto> implements PerfilViajeroRepository {
  protected readonly tableName = 'perfil_viajero';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }
}
