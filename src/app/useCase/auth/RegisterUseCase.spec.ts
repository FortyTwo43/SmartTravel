import { TestBed } from '@angular/core/testing';
import { RegisterUseCase, RegisterRequest } from './RegisterUseCase';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { SupabasePerfilRepository } from '../../infrastructure/repositories/supabase/SupabasePerfilRepository';
import { SupabasePerfilViajeroRepository } from '../../infrastructure/repositories/supabase/SupabasePerfilViajeroRepository';
import { SupabaseSolicitudProveedorRepository } from '../../infrastructure/repositories/supabase/SupabaseSolicitudProveedorRepository';
import { UploadProviderDocumentUseCase } from '../upload/UploadProviderDocumentUseCase';
import { AuthenticationError } from '../../domain/errors/auth-errors';
import { vi } from 'vitest';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  let authRepoSpy: any;
  let perfilRepoSpy: any;
  let perfilViajeroRepoSpy: any;
  let solicitudProveedorRepoSpy: any;
  let uploadDocUseCaseSpy: any;

  beforeEach(() => {
    authRepoSpy = { signUp: vi.fn() };
    perfilRepoSpy = { create: vi.fn() };
    perfilViajeroRepoSpy = { create: vi.fn() };
    solicitudProveedorRepoSpy = { create: vi.fn() };
    uploadDocUseCaseSpy = { execute: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        RegisterUseCase,
        { provide: SupabaseAuthRepository, useValue: authRepoSpy },
        { provide: SupabasePerfilRepository, useValue: perfilRepoSpy },
        { provide: SupabasePerfilViajeroRepository, useValue: perfilViajeroRepoSpy },
        { provide: SupabaseSolicitudProveedorRepository, useValue: solicitudProveedorRepoSpy },
        { provide: UploadProviderDocumentUseCase, useValue: uploadDocUseCaseSpy }
      ]
    });

    useCase = TestBed.inject(RegisterUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  describe('registerTraveler', () => {
    it('should register a traveler successfully', async () => {
      const request: RegisterRequest = {
        email: 'traveler@example.com',
        password: 'password123',
        nombre: 'John',
        apellido: 'Doe',
        rol: 'viajero',
        presupuesto: 2,
        idioma: 'es'
      };

      authRepoSpy.signUp.mockResolvedValue({ user: { id: '1', email: request.email }, session: null });

      const result = await useCase.execute(request);

      expect(authRepoSpy.signUp).toHaveBeenCalledWith(request.email, request.password, expect.objectContaining({
        first_name: 'John',
        last_name: 'Doe',
        rol: 'viajero',
        presupuesto: 2,
        idioma: 'es'
      }));
      expect(result.success).toBe(true);
      expect(result.role).toBe('viajero');
    });

    it('should return error if auth fails with AuthenticationError', async () => {
      const request: RegisterRequest = {
        email: 'traveler@example.com',
        password: 'password123',
        nombre: 'John',
        apellido: 'Doe',
        rol: 'viajero'
      };

      const error = new AuthenticationError('Email already in use');
      authRepoSpy.signUp.mockRejectedValue(error);

      const result = await useCase.execute(request);

      expect(result.success).toBe(false);
      expect(result.role).toBe('viajero');
      expect(result.message).toBe('Email already in use');
    });
  });

  describe('registerProvider', () => {
    it('should register a provider successfully', async () => {
      const mockFile = new File([''], 'doc.pdf', { type: 'application/pdf' });
      const request: RegisterRequest = {
        email: 'provider@example.com',
        password: 'password123',
        nombre: 'Jane',
        apellido: 'Smith',
        rol: 'proveedor',
        nombre_negocio: 'Hotel Test',
        tipo_negocio: 'hotel',
        telefono: '1234567890',
        descripcion: 'A nice hotel',
        ubicacion: 'City Center',
        documento: mockFile
      };

      authRepoSpy.signUp.mockResolvedValue({ user: { id: '2', email: request.email }, session: null });
      uploadDocUseCaseSpy.execute.mockResolvedValue('mock-url');
      solicitudProveedorRepoSpy.create.mockResolvedValue({} as any);

      const result = await useCase.execute(request);

      expect(authRepoSpy.signUp).toHaveBeenCalled();
      expect(uploadDocUseCaseSpy.execute).toHaveBeenCalledWith('2', mockFile);
      expect(solicitudProveedorRepoSpy.create).toHaveBeenCalledWith(expect.objectContaining({
        id_perfil: '2',
        nombre_negocio: 'Hotel Test',
        tipo_negocio: 'hotel',
        documento_url: 'mock-url',
        estado: 'pendiente'
      }));
      expect(result.success).toBe(true);
      expect(result.role).toBe('proveedor');
    });

    it('should return error if provider auth fails with AuthenticationError', async () => {
      const request: RegisterRequest = {
        email: 'provider@example.com',
        password: 'password123',
        nombre: 'Jane',
        apellido: 'Smith',
        rol: 'proveedor'
      };

      const error = new AuthenticationError('Invalid email');
      authRepoSpy.signUp.mockRejectedValue(error);

      const result = await useCase.execute(request);

      expect(result.success).toBe(false);
      expect(result.role).toBe('proveedor');
      expect(result.message).toBe('Invalid email');
    });
  });
});
