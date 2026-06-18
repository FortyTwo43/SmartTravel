import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { IngresoPeriodo } from '../../../../../domain/ui/proveedor/estadisticas/IngresoPeriodo';
import { TranslateModule } from '@ngx-translate/core';
import {
  getAxisLineStyle,
  getAxisTooltipConfig,
  getChartTextStyle,
  getChartThemeTokens
} from '../chart-theme.utils';

@Component({
  selector: 'app-ingresos-line-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TranslateModule],
  templateUrl: './ingresos-line-chart.html',
  styleUrls: ['./ingresos-line-chart.css']
})
export class IngresosLineChartComponent implements OnChanges {
  @Input() data: IngresoPeriodo[] = [];
  @Input() title: string = '';
  @Input() seriesName: string = 'Ingresos';

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
    const values = this.data.map(d => d.ingresos);
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
          type: 'line',
          smooth: true,
          itemStyle: {
            color: tokens.primary,
            borderColor: tokens.textColor,
            borderWidth: 1
          },
          lineStyle: {
            width: 3
          },
          areaStyle: {
            color: tokens.primary,
            opacity: 0.1
          }
        }
      ]
    };
  }
}
