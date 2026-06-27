import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ExploreDestination } from '../../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';
import { DestinationCardComponent } from '../destination-card/destination-card.component';

@Component({
  selector: 'app-destination-grid',
  standalone: true,
  imports: [CommonModule, DestinationCardComponent, TranslateModule],
  templateUrl: './destination-grid.component.html',
  styleUrl: './destination-grid.component.css'
})
export class DestinationGridComponent {
  destinos = input<ReadonlyArray<ExploreDestination> | null>(null);
}
