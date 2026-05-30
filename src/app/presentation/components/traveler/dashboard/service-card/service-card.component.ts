import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Briefcase } from 'lucide-angular';
import { ServiceCard } from '../../../../../useCase/traveler/dashboard/GetTravelerDashboardUseCase';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Briefcase })
    }
  ],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  service = input<ServiceCard | null>(null);
}
