import { Injectable, inject } from '@angular/core';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

@Injectable({
  providedIn: 'root'
})
export class ToggleServicioDisponibilidadUseCase {
  private readonly servicioRepository = inject(SupabaseServicioReservableRepository);

  async execute(servicioId: string, disponibilidad: boolean): Promise<ServicioReservable> {
    return this.servicioRepository.update(servicioId, { disponibilidad });
  }
}
