import { TestBed } from '@angular/core/testing';
import { InitializePerfilViajeroUseCase } from './InitializePerfilViajeroUseCase';
import { SupabasePerfilViajeroRepository } from '../../infrastructure/repositories/supabase/SupabasePerfilViajeroRepository';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
/// <reference types="jasmine" />

declare const jasmine: any;

describe('InitializePerfilViajeroUseCase', () => {
  let useCase: InitializePerfilViajeroUseCase;
  let perfilViajeroRepository: any;
  let authRepository: any;

  beforeEach(() => {
    const perfilSpy = jasmine.createSpyObj('SupabasePerfilViajeroRepository', ['createWithId']);
    const authSpy = jasmine.createSpyObj('SupabaseAuthRepository', ['getCurrentUser']);

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
    authRepository.getCurrentUser.and.returnValue(Promise.resolve({ data: { user: null }, error: null }));

    const result = await useCase.execute({
      intereses: 'deportes,cultura',
      tipoViaje: 'pareja',
      presupuesto: 5000,
      idioma: 'es',
    });

    expect(result.success).toBeFalsy();
  });

  it('should successfully initialize traveler profile', async () => {
    const userId = 'test-user-id';
    authRepository.getCurrentUser.and.returnValue(
      Promise.resolve({
        data: { user: { id: userId } },
        error: null,
      })
    );

    const mockProfile = {
      id: userId,
      intereses: 'deportes,cultura',
      presupuesto: 5000,
      idioma: 'es',
    };

    perfilViajeroRepository.createWithId.and.returnValue(Promise.resolve(mockProfile));

    const result = await useCase.execute({
      intereses: 'deportes,cultura',
      tipoViaje: 'pareja',
      presupuesto: 5000,
      idioma: 'es',
    });

    expect(result.success).toBeTruthy();
    expect(result.perfilViajero).toEqual(mockProfile);
  });
});
