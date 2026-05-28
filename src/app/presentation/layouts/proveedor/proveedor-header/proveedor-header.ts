import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Star, Calendar, ChevronDown, Bell } from 'lucide-angular';

@Component({
  selector: 'app-proveedor-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Star, Calendar, ChevronDown, Bell })
  }],
  templateUrl: './proveedor-header.html',
  styleUrl: './proveedor-header.css'
})
export class ProveedorHeaderComponent {
  @Input() nombre: string = '';
  @Input() tipo: string = '';
}
