import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadDashboardDataUseCase } from './LoadDashboardDataUseCase';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { LoadDashboardEstablecimientoUseCase } from './LoadDashboardEstablecimiento';
import { EstablecimientoTuristico } from '../../../domain/entities/EstablecimientoTuristico';

describe('LoadDashboardDataUseCase', () => {
  let useCase: LoadDashboardDataUseCase;
  let mockAuthRepo: any;
  let mockLoadEstablecimientoUseCase: any;

  beforeEach(() => {
    mockAuthRepo = {
      getCurrentUser: vi.fn()
    };
    mockLoadEstablecimientoUseCase = {
      execute: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoadDashboardDataUseCase,
        { provide: SupabaseAuthRepository, useValue: mockAuthRepo },
        { provide: LoadDashboardEstablecimientoUseCase, useValue: mockLoadEstablecimientoUseCase }
      ]
    });

    useCase = TestBed.inject(LoadDashboardDataUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should throw error if no user is authenticated', async () => {
    mockAuthRepo.getCurrentUser.mockResolvedValue({ data: { user: null } });
    
    await expect(useCase.execute()).rejects.toThrow('No hay usuario autenticado en la sesión.');
  });

  it('should throw error if user is not a proveedor', async () => {
    mockAuthRepo.getCurrentUser.mockResolvedValue({ 
      data: { user: { id: '123', user_metadata: { rol: 'viajero' } } } 
    });
    
    await expect(useCase.execute()).rejects.toThrow('El usuario activo no tiene rol de proveedor.');
  });

  it('should return establecimiento if user is proveedor', async () => {
    const mockEstablecimiento = {} as EstablecimientoTuristico;
    mockAuthRepo.getCurrentUser.mockResolvedValue({ 
      data: { user: { id: '123', user_metadata: { rol: 'proveedor' } } } 
    });
    mockLoadEstablecimientoUseCase.execute.mockResolvedValue(mockEstablecimiento);
    
    const result = await useCase.execute();
    
    expect(mockLoadEstablecimientoUseCase.execute).toHaveBeenCalledWith('123');
    expect(result).toBe(mockEstablecimiento);
  });
});
