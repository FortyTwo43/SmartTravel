import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { IngresoPorServicio } from '../../../../../domain/ui/proveedor/estadisticas/IngresoPorServicio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ingresos-pie-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TranslateModule],
  templateUrl: './ingresos-pie-chart.html',
  styleUrls: ['../ingresos-line-chart/ingresos-line-chart.css']
})
export class IngresosPieChartComponent implements OnChanges {
  @Input() data: IngresoPorServicio[] = [];
  @Input() title: string = '';
  @Input() seriesName: string = 'Ingresos';

  chartOption: EChartsOption = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  private updateChart() {
    const chartData = this.data.map(d => ({
      name: d.nombre_servicio,
      value: d.total_ingresos
    }));

    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-main').trim() || '#1f2937';
    // Colores para el pie chart: primario, secundario, acento, alerta y un color extra
    const colorPalette = [
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3b82f6',
      getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#10b981',
      getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#f59e0b',
      getComputedStyle(document.documentElement).getPropertyValue('--color-alert').trim() || '#ef4444',
      '#8b5cf6', '#06b6d4'
    ];

    this.chartOption = {
      title: {
        text: this.title,
        left: 'center',
        textStyle: {
          color: textColor,
          fontFamily: 'var(--font-headline)'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: ${c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: { color: textColor },
        top: 'middle'
      },
      color: colorPalette,
      series: [
        {
          name: this.seriesName,
          type: 'pie',
          radius: '50%',
          data: chartData,
          label: {
            color: textColor,
            textBorderWidth: 0,
            textShadowColor: 'transparent'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
