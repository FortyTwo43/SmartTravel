import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-personal-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-6 w-full">
      <h3 class="text-xl font-bold mb-4 text-blue-900 flex items-center gap-2">
        <span class="icon-user"></span> Datos personales
      </h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700">Nombre Completo</label>
          <input type="text" class="input-field" [value]="fullName()" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700">Correo Electrónico</label>
          <input type="email" class="input-field" [value]="email()" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1 text-gray-700">Teléfono</label>
          <input type="tel" class="input-field" [value]="phone()" />
        </div>
      </div>
    </div>
  `
})
export class ProfilePersonalDataComponent {
  fullName = input<string>('');
  email = input<string>('');
  phone = input<string>('');
}
