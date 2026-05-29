import { Injectable, inject } from '@angular/core';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { SupabasePerfilViajeroRepository } from '../../infrastructure/repositories/supabase/SupabasePerfilViajeroRepository';
import { AuthResponse } from '../../domain/repositories/auth/AuthRepository';

export interface LoginResult extends AuthResponse {
  role?: 'viajero' | 'proveedor' | 'admin' | null;
  redirect?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  private readonly authRepository = inject(SupabaseAuthRepository);
  private readonly perfilViajeroRepository = inject(SupabasePerfilViajeroRepository);

  /**
   * Authenticates a user and returns their auth data including role
   * For travelers, also checks if onboarding is completed to determine redirect
   * @param email User email
   * @param password User password
   * @returns LoginResult with user data, role, and optional redirect URL
   */
  async execute(email: string, password: string): Promise<LoginResult> {
    const authResponse = await this.authRepository.signIn(email, password);
    
    // Extract role from user metadata
    const role = authResponse.user?.user_metadata?.rol as 'viajero' | 'proveedor' | 'admin' || null;
    const userId = authResponse.user?.id;

    // For travelers, redirect to dashboard
    let redirect: string | undefined = undefined;
    
    if (role === 'viajero') {
      redirect = '/traveler/dashboard';
    }

    return {
      user: authResponse.user,
      session: authResponse.session,
      role,
      redirect
    };
  }
}
