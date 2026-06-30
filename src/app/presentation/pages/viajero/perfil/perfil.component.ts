import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePersonalDataComponent } from '../../../components/viajero/perfil/profile-personal-data/profile-personal-data.component';
import { ProfilePreferencesComponent } from '../../../components/viajero/perfil/profile-preferences/profile-preferences.component';
import { ProfileSecurityComponent } from '../../../components/viajero/perfil/profile-security/profile-security.component';
import { SupabaseAuthRepository } from '../../../../infrastructure/repositories/supabase/auth/SupabaseAuthRepository';
import { GetPerfilUseCase, UserProfileData } from '../../../../useCase/viajero/perfil/GetPerfilUseCase';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Pencil, Plane } from 'lucide-angular';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ProfilePersonalDataComponent, ProfilePreferencesComponent, ProfileSecurityComponent, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Pencil, Plane })
    }
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  private readonly getPerfilUseCase = inject(GetPerfilUseCase);
  private readonly authRepository = inject(SupabaseAuthRepository);

  data = signal<UserProfileData | null>(null);
  activeTab = signal<string>('personal');
  currentUser = signal<any>(null);

  fullName = computed(() => {
    const user = this.currentUser();
    if (!user) return '';
    return user.user_metadata?.first_name || user.user_metadata?.nombre || user.email?.split('@')[0] || '';
  });
  email = computed(() => this.currentUser()?.email || '');
  phone = computed(() => this.currentUser()?.phone || this.currentUser()?.user_metadata?.telefono || '');

  async ngOnInit() {
    const result = await this.getPerfilUseCase.execute();
    this.data.set(result);

    const { data } = await this.authRepository.getCurrentUser();
    if (data?.user) {
      this.currentUser.set(data.user);
    }
  }

  /** Calcula las iniciales: primero del usuario auth, luego de data().name */
  getInitials(): string {
    const name = this.fullName();
    if (!name) return '?';
    return name.split(' ').map((p: string) => p.charAt(0).toUpperCase()).slice(0, 2).join('');
  }

  setTab(tab: 'datos' | 'preferencias' | 'seguridad') {
    this.activeTab.set(tab);
  }
}
