import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { PerfilViajero } from '../../../domain/entities/PerfilViajero';
import { PerfilViajeroRepository } from '../../../domain/repositories/PerfilViajeroRepository';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabasePerfilViajeroRepository extends SupabaseCrudRepository<PerfilViajero> implements PerfilViajeroRepository {
  protected readonly tableName = 'perfil_viajero';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }
}
