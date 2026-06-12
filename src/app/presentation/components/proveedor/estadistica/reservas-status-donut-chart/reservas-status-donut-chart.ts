import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ReservaPorEstado } from '../../../../../domain/ui/proveedor/estadisticas/ReservaPorEstado';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reservas-status-donut-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TranslateModule],
  templateUrl: './reservas-status-donut-chart.html',
  styleUrls: ['../ingresos-line-chart/ingresos-line-chart.css']
})
export class ReservasStatusDonutChartComponent implements OnChanges {
  @Input() data: ReservaPorEstado[] = [];
  @Input() title: string = '';
  @Input() seriesName: string = 'Reservas';

  chartOption: EChartsOption = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  private updateChart() {
    const chartData = this.data.map(d => {
      // Traducir estado a su nombre para UI
      const nameMap: Record<string, string> = {
        'aceptado': 'Aceptadas',
        'pendiente': 'Pendientes',
        'rechazado': 'Rechazadas',
        'completado': 'Finalizadas'
      };
      
      return {
        name: nameMap[d.estado] || d.estado,
        value: d.cantidad,
        estado: d.estado
      };
    });

    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-main').trim() || '#1f2937';
    
    // Asignar colores por estado (verde para aceptado, amarillo pendiente, rojo rechazado)
    const colorMap: Record<string, string> = {
      'aceptado': getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#10b981',
      'pendiente': getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#f59e0b',
      'rechazado': getComputedStyle(document.documentElement).getPropertyValue('--color-alert').trim() || '#ef4444',
      'completado': getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3b82f6',
    };

    const colorPalette = chartData.map(item => colorMap[item.estado] || '#9ca3af');

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
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        top: 'bottom',
        textStyle: { color: textColor }
      },
      color: colorPalette,
      series: [
        {
          name: this.seriesName,
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'var(--bg-card)',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              color: textColor,
              textBorderWidth: 0,
              textShadowColor: 'transparent'
            }
          },
          labelLine: {
            show: false
          },
          data: chartData
        }
      ]
    };
  }
}
