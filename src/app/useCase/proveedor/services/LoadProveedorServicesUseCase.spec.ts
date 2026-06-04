import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadProveedorServicesUseCase } from './LoadProveedorServicesUseCase';
import { SupabaseAuthRepository } from '../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';
import { SupabaseServicioReservableRepository } from '../../../infrastructure/repositories/supabase/SupabaseServicioReservableRepository';
import { EstablecimientoTuristico } from '../../../domain/entities/EstablecimientoTuristico';
import { ServicioReservable } from '../../../domain/entities/ServicioReservable';

describe('LoadProveedorServicesUseCase', () => {
  let useCase: LoadProveedorServicesUseCase;
  let mockAuthRepository: { getCurrentUser: ReturnType<typeof vi.fn> };
  let mockEstablecimientoRepository: { findByProveedorId: ReturnType<typeof vi.fn> };
  let mockServicioRepository: { findByEstablecimientoId: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockAuthRepository = { getCurrentUser: vi.fn() };
    mockEstablecimientoRepository = { findByProveedorId: vi.fn() };
    mockServicioRepository = { findByEstablecimientoId: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        LoadProveedorServicesUseCase,
        { provide: SupabaseAuthRepository, useValue: mockAuthRepository },
        { provide: SupabaseEstablecimientoTuristicoRepository, useValue: mockEstablecimientoRepository },
        { provide: SupabaseServicioReservableRepository, useValue: mockServicioRepository }
      ]
    });

    useCase = TestBed.inject(LoadProveedorServicesUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return empty array if no user is authenticated', async () => {
    mockAuthRepository.getCurrentUser.mockResolvedValue({ data: { user: null } });

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(mockEstablecimientoRepository.findByProveedorId).not.toHaveBeenCalled();
  });

  it('should return empty array if user has no establecimientos', async () => {
    const userId = 'user-1';
    mockAuthRepository.getCurrentUser.mockResolvedValue({ data: { user: { id: userId } } });
    mockEstablecimientoRepository.findByProveedorId.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(mockServicioRepository.findByEstablecimientoId).not.toHaveBeenCalled();
  });

  it('should map services correctly from multiple establecimientos', async () => {
    const userId = 'user-1';
    mockAuthRepository.getCurrentUser.mockResolvedValue({ data: { user: { id: userId } } });
    
    const establecimientos: EstablecimientoTuristico[] = [
      { id: 'est-1', nombre: 'Hotel A' } as EstablecimientoTuristico,
      { id: 'est-2', nombre: 'Hostal B' } as EstablecimientoTuristico
    ];
    mockEstablecimientoRepository.findByProveedorId.mockResolvedValue(establecimientos);

    const servicesEst1: ServicioReservable[] = [
      { id: 'srv-1', nombre: 'Habitacion Sencilla', descripcion: 'desc', precio: 100, comodidades_adicionales: 'wifi', disponibilidad: true, id_establecimiento: 'est-1' }
    ];
    
    const servicesEst2: ServicioReservable[] = [
      { id: 'srv-2', nombre: 'Tour Ciudad', descripcion: 'desc2', precio: 50, comodidades_adicionales: '', disponibilidad: false, id_establecimiento: 'est-2' }
    ];

    mockServicioRepository.findByEstablecimientoId.mockImplementation(async (id: string) => {
      if (id === 'est-1') return servicesEst1;
      if (id === 'est-2') return servicesEst2;
      return [];
    });

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    
    expect(result[0]).toEqual({
      id: 'srv-1',
      nombre: 'Habitacion Sencilla',
      descripcion: 'desc',
      precio: 100,
      comodidadesAdicionales: 'wifi',
      disponibilidad: true,
      establecimientoNombre: 'Hotel A'
    });

    expect(result[1]).toEqual({
      id: 'srv-2',
      nombre: 'Tour Ciudad',
      descripcion: 'desc2',
      precio: 50,
      comodidadesAdicionales: '',
      disponibilidad: false,
      establecimientoNombre: 'Hostal B'
    });
  });

  it('should ignore rejected promises when loading services', async () => {
    const userId = 'user-1';
    mockAuthRepository.getCurrentUser.mockResolvedValue({ data: { user: { id: userId } } });
    
    const establecimientos: EstablecimientoTuristico[] = [
      { id: 'est-1', nombre: 'Hotel A' } as EstablecimientoTuristico,
      { id: 'est-2', nombre: 'Hostal B' } as EstablecimientoTuristico
    ];
    mockEstablecimientoRepository.findByProveedorId.mockResolvedValue(establecimientos);

    const servicesEst1: ServicioReservable[] = [
      { id: 'srv-1', nombre: 'Habitacion', descripcion: 'desc', precio: 100, comodidades_adicionales: 'wifi', disponibilidad: true, id_establecimiento: 'est-1' }
    ];

    mockServicioRepository.findByEstablecimientoId.mockImplementation(async (id: string) => {
      if (id === 'est-1') return servicesEst1;
      if (id === 'est-2') throw new Error('DB Error');
      return [];
    });

    const result = await useCase.execute();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('srv-1');
  });
});
