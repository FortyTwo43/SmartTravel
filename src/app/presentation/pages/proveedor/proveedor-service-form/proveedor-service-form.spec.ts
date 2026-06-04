import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorServiceFormComponent } from './proveedor-service-form';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CreateProveedorServiceUseCase } from '../../../../useCase/proveedor/services/CreateProveedorServiceUseCase';
import { UpdateProveedorServiceUseCase } from '../../../../useCase/proveedor/services/UpdateProveedorServiceUseCase';
import { GetProveedorServiceUseCase } from '../../../../useCase/proveedor/services/GetProveedorServiceUseCase';
import { LoadEstablecimientosUseCase } from '../../../../useCase/proveedor/services/LoadEstablecimientosUseCase';

describe('ProveedorServiceFormComponent', () => {
  let component: ProveedorServiceFormComponent;
  let fixture: ComponentFixture<ProveedorServiceFormComponent>;
  
  let mockRouter: any;
  let mockActivatedRoute: any;
  let mockCreateUseCase: any;
  let mockUpdateUseCase: any;
  let mockGetUseCase: any;
  let mockLoadEstablecimientosUseCase: any;

  beforeEach(async () => {
    mockRouter = { navigate: vi.fn() };
    mockActivatedRoute = {
      snapshot: { paramMap: { get: vi.fn().mockReturnValue(null) } }
    };
    mockCreateUseCase = { execute: vi.fn() };
    mockUpdateUseCase = { execute: vi.fn() };
    mockGetUseCase = { execute: vi.fn() };
    mockLoadEstablecimientosUseCase = { execute: vi.fn().mockResolvedValue([]) };

    await TestBed.configureTestingModule({
      imports: [ProveedorServiceFormComponent, TranslateModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CreateProveedorServiceUseCase, useValue: mockCreateUseCase },
        { provide: UpdateProveedorServiceUseCase, useValue: mockUpdateUseCase },
        { provide: GetProveedorServiceUseCase, useValue: mockGetUseCase },
        { provide: LoadEstablecimientosUseCase, useValue: mockLoadEstablecimientosUseCase }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.serviceForm.get('nombre')?.value).toBe('');
    expect(component.serviceForm.get('precio')?.value).toBeNull();
    expect(component.serviceForm.get('descripcion')?.value).toBe('');
    expect(component.serviceForm.get('disponibilidad')?.value).toBe(true);
    expect(component.serviceForm.get('id_establecimiento')?.value).toBe('');
    expect(component.comodidadesArray.length).toBe(1);
    expect(component.comodidadesArray.at(0).value).toBe('');
  });

  it('should add new comodidad control', () => {
    const initialLength = component.comodidadesArray.length;
    component.addComodidad();
    expect(component.comodidadesArray.length).toBe(initialLength + 1);
  });

  it('should remove comodidad control', () => {
    component.addComodidad();
    const initialLength = component.comodidadesArray.length;
    component.removeComodidad(0);
    expect(component.comodidadesArray.length).toBe(initialLength - 1);
  });
});
