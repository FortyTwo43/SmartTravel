import { SupabaseClient } from '@supabase/supabase-js';
import { buildSupabaseError } from './supabase-error';

/**
 * Abstract base class for simple CRUD Supabase repositories without custom mappings.
 * Reduces code duplication for entities without complex field transformations.
 */
export abstract class SupabaseCrudRepository<T extends { id: string }> {
  protected abstract readonly tableName: string;
  protected abstract readonly supabase: SupabaseClient;

  async create(item: Omit<T, 'id'>): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(item)
      .select()
      .single();

    if (error) throw buildSupabaseError('create', this.tableName, error);
    return data;
  }

  async getAll(): Promise<T[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw buildSupabaseError('getAll', this.tableName, error);
    return data as T[];
  }

  async getById(id: string): Promise<T | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw buildSupabaseError('getById', this.tableName, error);
    return data as T | null;
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(item)
      .eq('id', id)
      .select()
      .single();

    if (error) throw buildSupabaseError('update', this.tableName, error);
    return data;
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.supabase
      .from(this.tableName)
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw buildSupabaseError('delete', this.tableName, error);
    return (count ?? 0) > 0;
  }
}
