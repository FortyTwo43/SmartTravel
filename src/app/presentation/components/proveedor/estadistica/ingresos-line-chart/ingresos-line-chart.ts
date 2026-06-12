import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { IngresoPeriodo } from '../../../../../domain/ui/proveedor/estadisticas/IngresoPeriodo';
import { TranslateModule } from '@ngx-translate/core';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  private updateChart() {
    const dates = this.data.map(d => d.fecha);
    const values = this.data.map(d => d.ingresos);

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3b82f6';
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
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          color: textColor
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: textColor
        }
      },
      series: [
        {
          name: this.seriesName,
          data: values,
          type: 'line',
          smooth: true,
          itemStyle: {
            color: primaryColor
          },
          areaStyle: {
            color: primaryColor,
            opacity: 0.1
          }
        }
      ]
    };
  }
}
