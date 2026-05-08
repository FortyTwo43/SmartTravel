import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Perfil } from '../../../domain/entities/Perfil';
import { PerfilRepository } from '../../../domain/repositories/PerfilRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabasePerfilRepository implements PerfilRepository {
  private readonly tableName = 'perfil';

  constructor(private readonly supabase: SupabaseClient) { }

  async create(item: Omit<Perfil, 'id'>): Promise<Perfil> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Perfil;
  }

  async getAll(): Promise<Perfil[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new Error(error.message);
    return data as Perfil[];
  }

  async getById(id: string): Promise<Perfil | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Perfil | null;
  }

  async update(id: string, item: Partial<Perfil>): Promise<Perfil> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Perfil;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }
}
