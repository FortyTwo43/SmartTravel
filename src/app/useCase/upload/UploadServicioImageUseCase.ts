import { Injectable } from '@angular/core';
import { SupabaseStorageRepository } from '../../infrastructure/repositories/supabase/SupabaseStorageRepository';

@Injectable({
  providedIn: 'root'
})
export class UploadServicioImageUseCase {
  constructor(private readonly storageRepository: SupabaseStorageRepository) {}

  async execute(file: File): Promise<string> {
    if (!file) {
      throw new Error('No se proporcionó ningún archivo');
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeBytes) {
      throw new Error('El tamaño de la imagen no puede exceder los 5MB');
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      throw new Error('Solo se permiten formatos de imagen PNG y JPEG');
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${crypto.randomUUID()}.${ext}`;
    const path = `servicios/${filename}`;

    return await this.storageRepository.upload('servicios_imagenes', path, file);
  }
}
