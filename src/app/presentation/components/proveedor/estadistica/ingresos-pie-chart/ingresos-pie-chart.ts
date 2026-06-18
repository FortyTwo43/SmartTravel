import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { IngresoPorServicio } from '../../../../../domain/ui/proveedor/estadisticas/IngresoPorServicio';
import { TranslateModule } from '@ngx-translate/core';
import {
  getChartTextStyle,
  getChartThemeTokens,
  getItemTooltipConfig,
  getPieLegendConfig,
  isMobileChartView
} from '../chart-theme.utils';

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
    const isMobile = isMobileChartView();
    const chartData = this.data.map(d => ({
      name: d.nombre_servicio,
      value: d.total_ingresos
    }));

    const colorPalette = [tokens.primary, tokens.secondary, tokens.tertiary, tokens.negative, '#8b5cf6', '#06b6d4'];

    const showSliceLabels = !isMobile && chartData.length > 1;

    this.chartOption = {
      title: {
        text: this.title,
        left: 'center',
        textStyle: {
          ...getChartTextStyle(tokens.textColor, 16),
          fontFamily: tokens.fontHeadline
        }
      },
      tooltip: {
        ...getItemTooltipConfig(true),
        formatter: '{a}<br/>{b}: ${c} ({d}%)'
      },
      legend: getPieLegendConfig(),
      color: colorPalette,
      series: [
        {
          name: this.seriesName,
          type: 'pie',
          radius: isMobile ? '42%' : '50%',
          center: isMobile ? ['50%', '40%'] : ['58%', '50%'],
          avoidLabelOverlap: true,
          data: chartData,
          label: {
            show: showSliceLabels,
            color: tokens.textColor,
            fontFamily: tokens.fontBody,
            fontSize: 12,
            lineHeight: Math.round(12 * tokens.lineHeight),
            formatter: '{b}\n{d}%',
            textBorderWidth: 0,
            textShadowColor: 'transparent'
          },
          labelLine: {
            show: showSliceLabels,
            lineStyle: {
              color: tokens.borderColor
            }
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
