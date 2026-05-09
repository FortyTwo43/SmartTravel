import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { IAuthRepository } from '../../../../domain/repositories/auth/AuthRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseAuthRepository implements IAuthRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async signUp(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
  }
}
