import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ServicioMasReservado } from '../../../../../domain/ui/proveedor/estadisticas/ServicioMasReservado';
import { TranslateModule } from '@ngx-translate/core';
import {
  getAxisLineStyle,
  getAxisTooltipConfig,
  getChartTextStyle,
  getChartThemeTokens
} from '../chart-theme.utils';

@Component({
  selector: 'app-top-servicios-bar-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TranslateModule],
  templateUrl: './top-servicios-bar-chart.html',
  styleUrls: ['../ingresos-line-chart/ingresos-line-chart.css']
})
export class TopServiciosBarChartComponent implements OnChanges {
  @Input() data: ServicioMasReservado[] = [];
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
    const names = this.data.map(d => d.nombre_servicio).reverse();
    const values = this.data.map(d => d.cantidad_reservas).reverse();
    const axisLabelStyle = getChartTextStyle(tokens.textColor);

    this.chartOption = {
      title: {
        text: this.title,
        textStyle: {
          ...getChartTextStyle(tokens.textColor),
          fontFamily: tokens.fontHeadline
        }
      },
      tooltip: {
        ...getAxisTooltipConfig(),
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'value',
        axisLabel: axisLabelStyle,
        axisLine: getAxisLineStyle(),
        splitLine: {
          lineStyle: {
            color: tokens.borderColor
          }
        }
      },
      yAxis: {
        type: 'category',
        data: names,
        axisLabel: axisLabelStyle,
        axisLine: getAxisLineStyle(),
        axisTick: getAxisLineStyle()
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
            color: tokens.tertiary,
            borderColor: tokens.textColor,
            borderWidth: 1,
            borderRadius: [0, 4, 4, 0]
          }
        }
      ]
    };
  }
}
