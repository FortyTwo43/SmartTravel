import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetTravelerDashboardUseCase } from './GetTravelerDashboardUseCase';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { SupabasePerfilViajeroRepository } from '../../../infrastructure/repositories/supabase/SupabasePerfilViajeroRepository';
import { SupabaseItinerarioRepository } from '../../../infrastructure/repositories/supabase/SupabaseItinerarioRepository';
import { SupabaseDestinoRepository } from '../../../infrastructure/repositories/supabase/SupabaseDestinoRepository';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';

describe('GetTravelerDashboardUseCase', () => {
  let useCase: GetTravelerDashboardUseCase;
  let mockAuthRepo: { getCurrentUser: ReturnType<typeof vi.fn> };
  let mockPerfilRepo: { getById: ReturnType<typeof vi.fn> };
  let mockItinerarioRepo: { findByPerfilId: ReturnType<typeof vi.fn> };
  let mockDestinoRepo: { getAll: ReturnType<typeof vi.fn> };
  let mockServicioRepo: { getAll: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockAuthRepo = { getCurrentUser: vi.fn() };
    mockPerfilRepo = { getById: vi.fn() };
    mockItinerarioRepo = { findByPerfilId: vi.fn() };
    mockDestinoRepo = { getAll: vi.fn() };
    mockServicioRepo = { getAll: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        GetTravelerDashboardUseCase,
        { provide: SupabaseAuthRepository, useValue: mockAuthRepo },
        { provide: SupabasePerfilViajeroRepository, useValue: mockPerfilRepo },
        { provide: SupabaseItinerarioRepository, useValue: mockItinerarioRepo },
        { provide: SupabaseDestinoRepository, useValue: mockDestinoRepo },
        { provide: SupabaseServicioReservableRepository, useValue: mockServicioRepo },
      ]
    });

    useCase = TestBed.inject(GetTravelerDashboardUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return empty dashboard when no user is authenticated', async () => {
    mockAuthRepo.getCurrentUser.mockResolvedValue({ data: { user: null } });

    const result = await useCase.execute();

    expect(result.proximosViajes).toEqual([]);
    expect(result.destinosRecomendados).toEqual([]);
    expect(result.itinerariosRecientes).toEqual([]);
    expect(result.serviciosSugeridos).toEqual([]);
    expect(result.userName).toBe('Viajero');
  });

  it('should return dashboard data when user is authenticated', async () => {
    mockAuthRepo.getCurrentUser.mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
          email: 'viajero@example.com',
          user_metadata: { first_name: 'Carlos' }
        }
      }
    });
    mockItinerarioRepo.findByPerfilId.mockResolvedValue([]);
    mockDestinoRepo.getAll.mockResolvedValue([]);
    mockServicioRepo.getAll.mockResolvedValue([]);
    mockPerfilRepo.getById.mockResolvedValue({ presupuesto: 5000 });

    const result = await useCase.execute();

    expect(result.userName).toBe('Carlos');
    expect(result.estadisticas.viajes_completados).toBe(0);
  });

  it('should use email prefix as userName when first_name is missing', async () => {
    mockAuthRepo.getCurrentUser.mockResolvedValue({
      data: {
        user: {
          id: 'user-2',
          email: 'juan.perez@example.com',
          user_metadata: {}
        }
      }
    });
    mockItinerarioRepo.findByPerfilId.mockResolvedValue([]);
    mockDestinoRepo.getAll.mockResolvedValue([]);
    mockServicioRepo.getAll.mockResolvedValue([]);
    mockPerfilRepo.getById.mockResolvedValue(null);

    const result = await useCase.execute();

    expect(result.userName).toBe('juan.perez');
  });

  it('should count completed trips in estadisticas', async () => {
    mockAuthRepo.getCurrentUser.mockResolvedValue({
      data: {
        user: { id: 'user-3', email: 'test@test.com', user_metadata: {} }
      }
    });
    mockItinerarioRepo.findByPerfilId.mockResolvedValue([
      { id: '1', nombre: 'Viaje 1', estado: 'completado', fecha_inicio: null, fecha_fin: null },
      { id: '2', nombre: 'Viaje 2', estado: 'completado', fecha_inicio: null, fecha_fin: null },
      { id: '3', nombre: 'Viaje 3', estado: 'activo', fecha_inicio: null, fecha_fin: null },
    ]);
    mockDestinoRepo.getAll.mockResolvedValue([]);
    mockServicioRepo.getAll.mockResolvedValue([]);
    mockPerfilRepo.getById.mockResolvedValue(null);

    const result = await useCase.execute();

    expect(result.estadisticas.viajes_completados).toBe(2);
  });

  it('should handle repository errors gracefully', async () => {
    mockAuthRepo.getCurrentUser.mockResolvedValue({
      data: {
        user: { id: 'user-4', email: 'err@test.com', user_metadata: {} }
      }
    });
    mockItinerarioRepo.findByPerfilId.mockRejectedValue(new Error('DB error'));
    mockDestinoRepo.getAll.mockRejectedValue(new Error('DB error'));
    mockServicioRepo.getAll.mockRejectedValue(new Error('DB error'));
    mockPerfilRepo.getById.mockRejectedValue(new Error('DB error'));

    const result = await useCase.execute();

    expect(result.proximosViajes).toEqual([]);
    expect(result.destinosRecomendados).toEqual([]);
  });
});
