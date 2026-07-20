import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-summary.component.html',
  styleUrl: './trip-summary.component.css'
})
export class TripSummaryComponent {
  summary = input<any>(null);
}
