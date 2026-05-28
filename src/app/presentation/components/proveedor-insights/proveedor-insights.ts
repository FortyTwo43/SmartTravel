import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proveedor-insights.html',
  styleUrl: './proveedor-insights.css'
})
export class ProveedorInsightsComponent {
  interests = ['Gastronomía', 'Aventura', 'Bienestar', 'Cultura', 'Sostenibilidad'];
}
