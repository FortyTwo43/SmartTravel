import { Injectable, inject } from '@angular/core';
import { SupabasePerfilViajeroRepository } from '../../infrastructure/repositories/supabase/SupabasePerfilViajeroRepository';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { UpdatePerfilViajeroDto } from '../../domain/entities/dtos';
import { PerfilViajero } from '../../domain/entities/PerfilViajero';

export interface InitializePerfilViajeroRequest {
  intereses: string;
  tipoViaje: 'solo' | 'pareja' | 'familia' | 'amigos';
  presupuesto: number;
}

export interface InitializePerfilViajeroResult {
  success: boolean;
  perfilViajero?: PerfilViajero;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class InitializePerfilViajeroUseCase {
  private readonly perfilViajeroRepository = inject(SupabasePerfilViajeroRepository);
  private readonly authRepository = inject(SupabaseAuthRepository);

  /**
   * Initializes the traveler's profile with their interests, travel type, and budget.
   * This is called during the onboarding process after a traveler successfully registers/logs in.
   * 
   * @param request - Contains intereses, tipoViaje, presupuesto, idioma
   * @returns Promise with success flag and created profile or error message
   */
  async execute(request: InitializePerfilViajeroRequest): Promise<InitializePerfilViajeroResult> {
    try {
      // Get current authenticated user
      const { data, error } = await this.authRepository.getCurrentUser();

      if (error || !data?.user?.id) {
        return {
          success: false,
          message: 'No se pudo obtener la información del usuario autenticado.'
        };
      }

      const userId = data.user.id;

      // Update the PerfilViajero DTO (profile already exists in DB)
      const updateDto: UpdatePerfilViajeroDto = {
        intereses: request.intereses,
        presupuesto: request.presupuesto,
        tipo_viaje: request.tipoViaje
      };

      // Update existing record in database using repository
      const perfilViajero = await this.perfilViajeroRepository.update(userId, updateDto);

      return {
        success: true,
        perfilViajero,
        message: 'Perfil de viajero inicializado exitosamente.'
      };
    } catch (error: any) {
      console.error('Error initializing traveler profile:', error);
      return {
        success: false,
        message: error?.message || 'Error al inicializar el perfil del viajero.'
      };
    }
  }
}
