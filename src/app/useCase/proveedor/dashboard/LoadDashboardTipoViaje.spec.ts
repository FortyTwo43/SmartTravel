import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadDashboardTipoViajeUseCase } from './LoadDashboardTipoViaje';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';
import { DashboardTipoViaje } from '../../../domain/dashboard/DashboardTipoViaje';

describe('LoadDashboardTipoViajeUseCase', () => {
  let useCase: LoadDashboardTipoViajeUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      getTipoViaje: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoadDashboardTipoViajeUseCase,
        { provide: SupabaseDashboardProveedorRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(LoadDashboardTipoViajeUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call getTipoViaje on repository', async () => {
    const providerId = '123';
    const mockTipoViaje = {} as DashboardTipoViaje;
    mockRepository.getTipoViaje.mockResolvedValue(mockTipoViaje);
    
    const result = await useCase.execute(providerId);
    
    expect(mockRepository.getTipoViaje).toHaveBeenCalledWith(providerId);
    expect(result).toBe(mockTipoViaje);
  });
});
