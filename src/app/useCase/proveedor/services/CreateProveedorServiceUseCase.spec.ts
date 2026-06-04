import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateProveedorServiceUseCase } from './CreateProveedorServiceUseCase';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { CreateServicioReservableDto } from '../../../domain/entities/dtos';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

describe('CreateProveedorServiceUseCase', () => {
  let useCase: CreateProveedorServiceUseCase;
  let mockRepository: { create: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockRepository = {
      create: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        CreateProveedorServiceUseCase,
        { provide: SupabaseServicioReservableRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(CreateProveedorServiceUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call create on repository with correct dto', async () => {
    const dto: CreateServicioReservableDto = {
      id_establecimiento: 'est-1',
      nombre: 'Test Service',
      precio: 100,
      descripcion: 'Test desc',
      comodidades_adicionales: 'wifi',
      disponibilidad: true
    };
    
    const expectedResult = { id: 'srv-1', ...dto } as ServicioReservable;
    mockRepository.create.mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});
