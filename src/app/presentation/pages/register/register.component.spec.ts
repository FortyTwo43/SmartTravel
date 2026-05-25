import { ComponentFixture, TestBed } from '@angular/core/testing';
import RegisterComponent from './register.component';
import { RegisterUseCase } from '../../../useCase/auth/RegisterUseCase';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerUseCaseSpy: any;
  let router: Router;

  beforeEach(async () => {
    registerUseCaseSpy = { execute: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: RegisterUseCase, useValue: registerUseCaseSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select role', () => {
    component.selectRole('proveedor');
    expect(component.selectedRole()).toBe('proveedor');
    
    component.selectRole('viajero');
    expect(component.selectedRole()).toBe('viajero');
  });

  it('should validate basic required fields before submitting', async () => {
    component.nombre = '';
    component.apellido = '';
    component.email = '';
    component.password = '';
    
    await component.onSubmit();
    
    expect(component.errorMessage()).toBeTruthy();
    expect(registerUseCaseSpy.execute).not.toHaveBeenCalled();
  });

  it('should call useCase and navigate to home for traveler on success', async () => {
    component.nombre = 'Test';
    component.apellido = 'User';
    component.email = 'test@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.selectRole('viajero');

    registerUseCaseSpy.execute.mockResolvedValue({
      success: true,
      role: 'viajero'
    });

    await component.onSubmit();

    expect(registerUseCaseSpy.execute).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should call useCase and navigate to login for provider on success', async () => {
    vi.useFakeTimers();
    
    component.nombre = 'Test';
    component.apellido = 'Provider';
    component.email = 'provider@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.selectRole('proveedor');
    component.nombre_negocio = 'My Hotel';
    component.telefono = '1234567890';
    component.descripcion = 'Desc';
    component.ubicacion = 'Loc';
    component.selectedFile = new File([''], 'test.pdf', { type: 'application/pdf' });

    registerUseCaseSpy.execute.mockResolvedValue({
      success: true,
      role: 'proveedor',
      message: 'Registrado'
    });

    await component.onSubmit();
    vi.advanceTimersByTime(3000); // the component waits 3000ms before navigating

    expect(registerUseCaseSpy.execute).toHaveBeenCalled();
    expect(component.successMessage()).toBe('Registrado');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    
    vi.useRealTimers();
  });

  it('should handle errors from useCase', async () => {
    component.nombre = 'Test';
    component.apellido = 'User';
    component.email = 'test@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    
    registerUseCaseSpy.execute.mockRejectedValue(new Error('Test error'));

    await component.onSubmit();

    expect(component.errorMessage()).toBeTruthy();
  });
});
