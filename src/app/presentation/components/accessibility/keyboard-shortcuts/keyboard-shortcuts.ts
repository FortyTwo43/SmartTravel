import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { KeyboardShortcutsService } from '../../../../core/services/keyboard-shortcuts.service';

@Component({
  selector: 'app-keyboard-shortcuts',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './keyboard-shortcuts.html',
  styleUrl: './keyboard-shortcuts.css'
})
export class KeyboardShortcuts {
  shortcutsService = inject(KeyboardShortcutsService);

  shortcuts = [
    { key: 'D', description: 'Ir al Dashboard' },
    { key: 'E', description: 'Explorar Destinos' },
    { key: 'V', description: 'Mis Viajes' },
    { key: 'I', description: 'Itinerarios' },
    { key: 'F', description: 'Favoritos' },
    { key: 'P', description: 'Mi Perfil' },
    { key: 'B', description: 'Enfocar buscador' },
    { key: 'S', description: 'Abrir/cerrar menú' }
  ];
}
