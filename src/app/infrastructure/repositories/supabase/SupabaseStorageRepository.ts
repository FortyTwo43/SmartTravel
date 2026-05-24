import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { IStorageRepository } from '../../../domain/repositories/IStorageRepository';

@Injectable({
  providedIn: 'root'
})
export class SupabaseStorageRepository implements IStorageRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async upload(bucket: string, path: string, file: File): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) {
      throw new Error(`Error al subir archivo: ${error.message}`);
    }

    const { data: publicUrlData } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return publicUrlData.publicUrl;
  }
}
