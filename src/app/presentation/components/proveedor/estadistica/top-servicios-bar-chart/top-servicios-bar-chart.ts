import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ServicioMasReservado } from '../../../../../domain/ui/proveedor/estadisticas/ServicioMasReservado';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-top-servicios-bar-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TranslateModule],
  templateUrl: './top-servicios-bar-chart.html',
  styleUrls: ['../ingresos-line-chart/ingresos-line-chart.css'] // Reusing styles
})
export class TopServiciosBarChartComponent implements OnChanges {
  @Input() data: ServicioMasReservado[] = [];
  @Input() title: string = '';
  @Input() seriesName: string = 'Reservas';

  chartOption: EChartsOption = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  private updateChart() {
    const names = this.data.map(d => d.nombre_servicio).reverse();
    const values = this.data.map(d => d.cantidad_reservas).reverse();

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#f59e0b';
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-main').trim() || '#1f2937';

    this.chartOption = {
      title: {
        text: this.title,
        textStyle: {
          color: textColor,
          fontFamily: 'var(--font-headline)'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'value',
        axisLabel: { color: textColor }
      },
      yAxis: {
        type: 'category',
        data: names,
        axisLabel: { color: textColor }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [
        {
          name: this.seriesName,
          data: values,
          type: 'bar',
          itemStyle: {
            color: accentColor,
            borderRadius: [0, 4, 4, 0]
          }
        }
      ]
    };
  }
}
