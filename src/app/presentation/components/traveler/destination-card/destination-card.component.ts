import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Star, MapPin } from 'lucide-angular';
import { DestinationCard } from '../../../../useCase/traveler/dashboard/GetTravelerDashboardUseCase';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Star, MapPin })
    }
  ],
  templateUrl: './destination-card.component.html',
  styleUrl: './destination-card.component.css'
})
export class DestinationCardComponent {
  destination = input<DestinationCard | null>(null);

  getStarArray(): number[] {
    return Array(5).fill(0);
  }

  isStarFilled(index: number): boolean {
    return index < (this.destination()?.rating || 0);
  }
}
