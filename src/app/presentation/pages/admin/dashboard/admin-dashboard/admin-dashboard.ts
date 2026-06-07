import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAdminDashboardStatsUseCase, AdminDashboardData } from '../../../../../useCase/admin/dashboard/GetAdminDashboardStatsUseCase';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, Users, Store, Building2, CalendarCheck, Clock, PackagePlus } from 'lucide-angular';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Users, Store, Building2, CalendarCheck, Clock, PackagePlus })
  }],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  private readonly getDashboardStats = inject(GetAdminDashboardStatsUseCase);
  
  data = signal<AdminDashboardData | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const stats = await this.getDashboardStats.execute();
      this.data.set(stats);
    } catch (e) {
      this.error.set('Error al cargar los datos del dashboard.');
      console.error(e);
    } finally {
      this.isLoading.set(false);
    }
  }
}
