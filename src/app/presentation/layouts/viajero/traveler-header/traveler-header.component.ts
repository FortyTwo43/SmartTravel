import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedTravelerDataService } from '../../../service/shared/shared-traveler-data.service';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Menu } from 'lucide-angular';

@Component({
  selector: 'app-traveler-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Menu })
  }],
  templateUrl: './traveler-header.component.html',
  styleUrl: './traveler-header.component.css'
})
export class TravelerHeaderComponent {
  private sharedTravelerData = inject(SharedTravelerDataService);
  protected dashboardData = this.sharedTravelerData.dashboardData;

  toggleSidebar = output<void>();

  getUserName(): string {
    return this.sharedTravelerData.getUserName();
  }
}

