import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DestinationCard } from '../../../../../useCase/viajero/dashboard/GetTravelerDashboardUseCase';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './destination-card.component.html',
  styleUrl: './destination-card.component.css'
})
export class DestinationCardComponent {
  destination = input<DestinationCard | null>(null);
}
