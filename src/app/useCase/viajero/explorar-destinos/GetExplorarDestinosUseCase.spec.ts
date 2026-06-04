import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetExplorarDestinosUseCase, ExploreFilter } from './GetExplorarDestinosUseCase';
import { SupabaseDestinoRepository } from '../../../infrastructure/repositories/supabase/SupabaseDestinoRepository';
import { SupabaseEstablecimientoTuristicoRepository } from '../../../infrastructure/repositories/supabase/SupabaseEstablecimientoTuristicoRepository';

describe('GetExplorarDestinosUseCase', () => {
  let useCase: GetExplorarDestinosUseCase;
  let queryBuilderMock: any;
  let mockSupabaseClient: any;
  let mockEstablecimientoRepo: any;
  let mockDestinoRepo: any;

  beforeEach(() => {
    // Create a mock query builder chain that resolves to data
    queryBuilderMock = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      range: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      // Make the builder thenable so it can be awaited
      then: vi.fn((resolve) => resolve({ data: [{ id: 'd-1', nombre: 'Paris', tipo_experiencia: 'Ciudad' }], error: null }))
    };

    mockSupabaseClient = {
      from: vi.fn().mockReturnValue(queryBuilderMock)
    };

    mockDestinoRepo = {
      supabase: mockSupabaseClient
    };

    mockEstablecimientoRepo = {
      findByDestinoId: vi.fn().mockResolvedValue([])
    };

    TestBed.configureTestingModule({
      providers: [
        GetExplorarDestinosUseCase,
        { provide: SupabaseDestinoRepository, useValue: mockDestinoRepo },
        { provide: SupabaseEstablecimientoTuristicoRepository, useValue: mockEstablecimientoRepo }
      ]
    });

    useCase = TestBed.inject(GetExplorarDestinosUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should execute base query without filters', async () => {
    const result = await useCase.execute();

    expect(mockSupabaseClient.from).toHaveBeenCalledWith('destino');
    expect(queryBuilderMock.select).toHaveBeenCalledWith('*');
    expect(result).toHaveLength(1);
    expect(result[0].nombre).toBe('Paris');
    expect(result[0].ratingPromedio).toBeNull();
  });

  it('should apply experiencia filter', async () => {
    const filter: ExploreFilter = { experiencia: 'Playa' };
    await useCase.execute(filter);
    expect(queryBuilderMock.eq).toHaveBeenCalledWith('tipo_experiencia', 'Playa');
  });

  it('should apply paises filter', async () => {
    const filter: ExploreFilter = { paises: ['Francia', 'España'] };
    await useCase.execute(filter);
    expect(queryBuilderMock.in).toHaveBeenCalledWith('pais', ['Francia', 'España']);
  });

  it('should apply categorias filter (text search)', async () => {
    const filter: ExploreFilter = { categorias: ['arte', 'museo'] };
    await useCase.execute(filter);
    expect(queryBuilderMock.or).toHaveBeenCalledWith(
      'tipo_experiencia.ilike.%arte%,descripcion.ilike.%arte%,nombre.ilike.%arte%,tipo_experiencia.ilike.%museo%,descripcion.ilike.%museo%,nombre.ilike.%museo%'
    );
  });

  it('should apply limit and offset', async () => {
    await useCase.execute(undefined, 10, 5);
    expect(queryBuilderMock.range).toHaveBeenCalledWith(5, 14);
  });

  it('should calculate average rating from establecimientos', async () => {
    mockEstablecimientoRepo.findByDestinoId.mockResolvedValue([
      { id: 'e-1', rating: 4 },
      { id: 'e-2', rating: 5 },
      { id: 'e-3', rating: null } // should be ignored
    ]);

    const result = await useCase.execute();
    
    expect(mockEstablecimientoRepo.findByDestinoId).toHaveBeenCalledWith('d-1');
    expect(result[0].ratingPromedio).toBe(4.5);
  });

  it('should filter by ratingMin and ratingMax locally', async () => {
    queryBuilderMock.then = vi.fn((resolve) => resolve({ 
      data: [
        { id: 'd-1', nombre: 'A' },
        { id: 'd-2', nombre: 'B' },
        { id: 'd-3', nombre: 'C' }
      ], 
      error: null 
    }));

    mockEstablecimientoRepo.findByDestinoId.mockImplementation(async (id: string) => {
      if (id === 'd-1') return [{ rating: 2 }];
      if (id === 'd-2') return [{ rating: 4 }];
      if (id === 'd-3') return [{ rating: 5 }];
      return [];
    });

    const filter: ExploreFilter = { ratingMin: 4, ratingMax: 5 };
    const result = await useCase.execute(filter);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('d-2');
    expect(result[1].id).toBe('d-3');
  });

  it('should throw error if Supabase query fails', async () => {
    queryBuilderMock.then = vi.fn((resolve) => resolve({ data: null, error: new Error('DB Error') }));

    await expect(useCase.execute()).rejects.toThrow('DB Error');
  });
});
