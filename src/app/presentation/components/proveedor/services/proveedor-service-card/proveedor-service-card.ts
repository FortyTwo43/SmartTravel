import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Edit2, Power, Trash2 } from 'lucide-angular';
import { ProveedorServiceItem } from '../../../../../domain/ui/proveedor/services/ProveedorServiceItem';

@Component({
  selector: 'app-proveedor-service-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Edit2, Power, Trash2 })
  }],
  templateUrl: './proveedor-service-card.html',
  styleUrl: './proveedor-service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProveedorServiceCardComponent {
  service = input.required<ProveedorServiceItem>();
  availabilityChanged = output<boolean>();

  get amenities(): string[] {
    const value = this.service().comodidadesAdicionales;
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  get truncatedDescription(): string {
    const desc = this.service().descripcion;
    if (desc.length <= 270) return desc;

    const slice = desc.slice(0, 270);
    const lastSpace = slice.lastIndexOf(' ');
    const cutAt = lastSpace > 0 ? lastSpace : 270;
    return desc.slice(0, cutAt) + '...';
  }

  toggleAvailability(): void {
    this.availabilityChanged.emit(!this.service().disponibilidad);
  }

  deleteService(): void {
    void 0;
  }
}
