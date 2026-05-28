import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TravelTypeStat {
  label: string;
  percentage: number;
  textColorClass: string;
  bgColorClass: string;
}

@Component({
  selector: 'app-proveedor-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proveedor-insights.html',
  styleUrl: './proveedor-insights.css'
})
export class ProveedorInsightsComponent {
  @Input() travelStats: TravelTypeStat[] = [];
  @Input() interests: string[] = [];
}
