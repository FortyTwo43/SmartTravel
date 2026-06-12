import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ReservaPeriodo } from '../../../../../domain/ui/proveedor/estadisticas/ReservaPeriodo';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reservas-bar-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TranslateModule],
  templateUrl: './reservas-bar-chart.html',
  styleUrls: ['../ingresos-line-chart/ingresos-line-chart.css'] // Reusing styles
})
export class ReservasBarChartComponent implements OnChanges {
  @Input() data: ReservaPeriodo[] = [];
  @Input() title: string = '';
  @Input() seriesName: string = 'Reservas';

  chartOption: EChartsOption = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  private updateChart() {
    const dates = this.data.map(d => d.fecha);
    const values = this.data.map(d => d.cantidad_reservas);

    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#10b981';
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
          type: 'bar',
          itemStyle: {
            color: secondaryColor,
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    };
  }
}
