import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-proveedor-activity',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './proveedor-activity.html',
  styleUrl: './proveedor-activity.css'
})
export class ProveedorActivityComponent {
  @Input() activities: any[] = [];
}
