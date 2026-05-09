import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Servicio } from '../../../domain/entities/Servicio';
import { ServicioRepository } from '../../../domain/repositories/ServicioRepository';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseServicioRepository extends SupabaseCrudRepository<Servicio> implements ServicioRepository {
  protected readonly tableName = 'servicio';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }
}
