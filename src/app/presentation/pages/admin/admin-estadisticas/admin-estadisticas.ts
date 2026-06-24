import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, BarChart3, CalendarCheck, MapPin, RefreshCw, Users } from 'lucide-angular';
import { AdminStatChartComponent } from '../../../components/admin/estadisticas/admin-stat-chart/admin-stat-chart';
import { GetAdminEstadisticasUseCase } from '../../../../useCase/admin/estadisticas/GetAdminEstadisticasUseCase';
import {
  AdminEstadisticasData,
  AdminPeriodo,
  AdminStatPoint,
  AdminTemporalSeries
} from '../../../../domain/ui/admin/estadisticas/AdminEstadisticas';

@Component({
  selector: 'app-admin-estadisticas',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, AdminStatChartComponent],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ BarChart3, CalendarCheck, MapPin, RefreshCw, Users })
  }],
  templateUrl: './admin-estadisticas.html',
  styleUrl: './admin-estadisticas.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEstadisticasComponent implements OnInit {
  private readonly getEstadisticasUseCase = inject(GetAdminEstadisticasUseCase);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageVersion = signal(0);

  data = signal<AdminEstadisticasData | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);
  periodoUsuarios = signal<AdminPeriodo>('mes');

  crecimientoUsuarios = computed(() => this.translatePoints(this.data()?.crecimientoUsuarios[this.periodoUsuarios()] ?? []));
  distribucionUsuarios = computed(() => this.translatePoints(this.data()?.distribucionUsuarios ?? []));
  destinosMasPopulares = computed(() => this.translatePoints(this.data()?.destinosMasPopulares ?? []));
  tiposExperienciaMasReservados = computed(() => this.translatePoints(this.data()?.tiposExperienciaMasReservados ?? []));
  reservasPorDia = computed(() => this.translatePoints(this.data()?.reservasPorDia ?? []));
  reservasPorMes = computed(() => this.translatePoints(this.data()?.reservasPorMes ?? []));
  reservasPorEstado = computed(() => this.translatePoints(this.data()?.reservasPorEstado ?? []));
  solicitudesProveedorPorEstado = computed(() => this.translatePoints(this.data()?.solicitudesProveedorPorEstado ?? []));
  solicitudesProveedorTemporal = computed(() => this.translateTemporalSeries(this.data()?.solicitudesProveedorTemporal ?? []));

  totalUsuarios = computed(() => this.sumValues(this.data()?.distribucionUsuarios ?? []));
  totalReservas = computed(() => this.sumValues(this.data()?.reservasPorEstado ?? []));
  totalSolicitudes = computed(() => this.sumValues(this.data()?.solicitudesProveedorPorEstado ?? []));
  totalDestinosReservados = computed(() => this.sumValues(this.data()?.destinosMasPopulares ?? []));

  constructor() {
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.languageVersion.update(version => version + 1));
  }

  ngOnInit(): void {
    void this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const stats = await this.getEstadisticasUseCase.execute();
      this.data.set(stats);
    } catch (error) {
      console.error('Error cargando estadisticas de administrador:', error);
      this.error.set('ADMIN_STATISTICS.ERROR');
    } finally {
      this.isLoading.set(false);
    }
  }

  changePeriodoUsuarios(periodo: AdminPeriodo): void {
    this.periodoUsuarios.set(periodo);
  }

  private sumValues(items: { value: number }[]): number {
    return items.reduce((total, item) => total + item.value, 0);
  }

  private translatePoints(points: AdminStatPoint[]): AdminStatPoint[] {
    this.languageVersion();

    return points.map(point => ({
      ...point,
      label: this.translateLabel(point.label)
    }));
  }

  private translateTemporalSeries(series: AdminTemporalSeries[]): AdminTemporalSeries[] {
    this.languageVersion();

    return series.map(item => ({
      name: this.translateLabel(item.name),
      points: this.translatePoints(item.points)
    }));
  }

  private translateLabel(label: string): string {
    const translated = this.translate.instant(label);

    return translated === label ? label : translated;
  }
}
