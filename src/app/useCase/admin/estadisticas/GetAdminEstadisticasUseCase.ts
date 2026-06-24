import { Injectable, inject } from '@angular/core';
import { AdminEstadisticasRepository } from '../../../domain/repositories/AdminEstadisticasRepository';
import { AdminEstadisticasData } from '../../../domain/ui/admin/estadisticas/AdminEstadisticas';
import { SupabaseAdminEstadisticasRepository } from '../../../infrastructure/repositories/supabase/SupabaseAdminEstadisticasRepository';

@Injectable({
  providedIn: 'root'
})
export class GetAdminEstadisticasUseCase {
  private readonly repository: AdminEstadisticasRepository = inject(SupabaseAdminEstadisticasRepository);

  execute(): Promise<AdminEstadisticasData> {
    return this.repository.getEstadisticas();
  }
}
