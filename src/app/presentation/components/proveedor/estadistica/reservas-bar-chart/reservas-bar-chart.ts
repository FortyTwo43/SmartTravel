import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ReservaPeriodo } from '../../../../../domain/ui/proveedor/estadisticas/ReservaPeriodo';
import { TranslateModule } from '@ngx-translate/core';
import {
  getAxisLineStyle,
  getAxisTooltipConfig,
  getChartTextStyle,
  getChartThemeTokens
} from '../chart-theme.utils';

@Component({
  selector: 'app-reservas-bar-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TranslateModule],
  templateUrl: './reservas-bar-chart.html',
  styleUrls: ['../ingresos-line-chart/ingresos-line-chart.css']
})
export class ReservasBarChartComponent implements OnChanges {
  @Input() data: ReservaPeriodo[] = [];
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
    const dates = this.data.map(d => d.fecha);
    const values = this.data.map(d => d.cantidad_reservas);
    const axisLabelStyle = getChartTextStyle(tokens.textColor);

    this.chartOption = {
      title: {
        text: this.title,
        textStyle: {
          ...getChartTextStyle(tokens.textColor),
          fontFamily: tokens.fontHeadline
        }
      },
      tooltip: getAxisTooltipConfig(),
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: axisLabelStyle,
        axisLine: getAxisLineStyle(),
        axisTick: getAxisLineStyle()
      },
      yAxis: {
        type: 'value',
        axisLabel: axisLabelStyle,
        axisLine: getAxisLineStyle(),
        splitLine: {
          lineStyle: {
            color: tokens.borderColor
          }
        }
      },
      series: [
        {
          name: this.seriesName,
          data: values,
          type: 'bar',
          itemStyle: {
            color: tokens.secondary,
            borderColor: tokens.textColor,
            borderWidth: 1,
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    };
  }
}
