import { TestBed } from '@angular/core/testing';
import { UploadProviderDocumentUseCase } from './UploadProviderDocumentUseCase';
import { SupabaseStorageRepository } from '../../infrastructure/repositories/supabase/SupabaseStorageRepository';
import { vi } from 'vitest';

describe('UploadProviderDocumentUseCase', () => {
  let useCase: UploadProviderDocumentUseCase;
  let storageRepositorySpy: any;

  beforeEach(() => {
    const spy = { upload: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        UploadProviderDocumentUseCase,
        { provide: SupabaseStorageRepository, useValue: spy }
      ]
    });

    useCase = TestBed.inject(UploadProviderDocumentUseCase);
    storageRepositorySpy = TestBed.inject(SupabaseStorageRepository);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should upload a file and return the path', async () => {
    const userId = '12345';
    const mockFile = new File([''], 'test-document.pdf', { type: 'application/pdf' });
    const expectedPath = 'mock-path-url';
    
    storageRepositorySpy.upload.mockResolvedValue(expectedPath);

    const result = await useCase.execute(userId, mockFile);

    expect(storageRepositorySpy.upload).toHaveBeenCalled();
    const args = storageRepositorySpy.upload.mock.calls[0];
    expect(args[0]).toBe('documentos_proveedor');
    expect(args[1]).toContain(`proveedor/${userId}/`);
    expect(args[1]).toContain('.pdf');
    expect(args[2]).toBe(mockFile);
    expect(result).toBe(expectedPath);
  });
});
