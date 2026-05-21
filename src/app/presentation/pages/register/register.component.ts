import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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

type Role = 'traveler' | 'provider';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, LucideAngularModule],
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
  selectedRole = signal<Role>('traveler');

  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);

  selectRole(role: Role) {
    this.selectedRole.set(role);
  }

  togglePasswordVisibility() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible.set(!this.confirmPasswordVisible());
  }
}
