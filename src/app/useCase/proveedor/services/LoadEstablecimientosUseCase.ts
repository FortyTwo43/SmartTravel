import { Injectable, inject } from '@angular/core';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';
import { EstablecimientoTuristico } from '../../../domain/entities/EstablecimientoTuristico';

@Injectable({
  providedIn: 'root'
})
export class LoadEstablecimientosUseCase {
  private readonly authRepository = inject(SupabaseAuthRepository);
  private readonly establecimientoRepository = inject(SupabaseEstablecimientoTuristicoRepository);

  async execute(): Promise<EstablecimientoTuristico[]> {
    const { data: authData } = await this.authRepository.getCurrentUser();

    if (!authData?.user?.id) {
      return [];
    }

    const providerId = authData.user.id;
    return await this.establecimientoRepository.findByProveedorId(providerId);
  }
}
