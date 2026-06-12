import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EstadisticasProveedorUseCase } from '../../../../application/usecases/proveedor/estadisticas.usecase';
import { LoadDashboardDataUseCase } from '../../../../useCase/proveedor/dashboard/LoadDashboardDataUseCase';

import { IngresoPeriodo } from '../../../../domain/ui/proveedor/estadisticas/IngresoPeriodo';
import { ReservaPeriodo } from '../../../../domain/ui/proveedor/estadisticas/ReservaPeriodo';
import { ServicioMasReservado } from '../../../../domain/ui/proveedor/estadisticas/ServicioMasReservado';
import { IngresoPorServicio } from '../../../../domain/ui/proveedor/estadisticas/IngresoPorServicio';
import { ReservaPorEstado } from '../../../../domain/ui/proveedor/estadisticas/ReservaPorEstado';

import { IngresosLineChartComponent } from '../../../components/proveedor/estadistica/ingresos-line-chart/ingresos-line-chart';
import { ReservasBarChartComponent } from '../../../components/proveedor/estadistica/reservas-bar-chart/reservas-bar-chart';
import { TopServiciosBarChartComponent } from '../../../components/proveedor/estadistica/top-servicios-bar-chart/top-servicios-bar-chart';
import { IngresosPieChartComponent } from '../../../components/proveedor/estadistica/ingresos-pie-chart/ingresos-pie-chart';
import { ReservasStatusDonutChartComponent } from '../../../components/proveedor/estadistica/reservas-status-donut-chart/reservas-status-donut-chart';

@Component({
  selector: 'app-proveedor-estadisticas',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule,
    IngresosLineChartComponent,
    ReservasBarChartComponent,
    TopServiciosBarChartComponent,
    IngresosPieChartComponent,
    ReservasStatusDonutChartComponent
  ],
  templateUrl: './proveedor-estadisticas.component.html',
  styleUrls: ['./proveedor-estadisticas.component.css']
})
export class ProveedorEstadisticasComponent implements OnInit {
  private estadisticasUseCase = inject(EstadisticasProveedorUseCase);
  private loadDashboardDataUseCase = inject(LoadDashboardDataUseCase);
  private translate = inject(TranslateService);

  ingresosPorPeriodo = signal<IngresoPeriodo[]>([]);
  reservasRealizadas = signal<ReservaPeriodo[]>([]);
  topServicios = signal<ServicioMasReservado[]>([]);
  distribucionIngresos = signal<IngresoPorServicio[]>([]);
  reservasPorEstado = signal<ReservaPorEstado[]>([]);
  
  periodoSeleccionado = signal<'dia' | 'semana' | 'mes'>('mes');
  isLoading = signal(true);

  async ngOnInit() {
    await this.cargarEstadisticas();
  }

  async cargarEstadisticas() {
    try {
      this.isLoading.set(true);
      const est = await this.loadDashboardDataUseCase.execute();
      
      if (!est) {
        console.error('No se encontro el establecimiento del proveedor');
        return;
      }
      
      const idEstablecimiento = est.id;
      const periodo = this.periodoSeleccionado();

      const [ingresos, reservas, top, dist, estados] = await Promise.all([
        this.estadisticasUseCase.getIngresosPorPeriodo(idEstablecimiento, periodo),
        this.estadisticasUseCase.getReservasRealizadas(idEstablecimiento, periodo),
        this.estadisticasUseCase.getTopServicios(idEstablecimiento),
        this.estadisticasUseCase.getDistribucionIngresos(idEstablecimiento),
        this.estadisticasUseCase.getReservasPorEstado(idEstablecimiento)
      ]);

      this.ingresosPorPeriodo.set(ingresos);
      this.reservasRealizadas.set(reservas);
      this.topServicios.set(top);
      this.distribucionIngresos.set(dist);
      this.reservasPorEstado.set(estados);
      
    } catch (error) {
      console.error('Error cargando estadisticas:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async cambiarPeriodo(nuevoPeriodo: 'dia' | 'semana' | 'mes') {
    this.periodoSeleccionado.set(nuevoPeriodo);
    await this.cargarEstadisticas();
  }
}
