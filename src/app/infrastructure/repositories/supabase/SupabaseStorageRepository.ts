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

    return path;
  }

  async getSignedUrl(bucket: string, path: string, expiresIn: number = 3600): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      throw new Error(`Error al generar URL firmada: ${error.message}`);
    }

    return data.signedUrl;
  }
}
