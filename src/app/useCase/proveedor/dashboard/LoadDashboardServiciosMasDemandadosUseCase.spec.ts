import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadDashboardServiciosMasDemandadosUseCase } from './LoadDashboardServiciosMasDemandadosUseCase';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';

describe('LoadDashboardServiciosMasDemandadosUseCase', () => {
  let useCase: LoadDashboardServiciosMasDemandadosUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      getServiciosMasDemandados: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoadDashboardServiciosMasDemandadosUseCase,
        { provide: SupabaseDashboardProveedorRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(LoadDashboardServiciosMasDemandadosUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call getServiciosMasDemandados on repository', async () => {
    const providerId = '123';
    mockRepository.getServiciosMasDemandados.mockResolvedValue([]);
    
    const result = await useCase.execute(providerId);
    
    expect(mockRepository.getServiciosMasDemandados).toHaveBeenCalledWith(providerId);
    expect(result).toEqual([]);
  });
});
