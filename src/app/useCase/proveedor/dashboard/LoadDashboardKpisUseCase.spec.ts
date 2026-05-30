import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadDashboardKpisUseCase } from './LoadDashboardKpisUseCase';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';
import { DashboardKpis } from '../../../domain/ui/proveedor/dashboard/DashboardKpis';

describe('LoadDashboardKpisUseCase', () => {
  let useCase: LoadDashboardKpisUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      getKpis: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoadDashboardKpisUseCase,
        { provide: SupabaseDashboardProveedorRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(LoadDashboardKpisUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call getKpis on repository', async () => {
    const providerId = '123';
    const mockKpis = {} as DashboardKpis;
    mockRepository.getKpis.mockResolvedValue(mockKpis);

    const result = await useCase.execute(providerId);

    expect(mockRepository.getKpis).toHaveBeenCalledWith(providerId);
    expect(result).toBe(mockKpis);
  });
});
