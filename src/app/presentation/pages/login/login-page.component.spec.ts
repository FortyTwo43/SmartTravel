import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-angular';
import { LoginUseCase } from '../../../useCase/auth/LoginUseCase';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginUseCaseSpy: any;
  let router: Router;

  beforeEach(async () => {
    loginUseCaseSpy = { execute: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [
        LoginPageComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        LucideAngularModule.pick({ Mail, Lock, Eye, EyeOff, Sparkles })
      ],
      providers: [
        provideRouter([]),
        { provide: LoginUseCase, useValue: loginUseCaseSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBe(false);
  });

  it('should have valid form with proper inputs', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBe(true);
  });

  it('should call loginUseCase on valid submit', async () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    
    loginUseCaseSpy.execute.mockResolvedValue({
      user: { id: '1', email: 'test@example.com' },
      session: { access_token: 'token', refresh_token: 'refresh' }
    });

    await component.onSubmit();

    expect(loginUseCaseSpy.execute).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(component.isLoading).toBe(false);
  });

  it('should set errorMessage if login fails', async () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    
    loginUseCaseSpy.execute.mockRejectedValue(new Error('Invalid credentials'));

    await component.onSubmit();

    expect(loginUseCaseSpy.execute).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Invalid credentials');
    expect(component.isLoading).toBe(false);
  });
});
