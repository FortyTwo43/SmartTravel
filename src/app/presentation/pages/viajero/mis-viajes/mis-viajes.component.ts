import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetMisViajesUseCase, MisViajesData } from '../../../../useCase/viajero/mis-viajes/GetMisViajesUseCase';
import { UpcomingBookingCardComponent } from '../../../components/viajero/mis-viajes/upcoming-booking-card/upcoming-booking-card.component';
import { HistoryBookingCardComponent } from '../../../components/viajero/mis-viajes/history-booking-card/history-booking-card.component';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, CalendarClock, History } from 'lucide-angular';

@Component({
  selector: 'app-mis-viajes',
  standalone: true,
  imports: [CommonModule, UpcomingBookingCardComponent, HistoryBookingCardComponent, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ CalendarClock, History })
    }
  ],
  templateUrl: './mis-viajes.component.html',
  styleUrl: './mis-viajes.component.css'
})
export class MisViajesComponent implements OnInit {
  private readonly getMisViajesUseCase = inject(GetMisViajesUseCase);
  
  data = signal<MisViajesData | null>(null);
  
  async ngOnInit() {
    const result = await this.getMisViajesUseCase.execute();
    this.data.set(result);
  }
}
