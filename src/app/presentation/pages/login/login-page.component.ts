import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-angular';
import { InputComponent } from '../../components/ui/input/input.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { LoginUseCase } from '../../../useCase/auth/LoginUseCase';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    ReactiveFormsModule,
    LucideAngularModule,
    InputComponent,
    ButtonComponent,
    RouterLink
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Mail, Lock, Eye, EyeOff, Sparkles })
    }
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly loginUseCase = inject(LoginUseCase);
  private readonly router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = false;
  errorMessage: string | null = null;

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      const { email, password } = this.loginForm.value;
      await this.loginUseCase.execute(email, password);
      console.log('Login exitoso');
      // Redirigir al home o dashboard
      // this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Error al iniciar sesión';
    } finally {
      this.isLoading = false;
    }
  }
}
