import { Injectable, inject } from '@angular/core';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

@Injectable({
  providedIn: 'root'
})
export class GetProveedorServiceUseCase {
  private readonly servicioRepository = inject(SupabaseServicioReservableRepository);

  async execute(id: string): Promise<ServicioReservable | null> {
    return await this.servicioRepository.getById(id);
  }
}
