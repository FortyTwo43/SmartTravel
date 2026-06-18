import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ReservaPorEstado } from '../../../../../domain/ui/proveedor/estadisticas/ReservaPorEstado';
import { TranslateModule } from '@ngx-translate/core';
import {
  getChartTextStyle,
  getChartThemeTokens,
  getDonutLegendConfig,
  getItemTooltipConfig
} from '../chart-theme.utils';

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

  @HostListener('window:resize')
  onResize(): void {
    if (this.data?.length) {
      this.updateChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const tokens = getChartThemeTokens();
    const chartData = this.data.map(d => {
      const nameMap: Record<string, string> = {
        aceptado: 'Aceptadas',
        pendiente: 'Pendientes',
        rechazado: 'Rechazadas',
        completado: 'Finalizadas'
      };

      return {
        name: nameMap[d.estado] || d.estado,
        value: d.cantidad,
        estado: d.estado
      };
    });

    const colorMap: Record<string, string> = {
      aceptado: tokens.secondary,
      pendiente: tokens.tertiary,
      rechazado: tokens.negative,
      completado: tokens.primary
    };

    const colorPalette = chartData.map(item => colorMap[item.estado] || tokens.textMuted);

    this.chartOption = {
      title: {
        text: this.title,
        left: 'center',
        textStyle: {
          ...getChartTextStyle(tokens.textColor),
          fontFamily: tokens.fontHeadline
        }
      },
      tooltip: {
        ...getItemTooltipConfig(false),
        formatter: '{a}<br/>{b}: {c} ({d}%)'
      },
      legend: getDonutLegendConfig(),
      color: colorPalette,
      series: [
        {
          name: this.seriesName,
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: tokens.bgSurface,
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold',
              ...getChartTextStyle(tokens.textColor, 20),
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
