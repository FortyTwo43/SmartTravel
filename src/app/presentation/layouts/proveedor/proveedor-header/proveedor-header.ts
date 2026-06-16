import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Star, Calendar, ChevronDown, Bell, Menu } from 'lucide-angular';
import { SharedEstablishmentService } from '../../../service/shared/shared-establishment.service';

@Component({
  selector: 'app-proveedor-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Star, Calendar, ChevronDown, Bell, Menu })
  }],
  templateUrl: './proveedor-header.html',
  styleUrl: './proveedor-header.css'
})
export class ProveedorHeaderComponent {
  private sharedEstablishment = inject(SharedEstablishmentService);
  protected establishment = this.sharedEstablishment.establishment;
  
  toggleSidebar = output<void>();
}
