import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';
import { ServicioReservableRepository } from '../../../domain/repositories/ServicioReservableRepository';
import { CreateServicioReservableDto, UpdateServicioReservableDto } from '../../../domain/entities/dtos';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { buildSupabaseError } from './supabaseUtils/supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseServicioReservableRepository 
  extends SupabaseCrudRepository<ServicioReservable, CreateServicioReservableDto, UpdateServicioReservableDto> 
  implements ServicioReservableRepository {
  
  protected readonly tableName = 'servicio_reservable';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  async findByEstablecimientoId(establecimientoId: string): Promise<ServicioReservable[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_establecimiento', establecimientoId);

    if (error) throw buildSupabaseError('findByEstablecimientoId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }
}
