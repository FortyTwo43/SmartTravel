import { Injectable, inject } from '@angular/core';
import { EstablecimientoTuristico } from '../../../domain/entities/EstablecimientoTuristico';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { LoadDashboardEstablecimientoUseCase } from './LoadDashboardEstablecimiento';

@Injectable({
  providedIn: 'root'
})
export class LoadDashboardDataUseCase {
  private readonly authRepo = inject(SupabaseAuthRepository);
  private readonly loadEstablecimientoUseCase = inject(LoadDashboardEstablecimientoUseCase);

  async execute(): Promise<EstablecimientoTuristico> {
    const response = await this.authRepo.getCurrentUser();
    const user = response.data.user;

    if (!user) {
      throw new Error('No hay usuario autenticado en la sesión.');
    }

    const rol = user.user_metadata?.['rol'];
    if (rol !== 'proveedor') {
      throw new Error('El usuario activo no tiene rol de proveedor.');
    }

    return await this.loadEstablecimientoUseCase.execute(user.id);
  }
}
