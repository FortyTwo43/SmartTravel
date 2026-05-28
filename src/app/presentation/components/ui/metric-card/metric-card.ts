import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.css'
})
export class MetricCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
  @Input() valueColorClass = '';
  @Input() trend?: string;
  @Input() trendColorClass = '';
  @Input() icon?: string;
  @Input() iconColorClass = '';
  @Input({ required: true }) progressPercent!: number;
  @Input({ required: true }) progressColorClass!: string;
  @Input() progressOpacity?: number;
}
