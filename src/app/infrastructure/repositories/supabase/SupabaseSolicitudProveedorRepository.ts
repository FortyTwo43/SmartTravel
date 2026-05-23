import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SolicitudProveedor } from '../../../domain/entities/SolicitudProveedor';
import { SolicitudProveedorRepository } from '../../../domain/repositories/SolicitudProveedorRepository';
import { CreateSolicitudProveedorDto, UpdateSolicitudProveedorDto } from '../../../domain/entities/dtos';
import { SupabaseCrudRepository } from './SupabaseCrudRepository';
import { buildSupabaseError } from './supabaseUtils/supabase-error';
import { mapDateFromDb } from './supabaseUtils/mapper-helpers';

@Injectable({
  providedIn: 'root'
})
export class SupabaseSolicitudProveedorRepository 
  extends SupabaseCrudRepository<SolicitudProveedor, CreateSolicitudProveedorDto, UpdateSolicitudProveedorDto> 
  implements SolicitudProveedorRepository {
  
  protected readonly tableName = 'solicitud_proveedor';

  constructor(protected readonly supabase: SupabaseClient) {
    super();
  }

  async findByPerfilId(perfilId: string): Promise<SolicitudProveedor[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id_perfil', perfilId);

    if (error) throw buildSupabaseError('findByPerfilId', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }

  protected override mapFromRow(row: SolicitudProveedor): SolicitudProveedor {
    return {
      ...row,
      fecha_solicitud: mapDateFromDb(row.fecha_solicitud)
    };
  }
}
