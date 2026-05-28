import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface TravelTypeStat {
  label: string;
  percentage: number;
  textColorClass: string;
  bgColorClass: string;
}

@Component({
  selector: 'app-proveedor-insights',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './proveedor-insights.html',
  styleUrl: './proveedor-insights.css'
})
export class ProveedorInsightsComponent {
  @Input() travelStats: TravelTypeStat[] = [];
  @Input() interests: string[] = [];
}
