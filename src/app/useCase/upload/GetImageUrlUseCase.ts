import { Injectable } from '@angular/core';
import { SupabaseStorageRepository } from '../../infrastructure/repositories/supabase/SupabaseStorageRepository';

@Injectable({
  providedIn: 'root'
})
export class GetImageUrlUseCase {
  constructor(private readonly storageRepository: SupabaseStorageRepository) {}

  async execute(path: string, bucket: string): Promise<string> {
    if (!path) return '';
    
    // Si ya es una URL completa, la retornamos tal cual
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    try {
      return await this.storageRepository.getSignedUrl(bucket, path);
    } catch (error) {
      console.error(`Error obteniendo la URL firmada para ${path}:`, error);
      return '';
    }
  }
}
