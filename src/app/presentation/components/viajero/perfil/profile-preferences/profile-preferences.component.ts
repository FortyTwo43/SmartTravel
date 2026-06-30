import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileData } from '../../../../../useCase/viajero/perfil/GetPerfilUseCase';

@Component({
  selector: 'app-profile-preferences',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card p-6 w-full">
      <h3 class="text-xl font-bold mb-4 text-blue-900">Preferencias de viaje</h3>
      
      <div class="mb-6">
        <label class="block text-sm font-semibold mb-2 text-gray-700">Intereses</label>
        <div class="flex flex-wrap gap-2">
          @for (interest of data()?.preferences?.interests; track interest) {
            <div class="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-gray-200">
              {{ interest }} <span class="text-gray-400 cursor-pointer hover:text-gray-600">×</span>
            </div>
          }
          <button class="btn-add-chip">+ Añadir</button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700">Idioma</label>
          <select class="input-field bg-white">
            <option>{{ data()?.preferences?.language }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700">Presupuesto base</label>
          <select class="input-field bg-white">
            <option>{{ data()?.preferences?.budget }}</option>
          </select>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .btn-add-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.3rem 0.9rem;
      background: transparent;
      border: 1px dashed #475569;
      border-radius: 20px;
      color: #94a3b8;
      font-size: 0.82rem;
      cursor: pointer;
    }
    .btn-add-chip:hover { border-color: #0ea5e9; color: #0ea5e9; }
  `]
})
export class ProfilePreferencesComponent {
  data = input<UserProfileData | null>(null);
}
