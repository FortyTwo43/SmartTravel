import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadActividadRecienteUseCase } from './LoadActividadRecienteUseCase';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';

describe('LoadActividadRecienteUseCase', () => {
  let useCase: LoadActividadRecienteUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      getActividadReciente: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoadActividadRecienteUseCase,
        { provide: SupabaseDashboardProveedorRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(LoadActividadRecienteUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call getActividadReciente on repository', async () => {
    const providerId = '123';
    mockRepository.getActividadReciente.mockResolvedValue([]);
    
    const result = await useCase.execute(providerId);
    
    expect(mockRepository.getActividadReciente).toHaveBeenCalledWith(providerId);
    expect(result).toEqual([]);
  });
});
