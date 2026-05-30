import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Calendar, MapPin, CheckCircle } from 'lucide-angular';
import { ItineraryItem } from '../../../../../useCase/viajero/dashboard/GetTravelerDashboardUseCase';

@Component({
  selector: 'app-itinerary-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Calendar, MapPin, CheckCircle })
    }
  ],
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.css'
})
export class ItineraryListComponent {
  itineraries = input<ItineraryItem[]>([]);

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
