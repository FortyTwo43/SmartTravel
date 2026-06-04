import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorServicesPageComponent } from './proveedor-services';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ActivatedRoute } from '@angular/router';

import { LoadProveedorServicesUseCase, ToggleServicioDisponibilidadUseCase } from '../../../../useCase/proveedor/services';

describe('ProveedorServicesPageComponent', () => {
  let component: ProveedorServicesPageComponent;
  let fixture: ComponentFixture<ProveedorServicesPageComponent>;
  let mockLoadServicesUseCase: any;
  let mockToggleDisponibilidadUseCase: any;

  beforeEach(async () => {
    mockLoadServicesUseCase = { execute: vi.fn().mockResolvedValue([]) };
    mockToggleDisponibilidadUseCase = { execute: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ProveedorServicesPageComponent, TranslateModule.forRoot()],
      providers: [
        { provide: LoadProveedorServicesUseCase, useValue: mockLoadServicesUseCase },
        { provide: ToggleServicioDisponibilidadUseCase, useValue: mockToggleDisponibilidadUseCase },
        { provide: ActivatedRoute, useValue: { snapshot: {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load services on init', async () => {
    expect(mockLoadServicesUseCase.execute).toHaveBeenCalled();
    // After resolution, services should be empty based on mock
    await fixture.whenStable();
    expect(component.services()).toEqual([]);
  });

  it('should toggle availability correctly', async () => {
    // Setup initial state
    component.services.set([
      {
        id: '1',
        nombre: 'Test',
        descripcion: 'Test',
        precio: 100,
        comodidadesAdicionales: '',
        disponibilidad: true,
        establecimientoNombre: 'Hotel'
      }
    ]);
    
    mockToggleDisponibilidadUseCase.execute.mockResolvedValue({
      id: '1',
      disponibilidad: false
    });

    component.onToggleAvailability('1', false);
    
    expect(mockToggleDisponibilidadUseCase.execute).toHaveBeenCalledWith('1', false);
    
    // Wait for the async updateAvailability to resolve
    await fixture.whenStable();
    
    expect(component.services()[0].disponibilidad).toBe(false);
  });
});
