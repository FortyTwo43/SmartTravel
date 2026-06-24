import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import type { EChartsOption, SeriesOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import {
  AdminStatPoint,
  AdminTemporalSeries
} from '../../../../../domain/ui/admin/estadisticas/AdminEstadisticas';

type AdminChartType = 'line' | 'bar' | 'pie' | 'donut' | 'multi-line';

@Component({
  selector: 'app-admin-stat-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, TranslateModule],
  templateUrl: './admin-stat-chart.html',
  styleUrl: './admin-stat-chart.css'
})
export class AdminStatChartComponent implements OnChanges {
  @Input() title = '';
  @Input() seriesName = '';
  @Input() chartType: AdminChartType = 'bar';
  @Input() data: AdminStatPoint[] = [];
  @Input() temporalSeries: AdminTemporalSeries[] = [];

  chartOption: EChartsOption = {};

  @HostListener('window:resize')
  onResize(): void {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['data'] ||
      changes['temporalSeries'] ||
      changes['chartType'] ||
      changes['title'] ||
      changes['seriesName']
    ) {
      this.updateChart();
    }
  }

  get hasData(): boolean {
    if (this.chartType === 'multi-line') {
      return this.temporalSeries.some(series => series.points.some(point => point.value > 0));
    }

    return this.data.some(point => point.value > 0);
  }

  private updateChart(): void {
    const tokens = this.getThemeTokens();

    if (this.chartType === 'pie' || this.chartType === 'donut') {
      this.chartOption = this.buildPieChart(tokens);
      return;
    }

    if (this.chartType === 'multi-line') {
      this.chartOption = this.buildMultiLineChart(tokens);
      return;
    }

    this.chartOption = this.buildAxisChart(tokens);
  }

  private buildAxisChart(tokens: ChartTokens): EChartsOption {
    const labels = this.data.map(point => point.label);
    const values = this.data.map(point => point.value);
    const axisChartType: 'line' | 'bar' = this.chartType === 'line' ? 'line' : 'bar';

    return {
      title: this.buildTitle(tokens),
      tooltip: this.buildAxisTooltip(tokens),
      grid: this.buildGrid(),
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: {
          ...this.buildTextStyle(tokens.textColor),
          interval: 0,
          rotate: labels.some(label => label.length > 10) ? 24 : 0
        },
        axisLine: this.buildAxisLine(tokens),
        axisTick: this.buildAxisLine(tokens)
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: this.buildTextStyle(tokens.textColor),
        axisLine: this.buildAxisLine(tokens),
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
          type: axisChartType,
          smooth: axisChartType === 'line',
          itemStyle: {
            color: axisChartType === 'line' ? tokens.primary : tokens.secondary,
            borderColor: tokens.textColor,
            borderWidth: 1,
            borderRadius: axisChartType === 'bar' ? [4, 4, 0, 0] : undefined
          },
          lineStyle: {
            width: 3
          },
          areaStyle: axisChartType === 'line'
            ? {
                color: tokens.primary,
                opacity: 0.1
              }
            : undefined
        }
      ]
    };
  }

  private buildMultiLineChart(tokens: ChartTokens): EChartsOption {
    const labels = Array.from(
      new Set(this.temporalSeries.flatMap(series => series.points.map(point => point.label)))
    ).sort((a, b) => a.localeCompare(b));
    const palette = [tokens.primary, tokens.secondary, tokens.tertiary, tokens.negative];

    const series: SeriesOption[] = this.temporalSeries.map((item, index) => ({
      name: item.name,
      data: labels.map(label => item.points.find(point => point.label === label)?.value ?? 0),
      type: 'line',
      smooth: true,
      itemStyle: {
        color: palette[index % palette.length],
        borderColor: tokens.textColor,
        borderWidth: 1
      },
      lineStyle: {
        width: 3
      }
    }));

    return {
      title: this.buildTitle(tokens),
      color: palette,
      tooltip: this.buildAxisTooltip(tokens),
      legend: {
        top: 36,
        textStyle: this.buildTextStyle(tokens.textColor)
      },
      grid: {
        ...this.buildGrid(),
        top: 84
      },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: this.buildTextStyle(tokens.textColor),
        axisLine: this.buildAxisLine(tokens),
        axisTick: this.buildAxisLine(tokens)
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: this.buildTextStyle(tokens.textColor),
        axisLine: this.buildAxisLine(tokens),
        splitLine: {
          lineStyle: {
            color: tokens.borderColor
          }
        }
      },
      series
    };
  }

  private buildPieChart(tokens: ChartTokens): EChartsOption {
    const palette = [tokens.primary, tokens.secondary, tokens.tertiary, tokens.negative, tokens.textMuted];

    return {
      title: {
        ...this.buildTitle(tokens),
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        confine: true,
        formatter: '{a}<br/>{b}: {c} ({d}%)',
        borderColor: tokens.borderColor,
        backgroundColor: tokens.bgSurface,
        textStyle: this.buildTextStyle(tokens.textColor, 14)
      },
      legend: {
        bottom: 0,
        left: 'center',
        textStyle: this.buildTextStyle(tokens.textColor),
        itemGap: 14
      },
      color: palette,
      series: [
        {
          name: this.seriesName,
          type: 'pie',
          radius: this.chartType === 'donut' ? ['42%', '68%'] : '62%',
          center: ['50%', '48%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 8,
            borderColor: tokens.bgSurface,
            borderWidth: 2
          },
          label: {
            color: tokens.textColor,
            fontFamily: tokens.fontBody
          },
          data: this.data.map(point => ({
            name: point.label,
            value: point.value
          }))
        }
      ]
    };
  }

  private buildTitle(tokens: ChartTokens) {
    return {
      text: this.title,
      textStyle: {
        ...this.buildTextStyle(tokens.textColor, 14),
        fontFamily: tokens.fontHeadline,
        fontWeight: 700
      }
    };
  }

  private buildAxisTooltip(tokens: ChartTokens) {
    return {
      trigger: 'axis' as const,
      confine: true,
      borderColor: tokens.borderColor,
      backgroundColor: tokens.bgSurface,
      textStyle: this.buildTextStyle(tokens.textColor, 14)
    };
  }

  private buildGrid() {
    return {
      top: 64,
      right: 20,
      bottom: 56,
      left: 44,
      containLabel: true
    };
  }

  private buildAxisLine(tokens: ChartTokens) {
    return {
      lineStyle: {
        color: tokens.borderColor,
        width: 1
      }
    };
  }

  private buildTextStyle(color: string, fontSize = 12) {
    const tokens = this.getThemeTokens();
    const scaledFontSize = Math.round(fontSize * tokens.fontScale);

    return {
      color,
      fontFamily: tokens.fontBody,
      fontSize: scaledFontSize,
      lineHeight: Math.round(scaledFontSize * tokens.lineHeight),
      letterSpacing: tokens.letterSpacing
    };
  }

  private getThemeTokens(): ChartTokens {
    const style = getComputedStyle(document.documentElement);

    return {
      textColor: style.getPropertyValue('--text-main').trim() || '#1f2937',
      textMuted: style.getPropertyValue('--text-muted').trim() || '#5f6b7a',
      primary: style.getPropertyValue('--color-primary').trim() || '#0288d1',
      secondary: style.getPropertyValue('--color-secondary').trim() || '#4caf50',
      tertiary: style.getPropertyValue('--color-tertiary').trim() || '#c26c02',
      negative: style.getPropertyValue('--color-negative').trim() || '#f46e60',
      borderColor: style.getPropertyValue('--border-color').trim() || '#d1d5db',
      bgSurface: style.getPropertyValue('--bg-surface').trim() || '#ffffff',
      fontHeadline: style.getPropertyValue('--font-headline').trim() || "'Plus Jakarta Sans', sans-serif",
      fontBody: style.getPropertyValue('--font-body').trim() || "'Inter', sans-serif",
      lineHeight: Number.parseFloat(style.getPropertyValue('--text-line-height').trim() || '1.5'),
      letterSpacing: style.getPropertyValue('--text-letter-spacing').trim() || '0',
      fontScale: Number.parseFloat(style.getPropertyValue('--font-scale').trim() || '1')
    };
  }
}

interface ChartTokens {
  textColor: string;
  textMuted: string;
  primary: string;
  secondary: string;
  tertiary: string;
  negative: string;
  borderColor: string;
  bgSurface: string;
  fontHeadline: string;
  fontBody: string;
  lineHeight: number;
  letterSpacing: string;
  fontScale: number;
}
