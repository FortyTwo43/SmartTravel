import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Calendar, Users, MapPin } from 'lucide-angular';
import { TripCard } from '../../../../useCase/traveler/dashboard/GetTravelerDashboardUseCase';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Calendar, Users, MapPin })
    }
  ],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  trip = input<TripCard | null>(null);
}
