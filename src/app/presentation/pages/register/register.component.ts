import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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

type Role = 'viajero' | 'proveedor';

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
  private readonly translateService = inject(TranslateService);

  selectedRole = signal<Role>('viajero');

  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);

  // Validaciones en tiempo real
  get emailInvalid(): boolean {
    return this.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  get passwordInvalid(): boolean {
    return this.password.length > 0 && this.password.length < 8;
  }

  get passwordsMismatch(): boolean {
    return this.confirmPassword.length > 0 && this.password !== this.confirmPassword;
  }

  get phoneInvalid(): boolean {
    return this.telefono.length > 0 && !/^\d{10}$/.test(this.telefono);
  }

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
  tipo_negocio: '' | 'restaurante' | 'hotel' | 'tour' = '';
  telefono = '';
  ubicacion = '';
  descripcion = '';
  selectedFile: File | null = null;
  isDragging = signal(false);

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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
    event.target.value = '';
  }

  private handleFile(file: File) {
    const allowed = ['application/pdf', 'image/png', 'image/jpeg'];
    if (!allowed.includes(file.type)) {
      this.errorMessage.set('Archivo no permitido. Solo PDF, PNG o JPEG.');
      this.selectedFile = null;
      return;
    }
    
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      this.errorMessage.set('El archivo supera el tamaño máximo de 5MB.');
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.errorMessage.set(null);
  }

  removeFile() {
    this.selectedFile = null;
  }

  async onSubmit() {
    // Validaciones básicas
    if (!this.nombre.trim() || !this.apellido.trim() || !this.email.trim() || !this.password) {
      this.errorMessage.set(this.translateService.instant('REGISTER.ERROR_REQUIRED_FIELDS'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errorMessage.set(this.translateService.instant('REGISTER.ERROR_INVALID_EMAIL_FORMAT'));
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set(this.translateService.instant('REGISTER.ERROR_PASSWORD_MISMATCH'));
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage.set(this.translateService.instant('REGISTER.ERROR_MIN_LENGTH_8'));
      return;
    }

    if (this.selectedRole() === 'proveedor') {
      if (!this.nombre_negocio.trim() || !this.telefono.trim() || !this.descripcion.trim() || !this.ubicacion.trim()) {
        this.errorMessage.set(this.translateService.instant('REGISTER.ERROR_BUSINESS_FIELDS'));
        return;
      }
      if (!/^\d{10}$/.test(this.telefono)) {
        this.errorMessage.set(this.translateService.instant('REGISTER.ERROR_PHONE_10_DIGITS'));
        return;
      }
      if (!this.selectedFile) {
        this.errorMessage.set(this.translateService.instant('REGISTER.ERROR_DOCUMENT_REQUIRED'));
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
        tipo_negocio: this.tipo_negocio as 'restaurante' | 'hotel' | 'tour',
        telefono: this.telefono.trim(),
        descripcion: this.descripcion.trim(),
        ubicacion: this.ubicacion.trim(),
        documento: this.selectedFile || undefined,
      };

      const result = await this.registerUseCase.execute(request);

      if (result.role === 'proveedor') {
        // Proveedor: mostrar mensaje y redirigir al login
        this.successMessage.set(result.message ?? 'Solicitud enviada correctamente.');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else if (result.message) {
        // Viajero con mensaje: mostrar y redirigir al login
        this.successMessage.set(result.message);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        // Viajero sin mensaje: ir al home (login automático)
        this.router.navigate(['/home']);
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
      return this.translateService.instant('REGISTER.ERROR_EMAIL_EXISTS');
    }
    if (msg.includes('Invalid email')) {
      return this.translateService.instant('REGISTER.ERROR_INVALID_EMAIL');
    }
    if (msg.includes('Password')) {
      return this.translateService.instant('REGISTER.ERROR_WEAK_PASSWORD');
    }
    if (msg.includes('perfil')) {
      return this.translateService.instant('REGISTER.ERROR_CREATE_PROFILE');
    }
    if (msg.includes('solicitud')) {
      return this.translateService.instant('REGISTER.ERROR_SUBMIT_REQUEST');
    }

    return msg || this.translateService.instant('REGISTER.ERROR_UNEXPECTED');
  }
}
