import { Injectable, inject } from '@angular/core';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';
import { UpdateEstablecimientoTuristicoDto } from '../../../domain/entities/dtos/EstablecimientoTuristico.dtos';
import { EstablecimientoTuristico } from '../../../domain/entities/EstablecimientoTuristico';

@Injectable({
  providedIn: 'root'
})
export class UpdateEstablecimientoUseCase {
  private readonly establecimientoRepository = inject(SupabaseEstablecimientoTuristicoRepository);

  async execute(id: string, dto: UpdateEstablecimientoTuristicoDto): Promise<EstablecimientoTuristico | null> {
    try {
      return await this.establecimientoRepository.update(id, dto);
    } catch (error) {
      console.error('Error actualizando establecimiento:', error);
      throw error;
    }
  }
}
