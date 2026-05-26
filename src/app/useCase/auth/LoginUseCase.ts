import { Injectable, inject } from '@angular/core';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { AuthResponse } from '../../domain/repositories/auth/AuthRepository';

export interface LoginResult extends AuthResponse {
  role?: 'viajero' | 'proveedor' | 'admin' | null;
}

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  private readonly authRepository = inject(SupabaseAuthRepository);

  /**
   * Authenticates a user and returns their auth data including role
   * @param email User email
   * @param password User password
   * @returns AuthResponse with user data and role information
   */
  async execute(email: string, password: string): Promise<LoginResult> {
    const authResponse = await this.authRepository.signIn(email, password);
    
    // Extract role from user metadata
    const role = authResponse.user?.user_metadata?.rol as 'viajero' | 'proveedor' | 'admin' || null;

    return {
      user: authResponse.user,
      session: authResponse.session,
      role
    };
  }
}
