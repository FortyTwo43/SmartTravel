import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadDashboardEstablecimientoUseCase } from './LoadDashboardEstablecimiento';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';
import { EstablecimientoTuristico } from '../../../domain/entities/EstablecimientoTuristico';

describe('LoadDashboardEstablecimientoUseCase', () => {
  let useCase: LoadDashboardEstablecimientoUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      findByProveedorId: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoadDashboardEstablecimientoUseCase,
        { provide: SupabaseEstablecimientoTuristicoRepository, useValue: mockRepository }
      ]
    });

    useCase = TestBed.inject(LoadDashboardEstablecimientoUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should throw error if no establecimiento is found', async () => {
    const providerId = '123';
    mockRepository.findByProveedorId.mockResolvedValue([]);
    
    await expect(useCase.execute(providerId)).rejects.toThrow('No se encontró un establecimiento turístico para el proveedor.');
  });

  it('should return the first establecimiento', async () => {
    const providerId = '123';
    const mockEstablecimiento = { id: 'est1' } as EstablecimientoTuristico;
    mockRepository.findByProveedorId.mockResolvedValue([mockEstablecimiento]);
    
    const result = await useCase.execute(providerId);
    
    expect(mockRepository.findByProveedorId).toHaveBeenCalledWith(providerId);
    expect(result).toBe(mockEstablecimiento);
  });
});
