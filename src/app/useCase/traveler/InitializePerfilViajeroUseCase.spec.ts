import { TestBed } from '@angular/core/testing';
import { InitializePerfilViajeroUseCase } from './InitializePerfilViajeroUseCase';
import { SupabasePerfilViajeroRepository } from '../../infrastructure/repositories/supabase/SupabasePerfilViajeroRepository';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { vi } from 'vitest';

describe('InitializePerfilViajeroUseCase', () => {
  let useCase: InitializePerfilViajeroUseCase;
  let perfilViajeroRepository: any;
  let authRepository: any;

  beforeEach(() => {
    const perfilSpy = { update: vi.fn() };
    const authSpy = { getCurrentUser: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        InitializePerfilViajeroUseCase,
        { provide: SupabasePerfilViajeroRepository, useValue: perfilSpy },
        { provide: SupabaseAuthRepository, useValue: authSpy },
      ],
    });

    useCase = TestBed.inject(InitializePerfilViajeroUseCase);
    perfilViajeroRepository = TestBed.inject(SupabasePerfilViajeroRepository) as any;
    authRepository = TestBed.inject(SupabaseAuthRepository) as any;
  });

  it('should create', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return error if user is not authenticated', async () => {
    authRepository.getCurrentUser.mockResolvedValue({ data: { user: null }, error: null });

    const result = await useCase.execute({
      intereses: 'deportes,cultura',
      tipoViaje: 'pareja',
      presupuesto: 5000,
    });

    expect(result.success).toBeFalsy();
  });

  it('should successfully initialize traveler profile', async () => {
    const userId = 'test-user-id';
    authRepository.getCurrentUser.mockResolvedValue({
        data: { user: { id: userId } },
        error: null
      });

    const mockProfile = {
      id: userId,
      intereses: 'deportes,cultura',
      presupuesto: 5000,
      idioma: 'es',
    };

    perfilViajeroRepository.update.mockResolvedValue(mockProfile);

    const result = await useCase.execute({
      intereses: 'deportes,cultura',
      tipoViaje: 'pareja',
      presupuesto: 5000,
    });

    expect(result.success).toBeTruthy();
    expect(result.perfilViajero).toEqual(mockProfile);
  });
});
