import { Injectable, inject } from '@angular/core';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { UpdateServicioReservableDto } from '../../../domain/entities/dtos';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

@Injectable({
  providedIn: 'root'
})
export class UpdateProveedorServiceUseCase {
  private readonly servicioRepository = inject(SupabaseServicioReservableRepository);

  async execute(id: string, dto: UpdateServicioReservableDto): Promise<ServicioReservable> {
    return await this.servicioRepository.update(id, dto);
  }
}
