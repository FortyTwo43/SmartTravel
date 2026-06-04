import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UpdateProveedorServiceUseCase } from './UpdateProveedorServiceUseCase';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { UpdateServicioReservableDto } from '../../../domain/entities/dtos';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

describe('UpdateProveedorServiceUseCase', () => {
  let useCase: UpdateProveedorServiceUseCase;
  let mockRepository: { update: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockRepository = {
      update: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        UpdateProveedorServiceUseCase,
        { provide: SupabaseServicioReservableRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(UpdateProveedorServiceUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call update on repository with correct dto', async () => {
    const id = 'srv-1';
    const dto: UpdateServicioReservableDto = {
      precio: 150,
      comodidades_adicionales: 'wifi, desayuno'
    };
    
    const expectedResult = { id, ...dto } as ServicioReservable;
    mockRepository.update.mockResolvedValue(expectedResult);

    const result = await useCase.execute(id, dto);

    expect(mockRepository.update).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(expectedResult);
  });
});
