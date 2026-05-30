import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardGraph } from '../../../../domain/dashboard/DashboardGraph';

@Component({
  selector: 'app-proveedor-chart-placeholder',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './proveedor-chart-placeholder.html',
  styleUrl: './proveedor-chart-placeholder.css'
})
export class ProveedorChartPlaceholderComponent implements OnChanges {
  @Input() graphData: DashboardGraph[] | null = null;
  
  chartOptions: EChartsOption = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graphData'] && this.graphData) {
      this.updateChart();
    }
  }

  private updateChart() {
    const dates = this.graphData!.map(d => {
      const parts = d.fecha.split('-');
      if (parts.length === 3) {
        return `${parts[1]}/${parts[2]}`; // Simple MM/DD format
      }
      return d.fecha;
    });
    
    const values = this.graphData!.map(d => d.total_reservas);

    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        borderColor: 'rgba(30, 41, 59, 0.9)',
        textStyle: { color: '#fff' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLine: { lineStyle: { color: '#475569' } },
        axisLabel: { color: '#94a3b8' }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#94a3b8' }
      },
      series: [
        {
          name: 'Reservas',
          type: 'line',
          smooth: true,
          data: values,
          itemStyle: { color: '#0288d1' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(2, 136, 209, 0.4)' },
                { offset: 1, color: 'rgba(2, 136, 209, 0.05)' }
              ]
            }
          }
        }
      ]
    };
  }
}
