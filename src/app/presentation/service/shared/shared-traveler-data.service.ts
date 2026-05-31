import { Injectable, signal } from '@angular/core';
import { DashboardData } from '../../../domain/ui/viajero/dashboard/DashboardData';

@Injectable({ providedIn: 'root' })
export class SharedTravelerDataService {
  dashboardData = signal<DashboardData | null>(null);

  setDashboardData(data: DashboardData | null): void {
    this.dashboardData.set(data);
  }

  getUserName(): string {
    return this.dashboardData()?.userName || 'Viajero';
  }
}
