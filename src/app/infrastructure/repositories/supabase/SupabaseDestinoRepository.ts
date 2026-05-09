import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Destino } from '../../../domain/entities/Destino';
import { DestinoRepository } from '../../../domain/repositories/DestinoRepository';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDestinoRepository extends SupabaseCrudRepository<Destino> implements DestinoRepository {
  protected readonly tableName = 'destino';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }
}
