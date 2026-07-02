import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetItinerariosUseCase, ItineraryData } from '../../../../useCase/viajero/itinerarios/GetItinerariosUseCase';
import { CalendarWidgetComponent } from '../../../components/viajero/itinerarios/calendar-widget/calendar-widget.component';
import { TripSummaryComponent } from '../../../components/viajero/itinerarios/trip-summary/trip-summary.component';
import { TimelineEventComponent } from '../../../components/viajero/itinerarios/timeline-event/timeline-event.component';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Share2, Plus, MoreVertical } from 'lucide-angular';

@Component({
  selector: 'app-itinerarios',
  standalone: true,
  imports: [CommonModule, CalendarWidgetComponent, TripSummaryComponent, TimelineEventComponent, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Share2, Plus, MoreVertical })
    }
  ],
  templateUrl: './itinerarios.component.html',
  styleUrl: './itinerarios.component.css'
})
export class ItinerariosComponent implements OnInit {
  private readonly getItinerariosUseCase = inject(GetItinerariosUseCase);
  
  data = signal<ItineraryData | null>(null);

  async ngOnInit() {
    const result = await this.getItinerariosUseCase.execute();
    this.data.set(result);
  }
}
