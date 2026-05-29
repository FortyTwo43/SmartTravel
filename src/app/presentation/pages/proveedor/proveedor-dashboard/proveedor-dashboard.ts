import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorLayoutComponent } from '../../../layouts/proveedor/proveedor-layout/proveedor-layout';
import { ProveedorMetricsComponent } from '../../../components/proveedor/proveedor-metrics/proveedor-metrics';
import { ProveedorChartPlaceholderComponent } from '../../../components/proveedor/proveedor-chart-placeholder/proveedor-chart-placeholder';
import { ProveedorActivityComponent } from '../../../components/proveedor/proveedor-activity/proveedor-activity';
import { ProveedorInsightsComponent } from '../../../components/proveedor/proveedor-insights/proveedor-insights';
import { ProveedorServicesComponent } from '../../../components/proveedor/proveedor-services/proveedor-services';
import { EstablecimientoTuristico } from '../../../../domain/entities/EstablecimientoTuristico';
import { DashboardKpis } from '../../../../domain/dashboard/DashboardKpis';
import { DashboardActividadReciente } from '../../../../domain/dashboard/DashboardActividadReciente';
import { DashboardServicioMasDemandado } from '../../../../domain/dashboard/DashboardServicioMasDemandado';
import { DashboardTipoViaje } from '../../../../domain/dashboard/DashboardTipoViaje';
import { DashboardGraph } from '../../../../domain/dashboard/DashboardGraph';
import { LoadDashboardKpisUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardKpisUseCase';
import { LoadActividadRecienteUseCase } from '../../../../useCase/proveedor/dashboard/LoadActividadRecienteUseCase';
import { LoadDashboardServiciosMasDemandadosUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardServiciosMasDemandadosUseCase';
import { LoadDashboardTipoViajeUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardTipoViaje';
import { LoadDashboardGraphUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardGraphuseCase';
import { LoadDashboardDataUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardDataUseCase';

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
  private readonly loadServiciosMasDemandadosUseCase = inject(LoadDashboardServiciosMasDemandadosUseCase);
  private readonly loadTipoViajeUseCase = inject(LoadDashboardTipoViajeUseCase);
  private readonly loadDashboardGraphUseCase = inject(LoadDashboardGraphUseCase);
  private readonly loadDashboardDataUseCase = inject(LoadDashboardDataUseCase);

  establecimiento = signal<EstablecimientoTuristico | null>(null);

  kpisData = signal<DashboardKpis | null>(null);

  tipoViajeData = signal<DashboardTipoViaje | null>(null);

  activityData = signal<DashboardActividadReciente[]>([]);

  servicesData = signal<DashboardServicioMasDemandado[]>([]);

  graphData = signal<DashboardGraph[]>([]);

  async ngOnInit() {
    try {
      const est = await this.loadDashboardDataUseCase.execute();
      this.establecimiento.set(est);

      const idProveedor = est.id_proveedor;

      const [kpis, actividad, servicios, tipoViaje, graph] = await Promise.all([
        this.loadDashboardKpisUseCase.execute(idProveedor),
        this.loadActividadRecienteUseCase.execute(idProveedor),
        this.loadServiciosMasDemandadosUseCase.execute(idProveedor),
        this.loadTipoViajeUseCase.execute(idProveedor),
        this.loadDashboardGraphUseCase.execute(idProveedor)
      ]);
      this.kpisData.set(kpis);
      this.activityData.set(actividad);
      this.servicesData.set(servicios);
      this.tipoViajeData.set(tipoViaje);
      this.graphData.set(graph);
    } catch (error) {
      console.error('Error loading Dashboard data:', error);
    }
  }
}
