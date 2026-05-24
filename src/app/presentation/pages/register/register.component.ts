import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  LucideAngularModule,
  LUCIDE_ICONS,
  LucideIconProvider,
  ArrowLeft,
  User,
  Building,
  Mail,
  KeyRound,
  Plus,
  X,
  ChevronDown,
  Eye,
  EyeOff,
  Briefcase,
  CloudUpload,
  Info,
} from 'lucide-angular';
import { RegisterUseCase, RegisterRequest } from '../../../useCase/auth/RegisterUseCase';

type Role = 'traveler' | 'provider';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslateModule, LucideAngularModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        ArrowLeft,
        User,
        Building,
        Mail,
        KeyRound,
        Plus,
        X,
        ChevronDown,
        Eye,
        EyeOff,
        Briefcase,
        CloudUpload,
        Info,
      }),
    },
  ],
})
export default class RegisterComponent {
  private readonly registerUseCase = inject(RegisterUseCase);
  private readonly router = inject(Router);

  selectedRole = signal<Role>('traveler');

  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);

  // Estado del formulario
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // Campos comunes
  nombre = '';
  apellido = '';
  email = '';
  password = '';
  confirmPassword = '';

  // Campos traveler
  presupuesto = 'economico';
  idioma = 'es';

  // Campos provider
  nombre_negocio = '';
  tipo_negocio = 'agencia';
  telefono = '';
  ubicacion = '';
  descripcion = '';

  // Mapa de valores del select de presupuesto a número
  private readonly presupuestoMap: Record<string, number> = {
    economico: 1,
    estandar: 2,
    lujo: 3,
    elite: 4,
  };

  selectRole(role: Role) {
    this.selectedRole.set(role);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  togglePasswordVisibility() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible.set(!this.confirmPasswordVisible());
  }

  async onSubmit() {
    // Validaciones básicas
    if (!this.nombre.trim() || !this.apellido.trim() || !this.email.trim() || !this.password) {
      this.errorMessage.set('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (this.selectedRole() === 'provider') {
      if (!this.nombre_negocio.trim() || !this.telefono.trim() || !this.descripcion.trim() || !this.ubicacion.trim()) {
        this.errorMessage.set('Por favor completa todos los campos del negocio.');
        return;
      }
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const request: RegisterRequest = {
        email: this.email.trim(),
        password: this.password,
        nombre: this.nombre.trim(),
        apellido: this.apellido.trim(),
        rol: this.selectedRole(),
        // Traveler
        presupuesto: this.presupuestoMap[this.presupuesto] ?? 1,
        idioma: this.idioma,
        // Provider
        nombre_negocio: this.nombre_negocio.trim(),
        tipo_negocio: this.tipo_negocio,
        telefono: this.telefono.trim(),
        descripcion: this.descripcion.trim(),
        ubicacion: this.ubicacion.trim(),
      };

      const result = await this.registerUseCase.execute(request);

      if (result.role === 'provider') {
        // Proveedor: mostrar mensaje y redirigir al login
        this.successMessage.set(result.message ?? 'Solicitud enviada correctamente.');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        // Viajero: si hay un mensaje (ej. confirmación de correo), lo mostramos y vamos al login
        if (result.message) {
          this.successMessage.set(result.message);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          // Si no hay mensaje, vamos al home directamente (login automático)
          this.router.navigate(['/home']);
        }
      }
    } catch (error: any) {
      this.errorMessage.set(this.getFriendlyError(error));
    } finally {
      this.isLoading.set(false);
    }
  }

  private getFriendlyError(error: any): string {
    const msg: string = error?.message ?? '';

    if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('User already registered')) {
      return 'Este correo electrónico ya está registrado. Por favor inicia sesión.';
    }
    if (msg.includes('Invalid email')) {
      return 'El correo electrónico no es válido.';
    }
    if (msg.includes('Password')) {
      return 'La contraseña no cumple los requisitos mínimos.';
    }
    if (msg.includes('perfil')) {
      return 'Error al crear el perfil. Por favor intenta de nuevo.';
    }
    if (msg.includes('solicitud')) {
      return 'Error al enviar la solicitud. Por favor intenta de nuevo.';
    }

    return msg || 'Ocurrió un error inesperado. Por favor intenta de nuevo.';
  }
}
