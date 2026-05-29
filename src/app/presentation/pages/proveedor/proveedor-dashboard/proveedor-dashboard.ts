import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorLayoutComponent } from '../../../layouts/proveedor/proveedor-layout/proveedor-layout';
import { ProveedorMetricsComponent } from '../../../components/proveedor/proveedor-metrics/proveedor-metrics';
import { ProveedorChartPlaceholderComponent } from '../../../components/proveedor/proveedor-chart-placeholder/proveedor-chart-placeholder';
import { ProveedorActivityComponent } from '../../../components/proveedor/proveedor-activity/proveedor-activity';
import { ProveedorInsightsComponent, TravelTypeStat } from '../../../components/proveedor/proveedor-insights/proveedor-insights';
import { ProveedorServicesComponent } from '../../../components/proveedor/proveedor-services/proveedor-services';
import { EstablecimientoTuristico } from '../../../../domain/entities/EstablecimientoTuristico';
import { DashboardKpis } from '../../../../domain/dashboard/DashboardKpis';
import { DashboardActividadReciente } from '../../../../domain/dashboard/DashboardActividadReciente';
import { LoadDashboardKpisUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardKpisUseCase';
import { LoadActividadRecienteUseCase } from '../../../../useCase/proveedor/dashboard/LoadActividadRecienteUseCase';

@Component({
  selector: 'app-proveedor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProveedorLayoutComponent,
    ProveedorMetricsComponent,
    ProveedorChartPlaceholderComponent,
    ProveedorActivityComponent,
    ProveedorInsightsComponent,
    ProveedorServicesComponent
  ],
  templateUrl: './proveedor-dashboard.html',
  styleUrl: './proveedor-dashboard.css'
})
export class ProveedorDashboardComponent implements OnInit {
  private readonly loadDashboardKpisUseCase = inject(LoadDashboardKpisUseCase);
  private readonly loadActividadRecienteUseCase = inject(LoadActividadRecienteUseCase);

  establecimiento: EstablecimientoTuristico = {
    id: '1',
    id_proveedor: '0a019e93-a3d9-4865-a073-cb720ae9ee3a',
    id_destino: 'd1',
    nombre: 'Grand Horizon Resort & Spa',
    tipo: 'hotel',
    descripcion: 'Resort de lujo',
    estado: 'activo'
  };

  kpisData = signal<DashboardKpis | null>(null);

  insightsTravelStats: TravelTypeStat[] = [
    { label: 'PROVIDER_DASHBOARD.INSIGHTS.TRAVEL_TYPES.COUPLE', percentage: 54, textColorClass: 'text-primary', bgColorClass: 'bg-primary' },
    { label: 'PROVIDER_DASHBOARD.INSIGHTS.TRAVEL_TYPES.FAMILY', percentage: 32, textColorClass: 'text-secondary', bgColorClass: 'bg-secondary' },
    { label: 'PROVIDER_DASHBOARD.INSIGHTS.TRAVEL_TYPES.FRIENDS', percentage: 10, textColorClass: 'text-tertiary', bgColorClass: 'bg-tertiary' },
    { label: 'PROVIDER_DASHBOARD.INSIGHTS.TRAVEL_TYPES.SOLO', percentage: 4, textColorClass: 'text-muted', bgColorClass: 'bg-muted' }
  ];
  insightsInterests = [
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.GASTRONOMY',
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.ADVENTURE',
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.WELLNESS',
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.CULTURE',
    'PROVIDER_DASHBOARD.INSIGHTS.INTERESTS.SUSTAINABILITY'
  ];

  activityData = signal<DashboardActividadReciente[]>([]);

  servicesData = [
    { title: 'Skyline Infinity Pool Access', desc: 'Acceso exclusivo al 24º piso.', res: 482, status: 'OPERATIVO', statusClass: 'status-green' },
    { title: 'Balinese Massage Journey', desc: 'Tratamiento integral de 120 min.', res: 324, status: 'OPERATIVO', statusClass: 'status-green' },
    { title: 'Tasting Menu "Solaris"', desc: '6 tiempos con maridaje.', res: 891, status: 'ALTA DEMANDA', statusClass: 'status-amber' },
    { title: 'Helicopter Island Tour', desc: 'Sobrevuelo de 45 minutos.', res: 128, status: 'OPERATIVO', statusClass: 'status-green' }
  ];

  async ngOnInit() {
    try {
      const [kpis, actividad] = await Promise.all([
        this.loadDashboardKpisUseCase.execute(this.establecimiento.id_proveedor),
        this.loadActividadRecienteUseCase.execute(this.establecimiento.id_proveedor)
      ]);
      this.kpisData.set(kpis);
      this.activityData.set(actividad);
    } catch (error) {
      console.error('Error loading Dashboard data:', error);
    }
  }
}
