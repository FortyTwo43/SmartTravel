import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadEstablecimientosUseCase } from './LoadEstablecimientosUseCase';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';
import { EstablecimientoTuristico } from '../../../domain/entities/EstablecimientoTuristico';

describe('LoadEstablecimientosUseCase', () => {
  let useCase: LoadEstablecimientosUseCase;
  let mockAuthRepository: { getCurrentUser: ReturnType<typeof vi.fn> };
  let mockEstablecimientoRepository: { findByProveedorId: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockAuthRepository = {
      getCurrentUser: vi.fn()
    };
    
    mockEstablecimientoRepository = {
      findByProveedorId: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoadEstablecimientosUseCase,
        { provide: SupabaseAuthRepository, useValue: mockAuthRepository },
        { provide: SupabaseEstablecimientoTuristicoRepository, useValue: mockEstablecimientoRepository }
      ]
    });

    useCase = TestBed.inject(LoadEstablecimientosUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return empty array if user is not authenticated', async () => {
    mockAuthRepository.getCurrentUser.mockResolvedValue({ data: { user: null } });

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(mockEstablecimientoRepository.findByProveedorId).not.toHaveBeenCalled();
  });

  it('should return establecimientos for the current user', async () => {
    const userId = 'user-1';
    const mockEstablecimientos: EstablecimientoTuristico[] = [
      { id: 'est-1', id_proveedor: userId, nombre: 'Hotel A' } as EstablecimientoTuristico
    ];
    
    mockAuthRepository.getCurrentUser.mockResolvedValue({ data: { user: { id: userId } } });
    mockEstablecimientoRepository.findByProveedorId.mockResolvedValue(mockEstablecimientos);

    const result = await useCase.execute();

    expect(mockEstablecimientoRepository.findByProveedorId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockEstablecimientos);
  });
});
