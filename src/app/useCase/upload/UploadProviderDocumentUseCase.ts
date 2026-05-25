import { Injectable, inject } from '@angular/core';
import { SupabaseStorageRepository } from '../../infrastructure/repositories/supabase/SupabaseStorageRepository';

@Injectable({
  providedIn: 'root'
})
export class UploadProviderDocumentUseCase {
  private readonly storageRepository = inject(SupabaseStorageRepository);

  async execute(userId: string, file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `proveedor/${userId}/${crypto.randomUUID()}.${ext}`;
    
    return await this.storageRepository.upload('documentos_proveedor', path, file);
  }
}
