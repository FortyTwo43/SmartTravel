import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explore-card.component.html',
  styleUrl: './explore-card.component.css'
})
export class ExploreCardComponent {
  imageUrl = input.required<string>();
  title = input.required<string>();
  subtitle = input.required<string>();
}
