import { Injectable, inject } from '@angular/core';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { CreateServicioReservableDto } from '../../../domain/entities/dtos';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

@Injectable({
  providedIn: 'root'
})
export class CreateProveedorServiceUseCase {
  private readonly servicioRepository = inject(SupabaseServicioReservableRepository);

  async execute(dto: CreateServicioReservableDto): Promise<ServicioReservable> {
    return await this.servicioRepository.create(dto);
  }
}
