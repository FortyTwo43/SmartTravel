import { SupabaseClient } from '@supabase/supabase-js';
import { buildSupabaseError } from './supabase-error';

/**
 * Abstract base class for CRUD Supabase repositories.
 * Supports optional field transformations via mapToRow/mapFromRow hooks.
 * Reduces code duplication for CRUD operations and entity mapping.
 */
export abstract class SupabaseCrudRepository<T extends { id: string }> {
  protected abstract readonly tableName: string;
  protected abstract readonly supabase: SupabaseClient;

  /**
   * Hook for transforming entity to database row format.
   * Override if custom field transformations are needed.
   */
  protected mapToRow(item: Partial<T>): Record<string, unknown> {
    return item as Record<string, unknown>;
  }

  /**
   * Hook for transforming database row to entity format.
   * Override if custom field transformations are needed.
   */
  protected mapFromRow(row: T): T {
    return row;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(this.mapToRow(item))
      .select()
      .single();

    if (error) throw buildSupabaseError('create', this.tableName, error);
    return this.mapFromRow(data);
  }

  async getAll(): Promise<T[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw buildSupabaseError('getAll', this.tableName, error);
    return (data ?? []).map((row) => this.mapFromRow(row));
  }

  async getById(id: string): Promise<T | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw buildSupabaseError('getById', this.tableName, error);
    return data ? this.mapFromRow(data) : null;
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(this.mapToRow(item))
      .eq('id', id)
      .select()
      .single();

    if (error) throw buildSupabaseError('update', this.tableName, error);
    return this.mapFromRow(data);
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
