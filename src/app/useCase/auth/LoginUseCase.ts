import { Injectable, inject } from '@angular/core';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { AuthResponse } from '../../domain/repositories/auth/AuthRepository';

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  private readonly authRepository = inject(SupabaseAuthRepository);

  async execute(email: string, password: string): Promise<AuthResponse> {
    return await this.authRepository.signIn(email, password);
  }
}
