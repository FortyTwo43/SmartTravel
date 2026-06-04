import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetProveedorServiceUseCase } from './GetProveedorServiceUseCase';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

describe('GetProveedorServiceUseCase', () => {
  let useCase: GetProveedorServiceUseCase;
  let mockRepository: { getById: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockRepository = {
      getById: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        GetProveedorServiceUseCase,
        { provide: SupabaseServicioReservableRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(GetProveedorServiceUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call getById on repository with correct id', async () => {
    const id = 'srv-1';
    const expectedResult = { id, nombre: 'Test Service' } as ServicioReservable;
    mockRepository.getById.mockResolvedValue(expectedResult);

    const result = await useCase.execute(id);

    expect(mockRepository.getById).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });

  it('should return null if repository returns null', async () => {
    const id = 'srv-2';
    mockRepository.getById.mockResolvedValue(null);

    const result = await useCase.execute(id);

    expect(mockRepository.getById).toHaveBeenCalledWith(id);
    expect(result).toBeNull();
  });
});
