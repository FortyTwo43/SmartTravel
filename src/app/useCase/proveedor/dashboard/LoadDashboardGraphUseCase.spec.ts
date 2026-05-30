import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadDashboardGraphUseCase } from './LoadDashboardGraphUseCase';
import { SupabaseDashboardProveedorRepository } from '../../../infrastructure/repositories/supabase/SupabaseDashboardProveedorRepository';

describe('LoadDashboardGraphUseCase', () => {
  let useCase: LoadDashboardGraphUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      getGraphValues: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoadDashboardGraphUseCase,
        { provide: SupabaseDashboardProveedorRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(LoadDashboardGraphUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call getGraphValues on repository', async () => {
    const providerId = '123';
    mockRepository.getGraphValues.mockResolvedValue([]);
    
    const result = await useCase.execute(providerId);
    
    expect(mockRepository.getGraphValues).toHaveBeenCalledWith(providerId);
    expect(result).toEqual([]);
  });
});
