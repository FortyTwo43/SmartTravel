import { TestBed } from '@angular/core/testing';
import { LoginUseCase } from './LoginUseCase';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { AuthResponse } from '../../domain/repositories/auth/AuthRepository';
import { SupabaseClient } from '@supabase/supabase-js';
import { vi } from 'vitest';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let authRepositorySpy: any;

  beforeEach(() => {
    const spy = { signIn: vi.fn() };
    const supabaseClientSpy = {} as any;

    TestBed.configureTestingModule({
      providers: [
        LoginUseCase,
        { provide: SupabaseAuthRepository, useValue: spy },
        { provide: SupabaseClient, useValue: supabaseClientSpy }
      ]
    });

    useCase = TestBed.inject(LoginUseCase);
    authRepositorySpy = TestBed.inject(SupabaseAuthRepository);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call authRepository.signIn with correct parameters', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';
    const mockAuthResponse: AuthResponse = {
      user: { id: '1', email: mockEmail },
      session: { access_token: 'token', refresh_token: 'refresh' }
    };

    authRepositorySpy.signIn.mockResolvedValue(mockAuthResponse);

    const result = await useCase.execute(mockEmail, mockPassword);

    expect(authRepositorySpy.signIn).toHaveBeenCalledWith(mockEmail, mockPassword);
    expect(result.user).toEqual(mockAuthResponse.user);
    expect(result.session).toEqual(mockAuthResponse.session);
  });

  it('should throw an error if authRepository.signIn fails', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'wrongpassword';
    const mockError = new Error('Invalid credentials');

    authRepositorySpy.signIn.mockRejectedValue(mockError);

    await expect(useCase.execute(mockEmail, mockPassword)).rejects.toThrow(mockError);
    expect(authRepositorySpy.signIn).toHaveBeenCalledWith(mockEmail, mockPassword);
  });
});
