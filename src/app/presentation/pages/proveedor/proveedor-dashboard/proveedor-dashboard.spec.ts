import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { ProveedorDashboardComponent } from './proveedor-dashboard';
import { LoadDashboardKpisUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardKpisUseCase';
import { LoadActividadRecienteUseCase } from '../../../../useCase/proveedor/dashboard/LoadActividadRecienteUseCase';
import { LoadDashboardServiciosMasDemandadosUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardServiciosMasDemandadosUseCase';
import { LoadDashboardTipoViajeUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardTipoViaje';
import { LoadDashboardGraphUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardGraphUseCase';
import { LoadDashboardDataUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardDataUseCase';

describe('ProveedorDashboardComponent', () => {
  let component: ProveedorDashboardComponent;
  let fixture: ComponentFixture<ProveedorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorDashboardComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: LoadDashboardKpisUseCase, useValue: { execute: () => Promise.resolve() } },
        { provide: LoadActividadRecienteUseCase, useValue: { execute: () => Promise.resolve() } },
        { provide: LoadDashboardServiciosMasDemandadosUseCase, useValue: { execute: () => Promise.resolve() } },
        { provide: LoadDashboardTipoViajeUseCase, useValue: { execute: () => Promise.resolve() } },
        { provide: LoadDashboardGraphUseCase, useValue: { execute: () => Promise.resolve() } },
        { provide: LoadDashboardDataUseCase, useValue: { execute: () => Promise.resolve({ id_proveedor: '1' }) } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
