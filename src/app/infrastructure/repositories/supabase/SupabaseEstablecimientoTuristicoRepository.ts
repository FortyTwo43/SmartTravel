import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { EstablecimientoTuristico } from '../../../domain/entities/EstablecimientoTuristico';
import { EstablecimientoTuristicoRepository } from '../../../domain/repositories/EstablecimientoTuristicoRepository';
import { CreateEstablecimientoTuristicoDto, UpdateEstablecimientoTuristicoDto } from '../../../domain/entities/dtos';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { buildSupabaseError } from './supabaseUtils/supabase-error';

@Injectable({
  providedIn: 'root'
})
export class SupabaseEstablecimientoTuristicoRepository 
  extends SupabaseCrudRepository<EstablecimientoTuristico, CreateEstablecimientoTuristicoDto, UpdateEstablecimientoTuristicoDto> 
  implements EstablecimientoTuristicoRepository {
  
  protected readonly tableName = 'establecimiento_turistico';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  async findByProveedorId(proveedorId: string): Promise<EstablecimientoTuristico[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_proveedor', proveedorId);

    if (error) throw buildSupabaseError('findByProveedorId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }

  async findByDestinoId(destinoId: string): Promise<EstablecimientoTuristico[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_destino', destinoId);

    if (error) throw buildSupabaseError('findByDestinoId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }
}
