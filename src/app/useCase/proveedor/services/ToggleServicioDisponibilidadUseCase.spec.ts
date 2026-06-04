import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToggleServicioDisponibilidadUseCase } from './ToggleServicioDisponibilidadUseCase';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

describe('ToggleServicioDisponibilidadUseCase', () => {
  let useCase: ToggleServicioDisponibilidadUseCase;
  let mockRepository: { update: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockRepository = {
      update: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ToggleServicioDisponibilidadUseCase,
        { provide: SupabaseServicioReservableRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(ToggleServicioDisponibilidadUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call update on repository with correct availability', async () => {
    const id = 'srv-1';
    const disponibilidad = false;
    const expectedResult = { id, disponibilidad } as ServicioReservable;
    mockRepository.update.mockResolvedValue(expectedResult);

    const result = await useCase.execute(id, disponibilidad);

    expect(mockRepository.update).toHaveBeenCalledWith(id, { disponibilidad });
    expect(result).toEqual(expectedResult);
  });
});
