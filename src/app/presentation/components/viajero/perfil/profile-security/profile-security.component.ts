import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ChevronRight } from 'lucide-angular';
import { UserProfileData } from '../../../../../useCase/viajero/perfil/GetPerfilUseCase';

@Component({
  selector: 'app-profile-security',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronRight })
    }
  ],
  template: `
    <div class="flex flex-col gap-6">
      <div class="card p-6 w-full">
        <h3 class="text-xl font-bold mb-4 text-blue-900">Seguridad</h3>
        
        <div class="space-y-3">
          <button class="security-item-btn">
            <span>Cambiar contraseña</span>
            <lucide-icon name="chevron-right" size="18" aria-hidden="true"></lucide-icon>
          </button>
          <button class="security-item-btn">
            <span>Configuración de Privacidad</span>
            <lucide-icon name="chevron-right" size="18" aria-hidden="true"></lucide-icon>
          </button>
        </div>
        
        @if (!data()?.security?.twoFactorEnabled) {
          <div class="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
            Autenticación de dos pasos (2FA) desactivada. <br/>
            <a href="#" class="font-semibold underline">Activar ahora</a>
          </div>
        }
      </div>

      <div class="appearance-card">
        <h3 class="security-title">Apariencia</h3>

        <div class="setting-row">
          <div class="setting-text">
            <span class="setting-label">Modo Oscuro</span>
            <span class="setting-desc">Ahorra batería y reduce la fatiga visual</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" [checked]="data()?.appearance?.darkMode" />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="setting-row">
          <div class="setting-text">
            <span class="setting-label">Notificaciones Push</span>
            <span class="setting-desc">Alertas de cambios en tus vuelos</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" [checked]="data()?.appearance?.pushNotifications" />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .security-item-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0.85rem 1.1rem;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      color: #f1f5f9;
      font-size: 0.9rem;
      cursor: pointer;
      margin-bottom: 0.75rem;
      transition: border-color 0.2s, background 0.2s;
    }
    .security-item-btn:hover {
      border-color: #0ea5e9;
      background: #1e293b;
    }
    .security-item-btn lucide-icon {
      color: #64748b;
      width: 18px !important;
      height: 18px !important;
    }
    .appearance-card {
      background: #1e293b;
      border-radius: 12px;
      padding: 1.25rem;
      margin-top: 1.25rem;
    }
    .security-title {
      font-size: 1rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0 0 1rem;
    }
    .setting-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.85rem 0;
      border-bottom: 1px solid #334155;
    }
    .setting-row:last-child { border-bottom: none; }
    .setting-text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .setting-label {
      font-size: 0.92rem;
      font-weight: 600;
      color: #f1f5f9;
    }
    .setting-desc {
      font-size: 0.8rem;
      color: #64748b;
    }
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
      flex-shrink: 0;
    }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .toggle-slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: #334155;
      border-radius: 24px;
      transition: 0.2s;
    }
    .toggle-slider::before {
      content: '';
      position: absolute;
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background: white;
      border-radius: 50%;
      transition: 0.2s;
    }
    .toggle-switch input:checked + .toggle-slider { background: #0ea5e9; }
    .toggle-switch input:checked + .toggle-slider::before { transform: translateX(20px); }
  `]
})
export class ProfileSecurityComponent {
  data = input<UserProfileData | null>(null);
}
