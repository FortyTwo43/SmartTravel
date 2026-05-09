import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { IAuthRepository, AuthResponse } from '../../../../domain/repositories/auth/AuthRepository';
import { AuthenticationError } from '../../../../domain/errors/auth-errors';

@Injectable({
  providedIn: 'root'
})
export class SupabaseAuthRepository implements IAuthRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async signUp(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      throw new AuthenticationError(error.message, error.status?.toString());
    }

    return {
      user: data.user,
      session: data.session
    };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AuthenticationError(error.message, error.status?.toString());
    }

    return {
      user: data.user,
      session: data.session
    };
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    
    if (error) {
      throw new AuthenticationError(error.message, error.status?.toString());
    }
  }
}
