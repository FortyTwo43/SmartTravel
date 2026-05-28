import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.css'
})
export class MetricCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
  @Input() valueColorClass = '';

  @Input({ required: true }) progressPercent!: number;
  @Input({ required: true }) progressColorClass!: string;
  @Input() progressOpacity?: number;
}
