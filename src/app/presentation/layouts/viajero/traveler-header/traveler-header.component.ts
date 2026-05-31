import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedTravelerDataService } from '../../../service/shared/shared-traveler-data.service';

@Component({
  selector: 'app-traveler-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './traveler-header.component.html',
  styleUrl: './traveler-header.component.css'
})
export class TravelerHeaderComponent {
  private sharedTravelerData = inject(SharedTravelerDataService);
  protected dashboardData = this.sharedTravelerData.dashboardData;

  getUserName(): string {
    return this.sharedTravelerData.getUserName();
  }
}
